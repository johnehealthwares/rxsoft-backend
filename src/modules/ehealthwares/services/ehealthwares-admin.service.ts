import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { EhealthwaresListQueryDto } from '../dto/ehealthwares-admin.dto';

type SoftDeleteConfig = {
  deletedAt?: boolean;
  isActive?: boolean;
};

@Injectable()
export class EhealthwaresAdminService {
  /**
   * Paginated, searchable, sortable list. Search may be a plain string
   * (free-text across `searchFields`) or a JSON object of column filters
   * in the `FILTER|value|valueTo` format used by the admin data table.
   */
  async list<T>(
    model: Model<T>,
    query: EhealthwaresListQueryDto,
    searchFields: string[],
    sortAllowList: string[],
  ): Promise<{
    data: T[];
    total: number;
    page: number;
    limit: number;
    meta: Record<string, unknown>;
  }> {
    const { page = 1, limit = 20, search, sortBy, sortOrder } = query;

    const filter: Record<string, unknown> = {
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };

    if (search && search.trim()) {
      const and: Record<string, unknown>[] = [];
      let textSearch: string | null = null;
      let columnFilters: Record<string, string> | null = null;

      const trimmed = search.trim();
      if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        try {
          columnFilters = JSON.parse(trimmed) as Record<string, string>;
        } catch {
          textSearch = trimmed;
        }
      } else {
        textSearch = trimmed;
      }

      if (textSearch && searchFields.length) {
        and.push({
          $or: searchFields.map((field) => ({
            [field]: { $regex: textSearch, $options: 'i' },
          })),
        });
      }

      if (columnFilters && Object.keys(columnFilters).length) {
        for (const [field, expr] of Object.entries(columnFilters)) {
          if (typeof expr !== 'string') {
            continue;
          }
          const [type, rawValue, rawValueTo] = expr.split('|');
          const clause = this.buildFilterClause(
            field,
            type,
            rawValue,
            rawValueTo,
          );
          if (clause) {
            and.push(clause);
          }
        }
      }

      if (and.length) {
        filter.$and = and;
      }
    }

    const sort: Record<string, 1 | -1> = {};
    if (sortBy && sortAllowList.includes(sortBy)) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.displayOrder = 1;
    }

    const [data, total] = await Promise.all([
      model
        .find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      model.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async create<T>(model: Model<T>, dto: unknown): Promise<T> {
    const doc = new model(dto);
    return doc.save() as Promise<T>;
  }

  async update<T>(model: Model<T>, id: string, dto: unknown): Promise<T> {
    this.assertObjectId(id);
    const doc = await model
      .findByIdAndUpdate(id, dto as object, { new: true })
      .exec();
    if (!doc) {
      throw new NotFoundException('Record not found');
    }
    return doc as T;
  }

  async remove<T>(
    model: Model<T>,
    id: string,
    soft: SoftDeleteConfig = {},
  ): Promise<{ id: string; deleted: boolean; softDeleted?: boolean }> {
    this.assertObjectId(id);
    const existing = await model.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Record not found');
    }

    if (soft.deletedAt) {
      await model
        .findByIdAndUpdate(id, {
          deletedAt: new Date(),
          isActive: false,
        })
        .exec();
      return { id, deleted: true, softDeleted: true };
    }

    if (soft.isActive) {
      await model.findByIdAndUpdate(id, { isActive: false }).exec();
      return { id, deleted: true, softDeleted: true };
    }

    await model.findByIdAndDelete(id).exec();
    return { id, deleted: true };
  }

  private assertObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
  }

  private buildFilterClause(
    field: string,
    type: string | undefined,
    rawValue: string | undefined,
    rawValueTo: string | undefined,
  ): Record<string, unknown> | null {
    const value = this.coerce(rawValue);
    switch (type) {
      case 'EQUALS':
        return { [field]: value };
      case 'NOT_EQUALS':
        return { [field]: { $ne: value } };
      case 'FUZZY_MATCH':
      case 'CONTAINS':
        return rawValue
          ? { [field]: { $regex: rawValue, $options: 'i' } }
          : null;
      case 'GREATER_THAN':
        return { [field]: { $gt: value } };
      case 'GREATER_THAN_OR_EQUAL':
        return { [field]: { $gte: value } };
      case 'LESS_THAN':
        return { [field]: { $lt: value } };
      case 'LESS_THAN_OR_EQUAL':
        return { [field]: { $lte: value } };
      case 'MISSING':
        return { [field]: { $exists: false } };
      case 'BETWEEN': {
        const to = this.coerce(rawValueTo);
        return { [field]: { $gte: value, $lte: to } };
      }
      default:
        return null;
    }
  }

  private coerce(raw: string | undefined): unknown {
    if (raw === undefined || raw === '') {
      return null;
    }
    if (raw === 'true') {
      return true;
    }
    if (raw === 'false') {
      return false;
    }
    const numeric = Number(raw);
    if (raw.trim() !== '' && !Number.isNaN(numeric)) {
      return numeric;
    }
    return raw;
  }
}

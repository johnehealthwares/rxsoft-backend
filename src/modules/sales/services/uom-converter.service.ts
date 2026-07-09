import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UomOrmEntity } from '../entities/uom.orm-entity';

function getEffectiveFactor(uom: { uomType: string; factor: number }): number {
  return uom.uomType === 'smaller' ? 1 / uom.factor : uom.factor;
}

@Injectable()
export class UomConverterService {
  constructor(
    @InjectRepository(UomOrmEntity)
    private readonly uomRepo: Repository<UomOrmEntity>,
  ) {}

  async convert(quantity: number, fromUomId: string, toUomId: string): Promise<number> {
    if (fromUomId === toUomId) return quantity;

    const [fromUom, toUom] = await Promise.all([
      this.uomRepo.findOneByOrFail({ id: fromUomId }),
      this.uomRepo.findOneByOrFail({ id: toUomId }),
    ]);

    if (fromUom.categoryId !== toUom.categoryId) {
      throw new BadRequestException(
        `UOM "${fromUom.name}" (category: ${fromUom.categoryId}) and "${toUom.name}" (category: ${toUom.categoryId}) are not in the same category`,
      );
    }

    const fromEffective = getEffectiveFactor(fromUom);
    const toEffective = getEffectiveFactor(toUom);
    const inReference = quantity * fromEffective;
    return Number((inReference / toEffective).toFixed(4));
  }

  async convertToBaseUom(
    quantity: number,
    uomId: string,
    baseUomId: string,
  ): Promise<number> {
    return this.convert(quantity, uomId, baseUomId);
  }

  async convertFromBaseUom(
    quantity: number,
    targetUomId: string,
    baseUomId: string,
  ): Promise<number> {
    return this.convert(quantity, baseUomId, targetUomId);
  }
}

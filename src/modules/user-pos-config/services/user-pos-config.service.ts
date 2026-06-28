import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganisationConfigService } from '../../organisation-config/services/organisation-config.service';
import { UpdateUserPosConfigDto, UserPosConfigType } from '../dto/user-pos-config.dto';
import { UserPosConfigOrmEntity } from '../entities/user-pos-config.orm-entity';

function toType(entity: UserPosConfigOrmEntity): UserPosConfigType {
  return {
    id: entity.id,
    userId: entity.userId,
    organizationId: entity.organizationId,
    stockLocationId: entity.stockLocationId,
    stockLocation: entity.stockLocation
      ? { id: entity.stockLocation.id, name: entity.stockLocation.name }
      : null,
    storeId: entity.storeId,
    allowA4Print: entity.allowA4Print,
    allowPos: entity.allowPos,
    loginTimeoutMinutes: entity.loginTimeoutMinutes,
    defaultCustomerId: entity.defaultCustomerId,
    defaultCustomer: entity.defaultCustomer
      ? { id: entity.defaultCustomer.id, name: entity.defaultCustomer.name }
      : null,
    defaultPriceListId: entity.defaultPriceListId,
    defaultPriceList: entity.defaultPriceList
      ? { id: entity.defaultPriceList.id, name: entity.defaultPriceList.name }
      : null,
    autoSelectLocation: entity.autoSelectLocation,
    autoSelectCustomer: entity.autoSelectCustomer,
    autoSelectPriceList: entity.autoSelectPriceList,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}

@Injectable()
export class UserPosConfigService {
  constructor(
    @InjectRepository(UserPosConfigOrmEntity)
    private readonly repo: Repository<UserPosConfigOrmEntity>,
    private readonly orgConfigService: OrganisationConfigService,
  ) {}

  async getOrCreate(userId: string, organizationId: string): Promise<UserPosConfigType> {
    let entity = await this.repo.findOne({
      where: { userId, organizationId },
      relations: ['stockLocation', 'defaultCustomer', 'defaultPriceList'],
    });
    if (!entity) {
      const orgConfig = await this.orgConfigService.getOrCreate(organizationId);
      entity = this.repo.create({
        userId,
        organizationId,
        allowA4Print: orgConfig.defaultAllowA4Print,
        allowPos: orgConfig.defaultAllowPos,
      });
      entity = await this.repo.save(entity);
    }
    return toType(entity);
  }

  async update(
    userId: string,
    organizationId: string,
    payload: UpdateUserPosConfigDto,
  ): Promise<UserPosConfigType> {
    let entity = await this.repo.findOne({
      where: { userId, organizationId },
      relations: ['stockLocation', 'defaultCustomer', 'defaultPriceList'],
    });
    if (!entity) {
      entity = this.repo.create({ userId, organizationId });
    }

    if (payload.stockLocationId !== undefined) {
      entity.stockLocationId = payload.stockLocationId;
      entity.stockLocation = null as any;
    }
    if (payload.storeId !== undefined) entity.storeId = payload.storeId;
    if (payload.allowA4Print !== undefined) entity.allowA4Print = payload.allowA4Print;
    if (payload.allowPos !== undefined) entity.allowPos = payload.allowPos;
    if (payload.loginTimeoutMinutes !== undefined) entity.loginTimeoutMinutes = payload.loginTimeoutMinutes;
    if (payload.defaultCustomerId !== undefined) {
      entity.defaultCustomerId = payload.defaultCustomerId;
      entity.defaultCustomer = null as any;
    }
    if (payload.defaultPriceListId !== undefined) {
      entity.defaultPriceListId = payload.defaultPriceListId;
      entity.defaultPriceList = null as any;
    }
    if (payload.autoSelectLocation !== undefined) entity.autoSelectLocation = payload.autoSelectLocation;
    if (payload.autoSelectCustomer !== undefined) entity.autoSelectCustomer = payload.autoSelectCustomer;
    if (payload.autoSelectPriceList !== undefined) entity.autoSelectPriceList = payload.autoSelectPriceList;
    const saved = await this.repo.save(entity);
    return toType(saved);
  }
}

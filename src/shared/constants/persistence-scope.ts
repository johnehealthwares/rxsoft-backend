import { ConfigService } from '@nestjs/config';

const persistenceConfigService = new ConfigService();

export const DEFAULT_ORGANIZATION_ID = persistenceConfigService.get<string>(
  'DEFAULT_ORGANIZATION_ID',
  'df3b4afd-9955-4617-9a82-264cc73dd8b2',
);

export const DEFAULT_SYSTEM_USER_ID = persistenceConfigService.get<string>(
  'DEFAULT_SYSTEM_USER_ID',
  '00000000-0000-0000-0000-000000000001',
);

export const DEFAULT_UOM_ID = persistenceConfigService.get<string>(
  'DEFAULT_UOM_ID',
  '00000000-0000-0000-0000-000000000001',
);

export const DEFAULT_STORE_ID = persistenceConfigService.get<string>(
  'DEFAULT_STORE_ID',
  'default',
);

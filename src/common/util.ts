// common/utils/repository-provider.util.ts

import { ConfigService } from '@nestjs/config';
import { Provider, Type } from '@nestjs/common';

export function createRepositorySwitchProviders<
  TInterface = unknown,
  TTypeorm extends TInterface = TInterface,
  TInMemory extends TInterface = TInterface,
>(
  mappings: Array<{
    token: symbol | string;
    typeormRepo: Type<TTypeorm>;
    inMemoryRepo: Type<TInMemory>;
    configKey?: string; // optional override (default: USE_IN_MEMORY_REPOS)
  }>,
): Provider[] {
  return mappings.map(
    ({ token, typeormRepo, inMemoryRepo, configKey }) => ({
      provide: token,
      inject: [ConfigService, typeormRepo, inMemoryRepo],
      useFactory: (
        config: ConfigService,
        typeormRepository: TTypeorm,
        inMemoryRepository: TInMemory,
      ) => {
        const useInMemory =
          config.get<string>(configKey ?? 'USE_IN_MEMORY_REPOS') === 'true';

        return useInMemory ? inMemoryRepository : typeormRepository;
      },
    }),
  );
}
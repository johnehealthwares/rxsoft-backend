"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRepositorySwitchProviders = createRepositorySwitchProviders;
const config_1 = require("@nestjs/config");
function createRepositorySwitchProviders(mappings) {
    return mappings.map(({ token, typeormRepo, inMemoryRepo, configKey }) => ({
        provide: token,
        inject: [config_1.ConfigService, typeormRepo, inMemoryRepo],
        useFactory: (config, typeormRepository, inMemoryRepository) => {
            const useInMemory = config.get(configKey ?? 'USE_IN_MEMORY_REPOS') === 'true';
            return useInMemory ? inMemoryRepository : typeormRepository;
        },
    }));
}
//# sourceMappingURL=util.js.map
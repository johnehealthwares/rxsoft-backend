"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_STORE_ID = exports.DEFAULT_UOM_ID = exports.DEFAULT_SYSTEM_USER_ID = exports.DEFAULT_ORGANIZATION_ID = void 0;
const config_1 = require("@nestjs/config");
const persistenceConfigService = new config_1.ConfigService();
exports.DEFAULT_ORGANIZATION_ID = persistenceConfigService.get('DEFAULT_ORGANIZATION_ID', 'df3b4afd-9955-4617-9a82-264cc73dd8b2');
exports.DEFAULT_SYSTEM_USER_ID = persistenceConfigService.get('DEFAULT_SYSTEM_USER_ID', '00000000-0000-0000-0000-000000000001');
exports.DEFAULT_UOM_ID = persistenceConfigService.get('DEFAULT_UOM_ID', '00000000-0000-0000-0000-000000000001');
exports.DEFAULT_STORE_ID = persistenceConfigService.get('DEFAULT_STORE_ID', 'default');
//# sourceMappingURL=persistence-scope.js.map
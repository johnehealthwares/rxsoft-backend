"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportContext = exports.SyncMode = void 0;
var SyncMode;
(function (SyncMode) {
    SyncMode[SyncMode["INSERT_ONLY"] = 0] = "INSERT_ONLY";
    SyncMode[SyncMode["UPDATE_ONLY"] = 1] = "UPDATE_ONLY";
    SyncMode[SyncMode["UPSERT"] = 2] = "UPSERT";
    SyncMode[SyncMode["FULL_SYNC"] = 3] = "FULL_SYNC";
})(SyncMode || (exports.SyncMode = SyncMode = {}));
class ImportContext {
    caches = new Map();
    results = [];
}
exports.ImportContext = ImportContext;
//# sourceMappingURL=types.js.map
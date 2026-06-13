// import-config.ts

import { ImportEntityConfig, SyncMode } from "./types";


export const IMPORT_CONFIG: Record<
  string,
  ImportEntityConfig
> = {
  item: {
    eav: [],
    softDeleteField: 'active',
    mode: SyncMode.FULL_SYNC
  },
};
import { RowSyncResult } from "../types";

export interface SpreadsheetStatusWriter {
  updateRows(
    results: RowSyncResult[],
  ): Promise<void>;
}
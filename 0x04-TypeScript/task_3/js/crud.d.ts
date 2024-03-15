import { RowID, RowElement } from './interface';

declare module './crud' {
  export function insertRow(row: RowElement): RowID;
  export function deleteRow(rowId: RowId): void;
  export function updateRow(roeId: RowID, row: RowElement): RowID;
}

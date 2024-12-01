import { Row, Table } from "@tanstack/react-table";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { formatDateValueToString, isValidDate } from "../../lib/utils";

interface DataTableExportButtonProps<TData> {
  table: Table<TData>;
  dataMap: Map<string, string>;
}

export function DataTableExportButton<TData>({
  table,
  dataMap,
}: DataTableExportButtonProps<TData>) {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: "turbanscy-dane",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const exportToCSV = async () => {
    const rows = table.getCoreRowModel().rows;
    const columns = table.getAllColumns();
    const filteredColumns = columns.filter((column) => column.id !== "actions");
    const rowData = rows.map((row: Row<TData>) => {
      const rowDataObj: { [key: string]: any } = {};
      filteredColumns.forEach((column) => {
        if (column.id.toLocaleLowerCase().includes("date")) {
          rowDataObj[`${dataMap.get(column.id)}`] = formatDateValueToString(
            row.getValue(column.id)
          );
        } else {
          rowDataObj[`${dataMap.get(column.id)}`] = row.getValue(column.id);
        }
      });
      return rowDataObj;
    });

    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto hidden h-8 lg:flex bg-muted/40"
      onClick={exportToCSV}
    >
      <Download className="mr-2 h-4 w-4" />
      Wyeksportuj
    </Button>
  );
}

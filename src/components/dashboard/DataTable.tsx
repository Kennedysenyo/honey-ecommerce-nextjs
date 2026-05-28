import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Card } from "../../components/ui/card";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const renderCell = (row: T, column: Column<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    return String(row[column.accessor]);
  };

  if (data.length === 0) {
    return (
      <Card className="p-12 text-center border-[var(--honey-gold)]/20">
        <p className="text-gray-500">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <Card className="border-[var(--honey-gold)]/20 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {columns.map((column, index) => (
                  <TableCell key={index} className={column.className}>
                    {renderCell(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

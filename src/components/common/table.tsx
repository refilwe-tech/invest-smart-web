import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ClipLoader } from "react-spinners";

export type TableProps<Value> = {
  data: Value[];
  dataCy?: string;
  pageCount?: number;
  loading?: boolean;
  columns: ColumnDef<Value, unknown>[];
};
export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  loading,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className="p-2">
        <table className="min-w-full table-auto border-separate border-spacing-y-1 text-left">
          <thead className="rounded-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-gradient-to-r from-secondary-2 to-primary-dark"
              >
                {headerGroup.headers.map((header) => (
                  <th className="text-white px-3" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-scroll">
            {table.getRowModel().rows.map((row) => (
              <tr className="even:bg-gray-100" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="px-3" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="h-4" />
      </div>
      {loading ? (
        <section className="flex justify-center gap-2">
          <ClipLoader className=" text-primary" /> Loading...
        </section>
      ) : (
        table.getRowModel().rows.length === 0 && (
          <p className="text-center font-bold text-lg">No data available</p>
        )
      )}
    </>
  );
};

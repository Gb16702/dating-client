"use client";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useRouter} from "next/navigation";
import React from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    tableData: TData[];
    initialSearch?: string;
}

export default function Table<TData, TValue>({columns, tableData, initialSearch}: DataTableProps<TData, TValue>) {
    const router = useRouter();

    const tableInstance = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        const url = new URL(window.location.href);
        url.searchParams.set("search", value);
        router.push(url.toString());
    }

    return (
        <div className="space-y-4 ">
            <div className="rounded-md border bg-white dark:bg-secondary_dark dark:border-gray-400">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="">
                        {tableInstance.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b transition-colors hover:bg-muted/50">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id} className="h-12 px-4 text-left align-middle font-medium">
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                        </thead>
                        <tbody className="">
                        {tableInstance.getRowModel().rows?.length ? (
                            tableInstance.getRowModel().rows.map((row) => (
                                <tr
                                    className="dark:border-gray-400"
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="h-12 px-4 align-middle">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
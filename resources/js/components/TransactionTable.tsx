import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
    Table,
} from '@tanstack/react-table';

type Transaction = {
    timestamp: string;
    amount: number;
    description: string;
    accountType: string;
};

type TransactionTableProps = {
    transactions: Transaction[];
    loading: boolean;
    columns: ColumnDef<Transaction>[];
};

export default function TransactionTable({ transactions, loading, columns }: TransactionTableProps) {
    const table = useReactTable({
        data: transactions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } },
    });

    if (loading && transactions.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h2 className="h5 mb-3 text-white">Transactions</h2>
            <table className="table table-striped">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination controls */}
            <div className="mt-3 d-flex align-items-center gap-2">
                <label className="me-2 text-white" htmlFor="pageSizeSelect">Rows per page:</label>
                <select
                    id="pageSizeSelect"
                    className="form-select form-select-sm w-auto"
                    value={table.getState().pagination.pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                >
                    {[5, 20, 50].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <Pagination className="mb-0">
                    <Pagination.First onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} />
                    <Pagination.Prev onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                    {Array.from({ length: table.getPageCount() }, (_, i) => (
                        <Pagination.Item
                            key={i}
                            active={i === table.getState().pagination.pageIndex}
                            onClick={() => table.setPageIndex(i)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                    <Pagination.Last onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} />
                </Pagination>
                <span className="ms-2 text-white">
                    Page <span className="badge bg-primary text-white">{table.getState().pagination.pageIndex + 1}</span> of{' '}
                    <span className="badge bg-secondary text-white">{table.getPageCount()}</span>
                </span>
            </div>
        </>
    );
}

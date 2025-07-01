import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';

type Transaction = {
    timestamp: string;
    amount: number;
    description: string;
    accountType: string;
};

import AppLayout from '../layouts/app-layout'; // Adjust path if needed
import TransactionTable from '../components/TransactionTable';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function Home() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [log, setLog] = useState<string[]>([]);
    const [accountTypeFilter, setAccountTypeFilter] = useState<string>('All');
    const prevTimestamps = useRef<string[]>([]);

    // Extract unique account types for the dropdown
    const accountTypes = React.useMemo(() => {
        const types = new Set(transactions.map(t => t.accountType));
        return Array.from(types);
    }, [transactions]);

    const fetchTransactions = (isInitial = false) => {
        if (isInitial) setLoading(true);
        axios.get<Transaction[]>('/api/transactions')
            .then(response => {
                setTransactions(response.data);
                if (isInitial) setLoading(false);
                const currentTimestamps = response.data.map(txn => txn.timestamp);
                // Always log polling activity
                setLog(logs => [
                    `Polled at ${new Date().toLocaleTimeString()}`,
                    ...logs,
                ]);
                // Log only if new transactions are received
                if (prevTimestamps.current.length > 0 && currentTimestamps[0] !== prevTimestamps.current[0]) {
                    setLog(logs => [
                        `New transactions received at ${new Date().toLocaleTimeString()}`,
                        ...logs,
                    ]);
                }
                prevTimestamps.current = currentTimestamps;
            })
            .catch(() => {
                if (isInitial) setLoading(false);
            });
    };

    useEffect(() => {
        fetchTransactions(true); // Initial fetch with loading spinner
        const interval = setInterval(() => {
            fetchTransactions(false); // Polling, no spinner
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    // Filter transactions by account type
    const filteredTransactions = accountTypeFilter === 'All'
        ? transactions
        : transactions.filter(txn => txn.accountType === accountTypeFilter);

    // react-table setup
    const lastPollTime = log.length > 0 ? log.find(l => l.startsWith('Polled at')) : undefined;

    const columns = React.useMemo<ColumnDef<Transaction>[]>(
        () => [
            { accessorKey: 'timestamp', header: 'Timestamp' },
            { accessorKey: 'amount', header: 'Amount' },
            { accessorKey: 'description', header: 'Description' },
            { accessorKey: 'accountType', header: 'Account Type' },
            {
                header: 'Last Polled',
                cell: () => lastPollTime ? (
                    <span className="badge bg-info text-dark">{lastPollTime.replace('Polled at ', '')}</span>
                ) : (
                    <span className="text-muted">N/A</span>
                )
            }
        ],
        [lastPollTime]
    );

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Transactions',
            href: '/home',
        },
    ];

    const table = useReactTable({
        data: filteredTransactions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="container">
                <h1 className="display-6 fw-bold mb-4 text-primary">Transactions</h1>
                {/* Filter Dropdown */}
                <InputGroup className="mb-4" style={{ maxWidth: 350 }}>
                    <InputGroup.Text id="accountTypeFilter-label">Account Type</InputGroup.Text>
                <select
                    className="form-select"
                    id="accountTypeFilter"
                    aria-label="Account Type Filter"
                    aria-describedby="accountTypeFilter-label"
                    value={accountTypeFilter}
                    onChange={e => setAccountTypeFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    {accountTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </InputGroup>
            
            {loading && transactions.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <TransactionTable
                    transactions={filteredTransactions}
                    loading={loading}
                    columns={columns}
                />
            )}
        </div>
        </AppLayout>
    );
}
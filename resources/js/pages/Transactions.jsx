import { useEffect, useState } from 'react';
import AppLayout from '../layouts/AppLayout';

function Transactions({ transactions = [] }) {
    // Filtering & Sorting States
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('DESC'); // DESC = Latest, ASC = Oldest
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Reset to page 1 whenever a filter or sort changes!
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortOrder]);

    // Apply Filters and Sorting
    const filteredTransactions = transactions
        ?.filter((txn) => {
            // Search by Transaction Number (Invoice Number)
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return txn.invoice_number?.toLowerCase().includes(query);
            }
            return true;
        })
        .sort((a, b) => {
            const dateA = new Date(a.created_at || a.id).getTime();
            const dateB = new Date(b.created_at || b.id).getTime();

            if (sortOrder === 'DESC') {
                return dateB - dateA; // Latest first
            } else {
                return dateA - dateB; // Oldest first
            }
        });

    // Calculate Pagination Data
    const totalItems = filteredTransactions?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the array to only show the current items
    const paginatedTransactions = filteredTransactions?.slice(startIndex, endIndex);

    // --- HELPER FUNCTIONS ---

    // Currency Formatter
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
    };

    // Date Formatter
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    // Calculate TRUE total quantity (summing the 'quantity' of each item)
    const calculateTotalQuantity = (txn) => {
        if (txn.items && txn.items.length > 0) {
            return txn.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
        }
        return txn.items_count || 0; // Fallback
    };

    return (
        <div className="flex h-full flex-col">
            {/* Top Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wide text-gray-900">Transactions</h1>
            </div>

            {/* Toolbar */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search transaction number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 rounded-full border border-gray-200 bg-white py-2 pr-10 pl-4 text-sm text-gray-600 italic shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                        />
                        <svg className="absolute top-2.5 right-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* SORT DROPDOWN CONTAINER */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`flex h-9 items-center justify-center gap-2 rounded-full px-4 shadow-sm transition ${isDropdownOpen ? 'bg-gray-100 text-[#7d6cb6]' : 'bg-[#7d6cb6] text-white hover:bg-[#6a5b9c]'}`}
                            title="Sort Transactions"
                        >
                            <span className="text-sm font-medium">Sort By : {sortOrder === 'DESC' ? 'Latest' : 'Oldest'}</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                                <div className="ring-opacity-5 absolute left-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
                                    <div className="px-3 py-2 text-xs font-bold tracking-wider text-gray-400 uppercase">Sort Order</div>
                                    <button
                                        onClick={() => {
                                            setSortOrder('DESC');
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2 text-left text-sm transition-colors ${sortOrder === 'DESC' ? 'bg-[#ebf0f4] font-semibold text-[#1f6057]' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Latest First
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSortOrder('ASC');
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2 text-left text-sm transition-colors ${sortOrder === 'ASC' ? 'bg-[#ebf0f4] font-semibold text-[#1f6057]' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Oldest First
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow">
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="sticky top-0 z-10 bg-[#1f6057] text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Transaction Number</th>
                                <th className="px-6 py-4 font-semibold">Date</th> {/* ADDED DATE */}
                                <th className="px-6 py-4 font-semibold">Pharmacist</th>
                                <th className="px-6 py-4 text-center font-semibold">Total Qty</th> {/* RENAMED */}
                                <th className="px-6 py-4 text-right font-semibold">Subtotal</th>
                                <th className="px-6 py-4 text-right font-semibold">Discount</th>
                                <th className="px-6 py-4 text-right font-semibold">Platform Fee</th>
                                <th className="px-6 py-4 text-right font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedTransactions && paginatedTransactions.length > 0 ? (
                                paginatedTransactions.map((txn, index) => (
                                    <tr key={txn.id || index} className="transition-colors hover:bg-gray-50">
                                        <td className="px-6 py-3 font-medium text-gray-800">{txn.invoice_number}</td>
                                        <td className="px-6 py-3 text-gray-600">{formatDate(txn.created_at)}</td>
                                        <td className="px-6 py-3 text-gray-600 italic">
                                            {/* Handles the pharmacist relation dynamically */}
                                            {txn.pharmacist?.name || txn.pharmacist_name || 'System'}
                                        </td>
                                        <td className="px-6 py-3 text-center text-gray-600">
                                            <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                {calculateTotalQuantity(txn)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-right text-gray-800">{formatCurrency(txn.subtotal)}</td>
                                        <td className="px-6 py-3 text-right text-gray-600">{formatCurrency(txn.discount_amount)}</td>
                                        <td className="px-6 py-3 text-right text-gray-600">{formatCurrency(txn.platform_fee)}</td>
                                        <td className="px-6 py-3 text-right font-semibold text-[#1f6057]">{formatCurrency(txn.total_amount)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                                        No transactions found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls (Footer) */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-700">{totalItems === 0 ? 0 : startIndex + 1}</span> to{' '}
                        <span className="font-semibold text-gray-700">{Math.min(endIndex, totalItems)}</span> of{' '}
                        <span className="font-semibold text-gray-700">{totalItems}</span> entries
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                currentPage === 1
                                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                    : 'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-200'
                            }`}
                        >
                            Previous
                        </button>

                        <div className="flex items-center justify-center px-4 text-sm font-semibold text-gray-700">
                            Page {currentPage} of {totalPages || 1}
                        </div>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                currentPage === totalPages || totalPages === 0
                                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                    : 'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-200'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Transactions.layout = (page) => <AppLayout children={page} />;
export default Transactions;

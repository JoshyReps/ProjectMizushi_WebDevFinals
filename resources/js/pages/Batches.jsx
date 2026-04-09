import { useEffect, useState } from 'react';
import AppLayout from '../layouts/AppLayout';

import AddBatchModal from '../Batches/AddBatchModal';
import EditBatchModal from '../Batches/EditBatchModal';
import ViewBatchModal from '../Batches/ViewBatchModal';

function Batches({ batches, medicines, suppliers }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusTab, setStatusTab] = useState('Healthy');
    const [sortOrder, setSortOrder] = useState('ASC');
    const [sortBy, setSortBy] = useState('expiry_date');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [openModal, setOpenModal] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState(null);

    const openAddModal = () => {
        setOpenModal('add');
    };

    const openEditModal = (batch) => {
        setSelectedBatch(batch);
        setOpenModal('edit');
    };

    const openViewModal = (batch) => {
        setSelectedBatch(batch);
        setOpenModal('view');
    };

    const closeModal = () => {
        setOpenModal(null);
        setSelectedBatch(null);
    };

    const sortOptions = [
        { label: 'Expiry Date', value: 'expiry_date' },
        { label: 'Batch Number', value: 'batch_number' },
        { label: 'Buying Price', value: 'buying_price' },
        { label: 'Quantity', value: 'quantity' },
        { label: 'Supplier', value: 'supplier_name' },
        { label: 'Medicine', value: 'medicine_name' },
    ];

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusTab, sortBy, sortOrder]);

    const filteredBatches = batches
        ?.filter((batch) => {
            const currentStatus = batch.status;

            if (statusTab !== currentStatus) return false;

            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchBatch = batch.batch_number?.toLowerCase().includes(query);
                const matchMed = batch.medicine?.med_name?.toLowerCase().includes(query);
                if (!matchBatch && !matchMed) return false;
            }
            return true;
        })
        .sort((a, b) => {
            let valA, valB;

            switch (sortBy) {
                case 'supplier_name':
                    valA = a.supplier?.company_name || '';
                    valB = b.supplier?.company_name || '';
                    break;
                case 'medicine_name':
                    valA = a.medicine?.med_name || '';
                    valB = b.medicine?.med_name || '';
                    break;
                case 'buying_price':
                case 'quantity':
                    valA = parseFloat(a[sortBy]) || 0;
                    valB = parseFloat(b[sortBy]) || 0;
                    return sortOrder === 'ASC' ? valA - valB : valB - valA;
                case 'expiry_date':
                    valA = new Date(a.expiry_date).getTime();
                    valB = new Date(b.expiry_date).getTime();
                    return sortOrder === 'ASC' ? valA - valB : valB - valA;
                default:
                    valA = a[sortBy] || '';
                    valB = b[sortBy] || '';
            }

            valA = valA.toString().toLowerCase();
            valB = valB.toString().toLowerCase();

            if (sortOrder === 'ASC') {
                return valA.localeCompare(valB);
            } else {
                return valB.localeCompare(valA);
            }
        });

    const totalItems = filteredBatches?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedBatches = filteredBatches?.slice(startIndex, endIndex);

    return (
        <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wide text-gray-900">
                    Inventory <span className="font-light text-gray-400">|</span> Batches
                </h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 rounded-md bg-[#7d6cb6] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6a5b9c]"
                >
                    Add Batch <span className="text-lg leading-none">+</span>
                </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="batch number / medicine"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 rounded-full border border-gray-200 bg-white py-2 pr-10 pl-4 text-sm text-gray-600 italic shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                        />
                        <svg className="absolute top-2.5 right-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition ${isDropdownOpen ? 'bg-gray-100 text-[#7d6cb6]' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            title="Sort by Column"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                                <div className="ring-opacity-5 absolute left-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
                                    <div className="px-3 py-2 text-xs font-bold tracking-wider text-gray-400 uppercase">Sort By</div>
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortBy(option.value);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                                                sortBy === option.value
                                                    ? 'bg-[#ebf0f4] font-semibold text-[#1f6057]'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:bg-gray-50"
                        title={sortOrder === 'ASC' ? 'Ascending' : 'Descending'}
                    >
                        <svg
                            className={`h-4 w-4 transition-transform ${sortOrder === 'DESC' ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                    </button>
                    <span className="ml-2 hidden text-xs text-gray-400 md:block">
                        Sorting by: <span className="font-semibold text-gray-600">{sortOptions.find((o) => o.value === sortBy)?.label}</span>
                    </span>
                </div>

                <div className="flex overflow-x-auto rounded-full bg-gray-100 p-1 shadow-inner">
                    {['Healthy', 'Low Stock', 'Critical', 'Expiring', 'Expired', 'Archive'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setStatusTab(tab)}
                            className={`rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all ${
                                statusTab === tab ? 'bg-[#7d6cb6] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow">
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="sticky top-0 z-10 bg-[#1f6057] text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Batch Number</th>
                                <th className="px-6 py-4 font-semibold">Supplier</th>
                                <th className="px-6 py-4 font-semibold">Medicine</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Buying Price</th>
                                <th className="px-6 py-4 font-semibold">Quantity</th>
                                <th className="px-6 py-4 font-semibold">Expiry Date</th>
                                <th className="px-6 py-4 text-center font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedBatches && paginatedBatches.length > 0 ? (
                                paginatedBatches.map((batch) => {
                                    const status = batch.status;

                                    let badgeColor = '';
                                    let dotColor = '';

                                    switch (status) {
                                        case 'Healthy':
                                            badgeColor = 'border-green-300 bg-green-50 text-green-600';
                                            dotColor = 'bg-green-500';
                                            break;
                                        case 'Low Stock':
                                            badgeColor = 'border-yellow-300 bg-yellow-50 text-yellow-600';
                                            dotColor = 'bg-yellow-500';
                                            break;
                                        case 'Critical':
                                            badgeColor = 'border-pink-300 bg-pink-50 text-pink-600';
                                            dotColor = 'bg-pink-500';
                                            break;
                                        case 'Expiring':
                                            badgeColor = 'border-orange-300 bg-orange-50 text-orange-600';
                                            dotColor = 'bg-orange-500';
                                            break;
                                        case 'Expired':
                                            badgeColor = 'border-red-300 bg-red-50 text-red-600';
                                            dotColor = 'bg-red-500';
                                            break;
                                        case 'Archive':
                                        default:
                                            badgeColor = 'border-gray-300 bg-gray-50 text-gray-600';
                                            dotColor = 'bg-gray-500';
                                            break;
                                    }

                                    return (
                                        <tr key={batch.batch_id} className="transition-colors hover:bg-gray-50">
                                            <td className="px-6 py-3 font-medium text-gray-800">{batch.batch_number}</td>
                                            <td className="px-6 py-3 text-gray-600">{batch.supplier?.company_name || '-'}</td>
                                            <td className="px-6 py-3 text-gray-600">{batch.medicine?.med_name || '-'}</td>
                                            <td className="px-6 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase ${badgeColor}`}
                                                >
                                                    <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`}></span>
                                                    {status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-gray-800">
                                                {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(batch.buying_price)}
                                            </td>
                                            <td className="px-6 py-3 text-gray-600">{batch.quantity}</td>
                                            <td className="px-6 py-3 text-gray-600">{formatDate(batch.expiry_date)}</td>
                                            <td className="px-6 py-3 text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => openViewModal(batch)}
                                                        className="font-medium text-[#44a194] transition-colors hover:text-[#1f6057] hover:underline"
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => openEditModal(batch)}
                                                        className="font-medium text-[#7d6cb6] transition-colors hover:text-[#5a4c8c] hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                                        No batches found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

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

            <AddBatchModal isOpen={openModal === 'add'} onClose={closeModal} medicines={medicines} suppliers={suppliers} />
            {selectedBatch && (
                <>
                    <EditBatchModal
                        isOpen={openModal === 'edit'}
                        onClose={closeModal}
                        batch={selectedBatch}
                        medicines={medicines}
                        suppliers={suppliers}
                    />
                    <ViewBatchModal isOpen={openModal === 'view'} onClose={closeModal} batch={selectedBatch} />
                </>
            )}
        </div>
    );
}

Batches.layout = (page) => <AppLayout children={page} />;
export default Batches;

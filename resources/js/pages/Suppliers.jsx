import { useEffect, useState } from 'react';
import AppLayout from '../layouts/AppLayout';

// 1. IMPORT MODAL COMPONENTS
import AddSupplierModal from '../Supplier/AddSupplierModal';
import EditSupplierModal from '../Supplier/EditSupplierModal';
import ViewSupplierModal from '../Supplier/ViewSupplierModal';

function Suppliers({ suppliers }) {
    // Existing States
    const [searchQuery, setSearchQuery] = useState('');
    const [statusTab, setStatusTab] = useState('Active');
    const [sortOrder, setSortOrder] = useState('ASC');
    const [sortBy, setSortBy] = useState('company_name');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 2. MODAL STATES
    const [openModal, setOpenModal] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    // 3. MODAL HANDLERS
    const openAddModal = () => {
        setOpenModal('add');
    };

    const openEditModal = (supplier) => {
        setSelectedSupplier(supplier);
        setOpenModal('edit');
    };

    const openViewModal = (supplier) => {
        setSelectedSupplier(supplier);
        setOpenModal('view');
    };

    const closeModal = () => {
        setOpenModal(null);
        setSelectedSupplier(null);
    };

    const sortOptions = [
        { label: 'Company Name', value: 'company_name' },
        { label: 'Phone Number', value: 'phone_number' },
        { label: 'Email', value: 'email' },
        { label: 'Address', value: 'address' },
    ];

    // Reset to page 1 whenever a filter or sort changes!
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusTab, sortBy, sortOrder]);

    // Apply Filters and Sorting
    const filteredSuppliers = suppliers
        ?.filter((supplier) => {
            const isSupplierActive = supplier.active === 1 || supplier.active === true;
            if (statusTab === 'Active' && !isSupplierActive) return false;
            if (statusTab === 'Inactive' && isSupplierActive) return false;

            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchCompany = supplier.company_name?.toLowerCase().includes(query);
                const matchEmail = supplier.email?.toLowerCase().includes(query);
                const matchPhone = supplier.phone_number?.toLowerCase().includes(query);
                if (!matchCompany && !matchEmail && !matchPhone) return false;
            }
            return true;
        })
        .sort((a, b) => {
            let valA = a[sortBy] || '';
            let valB = b[sortBy] || '';

            valA = valA.toString().toLowerCase();
            valB = valB.toString().toLowerCase();

            if (sortOrder === 'ASC') {
                return valA.localeCompare(valB);
            } else {
                return valB.localeCompare(valA);
            }
        });

    // Calculate Pagination Data
    const totalItems = filteredSuppliers?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the array to only show the current 10 items
    const paginatedSuppliers = filteredSuppliers?.slice(startIndex, endIndex);

    return (
        <div className="flex h-full flex-col">
            {/* Top Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wide text-gray-900">
                    Inventory <span className="font-light text-gray-400">|</span> Suppliers
                </h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 rounded-md bg-[#7d6cb6] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6a5b9c]"
                >
                    Add Supplier <span className="text-lg leading-none">+</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="company name / email / phone"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-72 rounded-full border border-gray-200 bg-white py-2 pr-10 pl-4 text-sm text-gray-600 italic shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                        />
                        <svg className="absolute top-2.5 right-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* SORT DROPDOWN CONTAINER */}
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

                    {/* ASC / DESC Toggle */}
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

                {/* Right: Active/Inactive Tabs */}
                <div className="flex rounded-full bg-gray-100 p-1 shadow-inner">
                    <button
                        onClick={() => setStatusTab('Active')}
                        className={`rounded-full px-6 py-1.5 text-sm font-semibold transition-all ${
                            statusTab === 'Active' ? 'bg-[#7d6cb6] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setStatusTab('Inactive')}
                        className={`rounded-full px-6 py-1.5 text-sm font-semibold transition-all ${
                            statusTab === 'Inactive' ? 'bg-[#7d6cb6] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Inactive
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow">
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="sticky top-0 z-10 bg-[#1f6057] text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Company Name</th>
                                <th className="px-6 py-4 font-semibold">Phone Number</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Address</th>
                                <th className="px-6 py-4 text-center font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedSuppliers && paginatedSuppliers.length > 0 ? (
                                paginatedSuppliers.map((supplier) => (
                                    <tr key={supplier.id} className="transition-colors hover:bg-gray-50">
                                        <td className="px-6 py-3 font-medium text-gray-800">{supplier.company_name}</td>
                                        <td className="px-6 py-3 text-gray-600">{supplier.phone_number || '-'}</td>
                                        <td className="px-6 py-3 text-gray-600">{supplier.email || '-'}</td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase ${
                                                    supplier.active
                                                        ? 'border-green-300 bg-green-50 text-green-600'
                                                        : 'border-red-300 bg-red-50 text-red-600'
                                                }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${supplier.active ? 'bg-green-500' : 'bg-red-500'}`}
                                                ></span>
                                                {supplier.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-600 italic">{supplier.address || '-'}</td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                {/* ADDED VIEW BUTTON */}
                                                <button
                                                    onClick={() => openViewModal(supplier)}
                                                    className="font-medium text-blue-500 transition-colors hover:text-blue-700 hover:underline"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(supplier)}
                                                    className="font-medium text-[#7d6cb6] transition-colors hover:text-[#5a4c8c] hover:underline"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                        No suppliers found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls (Footer) */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
                    <div className="flex w-full items-center justify-between">
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

            {/* 4. RENDER MODALS */}
            <AddSupplierModal isOpen={openModal === 'add'} onClose={closeModal} />

            <EditSupplierModal isOpen={openModal === 'edit'} onClose={closeModal} supplier={selectedSupplier} />

            <ViewSupplierModal isOpen={openModal === 'view'} onClose={closeModal} supplier={selectedSupplier} />
        </div>
    );
}

Suppliers.layout = (page) => <AppLayout children={page} />;
export default Suppliers;

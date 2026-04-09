import { useEffect, useState } from 'react';
import AppLayout from '../layouts/AppLayout';

import AddMedicineModal from '../Medicine/AddMedicineModal';
import EditMedicineModal from '../Medicine/EditMedicineModal';
import ViewMedicineModal from '../Medicine/ViewMedicineModal';

function Medicine({ medicines }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusTab, setStatusTab] = useState('Active');
    const [sortOrder, setSortOrder] = useState('ASC');
    const [sortBy, setSortBy] = useState('med_name');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [openModal, setOpenModal] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const openAddModal = () => {
        setOpenModal('add');
    };

    const openEditModal = (med) => {
        setSelectedMedicine(med);
        setOpenModal('edit');
    };

    const openViewModal = (med) => {
        setSelectedMedicine(med);
        setOpenModal('view');
    };

    const closeModal = () => {
        setOpenModal(null);
        setSelectedMedicine(null);
    };

    const sortOptions = [
        { label: 'Medicine Name', value: 'med_name' },
        { label: 'Generic Name', value: 'gen_name' },
        { label: 'Category', value: 'category' },
        { label: 'Formulation', value: 'formulation' },
        { label: 'Strength', value: 'strength' },
        { label: 'Selling Price', value: 'selling_price' },
    ];

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusTab, sortBy, sortOrder]);

    const filteredMedicines = medicines
        ?.filter((med) => {
            const isMedActive = med.status === 1 || med.status === true;
            if (statusTab === 'Active' && !isMedActive) return false;
            if (statusTab === 'Inactive' && isMedActive) return false;

            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchName = med.med_name?.toLowerCase().includes(query);
                const matchGen = med.gen_name?.toLowerCase().includes(query);
                if (!matchName && !matchGen) return false;
            }
            return true;
        })
        .sort((a, b) => {
            let valA = a[sortBy] || '';
            let valB = b[sortBy] || '';

            if (sortBy === 'selling_price') {
                valA = parseFloat(valA) || 0;
                valB = parseFloat(valB) || 0;
                return sortOrder === 'ASC' ? valA - valB : valB - valA;
            }

            valA = valA.toString().toLowerCase();
            valB = valB.toString().toLowerCase();

            if (sortOrder === 'ASC') {
                return valA.localeCompare(valB);
            } else {
                return valB.localeCompare(valA);
            }
        });

    const totalItems = filteredMedicines?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedMedicines = filteredMedicines?.slice(startIndex, endIndex);

    return (
        <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wide text-gray-900">
                    Inventory <span className="font-light text-gray-400">|</span> Medicine
                </h1>

                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 rounded-md bg-[#7d6cb6] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6a5b9c]"
                >
                    Add Medicine <span className="text-lg leading-none">+</span>
                </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="medicine / generic name"
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

            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow">
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="sticky top-0 z-10 bg-[#1f6057] text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Generic Name</th>
                                <th className="px-6 py-4 font-semibold">Formulation</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Selling Price</th>
                                <th className="px-6 py-4 font-semibold">Min Stock</th>
                                <th className="px-6 py-4 font-semibold">Strength</th>
                                <th className="px-6 py-4 text-center font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedMedicines && paginatedMedicines.length > 0 ? (
                                paginatedMedicines.map((med) => (
                                    <tr key={med.id} className="transition-colors hover:bg-gray-50">
                                        <td className="px-6 py-3 font-medium text-gray-800">{med.med_name}</td>
                                        <td className="px-6 py-3 text-gray-600 italic">{med.gen_name || '-'}</td>
                                        <td className="px-6 py-3 text-gray-600">{med.formulation || '-'}</td>
                                        <td className="px-6 py-3 text-gray-600">{med.category}</td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase ${
                                                    med.status
                                                        ? 'border-green-300 bg-green-50 text-green-600'
                                                        : 'border-red-300 bg-red-50 text-red-600'
                                                }`}
                                            >
                                                <span className={`h-1.5 w-1.5 rounded-full ${med.status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {med.status ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-800">
                                            {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(med.selling_price)}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600">{med.min_stock_level}</td>
                                        <td className="px-6 py-3 text-gray-600">{med.strength || '-'}</td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => openViewModal(med)}
                                                    className="font-medium text-[#44a194] transition-colors hover:text-[#1f6057] hover:underline"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(med)}
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
                                    <td colSpan="9" className="px-6 py-10 text-center text-gray-500">
                                        No medicines found matching your criteria.
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

            <AddMedicineModal isOpen={openModal === 'add'} onClose={closeModal} />

            {selectedMedicine && (
                <>
                    <EditMedicineModal isOpen={openModal === 'edit'} onClose={closeModal} medicine={selectedMedicine} />
                    <ViewMedicineModal isOpen={openModal === 'view'} onClose={closeModal} medicine={selectedMedicine} />
                </>
            )}
        </div>
    );
}

Medicine.layout = (page) => <AppLayout children={page} />;
export default Medicine;

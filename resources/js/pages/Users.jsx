import { useEffect, useState } from 'react';
import AppLayout from '../layouts/AppLayout';

// 1. IMPORT MODAL COMPONENTS (Make sure to create these files later!)
import AddUserModal from '../Users/AddUserModal';
import EditUserModal from '../Users/EditUserModal';
import ViewUserModal from '../Users/ViewUserModal';

function Users({ users }) {
    // Existing States
    const [searchQuery, setSearchQuery] = useState('');
    const [statusTab, setStatusTab] = useState('Active');
    const [sortOrder, setSortOrder] = useState('ASC');
    const [sortBy, setSortBy] = useState('full_name');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 2. MODAL STATES
    const [openModal, setOpenModal] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // 3. MODAL HANDLERS
    const openAddModal = () => {
        setOpenModal('add');
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setOpenModal('edit');
    };

    const openViewModal = (user) => {
        setSelectedUser(user);
        setOpenModal('view');
    };

    const closeModal = () => {
        setOpenModal(null);
        setSelectedUser(null);
    };

    const sortOptions = [
        { label: 'Full Name', value: 'full_name' },
        { label: 'Email', value: 'email' },
        { label: 'Joined Date', value: 'joined_date' },
        { label: 'Last Login', value: 'last_login' },
    ];

    // Helper to format dates like "29 March 2026"
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Reset to page 1 whenever a filter or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusTab, sortBy, sortOrder]);

    // Apply Filters and Sorting
    const filteredUsers = users
        ?.filter((user) => {
            const isUserActive = user.status === 1 || user.status === true;
            if (statusTab === 'Active' && !isUserActive) return false;
            if (statusTab === 'Inactive' && isUserActive) return false;

            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
                const matchName = fullName.includes(query);
                const matchEmail = user.email?.toLowerCase().includes(query);

                if (!matchName && !matchEmail) return false;
            }
            return true;
        })
        .sort((a, b) => {
            let valA, valB;

            // Handle custom 'full_name' sorting
            if (sortBy === 'full_name') {
                valA = `${a.first_name} ${a.last_name}`.toLowerCase();
                valB = `${b.first_name} ${b.last_name}`.toLowerCase();
            } else if (sortBy === 'last_login') {
                // Handle case differences from migration vs model
                valA = a.last_login || a.Last_login || '';
                valB = b.last_login || b.Last_login || '';
            } else {
                valA = a[sortBy] || '';
                valB = b[sortBy] || '';
            }

            // Date sorting logic
            if (sortBy === 'joined_date' || sortBy === 'last_login') {
                const dateA = new Date(valA).getTime() || 0;
                const dateB = new Date(valB).getTime() || 0;
                return sortOrder === 'ASC' ? dateA - dateB : dateB - dateA;
            }

            // String sorting logic
            valA = valA.toString().toLowerCase();
            valB = valB.toString().toLowerCase();

            if (sortOrder === 'ASC') {
                return valA.localeCompare(valB);
            } else {
                return valB.localeCompare(valA);
            }
        });

    // Calculate Pagination Data
    const totalItems = filteredUsers?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the array to only show the current 10 items
    const paginatedUsers = filteredUsers?.slice(startIndex, endIndex);

    return (
        <div className="flex h-full flex-col">
            {/* Top Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wide text-gray-900">
                    Users <span className="font-light text-gray-400">|</span> Pharmacists
                </h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 rounded-md bg-[#7d6cb6] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6a5b9c]"
                >
                    Add User <span className="text-lg leading-none">+</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="name / email"
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
                                <th className="px-6 py-4 font-semibold">Full Name</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Joined Date</th>
                                <th className="px-6 py-4 font-semibold">Last Login</th>
                                <th className="px-6 py-4 text-center font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedUsers && paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <tr key={user.id} className="transition-colors hover:bg-gray-50">
                                        <td className="px-6 py-3 font-medium text-gray-800 italic">
                                            {user.first_name} {user.last_name}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600 italic">{user.email}</td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase ${
                                                    user.status
                                                        ? 'border-green-300 bg-green-50 text-green-600'
                                                        : 'border-gray-300 bg-gray-50 text-gray-600'
                                                }`}
                                            >
                                                <span className={`h-1.5 w-1.5 rounded-full ${user.status ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                                {user.status ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-600 italic">{formatDate(user.joined_date)}</td>
                                        <td className="px-6 py-3 text-gray-600 italic">{formatDate(user.last_login || user.Last_login)}</td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => openViewModal(user)}
                                                    className="font-medium text-[#44a194] transition-colors hover:text-[#1f6057] hover:underline"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="rounded-md bg-[#5a4c8c] px-3 py-1 font-medium text-white transition-colors hover:bg-[#4a3e75]"
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
                                        No users found matching your criteria.
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

            {/* 4. RENDER MODALS */}
            <AddUserModal isOpen={openModal === 'add'} onClose={closeModal} />

            {selectedUser && (
                <>
                    <EditUserModal isOpen={openModal === 'edit'} onClose={closeModal} user={selectedUser} />
                    <ViewUserModal isOpen={openModal === 'view'} onClose={closeModal} user={selectedUser} />
                </>
            )}
        </div>
    );
}

Users.layout = (page) => <AppLayout children={page} />;
export default Users;

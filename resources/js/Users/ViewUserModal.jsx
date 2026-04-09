export default function ViewUserModal({ isOpen, onClose, user }) {
    if (!isOpen || !user) return null;

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="fixed inset-y-0 right-0 z-50 flex w-105 transform flex-col bg-[#f5f7f9] p-8 shadow-2xl transition-transform duration-300 ease-in-out">
                <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-2">
                    <h2 className="text-xl font-bold tracking-wide text-gray-900">View User</h2>
                    <button onClick={onClose} className="text-2xl font-bold text-gray-500 transition hover:text-gray-800">
                        &times;
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    <h3 className="mb-4 text-sm font-medium text-gray-700">User Details</h3>

                    <div className="mb-6 space-y-3">
                        <input
                            type="text"
                            readOnly
                            value={user.email}
                            className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 p-2.5 text-sm text-gray-700 shadow-sm outline-none"
                        />
                        <input
                            type="text"
                            readOnly
                            value={user.first_name}
                            className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 p-2.5 text-sm text-gray-700 shadow-sm outline-none"
                        />
                        <input
                            type="text"
                            readOnly
                            value={user.last_name}
                            className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 p-2.5 text-sm text-gray-700 shadow-sm outline-none"
                        />
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <label className="w-1/3 text-sm text-gray-600">Status :</label>
                        <div className="w-2/3">
                            <span
                                className={`inline-flex w-full rounded-md border px-3 py-2 text-sm font-medium shadow-sm ${user.status ? 'border-green-300 bg-[#eafceb] text-green-700' : 'border-gray-300 bg-gray-100 text-gray-600'}`}
                            >
                                {user.status ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <label className="w-1/3 text-sm text-gray-600">Joined Date :</label>
                        <input
                            type="text"
                            readOnly
                            value={formatDate(user.joined_date)}
                            className="w-2/3 cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 p-2.5 text-sm text-gray-700 shadow-sm outline-none"
                        />
                    </div>

                    <div className="mb-8 flex items-center justify-between">
                        <label className="w-1/3 text-sm text-gray-600">Last Login :</label>
                        <input
                            type="text"
                            readOnly
                            value={formatDate(user.last_login || user.Last_login)}
                            className="w-2/3 cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 p-2.5 text-sm text-gray-700 shadow-sm outline-none"
                        />
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full bg-gray-300 px-8 py-2.5 text-sm font-semibold text-gray-700 shadow-md transition hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}

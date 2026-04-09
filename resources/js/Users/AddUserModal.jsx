import { useForm } from '@inertiajs/react';

export default function AddUserModal({ isOpen, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        status: 1,
        joined_date: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/users', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="fixed inset-y-0 right-0 z-50 flex w-105 transform flex-col bg-[#f5f7f9] p-8 shadow-2xl transition-transform duration-300 ease-in-out">
                <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-2">
                    <h2 className="text-xl font-bold tracking-wide text-gray-900">Create New User</h2>
                    <button onClick={onClose} className="text-2xl font-bold text-gray-500 transition hover:text-gray-800">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2">
                    <h3 className="mb-4 text-sm font-medium text-gray-700">Default Fields</h3>

                    <div className="mb-6 space-y-3">
                        <div>
                            <input
                                type="email"
                                placeholder="Email*"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-md border border-[#eab8b8] bg-white p-2.5 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                required
                            />
                            {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="First Name*"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full rounded-md border border-[#eab8b8] bg-white p-2.5 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                required
                            />
                            {errors.first_name && <div className="mt-1 text-xs text-red-500">{errors.first_name}</div>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Last Name*"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full rounded-md border border-[#eab8b8] bg-white p-2.5 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                required
                            />
                            {errors.last_name && <div className="mt-1 text-xs text-red-500">{errors.last_name}</div>}
                        </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <label className="w-1/3 text-sm text-gray-600">Password* :</label>
                        <div className="w-2/3">
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full rounded-md border border-[#eab8b8] bg-white p-2.5 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                required
                            />
                            {errors.password && <div className="mt-1 text-xs text-red-500">{errors.password}</div>}
                        </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <label className="w-1/3 text-sm text-gray-600">Status :</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', Number(e.target.value))}
                            className="w-2/3 rounded-md border border-green-300 bg-[#eafceb] p-2.5 text-sm font-medium text-green-700 shadow-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                    </div>

                    <div className="mb-8 flex items-center justify-between">
                        <label className="w-1/3 text-sm text-gray-600">Joined Date * :</label>
                        <div className="w-2/3">
                            <input
                                type="date"
                                value={data.joined_date}
                                onChange={(e) => setData('joined_date', e.target.value)}
                                className="w-full rounded-md border border-[#eab8b8] bg-white p-2.5 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                required
                            />
                            {errors.joined_date && <div className="mt-1 text-xs text-red-500">{errors.joined_date}</div>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-full bg-[#364fc7] px-8 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#2b3fa3] disabled:opacity-50"
                    >
                        {processing ? 'Adding...' : 'Add User'}
                    </button>
                </form>
            </div>
        </>
    );
}

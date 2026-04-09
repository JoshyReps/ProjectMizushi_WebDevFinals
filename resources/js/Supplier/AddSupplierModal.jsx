import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function AddSupplierModal({ isOpen, onClose }) {
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        company_name: '',
        phone_number: '',
        email: '',
        address: '',
        active: true,
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/inventory/suppliers', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="animate-in slide-in-from-right flex h-full w-112.5 flex-col bg-[#f0f4f8] shadow-2xl transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
                    <h2 className="text-xl font-bold tracking-wide text-gray-900">Create New Supplier</h2>
                    <button onClick={onClose} className="text-3xl font-light text-gray-500 transition-colors hover:text-gray-800">
                        &times;
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 text-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6 text-sm font-semibold tracking-wider text-gray-800">Default Fields</div>

                        <div className="space-y-5">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">
                                    <label className="w-1/3 text-sm text-gray-600">Company Name* :</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            required
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            className="w-full rounded-md border border-gray-200 bg-white py-2 pr-3 pl-8 text-sm shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                        />
                                    </div>
                                </div>
                                {errors.company_name && <span className="w-2/3 self-end text-xs text-red-500">{errors.company_name}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">
                                    <label className="w-1/3 text-sm text-gray-600">Phone Number* :</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            required
                                            value={data.phone_number}
                                            onChange={(e) => setData('phone_number', e.target.value)}
                                            className="w-full rounded-md border border-gray-200 bg-white py-2 pr-3 pl-8 text-sm shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                        />
                                    </div>
                                </div>
                                {errors.phone_number && <span className="w-2/3 self-end text-xs text-red-500">{errors.phone_number}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">
                                    <label className="w-1/3 text-sm text-gray-600">Email* :</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-md border border-gray-200 bg-white py-2 pr-3 pl-8 text-sm shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                        />
                                    </div>
                                </div>
                                {errors.email && <span className="w-2/3 self-end text-xs text-red-500">{errors.email}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">
                                    <label className="w-1/3 text-sm text-gray-600">Address* :</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            required
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="w-full rounded-md border border-gray-200 bg-white py-2 pr-3 pl-8 text-sm shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                        />
                                    </div>
                                </div>
                                {errors.address && <span className="w-2/3 self-end text-xs text-red-500">{errors.address}</span>}
                            </div>

                            <div className="flex items-center gap-4 pt-2">
                                <label className="w-1/3 text-sm text-gray-600">Status :</label>
                                <div className="flex-1">
                                    <button
                                        type="button"
                                        onClick={() => setData('active', !data.active)}
                                        className={`flex w-32 items-center justify-center rounded-sm border py-2 text-sm font-medium transition-colors ${
                                            data.active ? 'border-green-400 bg-green-100 text-green-700' : 'border-red-400 bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {data.active ? 'Active' : 'Inactive'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-5">
                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-5 w-full rounded-full bg-[#3b5bdb] px-10 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Add Supplier'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

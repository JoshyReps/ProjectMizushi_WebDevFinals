import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function EditSupplierModal({ isOpen, onClose, supplier }) {
    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        errors,
        clearErrors,
    } = useForm({
        id: '',
        company_name: '',
        phone_number: '',
        email: '',
        address: '',
        active: true,
    });

    useEffect(() => {
        if (supplier && isOpen) {
            setData({
                id: supplier.id,
                company_name: supplier.company_name || '',
                phone_number: supplier.phone_number || '',
                email: supplier.email || '',
                address: supplier.address || '',
                active: supplier.active === 1 || supplier.active === true,
            });
            clearErrors();
        }
    }, [supplier, isOpen]);

    if (!isOpen || !supplier) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/inventory/suppliers/${data.id}`, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to permanently delete this supplier? This action cannot be undone.')) {
            destroy(`/inventory/suppliers/${data.id}`, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="animate-in slide-in-from-right flex h-full w-112.5 flex-col bg-[#f0f4f8] shadow-2xl transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
                    <h2 className="text-xl font-bold tracking-wide text-gray-900">Edit Supplier</h2>
                    <button onClick={onClose} className="text-3xl font-light text-gray-500 transition-colors hover:text-gray-800">
                        &times;
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 text-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6 text-sm font-semibold tracking-wider text-gray-800">Edit Fields</div>

                        <div className="space-y-5">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">
                                    <label className="w-1/3 text-sm text-gray-600">Company Name* :</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        className="w-full flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                    />
                                </div>
                                {errors.company_name && <span className="w-2/3 self-end text-xs text-red-500">{errors.company_name}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">
                                    <label className="w-1/3 text-sm text-gray-600">Phone Number* :</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        className="w-full flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                    />
                                </div>
                                {errors.phone_number && <span className="w-2/3 self-end text-xs text-red-500">{errors.phone_number}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">
                                    <label className="w-1/3 text-sm text-gray-600">Email* :</label>
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                    />
                                </div>
                                {errors.email && <span className="w-2/3 self-end text-xs text-red-500">{errors.email}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-4">
                                    <label className="w-1/3 text-sm text-gray-600">Address* :</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                    />
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

                        <div className="mt-12 flex flex-col items-center gap-3 px-8">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-full bg-[#3b5bdb] px-10 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>

                            <button
                                onClick={handleDelete}
                                type="button"
                                disabled={processing}
                                className="w-full rounded-full border border-red-200 bg-white px-10 py-2.5 text-sm font-semibold text-red-500 shadow-sm transition hover:border-red-500 hover:bg-red-50 disabled:opacity-50"
                            >
                                Hard Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

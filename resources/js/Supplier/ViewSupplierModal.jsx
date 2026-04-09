export default function ViewSupplierModal({ isOpen, onClose, supplier }) {
    if (!isOpen || !supplier) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="animate-in slide-in-from-right flex h-full w-112.5 flex-col bg-[#f0f4f8] shadow-2xl transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
                    <h2 className="text-xl font-bold tracking-wide text-gray-900">Viewing Supplier</h2>
                    <button onClick={onClose} className="text-3xl font-light text-gray-500 transition-colors hover:text-gray-800">
                        &times;
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 text-gray-700">
                    <div className="mb-6 text-sm font-semibold tracking-wider text-gray-800">Supplier Details</div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <label className="w-1/3 text-sm text-gray-600">Company Name :</label>
                            <div className="flex-1 border-b border-gray-300 pb-1 text-sm font-medium text-gray-800">
                                {supplier.company_name || '-'}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-1/3 text-sm text-gray-600">Phone Number :</label>
                            <div className="flex-1 border-b border-gray-300 pb-1 text-sm font-medium text-gray-800">
                                {supplier.phone_number || '-'}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-1/3 text-sm text-gray-600">Email :</label>
                            <div className="flex-1 border-b border-gray-300 pb-1 text-sm font-medium text-gray-800">{supplier.email || '-'}</div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-1/3 text-sm text-gray-600">Address :</label>
                            <div className="flex-1 border-b border-gray-300 pb-1 text-sm font-medium text-gray-800">{supplier.address || '-'}</div>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <label className="w-1/3 text-sm text-gray-600">Status :</label>
                            <div className="flex-1">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase ${
                                        supplier.active ? 'border-green-300 bg-green-100 text-green-700' : 'border-red-300 bg-red-100 text-red-700'
                                    }`}
                                >
                                    <span className={`h-1.5 w-1.5 rounded-full ${supplier.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {supplier.active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

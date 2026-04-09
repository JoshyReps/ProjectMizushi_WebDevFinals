const ViewMedicineModal = ({ isOpen, onClose, medicine }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount || 0);
    };

    return (
        <>
            {isOpen && <div className="fixed inset-0 z-40 bg-gray-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>}

            <div
                className={`fixed top-0 right-0 z-50 h-full w-100 bg-[#f0f4f8] shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                        <h2 className="text-xl font-bold text-gray-800">Viewing Medicine</h2>
                        <button onClick={onClose} className="text-xl font-bold text-gray-400 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <div className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-600">Default Fields</h3>

                            <div className="space-y-1">
                                <span className="block text-sm text-gray-500">Medicine Name :</span>
                                <span className="block text-base font-semibold text-gray-900">{medicine?.med_name || '-'}</span>
                            </div>

                            <div className="space-y-1">
                                <span className="block text-sm text-gray-500">Generic Name :</span>
                                <span className="block text-base font-semibold text-gray-900">{medicine?.gen_name || '-'}</span>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 space-y-1">
                                    <span className="block text-sm text-gray-500">Category :</span>
                                    <span className="block text-base font-semibold text-gray-900">{medicine?.category || '-'}</span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <span className="block text-sm text-gray-500">Selling Unit :</span>
                                    <span className="block text-base font-semibold text-gray-900">{medicine?.selling_unit || '-'}</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 space-y-1">
                                    <span className="block text-sm text-gray-500">Selling Price :</span>
                                    <span className="block text-base font-semibold text-gray-900">{formatCurrency(medicine?.selling_price)}</span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <span className="block text-sm text-gray-500">Min Stock Level :</span>
                                    <span className="block text-base font-semibold text-gray-900">{medicine?.min_stock_level || '-'}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="block text-sm text-gray-500">Unit Size :</span>
                                <span className="block text-base font-semibold text-gray-900">{medicine?.net_content || '-'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-600">Status :</span>
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase ${
                                    medicine?.status ? 'border-green-300 bg-green-50 text-green-600' : 'border-red-300 bg-red-50 text-red-600'
                                }`}
                            >
                                <span className={`h-1.5 w-1.5 rounded-full ${medicine?.status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                {medicine?.status ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-600">Extra Fields</h3>

                            <div className="flex items-center gap-3">
                                <span className="w-24 text-sm text-gray-500">Formulation :</span>
                                <span className="flex-1 text-base font-semibold text-gray-900">{medicine?.formulation || '-'}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-24 text-sm text-gray-500">Strength :</span>
                                <span className="flex-1 text-base font-semibold text-gray-900">{medicine?.strength || '-'}</span>
                            </div>

                            <div className="space-y-1 pt-2">
                                <span className="block text-sm text-gray-500">Description :</span>
                                <div className="min-h-20 rounded-md border border-gray-100 bg-white p-3">
                                    <span className="block text-sm whitespace-pre-wrap text-gray-800">
                                        {medicine?.description || <span className="text-gray-400 italic">No description provided.</span>}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewMedicineModal;

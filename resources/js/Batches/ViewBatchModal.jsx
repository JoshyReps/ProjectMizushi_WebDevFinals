const ViewBatchModal = ({ isOpen, onClose, batch }) => {
    if (!isOpen || !batch) return null;

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount || 0);
    };

    return (
        <>
            <div className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="fixed top-0 right-0 z-50 flex h-full w-112.5 transform flex-col bg-[#F4F7F9] shadow-2xl transition-transform duration-300 ease-in-out">
                <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">View Batch Details</h2>
                    <button type="button" onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">
                        ✕
                    </button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        <span className="text-sm font-medium text-gray-500">Current Status</span>
                        <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${batch.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {batch.status || 'Unknown'}
                        </span>
                    </div>

                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col border-b border-gray-100 pb-3">
                            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Batch Number</span>
                            <span className="mt-1 text-base font-medium text-gray-900">{batch.batch_number}</span>
                        </div>

                        <div className="flex flex-col border-b border-gray-100 pb-3">
                            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Medicine</span>
                            <span className="mt-1 text-base font-medium text-gray-900">{batch.medicine?.med_name || '-'}</span>
                        </div>

                        <div className="flex flex-col border-b border-gray-100 pb-3">
                            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Supplier</span>
                            <span className="mt-1 text-base font-medium text-gray-900">{batch.supplier?.company_name || '-'}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-3">
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Buying Price</span>
                                <span className="mt-1 text-base font-medium text-gray-900">{formatCurrency(batch.buying_price)}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Quantity</span>
                                <span className="mt-1 text-base font-medium text-gray-900">{batch.quantity} Units</span>
                            </div>
                        </div>

                        <div className="flex flex-col pt-1">
                            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Expiry Date</span>
                            <span className="mt-1 text-base font-medium text-gray-900">{formatDate(batch.expiry_date)}</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 bg-white px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-md bg-[#1f6057] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#164740]"
                    >
                        Close Window
                    </button>
                </div>
            </div>
        </>
    );
};

export default ViewBatchModal;

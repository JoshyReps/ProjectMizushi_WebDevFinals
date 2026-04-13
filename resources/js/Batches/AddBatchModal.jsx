import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const AddBatchModal = ({ isOpen, onClose, onSuccess, medicines, suppliers }) => {
    const [batchNumber, setBatchNumber] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [buyingPrice, setBuyingPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState('Healthy');
    const [expiryDate, setExpiryDate] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!expiryDate || quantity === '') {
            setStatus('Healthy');
            return;
        }

        const qty = parseInt(quantity, 10);
        const today = new Date();
        const expDate = new Date(expiryDate);

        today.setHours(0, 0, 0, 0);
        expDate.setHours(0, 0, 0, 0);

        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const selectedMedObj = medicines?.find((m) => String(m.id) === String(selectedMedicine));
        const REORDER_LEVEL = selectedMedObj?.min_stock_level || 20;

        const isExpiring = diffDays <= 60;
        const isLowStock = qty <= REORDER_LEVEL;

        let calculatedStatus = 'Healthy';

        if (qty <= 0) {
            calculatedStatus = 'Archive';
        } else if (diffDays < 0) {
            calculatedStatus = 'Expired';
        } else if (isExpiring && isLowStock) {
            calculatedStatus = 'Critical';
        } else if (isExpiring) {
            calculatedStatus = 'Expiring';
        } else if (isLowStock) {
            calculatedStatus = 'Low Stock';
        }

        setStatus(calculatedStatus);
    }, [quantity, expiryDate, selectedMedicine, medicines]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newBatchData = {
            batch_number: batchNumber,
            med_id: selectedMedicine,
            supplier_id: selectedSupplier,
            buying_price: buyingPrice,
            quantity: quantity,
            status: status,
            expiry_date: expiryDate,
        };

        router.post('/inventory/batches', newBatchData, {
            onSuccess: () => {
                setBatchNumber('');
                setSelectedMedicine('');
                setSelectedSupplier('');
                setBuyingPrice('');
                setQuantity('');
                setStatus('Healthy');
                setExpiryDate('');

                if (onSuccess) onSuccess();
                onClose();
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                alert('Failed to save the batch. Check console for validation errors.');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="fixed top-0 right-0 z-50 h-full w-112.5 transform bg-[#F4F7F9] p-0 shadow-2xl transition-transform duration-300 ease-in-out">
                <form onSubmit={handleSubmit} className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                        <h2 className="text-xl font-bold tracking-tight text-gray-900">Create New Batch</h2>
                        <button type="button" onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">
                            ✕
                        </button>
                    </div>

                    <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                        <h3 className="text-base font-semibold text-gray-700">Default Fields</h3>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-600">Batch Number* :</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={batchNumber}
                                        onChange={(e) => setBatchNumber(e.target.value)}
                                        placeholder="E.g., AMX-P01"
                                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 shadow-inner outline-none focus:border-[#6D5DD3] focus:ring-2 focus:ring-[#6D5DD3]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-600">Medicine* :</label>
                                <div className="relative">
                                    <select
                                        required
                                        value={selectedMedicine}
                                        onChange={(e) => setSelectedMedicine(e.target.value)}
                                        className="w-full appearance-none rounded-md border border-gray-200 py-2.5 pr-10 pl-4 shadow-inner outline-none focus:border-[#6D5DD3] focus:ring-2 focus:ring-[#6D5DD3]"
                                    >
                                        <option value="" disabled>
                                            Select Medicine
                                        </option>
                                        {medicines
                                            ?.filter((med) => med.status)
                                            .map((med) => (
                                                <option key={med.id} value={med.id}>
                                                    {med.med_name}
                                                </option>
                                            ))}
                                    </select>
                                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">▼</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-600">Supplier* :</label>
                                <div className="relative">
                                    <select
                                        required
                                        value={selectedSupplier}
                                        onChange={(e) => setSelectedSupplier(e.target.value)}
                                        className="w-full appearance-none rounded-md border border-gray-200 py-2.5 pr-10 pl-4 shadow-inner outline-none focus:border-[#6D5DD3] focus:ring-2 focus:ring-[#6D5DD3]"
                                    >
                                        <option value="" disabled>
                                            Select Supplier
                                        </option>
                                        {suppliers
                                            ?.filter((sup) => sup.active)
                                            .map((sup) => (
                                                <option key={sup.id} value={sup.id}>
                                                    {sup.company_name}
                                                </option>
                                            ))}
                                    </select>
                                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">▼</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-600">Buying Price* :</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={buyingPrice}
                                        onChange={(e) => setBuyingPrice(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 shadow-inner outline-none focus:border-[#6D5DD3] focus:ring-2 focus:ring-[#6D5DD3]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-600">Quantity* :</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        required
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="0"
                                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 shadow-inner outline-none focus:border-[#6D5DD3] focus:ring-2 focus:ring-[#6D5DD3]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-600">Status :</label>
                                <div className="relative">
                                    <select
                                        disabled
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full appearance-none rounded-md border border-gray-200 py-2.5 pr-10 pl-4 shadow-inner outline-none focus:border-[#6D5DD3] focus:ring-2 focus:ring-[#6D5DD3]"
                                    >
                                        <option value="Healthy">Healthy</option>
                                        <option value="Low Stock">Low Stock</option>
                                        <option value="Critical">Critical</option>
                                        <option value="Expiring">Expiring</option>
                                        <option value="Expired">Expired</option>
                                        <option value="Archive">Archive</option>
                                    </select>
                                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">▼</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-600">Expiration Date * :</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 shadow-inner outline-none focus:border-[#6D5DD3] focus:ring-2 focus:ring-[#6D5DD3]"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-full bg-blue-600 bg-linear-to-b px-12 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Batch'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBatchModal;

import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const EditBatchModal = ({ isOpen, onClose, onSuccess, batch, medicines, suppliers }) => {
    const [batchNumber, setBatchNumber] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [buyingPrice, setBuyingPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState('Healthy');
    const [expiryDate, setExpiryDate] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && batch) {
            setBatchNumber(batch.batch_number || '');
            setSelectedMedicine(batch.med_id || '');
            setSelectedSupplier(batch.supplier_id || '');
            setBuyingPrice(batch.buying_price || '');
            setQuantity(batch.quantity !== null && batch.quantity !== undefined ? String(batch.quantity) : '');
            setStatus(batch.status || 'Healthy');

            let formattedDate = '';
            if (batch.expiry_date) {
                formattedDate = batch.expiry_date.split('T')[0];
            }
            setExpiryDate(formattedDate);
        }
    }, [isOpen, batch]);

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

    if (!isOpen || !batch) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const updatedBatchData = {
            batch_number: batchNumber,
            med_id: selectedMedicine,
            supplier_id: selectedSupplier,
            buying_price: buyingPrice,
            quantity: quantity,
            status: status,
            expiry_date: expiryDate,
        };

        router.put(`/inventory/batches/${batch.batch_id}`, updatedBatchData, {
            onSuccess: () => {
                if (onSuccess) onSuccess();
                onClose();
            },
            onError: (errors) => console.error('Validation errors:', errors),
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleArchive = () => {
        if (!window.confirm('Are you sure you want to archive this batch? It will be hidden from the POS.')) return;

        setIsSubmitting(true);
        const updatedBatchData = {
            batch_number: batchNumber,
            med_id: selectedMedicine,
            supplier_id: selectedSupplier,
            buying_price: buyingPrice,
            quantity: 0,
            status: 'Archive',
            expiry_date: expiryDate,
        };

        router.put(`/inventory/batches/${batch.batch_id}`, updatedBatchData, {
            onSuccess: () => {
                if (onSuccess) onSuccess();
                onClose();
            },
            onError: (errors) => console.error('Validation errors:', errors),
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="fixed top-0 right-0 z-50 flex h-full w-112.5 transform flex-col bg-[#F4F7F9] shadow-2xl transition-transform duration-300 ease-in-out">
                <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">Edit Batch</h2>
                    <button type="button" onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <form id="editBatchForm" onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Batch Number* :</label>
                            <input
                                type="text"
                                required
                                value={batchNumber}
                                onChange={(e) => setBatchNumber(e.target.value)}
                                className="w-full rounded-md border border-gray-200 px-4 py-2.5 shadow-inner outline-none focus:border-[#7d6cb6] focus:ring-2 focus:ring-[#7d6cb6]"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Medicine* :</label>
                            <div className="relative">
                                <select
                                    required
                                    value={selectedMedicine}
                                    onChange={(e) => setSelectedMedicine(e.target.value)}
                                    className="w-full appearance-none rounded-md border border-gray-200 px-4 py-2.5 shadow-inner outline-none focus:border-[#7d6cb6] focus:ring-2 focus:ring-[#7d6cb6]"
                                >
                                    <option value="" disabled>
                                        Select Medicine
                                    </option>
                                    {medicines
                                        // Filter only active OR the currently selected one
                                        ?.filter((med) => med.status || med.id === batch?.med_id)
                                        .map((med) => (
                                            <option key={med.id} value={med.id}>
                                                {/* If it's the currently selected one but inactive, append (Inactive) so user knows */}
                                                {med.med_name} {!med.status ? '(Inactive)' : ''}
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
                                    className="w-full appearance-none rounded-md border border-gray-200 px-4 py-2.5 shadow-inner outline-none focus:border-[#7d6cb6] focus:ring-2 focus:ring-[#7d6cb6]"
                                >
                                    <option value="" disabled>
                                        Select Supplier
                                    </option>
                                    {suppliers
                                        // Filter only active OR the currently selected one
                                        ?.filter((sup) => sup.active || sup.id === batch?.supplier_id)
                                        .map((sup) => (
                                            <option key={sup.id} value={sup.id}>
                                                {/* Same logic for suppliers */}
                                                {sup.company_name} {!sup.active ? '(Inactive)' : ''}
                                            </option>
                                        ))}
                                </select>
                                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">▼</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Buying Price* :</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={buyingPrice}
                                onChange={(e) => setBuyingPrice(e.target.value)}
                                className="w-full rounded-md border border-gray-200 px-4 py-2.5 shadow-inner outline-none focus:border-[#7d6cb6] focus:ring-2 focus:ring-[#7d6cb6]"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Quantity* :</label>
                            <input
                                type="number"
                                required
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full rounded-md border border-gray-200 px-4 py-2.5 shadow-inner outline-none focus:border-[#7d6cb6] focus:ring-2 focus:ring-[#7d6cb6]"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Expiry Date* :</label>
                            <input
                                type="date"
                                required
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-full rounded-md border border-gray-200 px-4 py-2.5 shadow-inner outline-none focus:border-[#7d6cb6] focus:ring-2 focus:ring-[#7d6cb6]"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-600">Status :</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={status}
                                    disabled
                                    className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 font-medium text-gray-600 shadow-inner outline-none"
                                />
                                <span className="text-xs whitespace-nowrap text-gray-400 italic">*Generated Automatically*</span>
                            </div>
                        </div>
                    </form>

                    <div className="mt-5 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleArchive}
                            disabled={isSubmitting || status === 'Archive'}
                            className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Archive Batch
                        </button>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                form="editBatchForm"
                                disabled={isSubmitting}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Batch'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditBatchModal;

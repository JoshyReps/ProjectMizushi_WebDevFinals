import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

const EditMedicineModal = ({ isOpen, onClose, medicine }) => {
    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        id: '',
        med_name: '',
        gen_name: '',
        category: '',
        selling_unit: 'Piece',
        selling_price: '',
        min_stock_level: 10,
        net_content: '',
        status: true,
        formulation: '',
        strength: '',
        description: '',
        image_url: '',
    });

    useEffect(() => {
        if (medicine && isOpen) {
            setData({
                id: medicine.id,
                med_name: medicine.med_name || '',
                gen_name: medicine.gen_name || '',
                category: medicine.category || '',
                selling_unit: medicine.selling_unit || 'Piece',
                selling_price: medicine.selling_price || '',
                min_stock_level: medicine.min_stock_level || 10,
                net_content: medicine.net_content || '',
                status: medicine.status === 1 || medicine.status === true,
                formulation: medicine.formulation || '',
                strength: medicine.strength || '',
                description: medicine.description || '',
                image_url: medicine.image_url || '',
            });
        }
    }, [medicine, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/inventory/medicine/${data.id}`, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to permanently delete this medicine?')) {
            destroy(`/inventory/medicine/${data.id}`, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    return (
        <>
            {isOpen && <div className="fixed inset-0 z-40 bg-gray-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>}

            <div
                className={`fixed top-0 right-0 z-50 h-full w-100 bg-[#f0f4f8] shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                        <h2 className="text-xl font-bold text-gray-800">Edit Medicine</h2>
                        <button onClick={onClose} className="text-xl font-bold text-gray-400 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <h3 className="mb-3 text-sm font-medium text-gray-600">Default Fields</h3>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Medicine Name*"
                                        required
                                        value={data.med_name}
                                        onChange={(e) => setData('med_name', e.target.value)}
                                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                    />
                                    {errors.med_name && <div className="text-xs text-red-500">{errors.med_name}</div>}

                                    <input
                                        type="text"
                                        placeholder="Generic Name*"
                                        required
                                        value={data.gen_name}
                                        onChange={(e) => setData('gen_name', e.target.value)}
                                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                    />
                                    {errors.gen_name && <div className="text-xs text-red-500">{errors.gen_name}</div>}

                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <label className="mb-1 block text-xs text-gray-500">Category* :</label>

                                            <input
                                                type="text"
                                                placeholder="e.g. Vitamins"
                                                required
                                                value={data.category}
                                                onChange={(e) => setData('category', e.target.value)}
                                                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                            />
                                            {errors.category && <div className="text-xs text-red-500">{errors.category}</div>}
                                        </div>
                                        <div className="flex-1">
                                            <label className="mb-1 block text-xs text-gray-500">Selling Unit*:</label>
                                            <select
                                                value={data.selling_unit}
                                                onChange={(e) => setData('selling_unit', e.target.value)}
                                                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                            >
                                                <option value="Piece">Piece</option>
                                                <option value="Bottle">Bottle</option>
                                                <option value="Tube">Tube</option>
                                                <option value="Sachet">Sachet</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <label className="mb-1 block text-xs text-gray-500">Selling Price* :</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                required
                                                value={data.selling_price}
                                                onChange={(e) => setData('selling_price', e.target.value)}
                                                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                            />
                                            {errors.selling_price && <div className="text-xs text-red-500">{errors.selling_price}</div>}
                                        </div>
                                        <div className="flex-1">
                                            <label className="mb-1 block text-xs text-gray-500">Min Stock Level*:</label>
                                            <input
                                                type="number"
                                                required
                                                value={data.min_stock_level}
                                                onChange={(e) => setData('min_stock_level', e.target.value)}
                                                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                            />
                                            {errors.min_stock_level && <div className="text-xs text-red-500">{errors.min_stock_level}</div>}
                                        </div>
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Unit Size"
                                        value={data.net_content}
                                        onChange={(e) => setData('net_content', e.target.value)}
                                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-600">Status :</span>
                                <button
                                    type="button"
                                    onClick={() => setData('status', !data.status)}
                                    className={`flex w-32 items-center justify-center rounded-sm border py-2 text-sm font-medium transition-colors ${
                                        data.status ? 'border-green-400 bg-green-100 text-green-700' : 'border-red-400 bg-red-100 text-red-700'
                                    }`}
                                >
                                    {data.status ? 'Active' : 'Inactive'}
                                </button>
                            </div>

                            <div>
                                <h3 className="mb-3 text-sm font-medium text-gray-600">Extra Fields</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="w-24 text-sm text-gray-500">Formulation :</span>
                                        <input
                                            type="text"
                                            placeholder="Capsule"
                                            value={data.formulation}
                                            onChange={(e) => setData('formulation', e.target.value)}
                                            className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-24 text-sm text-gray-500">Strength :</span>
                                        <input
                                            type="text"
                                            placeholder="500mg"
                                            value={data.strength}
                                            onChange={(e) => setData('strength', e.target.value)}
                                            className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                        />
                                    </div>

                                    <div className="mt-2 flex flex-col gap-1">
                                        <label className="text-sm text-gray-500">Image URL :</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com/image.jpg"
                                            value={data.image_url}
                                            onChange={(e) => setData('image_url', e.target.value)}
                                            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                        />
                                        {errors.image_url && <div className="text-xs text-red-500">{errors.image_url}</div>}
                                    </div>

                                    <div className="mt-2 flex flex-col gap-1">
                                        <label className="text-sm text-gray-500">Description :</label>
                                        <textarea
                                            rows="3"
                                            placeholder="Enter extra details, warnings, or usage instructions..."
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#7d6cb6] focus:ring-1 focus:ring-[#7d6cb6]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : 'Update Medicine'}
                                </button>

                                {medicine && medicine.id && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={processing}
                                        className="w-full rounded-full border border-red-200 bg-transparent py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                                    >
                                        Hard Delete
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditMedicineModal;

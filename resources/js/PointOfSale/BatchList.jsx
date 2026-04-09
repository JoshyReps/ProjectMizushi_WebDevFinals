import { useEffect, useState } from 'react';

export default function BatchList({ batches, onAdd }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const validBatches = batches?.filter((batch) => batch.status !== 'Expired' && batch.status !== 'Archive') || [];

    useEffect(() => {
        setCurrentPage(1);
    }, [batches]);

    const totalItems = validBatches.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedBatches = validBatches.slice(startIndex, endIndex);

    const getBadgeStyle = (status) => {
        switch (status) {
            case 'Healthy':
                return 'border-green-200 bg-green-100 text-green-600';
            case 'Low Stock':
                return 'border-yellow-200 bg-yellow-100 text-yellow-600';
            case 'Expiring':
                return 'border-orange-200 bg-orange-100 text-orange-600';
            default:
                return 'border-gray-200 bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex-1 overflow-y-auto p-6">
                <h3 className="mb-4 font-bold text-gray-800">Available Batches</h3>

                {paginatedBatches.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {paginatedBatches.map((batch) => (
                            <div
                                key={batch.batch_id}
                                className="group relative flex flex-col items-center rounded-lg border border-gray-100 bg-gray-50 p-3 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="absolute top-2 right-2">
                                    <span className={`rounded border px-2 py-0.5 text-[10px] font-bold ${getBadgeStyle(batch.status)}`}>
                                        {batch.status}
                                    </span>
                                </div>

                                <img
                                    src={batch.medicine?.image_url || '/images/placeholder.png'}
                                    alt={batch.medicine?.med_name}
                                    className="mb-3 h-24 w-24 rounded object-cover shadow-sm"
                                />
                                <h4 className="text-center text-sm font-bold text-gray-800">
                                    {batch.medicine?.med_name} {batch.medicine?.formulation ? `(${batch.medicine.formulation})` : ''}
                                </h4>
                                <p className="my-1 w-full truncate text-center text-[10px] leading-tight text-gray-400">
                                    {batch.medicine?.description || 'No description available.'}
                                </p>
                                <p className="mb-2 text-xs text-gray-600">
                                    Stock : <span className="font-semibold text-gray-800">{batch.quantity}</span> | Net :{' '}
                                    {batch.medicine?.net_content || 'N/A'}
                                </p>

                                <div className="mt-auto flex w-full items-center justify-between border-t border-gray-200 pt-2">
                                    <span className="text-sm font-bold text-indigo-600">
                                        ${Number(batch.medicine?.selling_price).toFixed(2)}
                                        <span className="text-[10px] font-normal text-gray-400">/Piece</span>
                                    </span>
                                    <button
                                        onClick={() => onAdd(batch)}
                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-white shadow-sm transition-colors hover:bg-indigo-600"
                                        title="Add Batch"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-center">
                        <span className="text-sm font-medium text-gray-500">No active batches available.</span>
                    </div>
                )}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
                <div className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-700">{totalItems === 0 ? 0 : startIndex + 1}</span> to{' '}
                    <span className="font-semibold text-gray-700">{Math.min(endIndex, totalItems)}</span> of{' '}
                    <span className="font-semibold text-gray-700">{totalItems}</span> entries
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                            currentPage === 1
                                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                : 'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-200'
                        }`}
                    >
                        Previous
                    </button>

                    <div className="flex items-center justify-center px-4 text-sm font-semibold text-gray-700">
                        Page {currentPage} of {totalPages || 1}
                    </div>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                            currentPage === totalPages || totalPages === 0
                                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                : 'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-200'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

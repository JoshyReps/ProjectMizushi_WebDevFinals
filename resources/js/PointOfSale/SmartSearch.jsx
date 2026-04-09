import { useMemo } from 'react';

export default function SmartSearch({ searchQuery, setSearchQuery, batches, onAdd }) {
    const fefoBatch = useMemo(() => {
        if (!searchQuery) return null;

        const filtered = batches.filter((b) => {
            const matchesSearch = b.medicine?.med_name.toLowerCase().includes(searchQuery.toLowerCase());
            const isValidStatus = b.status !== 'Expired' && b.status !== 'Archive';
            return matchesSearch && isValidStatus;
        });

        if (filtered.length === 0) return null;

        return filtered.sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date))[0];
    }, [searchQuery, batches]);

    let badgeStyle = '';

    if (fefoBatch) {
        switch (fefoBatch.status) {
            case 'Healthy':
                badgeStyle = 'border-green-300 bg-green-50 text-green-600';
                break;
            case 'Low Stock':
                badgeStyle = 'border-yellow-300 bg-yellow-50 text-yellow-600';
                break;
            case 'Expiring':
                badgeStyle = 'border-orange-300 bg-orange-50 text-orange-600';
                break;
            default:
                badgeStyle = 'border-gray-300 bg-gray-50 text-gray-600';
        }
    }

    return (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <style>
                {`
                    @keyframes gradient-x {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-gradient-bg {
                        background-size: 200% 200%;
                        animation: gradient-x 4s ease infinite;
                    }
                `}
            </style>

            <div className="mb-4 flex items-center space-x-2 font-semibold text-gray-800">
                <h2>Smart Search | FEFO :</h2>
            </div>

            <div className="animate-gradient-bg mb-6 flex justify-center rounded-xl bg-linear-to-r from-[#7d6cb6] via-indigo-400 to-[#7d6cb6] p-4 shadow-md">
                <div className="group relative w-full max-w-lg transition-transform duration-300 ease-in-out focus-within:scale-[1.02]">
                    <div className="animate-gradient-bg absolute -inset-0.5 rounded-full bg-linear-to-r from-pink-400 via-indigo-400 to-cyan-400 opacity-0 blur transition duration-500 group-focus-within:opacity-100"></div>

                    <input
                        type="text"
                        placeholder="Medicine Name | FEFO Search"
                        className="relative z-10 w-full rounded-full border-none bg-white py-2 pr-10 pl-4 shadow-sm transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <svg className="absolute top-2.5 right-3 z-10 h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>

            {fefoBatch ? (
                <div className="flex items-start rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                    <img
                        src={fefoBatch.medicine?.image_url || '/images/placeholder.png'}
                        alt={fefoBatch.medicine?.med_name}
                        className="mr-6 h-24 w-24 rounded-md object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-800">{fefoBatch.medicine?.med_name}</h3>

                                <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-gray-500">
                                    <span className="font-medium text-gray-700">Batch Number:</span>
                                    <span>{fefoBatch.batch_number}</span>

                                    <span className="font-medium text-gray-700">Stock Quantity:</span>
                                    <span>{fefoBatch.quantity}</span>

                                    <span className="font-medium text-gray-700">Description:</span>

                                    <span className="line-clamp-2">{fefoBatch.medicine?.description || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="shrink-0 text-right">
                                <div className="mb-2 flex items-center justify-end space-x-2">
                                    <span className="border-b border-gray-800 text-xs font-semibold whitespace-nowrap text-gray-800">
                                        {new Date(fefoBatch.expiry_date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>

                                    <span className={`rounded border px-2 py-0.5 text-xs whitespace-nowrap ${badgeStyle}`}>{fefoBatch.status}</span>
                                </div>
                                <div className="text-lg font-bold text-indigo-800">
                                    ${Number(fefoBatch.medicine?.selling_price).toFixed(2)}
                                    <span className="text-sm font-normal text-gray-500">/Med</span>
                                </div>
                                <button
                                    onClick={() => onAdd(fefoBatch)}
                                    className="mt-2 w-full rounded bg-indigo-500 px-4 py-1 text-sm text-white shadow transition-colors hover:bg-indigo-600"
                                >
                                    Add +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                searchQuery && (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center">
                        <svg className="mb-3 h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <h3 className="text-sm font-semibold text-gray-800">No Valid Batches Found</h3>
                        <p className="mt-1 text-xs text-gray-500">
                            We couldn't find any active batches matching "<span className="font-medium text-gray-700 italic">{searchQuery}</span>".
                        </p>
                    </div>
                )
            )}
        </div>
    );
}

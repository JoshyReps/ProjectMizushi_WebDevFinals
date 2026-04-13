import { useEffect, useState } from 'react';

export default function TodaySales({ sales }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    return (
        <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Today Sales</h3>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                {sales.map((sale, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center justify-between rounded-lg border border-gray-100 p-2 shadow-sm transition-all duration-500 ease-out ${isMounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'} `}
                        style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                        <span className="w-20 rounded-full bg-red-200 py-1 text-center text-xs font-bold text-red-800">{formatTime(sale.time)}</span>
                        <span className="flex-1 text-center text-sm font-medium text-gray-700">{sale.pharmacist}</span>
                        <span className="w-24 text-right text-xs font-semibold text-gray-800">{sale.itemsCount} medicines</span>
                        <span className="ml-4 w-24 rounded-md bg-indigo-500 py-1.5 text-center text-sm font-bold text-white shadow-sm">
                            ${sale.total.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

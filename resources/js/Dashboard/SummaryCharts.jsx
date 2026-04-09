import { useEffect, useState } from 'react';

export default function SummaryCards({ criticalStock, criticalExpiry, inventoryValue, dailyRevenue }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const cards = [
        {
            title: 'Critical Stock',
            value: criticalStock,
            unit: 'Batches',
            borderColor: 'border-orange-400',
            iconColor: 'bg-orange-400',
            icon: (
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Critical Expiry',
            value: criticalExpiry,
            unit: 'Batches',
            borderColor: 'border-red-500',
            iconColor: 'bg-red-500',
            icon: (
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            ),
        },
        {
            title: 'Inventory Value',
            value: `$${inventoryValue.toLocaleString()}`,
            unit: '',
            borderColor: 'border-blue-500',
            iconColor: 'bg-blue-500',
            icon: (
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                </svg>
            ),
        },
        {
            title: 'Daily Revenue',
            value: `$${dailyRevenue.toLocaleString()}`,
            unit: '',
            borderColor: 'border-green-400',
            iconColor: 'bg-green-400',
            icon: (
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className={`relative flex items-center rounded-3xl border-4 ${card.borderColor} bg-white p-4 shadow-sm transition-all duration-700 ease-out ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} `}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                >
                    <div className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600"></div>

                    <div className={`mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${card.iconColor}`}>{card.icon}</div>

                    <div className="min-w-0 flex-1 pr-6">
                        <p className="truncate text-sm font-medium text-gray-500">{card.title}</p>

                        <h3 className="overflow-x-auto text-3xl font-bold whitespace-nowrap text-gray-800 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {card.value} {card.unit && <span className="text-sm font-normal text-gray-400">{card.unit}</span>}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

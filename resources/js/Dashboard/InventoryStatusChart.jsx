import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export default function InventoryStatusChart({ batchStatuses }) {
    const chartData = useMemo(() => {
        const data = [
            { name: 'Healthy', value: batchStatuses['Healthy'] || 0, color: '#22c55e' },
            { name: 'Low Stock', value: batchStatuses['Low Stock'] || 0, color: '#fbbf24' },
            { name: 'Expiring', value: batchStatuses['Expiring'] || 0, color: '#f97316' },
            { name: 'Critical', value: batchStatuses['Critical'] || 0, color: '#991b1b' },
            { name: 'Expired', value: batchStatuses['Expired'] || 0, color: '#ef4444' },
        ];

        return data.filter((item) => item.value > 0);
    }, [batchStatuses]);

    return (
        <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-bold text-gray-800">Inventory Status</h3>
            <div className="flex flex-1 items-center justify-between">
                <div className="h-64 w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2} dataKey="value">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [`${value} Batches`, name]}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-1/2 pl-6">
                    <ul className="space-y-4 text-sm font-medium text-gray-700">
                        {chartData.map((entry, idx) => (
                            <li key={idx} className="flex items-center">
                                <span className="mr-3 block h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                                {entry.name}
                                <span className="ml-auto font-bold text-gray-900">{entry.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useRef, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function ExpiryChart({ data }) {
    const [isVisible, setIsVisible] = useState(false);

    const chartRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 },
        );

        if (chartRef.current) {
            observer.observe(chartRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={chartRef} className="flex h-80 flex-col rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-gray-800">Expiry Chart</h3>
            <div className="flex-1">
                {isVisible && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f0f0f0" />
                            <XAxis dataKey="name" hide={true} />
                            <YAxis />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                formatter={(value, name, props) => [
                                    `${Math.abs(value)} days ${value >= 0 ? 'left' : 'expired'}`,
                                    props.payload.status || 'Status',
                                ]}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <ReferenceLine y={0} stroke="#000" strokeWidth={2} />
                            <Bar dataKey="days" radius={[4, 4, 4, 4]} maxBarSize={40}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.status === 'Expired'
                                                ? '#ef4444'
                                                : entry.status === 'Critical'
                                                  ? '#991b1b'
                                                  : entry.status === 'Expiring'
                                                    ? '#f97316'
                                                    : entry.days >= 0
                                                      ? '#22c55e'
                                                      : '#fca5a5'
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

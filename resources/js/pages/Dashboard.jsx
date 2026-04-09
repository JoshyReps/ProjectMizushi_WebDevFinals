import ExpiryChart from '../Dashboard/ExpiryChart';
import InventoryStatusChart from '../Dashboard/InventoryStatusChart';
import SalesChart from '../Dashboard/SalesChart';
import SummaryCards from '../Dashboard/SummaryCharts';
import TodaySales from '../Dashboard/TodaySales';
import AppLayout from '../layouts/AppLayout';

export default function Dashboard({ stats, todaySales, batchStatuses, expiryData, weeklySales }) {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="mb-6 text-3xl font-black tracking-tight text-gray-900">Dashboard</h1>

            <SummaryCards
                criticalStock={stats?.criticalStock || 0}
                criticalExpiry={stats?.criticalExpiry || 0}
                inventoryValue={stats?.inventoryValue || 0}
                dailyRevenue={stats?.dailyRevenue || 0}
            />

            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="h-100">
                    <TodaySales sales={todaySales || []} />
                </div>
                <div className="h-100">
                    <InventoryStatusChart batchStatuses={batchStatuses || {}} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <ExpiryChart data={expiryData || []} />
                <SalesChart data={weeklySales || []} />
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} />;

import NavBar from '../ui/NavBar';
import SideBar from '../ui/Sidebar';

export default function AppLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <SideBar />

            <div className="flex flex-1 flex-col overflow-hidden">
                <NavBar />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}

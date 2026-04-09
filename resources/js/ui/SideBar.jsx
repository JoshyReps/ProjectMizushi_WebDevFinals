import { usePage } from '@inertiajs/react';
import SideBarLabel from './SideBarLabel';
import SideBarLink from './SideBarLink';

function SideBar() {
    const { auth } = usePage().props;
    const { role } = auth.user;

    return (
        <aside className="flex w-64 flex-col overflow-y-scroll bg-white text-[#27474E] shadow-xl">
            <div className="flex items-center justify-center gap-2 p-5 pb-2">
                <div className="h-15 w-15">
                    <img src="/images/logo.svg" alt="" />
                </div>
                <div className="p-2 pt-4">
                    <h2 className="text-[1.95rem] leading-8 font-bold tracking-wider text-[#1f6057]">Mizushi</h2>
                    <p className="text-[14px] font-extralight">{role}</p>
                </div>
            </div>

            <nav className="h-full flex-1 space-y-2 p-4 pt-0">
                <SideBarLabel>MAIN</SideBarLabel>
                <SideBarLink link="/main/dashboard">Dashboard</SideBarLink>
                <SideBarLink link="/main/pointofsale">Point of Sale</SideBarLink>

                <SideBarLabel>INVENTORY</SideBarLabel>
                <SideBarLink link="/inventory/medicine">Medicine</SideBarLink>
                <SideBarLink link="/inventory/batches">Batches</SideBarLink>
                <SideBarLink link="/inventory/suppliers">Suppliers</SideBarLink>

                <SideBarLabel>GENERAL</SideBarLabel>
                <SideBarLink link="/general/transactions">Transactions</SideBarLink>
                {role === 'ADMIN' && (
                    <>
                        <SideBarLabel>ADMIN</SideBarLabel>
                        <SideBarLink link="/admin/users">Users</SideBarLink>
                    </>
                )}
            </nav>
            <div className="mt-5 text-center">@2026 Mizushi</div>
        </aside>
    );
}

export default SideBar;

import { Link, usePage } from '@inertiajs/react';

function NavBar() {
    const { auth } = usePage().props;
    const { first_name: firstName, last_name: lastName, email } = auth.user;

    return (
        <header className="flex h-16 items-center justify-end bg-white px-8 shadow-sm">
            <div className="flex items-center justify-between gap-5 p-4">
                <div>
                    <div className="font-semibold text-[.9remrem]">{`${firstName} ${lastName}`}</div>
                    <div className="text-[.75rem] font-light tracking-widest">{email}</div>
                </div>
                <div>
                    <Link href="/logout" method="post" as="button" className="text-red-500 hover:cursor-pointer">
                        Logout
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default NavBar;

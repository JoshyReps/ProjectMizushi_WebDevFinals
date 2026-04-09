import { Link } from '@inertiajs/react';

function SideBarLink({ link, children }) {
    return (
        <Link href={link} className="block rounded p-2 text-[1.1rem] font-light tracking-wider hover:border-b hover:border-[#27474E]">
            {children}
        </Link>
    );
}

export default SideBarLink;

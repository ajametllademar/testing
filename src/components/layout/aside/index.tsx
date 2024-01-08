"use client";

import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoDocumentsOutline } from "react-icons/io5";
import { PiTestTubeDuotone } from "react-icons/pi";

// import { TbDatabaseExport } from "react-icons/tb";

import Link from "@/components/common/link";
import { type Role } from "@/config/auth.config";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";

const Component = () => {
    const { navIsOpen } = useUIStore();
    const { data: session } = useSession();

    return (
        <aside className={styles.aside(navIsOpen)}>
            <ul className="mt-8 flex flex-col">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <RenderNavItem item={item} session={session} />
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Component;

const RenderNavItem = ({
    item,
    session,
}: {
    item: INavItem;
    session: Session | null;
}) => {
    const { title, Icon, roles, href } = item;

    const { setNavIsOpen } = useUIStore();

    if (roles && !roles.includes(session?.user?.role!)) return null;

    return (
        <Link
            activeDetection="startsWith"
            href={href}
            title={title}
            onClick={() => setNavIsOpen(false)}
            className={cn(
                "flex items-center space-x-5 px-5 py-4 text-white",
                "hover:bg-reportly-primary-600 text-sm duration-300",
                item.separator && "border-t border-white/30",
            )}
            activeClassName="bg-reportly-primary-700"
        >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span>{title}</span>
        </Link>
    );
};

const styles = {
    aside: (navIsOpen: boolean) =>
        cn("aside", navIsOpen ? "translate-x-0" : "-translate-x-64"),
};

const navItems: INavItem[] = [
    {
        id: 1,
        title: "Panell de control",
        href: "/",
        Icon: AiOutlineDashboard,
        // roles: ["admin", "user"],
    },
    {
        id: 2,
        title: "Parts",
        href: "/parts",
        Icon: IoDocumentsOutline,
        // roles: ["admin", "user"],
    },
    {
        id: 3,
        title: "Admin",
        href: "/admin",
        Icon: PiTestTubeDuotone,
        separator: true,
        roles: ["admin"],
    },
];

type INavItem = {
    id: number;
    title: string;
    href: string;
    Icon?: any;
    separator?: boolean;
    roles?: Role[]; // Roles mínimos para tener acceso. En caso que sea vacío, todos los roles tienen acceso.
};

"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";
import UserAvatar from "./userAvatar";

const Component = () => {
    return (
        <header className="header">
            <div className="flex items-center gap-5">
                <BurgerMenu />
                <LogoHeader />
                <div className="grow" />
                <UserAvatar />
            </div>
        </header>
    );
};

const BurgerMenu = () => {
    const { navIsOpen, setNavIsOpen } = useUIStore();

    return (
        <button
            aria-label="Obrir menú de navegació"
            className={styles.burgerButton(navIsOpen)}
            onClick={() => setNavIsOpen(!navIsOpen)}
        >
            <HiOutlineMenuAlt1 className="h-6 w-6" />
        </button>
    );
};

const LogoHeader = () => {
    const { setNavIsOpen } = useUIStore();

    return (
        <Link
            href="/"
            className={styles.logoHeader}
            title="Tornar a l'inici"
            onClick={() => setNavIsOpen(false)}
        >
            <Image
                src="/images/logos/logo-large-white.png"
                alt="Reportly"
                width={103}
                height={44}
                className="h-full w-full object-contain"
            />
        </Link>
    );
};

const styles = {
    logoHeader: "ml-[1px] h-10 flex-shrink-0",
    burgerButton: (navIsOpen: boolean) =>
        cn(
            "h-10 w-10 flex items-center justify-center rounded flex-shrink-0",
            "lg:hidden duration-500 ease-in-out",
            "text-white/80 hover:text-white",
            "hover:bg-reportly-primary-600",
            navIsOpen ? "rotate-180" : "rotate-0",
        ),
};

export default Component;
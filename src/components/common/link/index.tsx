"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface ComponentProps {
    children: React.ReactNode;
    href: string;
    title?: string;
    className?: string;
    activeClassName?: string;
    activeDetection?: "startsWith" | "endsWith" | "equals";
    onClick?: () => void;
}

const Component: React.FC<ComponentProps> = ({
    children,
    href,
    className,
    activeClassName,
    activeDetection,
    title,
    onClick,
    ...rest
}) => {
    const pathName = usePathname();
    const isActive = isActiveLink({ pathName, href, activeDetection });

    return (
        <Link
            title={title}
            href={href}
            className={cn(className, isActive && activeClassName)}
            onClick={onClick}
            {...rest}
        >
            {children}
        </Link>
    );
};

interface ActiveLinkProps {
    pathName: string;
    href: string;
    activeDetection?: "startsWith" | "endsWith" | "equals";
}

const isActiveLink: React.FC<ActiveLinkProps> = ({
    pathName,
    href,
    activeDetection = "endsWith",
}) => {
    if (activeDetection === "startsWith") {
        if (href === "/") {
            return pathName === href;
        } else return pathName?.startsWith(href);
    } else if (activeDetection === "endsWith") {
        return pathName?.endsWith(href);
    } else {
        return pathName === href;
    }
};

export default Component;

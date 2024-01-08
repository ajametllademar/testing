"use client";

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Spinner,
    User,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

// import { signOut } from "@/config/auth";

const Component = () => {
    const { data: session, status } = useSession();

    // En caso que no tengamos la sesión, retornamos un spinner
    if (status === "loading" || !session) {
        return <Spinner size="sm" />;
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <User
                    as="button"
                    name={session.user.name}
                    description={session.user.email}
                    className="transition-transform"
                    classNames={{
                        name: "text-white font-semibold text-xs sm:block hidden",
                        description: "text-white/80 text-xs sm:block hidden",
                    }}
                    avatarProps={{
                        src: session.user.image || undefined,
                    }}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Accions de l'usuari">
                <DropdownItem
                    key="logout"
                    onClick={() => signOut()}
                    color="danger"
                >
                    Tancar sessió
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
export default Component;

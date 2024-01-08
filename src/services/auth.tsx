import { type User } from "next-auth";

import { strapiURL } from "@/config";

export default class AuthService {
    constructor() {}

    // Se realiza la petición a Strapi para iniciar sesión de
    // un usuario. Se retorna el token de acceso y el usuario.
    async signIn({
        identifier,
        password,
    }: {
        identifier: string;
        password: string;
    }): Promise<User | null> {
        const res = await fetch(`${strapiURL}/api/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier, password }),
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }

        // Se obtiene el token de acceso
        const { jwt } = await res.json();

        // Se obtienen los datos del usuario
        const meData = await this.me({ jwt });

        return meData;
    }

    // Se realiza la petición a Strapi para obtener el usuario
    // autenticado. Se retorna el usuario.
    async me({ jwt }: { jwt: string }): Promise<User | null> {
        try {
            const res = await fetch(
                `${strapiURL}/api/users/me/?populate=role&populate=image`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    cache: "no-store",
                },
            );

            if (!res.ok) {
                return null;
            }

            const data = await res.json();

            // Obtenemos la imagen del usuario, si existe
            const image =
                data?.image?.formats?.thumbnail?.url || data?.image?.url;

            return {
                id: data.id,
                name: data.username,
                email: data.email,
                image,
                role: data?.role?.type || "user",
                jwt,
            };
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

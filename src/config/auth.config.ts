import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { dev as debug, sessionMaxAge } from "@/config";
import AuthService from "@/services/auth";

export default {
    debug,
    session: {
        strategy: "jwt",
        maxAge: sessionMaxAge,
    },
    callbacks: {
        authorized(params) {
            return !!params.auth?.user;
        },
        jwt(params) {
            if (params?.user) {
                return {
                    ...params.token,
                    id: params.user.id,
                    jwt: params.user.jwt,
                    role: params.user.role,
                };
            }

            return params?.token;
        },
        session(params) {
            const { session, token } = params;

            if (token) {
                session.user.jwt = token.jwt;
                session.user.role = token.role;
            }

            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Correu electrònic",
                    type: "email",
                    placeholder: "correu@correu.cat",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(c) {
                const { password, username } = c;

                // Creamos una instancia del servicio de autenticación
                const authService = new AuthService();

                // Hacemos el signIn con el usuario y contraseña
                // y nos devuelve el usuario con el token
                const user = await authService.signIn({
                    identifier: username as string,
                    password: password as string,
                });

                // Si no hay usuario, devolvemos null
                if (!user) {
                    return null;
                }

                return user;
            },
        }),
    ],
    theme: {
        logo: "/images/logos/logo-large-white.png",
    },
} satisfies NextAuthConfig;

declare module "@auth/core/types" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {}
    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    interface Account {}

    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {}
}

declare module "@auth/core/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        id: string;
        role: Role;
        jwt: string;
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            role: Role;
            jwt: string;
        } & Omit<User, "id">;
    }

    interface User {
        id: string;
        role: Role;
        jwt: string;
    }
}

export type Role = "admin" | "user" | "editor";

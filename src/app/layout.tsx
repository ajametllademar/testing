import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NextUIProvider } from "@/providers";

import "./globals.css";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ca">
            <body className={cn(inter.className, "reportly-theme")}>
                <NextUIProvider>{children}</NextUIProvider>
            </body>
        </html>
    );
}

export function generateMetadata(): Metadata {
    const defaultTitle =
        "Reportly | Regidoria de Serveis i Manteniment | Ajuntament de l'Ametlla de Mar";
    const title = {
        template: `%s » ${defaultTitle}`,
        default: defaultTitle,
    };

    const description =
        "Reportly: la plataforma per la gestió de parts de treball de la regidoria de Serveis i Manteniment de l'Ametlla de Mar.";

    return {
        title,
        description,
    };
}

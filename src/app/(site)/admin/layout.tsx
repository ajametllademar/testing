import { auth, signIn } from "@/config/auth";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (session?.user?.role !== "admin") {
        // Deberíamos redigir a una ventana donde indique
        // que no tenemos roles suficientes
        return signIn();
    }

    return <>{children}</>;
}

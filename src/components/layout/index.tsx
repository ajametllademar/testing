import { auth, signIn } from "@/config/auth";
import { SessionProvider } from "@/providers";
import Sidebar from "./aside";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";

const Component = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    if (!session) return signIn();

    return (
        <div className="wrapper">
            <SessionProvider session={session}>
                <Header />
                <Sidebar />
                <Main>
                    {children}
                    <Footer />
                </Main>
            </SessionProvider>
        </div>
    );
};

export default Component;

import Layout from "@/components/layout";
import { auth } from "@/config/auth";

const Component = async () => {
    const session = await auth();
    
    return (
        <Layout>
            <pre>{JSON.stringify({ session }, null, 4)}</pre>
        </Layout>
    );
};
export default Component;

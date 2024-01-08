import ReactJsonViewer from "@/components/common/reactJsonView";
import { auth } from "@/config/auth";

// import { dev } from "@/config";

const Component = async () => {
    const session = await auth();

    return (
        <>
            <ReactJsonViewer enabled={true} src={{ session }} />
        </>
    );
};

export default Component;
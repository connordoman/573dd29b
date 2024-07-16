import { useLoaderData } from "react-router-dom";
import { Call, getCallDetails } from "../api";
import { motion } from "framer-motion";

type LoaderActivityDetail = { activity: Call | undefined };

export async function loader({ params }: { params: Record<string, any> }): Promise<LoaderActivityDetail> {
    const activity = await getCallDetails(params.activityId);
    return { activity };
}

interface ActivityDetailProps {
    call?: Call;
}

export default function ActivityDetail({ call }: ActivityDetailProps) {
    const { activity } = useLoaderData() as LoaderActivityDetail;

    /**
     * Return to the previous screen (probably all calls)
     */
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <button onClick={handleGoBack} className="">
                &lt;
            </button>
            <div>
                <pre>{JSON.stringify(activity, null, 2)}</pre>
            </div>
        </motion.div>
    );
}

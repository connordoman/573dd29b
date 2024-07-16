import { useLoaderData } from "react-router-dom";
import { Call, getCallDetails } from "../api";
import { motion } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import { capitalize } from "../util";
import ContentFadeIn from "../ContentFadeIn";

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

    if (!activity) {
        return (
            <ContentFadeIn>
                <h1 className="text-2xl font-bold">Call not found.</h1>
                <p>Sorry, there isn't a call with that ID.</p>
            </ContentFadeIn>
        );
    }

    const directionText = activity.direction === "inbound" ? "Incoming" : "Outgoing";

    return (
        <ContentFadeIn backButtonText="Calls list">
            <div>
                <span className="text-xs text-zinc-400">{directionText} call</span>
                <pre>{JSON.stringify(activity, null, 2)}</pre>
            </div>
        </ContentFadeIn>
    );
}

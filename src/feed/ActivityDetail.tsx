import { useLoaderData } from "react-router-dom";
import { Call, getCallDetails } from "../api";
import { motion } from "framer-motion";
import { MdArrowBackIos, MdOutlineCallMissed } from "react-icons/md";
import { getCaller, readableDate, readableDuration } from "../util";
import ContentFadeIn from "../ContentFadeIn";
import SpanningButton from "../SpanningButton";
import Divider from "../Divider";
import Caption from "../Caption";

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
            <ContentFadeIn backButtonText="Calls">
                <h1 className="text-2xl font-bold">Call not found.</h1>
                <p>Sorry, there isn't a call with that ID.</p>
            </ContentFadeIn>
        );
    }

    const directionText = activity.direction === "inbound" ? "Incoming" : "Outgoing";

    const callerName = getCaller(activity);

    const duration = readableDuration(activity);

    const callMetadata = () => {
        switch (activity.call_type) {
            case "answered":
                return <time aria-label="Duration of the call">{duration}</time>;
            case "missed":
                return (
                    <span className="text-red-600 inline-flex items-center gap-1">
                        <MdOutlineCallMissed /> Missed call
                    </span>
                );
        }
    };

    return (
        <ContentFadeIn backButtonText="Calls" backButtonPath="/calls">
            <div className="mx-1 flex-grow">
                <Caption>
                    {directionText} call, {readableDate(activity, true)}
                </Caption>
                <h1 className="text-2xl font-bold">{callerName}</h1>
                <p>{callMetadata()}</p>
                {/* <pre>{JSON.stringify(activity, null, 2)}</pre> */}
            </div>
            <Divider />
            {activity.is_archived ? (
                <SpanningButton>Unarchive</SpanningButton>
            ) : (
                <SpanningButton>Archive</SpanningButton>
            )}
        </ContentFadeIn>
    );
}

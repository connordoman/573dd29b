import { useLoaderData, useNavigate } from "react-router-dom";
import { archiveCall, Call, getCallDetails, unarchiveCall } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { MdArrowBackIos, MdOutlineCallMissed } from "react-icons/md";
import { getCaller, readableDate, readableDuration } from "../util";
import ContentFadeIn from "../ContentFadeIn";
import SpanningButton from "../SpanningButton";
import Divider from "../Divider";
import Caption from "../Caption";
import { useEffect, useState } from "react";
import ArchiveUpdateButton from "./ArchiveUpdateButton";
import CrossfadeText from "../CrossfadeText";

type LoaderActivityDetail = { activity: Call | undefined };

export async function loader({ params }: { params: Record<string, any> }): Promise<LoaderActivityDetail> {
    const activity = await getCallDetails(params.activityId);
    return { activity };
}

export default function ActivityDetail() {
    const navigate = useNavigate();
    const { activity } = useLoaderData() as LoaderActivityDetail;

    const [isArchived, setIsArchived] = useState(activity?.is_archived ?? false);

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

    const callMetadata = (): React.ReactNode => {
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
        <ContentFadeIn
            backButtonText={
                <CrossfadeText whenTrue="Archive" whenFalse="Calls" value={isArchived} className="left-0 top-0" />
            }
            backButtonPath={isArchived ? "/archive" : "/calls"}>
            <div className="mx-1 flex-grow">
                <Caption className="text-zinc-400">
                    {directionText} call, {readableDate(activity, true)}
                </Caption>
                <h1 className="text-2xl font-bold">{callerName}</h1>
                <p>{callMetadata()}</p>
            </div>
            <Divider />
            <ArchiveUpdateButton
                call={activity}
                onChange={(archived) => {
                    setIsArchived(archived);

                    if (archived) {
                        // window.history.replaceState(null, "", `/archive/${activity.id}`);
                        navigate(`/archive/${activity.id}`, { replace: true });
                    } else {
                        // window.history.replaceState(null, "", `/calls/${activity.id}`);
                        navigate(`/calls/${activity.id}`, { replace: true });
                    }
                }}
            />
        </ContentFadeIn>
    );
}

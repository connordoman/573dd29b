import { useLoaderData, useNavigate } from "react-router-dom";
import { Call, getCallDetails } from "../lib/api";
import { MdOutlineCallMissed } from "react-icons/md";
import { getCaller, readableDate, readableDuration } from "../lib/util";
import ContentFadeIn from "../layout/ContentFadeIn";
import Caption from "../typography/Caption";
import { useState } from "react";
import ArchiveUpdateButton from "./ArchiveUpdateButton";

type LoaderActivityDetail = { activity: Call | undefined };

export async function loader({ params }: { params: Record<string, any> }): Promise<LoaderActivityDetail> {
    const activity = await getCallDetails(params.activityId);
    return { activity };
}

export default function ActivityDetail() {
    const navigate = useNavigate();
    const { activity } = useLoaderData() as LoaderActivityDetail;

    const [initiallyArchived, _setInitiallyArchived] = useState(activity?.is_archived ?? false);

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

    /**
     * Helper function meant that pattern matches `call_type`.
     * @returns The appropriate metadata component
     */
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
            backButtonText={<span className="leading-none">{initiallyArchived ? "Archive" : "Calls"}</span>}
            backButtonPath={initiallyArchived ? "/archive" : "/calls"}>
            <div className="mx-1 flex-grow">
                <Caption className="text-zinc-400">
                    {directionText} call, {readableDate(activity, true)}
                </Caption>
                <h1 className="text-2xl font-bold">{callerName}</h1>
                <p>{callMetadata()}</p>
            </div>
            <ArchiveUpdateButton
                call={activity}
                onChange={(archived) => {
                    if (archived) {
                        navigate(`/archive/${activity.id}`, { replace: true });
                    } else {
                        navigate(`/calls/${activity.id}`, { replace: true });
                    }
                }}
            />
        </ContentFadeIn>
    );
}

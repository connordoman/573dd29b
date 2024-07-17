import { archiveMany, Call, getAllCalls } from "../lib/api";
import Divider from "../layout/Divider";
import SpanningButton from "../input/SpanningButton";
import ActivityPreview from "./ActivityPreview";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingPane from "../layout/LoadingPane";
import FadeInHeading from "../typography/FadeInHeading";
import FadeInParagraph from "../typography/FadeInParagraph";

type LoaderActivityFeed = { activities: Call[] };

export async function loader(): Promise<LoaderActivityFeed> {
    const activities = await getAllCalls();

    if (activities) {
        return { activities: activities.filter((call) => !call.is_archived) };
    }

    return { activities: [] };
}

export default function ActivityFeed() {
    const navigate = useNavigate();

    const { activities } = useLoaderData() as LoaderActivityFeed;

    const [archiveAllLoading, setArchiveAllLoading] = useState(false);

    const handleArchiveAll = async () => {
        setArchiveAllLoading(true);
        const success = await archiveMany(activities);
        if (success) {
            navigate("/archive");
        }
        setArchiveAllLoading(false);
    };

    return (
        <div className="relative flex flex-col overflow-y-scroll gap-4 px-3 py-4 flex-grow overflow-x-hidden">
            <div className="px-1">
                <FadeInHeading>Calls</FadeInHeading>
                {activities.length === 0 ? <FadeInParagraph className="mt-2">No recent calls.</FadeInParagraph> : null}
            </div>
            <div className="flex flex-col gap-4 flex-grow">
                {activities?.map((call, index) => {
                    return <ActivityPreview call={call} index={index} key={call.id} />;
                })}
            </div>
            {archiveAllLoading ? <LoadingPane /> : null}
            <SpanningButton onClick={handleArchiveAll} disabled={activities.length === 0}>
                Archive all
            </SpanningButton>
        </div>
    );
}

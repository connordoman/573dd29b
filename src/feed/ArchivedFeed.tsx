import { Call, getAllCalls, unarchiveMany } from "../lib/api";
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
        return { activities: activities.filter((call) => call.is_archived) };
    }

    return { activities: [] };
}

export default function ArchiveFeed() {
    const navigate = useNavigate();

    const { activities } = useLoaderData() as LoaderActivityFeed;

    const [unarchiveAllLoading, setUnarchiveAllLoading] = useState(false);

    const handleUnarchiveAll = async () => {
        setUnarchiveAllLoading(true);
        const success = await unarchiveMany(activities);
        if (success) {
            navigate("/calls");
        }
        setUnarchiveAllLoading(false);
    };

    return (
        <div className="relative flex flex-col overflow-y-auto gap-4 px-3 py-4 flex-grow overflow-x-hidden">
            <div className="px-1">
                <FadeInHeading>Archive</FadeInHeading>
                {activities.length === 0 ? (
                    <FadeInParagraph className="mt-2">No archived calls.</FadeInParagraph>
                ) : null}
            </div>
            <div className="flex flex-col gap-4 flex-grow">
                {activities?.map((call, index) => {
                    return <ActivityPreview call={call} index={index} key={call.id} />;
                })}
            </div>
            {unarchiveAllLoading ? <LoadingPane /> : null}
            <SpanningButton onClick={handleUnarchiveAll} disabled={activities.length === 0}>
                Unarchive all
            </SpanningButton>
        </div>
    );
}

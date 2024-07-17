import { Call, getAllCalls, unarchiveMany } from "../lib/api";
import Divider from "../layout/Divider";
import SpanningButton from "../input/SpanningButton";
import ActivityPreview from "./ActivityPreview";
import { useLoaderData } from "react-router-dom";

type LoaderActivityFeed = { activities: Call[] };

export async function loader(): Promise<LoaderActivityFeed> {
    const activities = await getAllCalls();

    if (activities) {
        return { activities: activities.filter((call) => call.is_archived) };
    }

    return { activities: [] };
}

export default function ArchiveFeed() {
    const { activities } = useLoaderData() as LoaderActivityFeed;

    const handleUnarchiveAll = async () => {
        const success = await unarchiveMany(activities);
    };

    return (
        <div className="relative flex flex-col overflow-y-scroll gap-4 px-3 py-4 flex-grow overflow-x-hidden">
            <h1 className="text-3xl font-bold px-1">Archived</h1>
            {activities?.map((call, index) => {
                return <ActivityPreview call={call} index={index} key={call.id} />;
            })}
            <Divider />
            <SpanningButton onClick={handleUnarchiveAll} disabled={activities.length === 0}>
                Unarchive all
            </SpanningButton>
        </div>
    );
}

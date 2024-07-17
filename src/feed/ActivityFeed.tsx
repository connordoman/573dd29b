import { archiveMany, Call, getAllCalls } from "../lib/api";
import Divider from "../layout/Divider";
import SpanningButton from "../input/SpanningButton";
import ActivityPreview from "./ActivityPreview";
import { useLoaderData } from "react-router-dom";

type LoaderActivityFeed = { activities: Call[] };

export async function loader(): Promise<LoaderActivityFeed> {
    const activities = await getAllCalls();

    if (activities) {
        return { activities: activities.filter((call) => !call.is_archived) };
    }

    return { activities: [] };
}

export default function ActivityFeed() {
    const { activities } = useLoaderData() as LoaderActivityFeed;

    const handleArchiveAll = async () => {
        const success = await archiveMany(activities);
    };

    return (
        <div className="relative flex flex-col overflow-y-scroll gap-4 px-3 py-4 flex-grow overflow-x-hidden">
            <h1 className="text-3xl font-bold px-1">Calls</h1>
            {activities?.map((call, index) => {
                return <ActivityPreview call={call} index={index} key={call.id} />;
            })}
            <Divider />
            <SpanningButton onClick={handleArchiveAll} disabled={activities.length === 0}>
                Archive all
            </SpanningButton>
        </div>
    );
}

import { Call, getAllCalls } from "../api";
import ActivityPreview from "./ActivityPreview";
import { useLoaderData } from "react-router-dom";

type LoaderActivityFeed = { activities: Call[] };

export async function loader(): Promise<LoaderActivityFeed> {
    const activities = await getAllCalls();

    return { activities: activities ?? [] };
}

export default function ActivityFeed() {
    const { activities } = useLoaderData() as LoaderActivityFeed;

    return (
        <div className="relative flex flex-col overflow-y-scroll gap-4 px-3 py-4 flex-grow overflow-x-hidden">
            {activities?.map((call, index) => {
                return <ActivityPreview call={call} index={index} key={call.id} />;
            })}
        </div>
    );
}

import { useLoaderData } from "react-router-dom";
import { Call, getCallDetails } from "../api";

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
    return (
        <div>
            <pre>{JSON.stringify(activity, null, 2)}</pre>
        </div>
    );
}

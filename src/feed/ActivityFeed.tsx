import { useEffect, useState } from "react";
import { Call, getAllCalls } from "../api";
import Header from "../Header";
import Activity from "./Activity";

export default function ActivityFeed() {
    const [calls, setCalls] = useState<Call[]>();
    useEffect(() => {
        const retrieveCalls = async () => {
            const fetchedCalls = await getAllCalls();
            if (fetchedCalls) {
                setCalls(fetchedCalls);
            }
        };
        retrieveCalls();
    }, []);

    return (
        <div className="container">
            <Header />
            <div className="activity-feed">
                {calls?.map((c) => {
                    return <Activity call={c} key={c.id} />;
                })}
                <pre>{JSON.stringify(calls, null, 2)}</pre>
            </div>
        </div>
    );
}

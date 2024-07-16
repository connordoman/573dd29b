import { useEffect, useState } from "react";
import { Call, getAllCalls } from "../api";
import Header from "../Header";

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
            <pre>{JSON.stringify(calls, null, 2)}</pre>
        </div>
    );
}

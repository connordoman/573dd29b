import { useEffect, useState } from "react";
import { Call, getAllCalls } from "../api";
import Header from "../Header";
import Activity from "./Activity";
import Container from "../Container";

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
        <Container>
            <Header />
            <div className="relative flex flex-col overflow-y-scroll gap-6 px-3 py-6 flex-grow overflow-x-hidden">
                {calls?.map((c, index) => {
                    return <Activity call={c} index={index} key={c.id} />;
                })}
            </div>
        </Container>
    );
}

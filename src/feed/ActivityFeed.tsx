import { useEffect, useState } from "react";
import { Call, getAllCalls } from "../api";
import Header from "../Header";
import Activity from "./Activity";
import Container from "../Container";
import { useLoaderData } from "react-router-dom";

type LoaderActivityFeed = { activities: Call[] };

export async function loader(): Promise<LoaderActivityFeed> {
    const activities = await getAllCalls();

    return { activities: activities ?? [] };
}

export default function ActivityFeed() {
    const { activities } = useLoaderData() as LoaderActivityFeed;

    return (
        <div className="relative flex flex-col overflow-y-scroll gap-6 px-3 py-6 flex-grow overflow-x-hidden">
            {activities?.map((call, index) => {
                return <Activity call={call} index={index} key={call.id} />;
            })}
        </div>
    );
}

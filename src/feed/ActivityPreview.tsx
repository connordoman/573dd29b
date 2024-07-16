import { motion } from "framer-motion";
import { Call, getCallDetails } from "../api";
import { MdCallMade, MdInfoOutline, MdOutlineCallMissed, MdOutlineVoicemail } from "react-icons/md";
import { Link } from "react-router-dom";

interface ActivityProps {
    call: Call;
    index: number;
}

export default function ActivityPreview({ call, index }: ActivityProps) {
    // make inbound check more concise
    const inbound: boolean = call.direction === "inbound";

    // outbound calls are TO the other person, inbound calls are FROM that person
    const callerNumber: number = inbound ? call.from : call.to;

    // convert date string to Date object
    const createdDate: Date = new Date(call.created_at);

    // use pattern matching for the call's status icon (I really wish TS had a `match` statement)
    const statusIcon = () => {
        switch (call.call_type) {
            case "answered":
                return inbound ? null : <MdCallMade />;
            case "missed":
                return <MdOutlineCallMissed className="text-red-600 " />;
            case "voicemail":
                return <MdOutlineVoicemail />;
        }
    };

    /**
     * Opens the details view of a given call/activity
     */
    const handleInfoButtonClick = async () => {
        const specificCall = await getCallDetails(call.id);
        alert(`Activity Details:\n\n${JSON.stringify(specificCall, null, 2)}`);
    };

    return (
        <motion.div
            className="px-3 py-2 border border-zinc-200 rounded-md flex items-center gap-3"
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.33, delay: 0.1 * index }}>
            <span className="aspect-square flex items-center justify-center text-lg min-w-4 h-4">{statusIcon()}</span>
            <span className="border-l border-zinc-200 h-6"></span>
            <div className="px-2 flex-grow flex flex-col leading-none">
                <h3 className="font-bold text-lg">{callerNumber}</h3>
                <span className="font-xs text-zinc-300">{createdDate.toLocaleString()}</span>
            </div>
            <Link to={`${call.id}`} className="text-xl">
                <MdInfoOutline className="text-slate-500" />
            </Link>
        </motion.div>
    );
}

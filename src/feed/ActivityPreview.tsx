import { motion } from "framer-motion";
import { Call, getCallDetails } from "../lib/api";
import { MdCallMade, MdInfoOutline, MdOutlineCallMissed, MdOutlineVoicemail } from "react-icons/md";
import { Link } from "react-router-dom";
import { capitalize, readableDate } from "../lib/util";
import Caption from "../typography/Caption";

interface ActivityProps {
    call: Call;
    index: number;
}

export default function ActivityPreview({ call, index }: ActivityProps) {
    // make inbound check more concise
    const inbound = call.direction === "inbound";

    // outbound calls are TO the other person, inbound calls are FROM that person
    const callerNumber = inbound ? call.from : call.to;

    // convert date string to Date object
    const createdDate = new Date(call.created_at);

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
                <Caption className="text-zinc-400">{capitalize(readableDate(call, true))}</Caption>
            </div>
            <Link to={`/${call.is_archived ? "archive" : "calls"}/${call.id}`} className="text-xl px-2">
                <MdInfoOutline className="text-green-500" />
            </Link>
        </motion.div>
    );
}

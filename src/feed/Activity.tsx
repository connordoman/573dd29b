import { Call } from "../api";

interface ActivityProps {
    call: Call;
}

export default function Activity({ call }: ActivityProps) {
    const callerName = call.to == call.via ? call.from : call.to;

    return (
        <div className="activity">
            <h3>{callerName}</h3>
            <span>{call.direction}</span>
        </div>
    );
}

export interface Call {
    id: string;
    created_at: string;
    direction: "inbound" | "outbound";
    from: number;
    to: number;
    via: number;
    duration: number;
    is_archived: boolean;
    call_type: "missed" | "answered" | "voicemail";
}

const BASE_URL = "https://aircall-backend.onrender.com";

/**
 * Fetch all calls (activities) from the backend server at the endpoint `/activities`.
 * @returns A list of all calls retrieved from the server or undefined if there is an error.
 */
export async function getAllCalls(): Promise<Call[] | undefined> {
    const res = await fetch(`${BASE_URL}/activities`);

    if (!res.ok) {
        return undefined;
    }

    const calls: Call[] = await res.json();

    return calls;
}

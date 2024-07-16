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
    try {
        const res = await fetch(`${BASE_URL}/activities`);

        if (!res.ok) {
            return undefined;
        }

        const calls: Call[] = await res.json();

        return calls.sort((a, b) => {
            const aDate = new Date(a.created_at);
            const bDate = new Date(b.created_at);

            if (aDate > bDate) {
                return -1;
            } else {
                return 1;
            }
        });
    } catch (err: any) {
        return undefined;
    }
}

/**
 * Fetch the details of a specific call given its ID.
 * @param id The ID of the call to get data from.
 * @returns The relevant Call if found, otherwise undefined.
 */
export async function getCallDetails(id: string): Promise<Call | undefined> {
    try {
        const res = await fetch(`${BASE_URL}/activities/${id}`);

        if (!res.ok) {
            return undefined;
        }

        const call: Call = await res.json();

        return call;
    } catch (err: any) {
        return undefined;
    }
}

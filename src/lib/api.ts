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

        // sort the calls so that the newest calls are always first
        // (API isn't said to be guaranteed chronological so sort is necessary)
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

/**
 * Update the `is_archived` state of a given call.
 * @param id The ID of the call to be updated.
 * @param archived The call's new archived status.
 * @returns true if the call was updated, false otherwise.
 */
async function setCallArchived(id: string, archived: boolean): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_URL}/activities/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: `{\n  "is_archived": ${archived}\n}`,
        });

        if (!res.ok) {
            throw new Error(`Failed to ${archived ? "" : "un"}archive call with ID: ${id}`);
        }

        return true;
    } catch (err: any) {
        console.error(err.message);
        return false;
    }
}

/**
 * Helper function to archive a given call.
 * @param id The call to archive.
 * @returns true if the call was archived successfully, false otherwise.
 */
export async function archiveCall(id: string): Promise<boolean> {
    return setCallArchived(id, true);
}

/**
 * Helper function to unarchive a given call.
 * @param id The call to unarchive.
 * @returns true if the call was unarchived successfully, false otherwise.
 */
export async function unarchiveCall(id: string): Promise<boolean> {
    return setCallArchived(id, false);
}

/**
 * Archives all calls in the list that are not already marked archived.
 * @param calls A list of calls to attempt to archive.
 * @returns true if any call is archived, false if no calls are archived
 */
export async function archiveMany(calls: Call[]): Promise<boolean> {
    try {
        if (calls.length === 0) throw new Error("No calls to unarchive.");

        // batch all operations so that navigation doesn't interrupt them
        const results = await Promise.all(
            calls.map((c) => {
                if (!c.is_archived) return archiveCall(c.id);
            })
        );

        // reduce the results to find at least one successful operation
        return (
            results.reduce((prev, current) => {
                if (current !== undefined) {
                    return (prev ||= current);
                }
                return prev;
            }) ?? false
        );
    } catch (err: any) {
        console.error(err);
        return false;
    }
}

/**
 * Unarchives all calls in the list that are not already marked unarchived.
 * @param calls A list of calls to attempt to unarchive.
 * @returns true if any call is unarchived, false if no calls are unarchived
 */
export async function unarchiveMany(calls: Call[]): Promise<boolean> {
    try {
        if (calls.length === 0) throw new Error("No calls to unarchive.");

        // batch all operations so that navigation doesn't interrupt them
        const results = await Promise.all(
            calls.map((c) => {
                if (c.is_archived) return unarchiveCall(c.id);
            })
        );

        // reduce the results to find at least one successful operation
        return (
            results.reduce((prev, current) => {
                if (current !== undefined) {
                    return (prev ||= current);
                }
                return prev;
            }) ?? false
        );
    } catch (err: any) {
        console.error(err);
        return false;
    }
}

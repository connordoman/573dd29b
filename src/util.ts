import { Call } from "./api";
import { casualDate } from "./date";

/**
 * Capitalizes the first character of a given string.
 * @param text The text to be capitalized.
 * @returns A new string where the first character is made uppercase.
 */
export function capitalize(text: string): string {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}

/**
 * A helper function to check if a call is inbound.
 * @param call The call to check.
 * @returns true is the call is "inbound", false otherwise.
 */
export function isCallInbound(call: Call): boolean {
    return call.direction === "inbound";
}

/**
 * A helper function to get the person who placed the call.
 * @param call The call to check.
 * @returns `call.from` if call is inbound, `call.to` otherwise.
 */
export function getCaller(call: Call): number {
    return isCallInbound(call) ? call.from : call.to;
}

/**
 * Formats a calls duration from seconds to some number of seconds, minutes, or hours,
 * and rounds to the nearest unit. e.g. call.duration == 90 -> 1.5 minutes -> "2 minutes"
 * @param call The call to interpret.
 * @returns The duration rounded to its appropriate unit.
 */
export function readableDuration(call: Call): string {
    if (call.duration < 60) {
        return call.duration.toString() + " seconds";
    } else if (call.duration < 3600) {
        return Math.round(call.duration / 60).toString() + " minutes";
    } else {
        return Math.round(call.duration / 3600).toString() + " hours";
    }
}

/**
 * Helper function to make a call's date more human readable.
 * @param call The call to interpret.
 * @param withTime Whether or not to include the time.
 * @returns A casual form of the call's creation date.
 */
export function readableDate(call: Call, withTime = false): string {
    const d = new Date(call.created_at);
    const daysSince = casualDate(d, withTime);
    return daysSince;
}

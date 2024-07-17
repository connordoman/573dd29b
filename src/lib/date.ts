import { Call } from "./api";

const DAY_MS = 1000 * 60 * 60 * 24;

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
};

/**
 * Helper function to combine thematic date & time options, if requested.
 * @param withTime Whether or not to include time.
 * @returns Formatting options with time fields, if specified.
 */
function determineDateTimeOptions(withTime: boolean): Intl.DateTimeFormatOptions {
    return { ...DATE_OPTIONS, ...(withTime ? TIME_OPTIONS : {}) };
}

/**
 *
 * @param date The date to compare
 * @returns The number of days since `date`, or 0 if `date` is in the future.
 */
export function daysAgo(date: Date): number {
    const now = new Date();
    const daysNow = Math.floor(now.getTime() / DAY_MS);
    const daysThen = Math.floor(date.getTime() / DAY_MS);

    if (daysThen > daysNow) {
        return 0;
    }

    const diffDays = daysNow - daysThen;
    return diffDays;
}

/**
 * Helper function to return the date as a casual, human readable string.
 * If it has been 0 days since `date`, this function will return "today".
 * Likewise, 1 day ago will be "yesterday", less than a week ago will be the weekday,
 * and any other timespan will be in the form of "Month DD, YYYY".
 * @param date The date to interpret.
 * @param withTime Whether or not to include the time.
 * @returns A human readable date with optional time.
 */
export function casualDate(date: Date, withTime = false): string {
    const daysSince = daysAgo(date);

    // Today
    if (daysSince === 0) {
        return `today ${withTime ? date.toLocaleTimeString(undefined, TIME_OPTIONS) : ""}`;
    }

    // Yesterday
    if (daysSince === 1) {
        return `yesterday ${withTime ? date.toLocaleTimeString(undefined, TIME_OPTIONS) : ""}`;
    }

    // Within the week
    if (daysSince < 7) {
        return date.toLocaleDateString(undefined, { weekday: "long", ...(withTime ? TIME_OPTIONS : {}) });
    }

    // Some date
    return date.toLocaleDateString(undefined, determineDateTimeOptions(withTime)).replace(" at", "");
}

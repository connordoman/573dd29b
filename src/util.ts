/**
 * Capitalizes the first character of a given string.
 * @param text The text to be capitalized.
 * @returns A new string where the first character is made uppercase.
 */
export function capitalize(text: string): string {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}

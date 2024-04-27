/**
 * Return a number between a minimum value (inclusive) and a maximum value (exclusive).
 * 
 * @param min The lowest possible value (inclusive).
 * @param max The highest possible value (exclusive).
 * 
 * @returns The random number.
 */
export function rng(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Return a default chosen value if the input string is empty.
 * 
 * @param text         The text to check.
 * @param defaultValue The value to return if the text is empty. 
 * 
 * @returns The chosen value.
 */
export function setDefaultValue(text:string, defaultValue:string): string {
    if(text === null || text === undefined || text.length === 0) return defaultValue;
    return text;
}
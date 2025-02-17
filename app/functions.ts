/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * Modified version of https://bost.ocks.org/mike/shuffle to include a seed.
 */
export function shuffle(array: string[], seed: number): string[] {
    let remainingElements = array.length;
    let swappedElement: string;
    let randomElement: number;

    while (remainingElements) {
        randomElement = Math.floor(random(seed) * remainingElements--);
        swappedElement = array[remainingElements];
        array[remainingElements] = array[randomElement];
        array[randomElement] = swappedElement;
        ++seed;
    }

    return array;
}

/**
 * Generates a random number between 0 and 1.
 * @param seed 
 * @returns 
 */
export function random(seed: number): number {
    const x = Math.sin(seed++) * 10000;

    return x - Math.floor(x);
}

export function nearestSunday(date: Date = new Date()): Date {
    const day = date.getDay();

    if (day === 0) return date;

    const daysUntilSunday = 7 - day;

    date.setDate(date.getDate() + daysUntilSunday);

    return date;
}

export function nextSunday(date: Date = new Date()): Date {
    const day = date.getDay();
    const daysUntilSunday = 7 - day;

    date.setDate(date.getDate() + daysUntilSunday);

    return date;
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('af-ZA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * Modified version of https://bost.ocks.org/mike/shuffle to include a seed.
 */
export function shuffle<T>(array: T[], seed: number): T[] {
    let remainingElements = array.length;
    let swappedElement: T;
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
    const sunday = new Date(date);
    const day = sunday.getDay();

    if (day === 0) return sunday;

    const daysUntilSunday = 7 - day;

    sunday.setDate(sunday.getDate() + daysUntilSunday);

    return sunday;
}

export function numberOfSundaysBetweenDates(startDate: Date, endDate: Date = new Date()): number {
    const start = nearestSunday(startDate);
    const end = nearestSunday(endDate);
    let sundaysCount = 0;

    while (start < end) {
        sundaysCount++;
        start.setDate(start.getDate() + 7);
    }

    return sundaysCount;
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('af-ZA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

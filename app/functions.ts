import { env } from "./env";

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * Modified version of https://bost.ocks.org/mike/shuffle to include a seed.
 */
export function shuffle<T>(array: T[], seed: number): T[] {
    const tempArray = [...array];
    let remainingElements = tempArray.length;
    let swappedElement: T;
    let randomElement: number;

    while (remainingElements) {
        randomElement = Math.floor(random(seed) * remainingElements--);
        swappedElement = tempArray[remainingElements];
        tempArray[remainingElements] = tempArray[randomElement];
        tempArray[randomElement] = swappedElement;
        ++seed;
    }

    return tempArray;
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

export function nearestSunday(date: Date = today()): Date {
    const sunday = new Date(date);
    const day = sunday.getDay();

    if (day === 0) return sunday;

    const daysUntilSunday = 7 - day;

    sunday.setDate(sunday.getDate() + daysUntilSunday);

    return sunday;
}

export function numberOfSundaysBetweenDates(startDate: Date, endDate: Date = today()): number {
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

export function getNextDiakenName(sundayIndex: number, diakenIndex: number, numberOfSundays: number, shuffledDiakens: string[]): string {
    const offsetSundays = numberOfSundays + sundayIndex;
    const defaultIndices = [0, 1, 2, 3];
    const shuffledIndices = shuffle<number>(defaultIndices, env.seed + env.numberOfSundays); // new env.seed based on original env.seed and number of offset sundays
    const shuffledIndex = shuffledIndices[diakenIndex];
    
    return shuffledDiakens[
        (offsetSundays * 4 + shuffledIndex) % shuffledDiakens.length
    ];
}

export function today(): Date {
    return new Date(new Date().setHours(0,0,0,0));
}

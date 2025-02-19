export const env = {
    numberOfSundays: parseInt(process.env.NUMBER_OF_SUNDAYS || '6'),
    dateOrigin: new Date(process.env.DATE_ORIGIN || '2025-02-09'),
    seed: parseInt(process.env.SEED || '0'),
    diakens: process.env.DIAKENS ? process.env.DIAKENS.split(',') : []
};
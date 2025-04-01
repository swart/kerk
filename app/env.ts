export const env = {
    numberOfSundays: parseInt(process.env.NEXT_PUBLIC_NUMBER_OF_SUNDAYS || '6'),
    dateOrigin: new Date(process.env.NEXT_PUBLIC_DATE_ORIGIN || '2025-02-23'),
    seed: parseInt(process.env.NEXT_PUBLIC_SEED || '1517'),
    diakens: process.env.NEXT_PUBLIC_DIAKENS ? process.env.NEXT_PUBLIC_DIAKENS.split(',') : ["Petrus","Andreas","Jakobus","Johannes","Filippus","Bartolomeus","Tomas","Matteus","Jakobus","Taddeus","Simon","Judas"]
};
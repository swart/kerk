export const env = {
    numberOfSundays: parseInt(process.env.NUMBER_OF_SUNDAYS || '6'),
    dateOrigin: new Date(process.env.DATE_ORIGIN || '2025-02-09'),
    seed: parseInt(process.env.SEED || '1517'),
    diakens: process.env.DIAKENS ? process.env.DIAKENS.split(',') : ["Petrus","Andreas","Jakobus","Johannes","Filippus","Bartolomeus","Tomas","Matteus","Jakobus","Taddeus","Simon","Judas"]
};
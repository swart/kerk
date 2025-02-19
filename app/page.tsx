"use client";
import { useState } from "react";
import { formatDate, nearestSunday, shuffle } from "./functions";
import { useScrollEnd } from "./hooks";
import { env } from "./env";

const numberOfSundays = env.numberOfSundays;
const dateOrigin = env.dateOrigin;
const seed = env.seed;
const diakens = env.diakens;
const shuffledDiakens = shuffle<string>(diakens, seed);

function sundaysFromOriginUntilNow() {
    const today = new Date();
    const nearestSundayFromOrigin = nearestSunday(dateOrigin);

    const diffTime = Math.abs(
        today.getTime() - nearestSundayFromOrigin.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return Math.floor(diffDays / 7);
}

function getNextDiakenName(sundayIndex: number, diakenIndex: number) {
    const values = [0, 1, 2, 3];
    const shuffledValues = shuffle<number>(values, seed + sundayIndex);
    const shuffledIndex = shuffledValues[diakenIndex];
    
    return shuffledDiakens[
        ((sundayIndex + sundaysFromOriginUntilNow()) * 4 + shuffledIndex) %
            shuffledDiakens.length
    ];
}

export default function Home() {
    const [numberOfSundaysToRender, setNumberOfSundaysToRender] = useState<number>(numberOfSundays);

    useScrollEnd(() => {
        setNumberOfSundaysToRender(
            (previousValue) => previousValue + numberOfSundays
        );
    });

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-2 row-start-2 items-center items-start border dark:border-white/[.1] rounded-lg p-8 sm:p-12">
                <h1 className="text-1x1 font-bold text-center pb-5">Gereformeerde Kerk Bellville</h1>
                <h2 className="text-4xl font-bold text-center">Diaken Diensbeurte</h2>
                {Array.from(
                    { length: numberOfSundaysToRender },
                    (_, sundayIndex) => {
                        const date = nearestSunday();
                        date.setDate(date.getDate() + sundayIndex * 7);

                        return (
                            <>
                                <hr className="w-full border-t dark:border-white/[.1] my-8" />

                                <div
                                    key={`sunday-${sundayIndex}`}
                                    className="flex items-center gap-2 pb-6 sm:pb-8 text-2xl sm:text-3xl font-semibold"
                                >
                                    {formatDate(date)}
                                </div>

                                {Array.from({ length: 4 }, (_, diakenIndex) => (
                                    <div
                                        key={`diaken-${diakenIndex}`}
                                        className="flex items-center gap-2 text-1xl sm:text-2xl"
                                    >
                                        <span>{diakenIndex + 1}.</span>
                                        <span>
                                            {getNextDiakenName(
                                                sundayIndex,
                                                diakenIndex
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </>
                        );
                    }
                )}
            </div>
        </div>
    );
}

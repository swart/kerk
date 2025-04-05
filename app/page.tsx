"use client";
import { useState, Fragment } from "react";
import { formatDate, getNextDiakenName, nearestSunday, numberOfSundaysBetweenDates, shuffle } from "./functions";
import { useScrollEnd } from "./hooks";
import { env } from "./env";

export default function Home() {
    const [numberOfSundaysToRender, setNumberOfSundaysToRender] = useState<number>(env.numberOfSundays);
    const [numberOfSundaysFromOrigin] = useState(numberOfSundaysBetweenDates(env.dateOrigin) - 1); // TODO: remove -1, temporarily shifted everything by 1.
    const [shuffledDiakens] = useState(shuffle<string>(env.diakens, env.seed));

    useScrollEnd(() => {
        setNumberOfSundaysToRender(
            (previousValue) => previousValue + env.numberOfSundays
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
                            <Fragment key={`sunday-${sundayIndex}`}>
                                <hr className="w-full border-t dark:border-white/[.1] my-8" />

                                <div className="flex items-center gap-2 pb-6 sm:pb-8 text-2xl sm:text-3xl font-semibold">
                                    {formatDate(date)}
                                </div>

                                {Array.from({ length: 4 }, (_, diakenIndex) => (
                                    <div
                                        key={`diaken-${sundayIndex}-${diakenIndex}-`}
                                        className="flex items-center gap-2 text-1xl sm:text-2xl"
                                    >
                                        <span>{diakenIndex + 1}.</span>
                                        <span>{getNextDiakenName(sundayIndex, diakenIndex, numberOfSundaysFromOrigin, shuffledDiakens)}</span>
                                    </div>
                                ))}
                            </Fragment>
                        );
                    }
                )}
            </div>
        </div>
    );
}

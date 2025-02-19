import { useEffect } from "react";

export function useScrollEnd(callback: () => void) {
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY + 50 >= document.body.offsetHeight) {
                callback();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [callback]);
}

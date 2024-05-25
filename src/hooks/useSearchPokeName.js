import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

//  Hook to Search one pokemon specifically
const useSearchPokeName = (query, transformData, promise, debounceWait, autoComplete) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(debounce(async (query, transformData, signal) => {
        try {
            const response = await promise(query, signal);
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            const filteredItems = transformData(data).filter((item) =>
                item.name.includes(query.toLowerCase()));
            setData(filteredItems.slice(0, 6))
        } catch (e) {
            if(!signal.aborted) setError(e);
        }
}, debounceWait), [])


    useEffect(() => {
        if(!query || !autoComplete) {
            setData(null);
            setError(null);
            return;
        }
        const controller = new AbortController();
        const signal = controller.signal;
        fetchData(query, transformData, signal);

        return() => {
            controller.abort();
        }
    }, [query, transformData, fetchData, autoComplete]);

    return [data, setData, error];
};

export default useSearchPokeName;
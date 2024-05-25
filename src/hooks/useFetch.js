import { useEffect, useState } from 'react'

/* Hook to consume rest pokemon petition
   params: Endpoint or URL to use in the petition
*/
export function useFetch (endpoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => {setError(error)})
            .finally(() => setLoading(false));
    }, [endpoint])

    return { data, loading, error }
}

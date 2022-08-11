import useSWR from "swr";

const ResultsShower = (props) => {
    const {query, queryParams} = props;
    // const fetcher = async (url) => await fetch(url).then(res => res.json())
    const fetchWithParams = async (url) => {
        return await fetch(url,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryParams)
        })
        .then(res => res.json())
    };
    // const {data, error} = useSWR(`/api/words/${query}`, fetcher)
    const {data, error} = useSWR(`/api/words/${query}`, fetchWithParams)    
    console.log('rs', query, data);

    if (error) return <div>Failed to load</div>
    if (!data ) return <div>Loading...</div>

    return (
        <div className="results">
            results:
            <span key={query}> {JSON.stringify(data)}</span>
        </div>
    )
}

export default ResultsShower
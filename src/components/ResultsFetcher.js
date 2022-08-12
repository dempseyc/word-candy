import useSWR from 'swr';
import {useRef, useEffect} from 'react';
import ResultsDisplay from './ResultsDisplay';

const ResultsFetcher = (props) => {
    const {query, queryParams} = props;

    const reducedData = useRef();
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
    const {data, error} = useSWR(`/api/words/${query}`, fetchWithParams, {onSuccess: (data) => {
        reducedData.current = {...data, ...reducedData.current}
    } });

    console.log('rs', query, data);

    if (error) return <div>Failed to load</div>
    if (!data ) { return <div>Loading...</div> }

    return (
        <div className="results">
            <ResultsDisplay keyWord={query} data={reducedData.current} />
        </div>
    )
}

export default ResultsFetcher
import useSWR from 'swr';
import {useRef, useEffect} from 'react';
import ResultsDisplay from './ResultsDisplay';

const ResultsFetcher = (props) => {
    const {query, queryParams} = props;

    const reducedData = useRef();

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

    const {data, error} = useSWR(`/api/words/${query}`, fetchWithParams, {onSuccess: (data) => {
        if (reducedData.current) {
            reducedData.current = reducedData.current.hasOwnProperty('initial') ? data : ({...data, ...reducedData.current})
            return;
        }
        reducedData.current = ({...data, ...reducedData.current});
    } });

    if (error) {
        console.log(error);
        return <div>Failed to load</div>
    }
    if (!data ) { return <div>Loading...</div> }

    return (
        <div className="results">
            <ResultsDisplay keyWord={query} data={reducedData.current} />
        </div>
    )
}

export default ResultsFetcher
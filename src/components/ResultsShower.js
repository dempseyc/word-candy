import useSWR from "swr";

const ResultsShower = (props) => {
    const {query} = props;
    const fetcher = async (url) => await fetch(url).then((res) => res.json())
    const {data, error} = useSWR(`/api/words/${query}`, fetcher)
    console.log('rs', query, data);

    if (error) return <div>Failed to load</div>
    if (!data || !data.words.length) return <div>Loading...</div>

    return (
        <div className="results">
            results:
            {data.words.map(item => <span key={item.word}> {item.word}</span>)}
        </div>
    )
}

export default ResultsShower
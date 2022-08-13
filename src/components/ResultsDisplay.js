// will need a text block Props: bgColor, txtColor, borderColor, keyWord, rel, word, xPos, yPos, Links: [maybe index from serialized object]

// const WordBlock = (props) => {
//     const {bgColor, txtColor, borderColor, keyWord, rel, word, xPos, yPos, links} = props;
//     return <div className="word-block">{word}</div>
// }


const networkOfWords = (obj, network={nodes:[],links:[]}, indexFrom=0, keywordIndex=0) => {
    for (let key in obj) {
        // handle keywords
        network.nodes.push({id: indexFrom, word: key, isKeyword: true});
        keywordIndex = indexFrom;
        indexFrom++;
        // handle querykeys
        let queries = obj[key];
        for (let qkey in queries) {
            queries[qkey].forEach(item => {
                network.nodes.push({id: indexFrom, isKeyword: false, ...item})
                network.links.push({from: keywordIndex, to: indexFrom, rel: qkey})
                indexFrom++;
            })
        }
    }
    return network;
}

const ResultsDisplay = (props) => {
    const {keyWord, data} = props;
    const words = networkOfWords(data);
    return (
    <div>
        <p>{words.nodes.map(node => {
                return ( node.isKeyword ? 
                <span style={{fontWeight: 'bold'}} key={node.word}>{node.word} </span> :
                <span key={node.word}>{node.word} </span>
                )
            })
        }</p>
    </div>
    )
}

export default ResultsDisplay;

// {"bust":{"rel_bga":[{"word":"of","score":312295},{"word":".","score":96099},{"word":"in","score":44213},{"word":"and","score":33041},{"word":"was","score":20030}],"ml":[{"word":"binge","score":13316882,"tags":["syn","n","results_type:primary_rel"]},{"word":"flop","score":13027431,"tags":["syn","n"]},{"word":"raid","score":12841573,"tags":["syn","n"]},{"word":"burst","score":12781219,"tags":["syn","n"]},{"word":"break","score":12567263,"tags":["syn","n"]}]}}
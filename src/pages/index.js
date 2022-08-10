import {useState} from 'react'
import ObservedTextArea from '../components/ObservedTextArea.js'
import ResultsShower from '../components/ResultsShower'

export default function Home() {
  const [display, setDisplay] = useState(<ResultsShower query=""/>);

  const makeQuery = function (query) {
    setDisplay(<ResultsShower query={query}/>);
  }

  return (
    <div className="h-full w-full bg-transparent flex flex-col border-solid border-2 border-red-500">
      {display}
      <ObservedTextArea makeQuery={makeQuery}/>
    </div>

  )
}

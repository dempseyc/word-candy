import {useState} from 'react'
import ObservedTextArea from '../components/ObservedTextArea.js'
import ResultsFetcher from '../components/ResultsFetcher'

const queryParams = ['ml','rel_rhy']

export default function Home() {
  const [display, setDisplay] = useState(<ResultsFetcher query="" queryParams={queryParams}/>);

  const makeQuery = function (query) {
    setDisplay(<ResultsFetcher query={query} queryParams={queryParams}/>);
  }

  return (
    <div className="h-full w-full bg-transparent flex flex-col border-solid border-2 border-red-500">
      {display}
      <ObservedTextArea makeQuery={makeQuery}/>
    </div>

  )
}

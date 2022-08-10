import { useState, useEffect, useRef } from 'react'

//compare arrays of strings
const sameData = function (arr1,arr2) {
    if (arr1.length != arr2.length) { return false; }
    if (!arr1 || !arr2) { return false; }
    if (JSON.stringify(arr1) != JSON.stringify(arr2))  { return false; }
    return true;
}

const ObservedTextArea = (props) => {
    const {makeQuery} = props;
    const [val, setVal] = useState("");
    const [currWordArray, setCurrWordArray] = useState([]);

    const isSame = (arr1,arr2) => sameData(arr1,arr2);
    
    const handleChange = (e) => {
        let newVal = e.target.value
        // control input val
		setVal(newVal);
        // if you use isSettled, have to await it then execute or better, make eventhandler
        // when val changes, if lastChar is " ", redo wordArray, filter out 0-200, if filtered wordArray
        if (newVal.charAt(newVal.length-1) == " ") {
            let newArray = newVal.split(" ");
            ////////////////// newArray = newArray.filter( (word) => !inBlacklist(word) )
            // has changed, make new queries to api
            if ( !isSame(newArray,currWordArray) ) {
                makeQuery(newArray[newArray.length-2]); // -2 omits last item, the space
                setCurrWordArray(newArray);
            }
        }

	}

    return (
        <div className = "textarea">
            <form className="w-full">
                <textarea
                 className="w-full"
                 value={val}
                 onChange={handleChange}
                >
                </textarea>
            </form>
        </div>
    )
}

export default ObservedTextArea
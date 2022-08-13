import { useState, useEffect, useRef } from 'react'

import { FIRST65 } from "../blacklist";

//compare arrays of strings
const sameData = function (arr1,arr2) {
    if (!arr1 || !arr2) { return false; }
    if (arr1.length != arr2.length) { return false; }
    if (JSON.stringify(arr1) != JSON.stringify(arr2))  { return false; }
    return true;
}

const ObservedTextArea = (props) => {
    const {makeQuery} = props;
    const [val, setVal] = useState("");
    const [currWordArray, setCurrWordArray] = useState([]);

    const isSame = (arr1,arr2) => sameData(arr1,arr2);
    // words and hyphenated words
    const isWordPattern = new RegExp(/[A-Za-z][a-z]*\-?[a-z]*/g);
    
    const handleChange = (e) => {
        let newVal = e.target.value
        // control input val
		setVal(newVal);
        // if you use isSettled, have to await it then execute or better, make eventhandler
        // when val changes, if lastChar is " ", redo wordArray, filter out common words
        if (newVal.charAt(newVal.length-1) == " ") {
            let newArray = newVal.match(isWordPattern).filter(word => !FIRST65.includes(word));
            console.log(newArray);
            if ( !isSame(newArray,currWordArray) ) {
                let word = newArray[newArray.length-1];
                if (word !== '') {
                    makeQuery(newArray[newArray.length-1]);
                    setCurrWordArray(newArray);
                }
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
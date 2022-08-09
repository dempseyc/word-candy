import { useState, useEffect, useRef } from 'react'

const useIsSettled = function (value, delay = 1500) {
	const [isSettled, setIsSettled] = useState(true);
	const isFirstRun = useRef(true);
	const prevValueRef = useRef(value);
  
	useEffect(() => {
	  if (isFirstRun.current) {
		isFirstRun.current = false;
		return;
	  }
	  setIsSettled(false);
	  prevValueRef.current = value;
	  const timerId = setTimeout(() => {
		setIsSettled(true);
	  }, delay);
	  return () => { clearTimeout(timerId); }
	}, [delay, value]);
	if (isFirstRun.current) {
	  return true;
	}
	return isSettled && prevValueRef.current === value;
}

const ObservedTextArea = (props) => {
    const {lastWord} = props;
    const [val, setVal] = useState(lastWord);
	const isValueSettled = useIsSettled(val,1500);

    useEffect(() => {
		if (isValueSettled && (lastWord !== val)) {
			console.log('do api thing');
		}
	},[val, isValueSettled])

    const handleChange = (e) => {
		setVal(e.target.value);
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
import {useRef, useState} from 'react'

export const useIsSettled = function (value, delay = 1500) {
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
import { useState, useEffect } from "react";

// 닉네임 디바운스
function useDebounce(value:string, delay: number) {
  const [debounceVal, setDebounce] = useState<string>(value)

  useEffect(() => {
    const handler = setTimeout(()=> {
      setDebounce(value);
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceVal
}

export default useDebounce;
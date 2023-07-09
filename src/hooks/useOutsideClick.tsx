import { useEffect } from "react";

interface Props {
  divRef: React.MutableRefObject<HTMLDivElement | null | undefined>;
  handler: (event: Event) => void;
}

export default function useOutsideClick({divRef, handler}: Props) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!divRef.current || divRef.current.contains(event.target as Node)) {
        return;
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    }

  }, [divRef, handler])
}
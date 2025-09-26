import { useEffect, useRef } from "react";

export function useOutSideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapture: boolean = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) handler();
    }
    document.addEventListener("click", handleOutsideClick, listenCapture);
    return () => {
      document.removeEventListener("click", handleOutsideClick, listenCapture);
    };
  }, [handler, listenCapture]);

  return ref;
}

import { useEffect, useRef } from "react";

export default function useObserver(cb, deps) {
  let ref = useRef();

  useEffect(() => {
    let observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) cb();
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref?.current) observer.observe(ref.current);

    return () => {
      if (ref?.current) observer.disconnect(ref.current);
    };
  }, [ref, ...deps]);

  return ref;
}

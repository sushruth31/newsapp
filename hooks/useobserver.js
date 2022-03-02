import { useEffect, useRef, useState } from "react";

export default function useObserver(deps = []) {
  let [isIntersecting, setIsIntersecting] = useState(false);
  let ref = useRef();

  useEffect(() => {
    let observer = new IntersectionObserver(events => {
      events.forEach(console.log);
    });

    observer.observe(ref);

    return () => observer.disconnect(ref);
  }, []);

  return { ref, isIntersecting };
}

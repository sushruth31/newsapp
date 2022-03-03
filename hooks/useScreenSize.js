import { useState, useLayoutEffect } from "react";

export default function useScreenSize() {
  let [screenSize, setScreenSize] = useState(window.innerWidth);

  useLayoutEffect(() => {
    let cb = e => setScreenSize(e.target.innerWidth);

    window.addEventListener("resize", cb);

    return () => window.removeEventListener("resize", cb);
  }, []);

  return screenSize;
}

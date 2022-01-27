import { useEffect, useState } from "react";

export default function useIntersectionObserver(config) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [lastPostRefState, setLastPostRefState] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let firstEntry = entries[0];
      setIsIntersecting(firstEntry.isIntersecting);
    }, config);

    if (lastPostRefState && lastPostRefState.current) {
      observer.observe(lastPostRefState.current);
    }

    return () => {
      if (lastPostRefState && lastPostRefState.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(lastPostRefState.current);
      }
    };
  });

  return [isIntersecting, setLastPostRefState];
}

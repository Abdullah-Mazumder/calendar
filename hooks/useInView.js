/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useInView = (childRef) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting);
      });
    });

    if (childRef.current) {
      sectionObserver.observe(childRef.current);
    }

    return () => {
      if (childRef.current) {
        sectionObserver.unobserve(childRef.current);
      }
    };
  }, [childRef]);

  return isInView;
};

export default useInView;

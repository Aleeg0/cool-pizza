import {useEffect, useState} from "react";

type useScrollTriggerType = (triggerType?: number) => boolean;

export const useScrollTrigger : useScrollTriggerType = (threshold = 0) => {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > threshold);
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold])

  return isScroll;
}
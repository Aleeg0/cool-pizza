import {useEffect} from "react";

export const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollY = window.scrollY;

    document.body.style.setProperty('--size-main-scroll-bar', `${scrollbarWidth}px`);
    document.body.classList.add('modalOpen');
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.body.style.removeProperty('--size-main-scroll-bar');
      document.body.classList.remove('modalOpen');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};
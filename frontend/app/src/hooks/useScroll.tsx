import { useEffect } from 'react';

export const useScroll = (onScroll: () => void, threshold = 1) => {
  const scrollHandler = () => {
    const scrollableElement = document.documentElement;
    const scrollHeight = scrollableElement.scrollHeight;
    const scrollTop = scrollableElement.scrollTop;
    const clientHeight = scrollableElement.clientHeight;
    const scrollPosition = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPosition >= threshold) {
      onScroll();
    }
  };

  useEffect(() => {
    const modal = document.getElementById('sidebar-scroll');
    modal!.addEventListener('scroll', scrollHandler);

    return () => {
      const modal = document.getElementById('sidebar-scroll');
      modal!.removeEventListener('scroll', scrollHandler);
    };
  }, [onScroll, threshold]);
};

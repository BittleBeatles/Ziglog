import { useEffect } from 'react';

export const useScrollObserver = (onScroll: () => void, threshold = 0.8) => {
  useEffect(() => {
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

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [onScroll, threshold]);
};

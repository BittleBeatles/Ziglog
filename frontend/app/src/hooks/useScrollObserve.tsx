import { useEffect, RefObject } from 'react';

export const useScrollObserver = (
  ref: RefObject<HTMLElement> | null,
  onScroll: () => void,
  threshold = 0.8
) => {
  useEffect(() => {
    const scrollHandler = () => {
      let scrollableElement;

      if (ref && ref.current) {
        scrollableElement = ref.current;
      } else {
        scrollableElement = document.documentElement;
      }

      const scrollHeight = scrollableElement.scrollHeight;
      const scrollTop = scrollableElement.scrollTop;
      const clientHeight = scrollableElement.clientHeight;
      const scrollPosition = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPosition >= threshold) {
        onScroll();
      }
    };

    const target = ref?.current || window;
    target.addEventListener('scroll', scrollHandler);

    return () => {
      target.removeEventListener('scroll', scrollHandler);
    };
  }, [ref, onScroll, threshold]);
};

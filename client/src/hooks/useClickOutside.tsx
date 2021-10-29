import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  otherRef: RefObject<HTMLDivElement>,
  fn: (...args: any) => void,
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (ref?.current && !ref.current?.contains(event.target as HTMLElement)) {
        fn();
      }
    }

    // Bind the event listener
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, fn]);
};

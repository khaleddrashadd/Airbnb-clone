'use client';

import { useEffect, useRef } from 'react';

const useClickOutside = handleClick => {
  const clickRef = useRef();

  useEffect(() => {
    const handleClickOutside = e => {
      if (clickRef.current && !clickRef.current.contains(e.target)) {
        handleClick();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClick]);

  return clickRef;
};
export default useClickOutside;

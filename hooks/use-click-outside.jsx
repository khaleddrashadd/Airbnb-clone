'use client';

import { useCallback, useEffect, useRef } from 'react';

const useClickOutside = handleClick => {
  const clickRef = useRef();

  const handleClickOutside = useCallback(
    e => {
      if (clickRef.current && !clickRef.current.contains(e.target)) {
        handleClick();
      }
    },
    [handleClick]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return clickRef;
};
export default useClickOutside;

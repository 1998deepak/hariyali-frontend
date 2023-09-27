import React from 'react'
import { useEffect } from 'react';

const useScrollTop = () => {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // This adds a smooth scroll animation
        });
      }, [])
}

export default useScrollTop

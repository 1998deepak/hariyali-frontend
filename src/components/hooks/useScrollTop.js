import React from 'react'
import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

const useScrollTop = () => {
  // new code by pankaj
  useEffect(() => {
    const scrollToTop = () => {
      scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuart' });
    };

    scrollToTop();
  }, []);
    // useEffect(() => {
    //     window.scrollTo({
    //       top: 0,
    //       behavior: 'smooth', // This adds a smooth scroll animation
    //     });
    //   }, [])
}

export default useScrollTop

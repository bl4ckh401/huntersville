'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 150;
      
      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger on initial load and route changes
    setTimeout(revealOnScroll, 100);

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, [pathname]);

  return null;
}

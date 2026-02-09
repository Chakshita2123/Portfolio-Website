'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal - Adds cinematic reveal animations on scroll
 * Uses depth, blur, and opacity for a premium feel
 */
export default function ScrollReveal({ children, delay = 0, width = '100%' }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.15,
                rootMargin: '50px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                width,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) translateZ(0)' : 'translateY(40px) translateZ(-50px)',
                filter: isVisible ? 'blur(0)' : 'blur(10px)',
                transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
            }}
        >
            {children}
        </div>
    );
}

'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal - Cinematic Camera Entrance
 * Simulates camera movement through space
 */
export default function ScrollReveal({ children, delay = 0, width = '100%', threshold = 0.15 }) {
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
                threshold,
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
    }, [threshold]);

    return (
        <div
            ref={ref}
            className="reveal-wrapper"
            style={{
                width,
                opacity: isVisible ? 1 : 0,
                // Cinematic Entrance: Scale up from depth + slight tilt + slide up
                transform: isVisible
                    ? 'scale(1) translateY(0) rotateX(0) translateZ(0)'
                    : 'scale(0.92) translateY(60px) rotateX(5deg) translateZ(-100px)',
                filter: isVisible ? 'blur(0)' : 'blur(8px)',
                transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter'
            }}
        >
            {children}
        </div>
    );
}

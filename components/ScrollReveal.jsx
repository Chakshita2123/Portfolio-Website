'use client';
import { useRef, useEffect, useState } from 'react';

export default function ScrollReveal({ children, style, className, stagger }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.12,
                rootMargin: '80px 0px'
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
            className={`${className || ''} reveal-section ${isVisible ? 'is-visible' : ''} ${stagger ? 'reveal-section--stagger' : ''}`}
            data-visible={isVisible}
            style={{
                ...style,
                transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), filter 1s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1) translateY(0) translateZ(0)' : 'scale(0.97) translateY(36px) translateZ(-20px)',
                filter: isVisible ? 'blur(0)' : 'blur(6px)',
                willChange: 'opacity, transform, filter'
            }}
        >
            {children}
        </div>
    );
}

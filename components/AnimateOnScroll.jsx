'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * AnimateOnScroll - A wrapper component that triggers animations when elements enter the viewport
 * @param {React.ReactNode} children - Child elements to animate
 * @param {string} animation - Animation class: 'fadeInUp', 'fadeIn', 'slideInLeft', 'slideInRight'
 * @param {number} delay - Animation delay in milliseconds
 * @param {number} threshold - Intersection threshold (0-1)
 * @param {boolean} once - If true, only animate once
 */
export default function AnimateOnScroll({
    children,
    animation = 'fadeInUp',
    delay = 0,
    threshold = 0.1,
    once = true,
    className = ''
}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, once]);

    const animationStyles = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible
            ? 'translateY(0) translateX(0)'
            : animation === 'fadeInUp'
                ? 'translateY(40px)'
                : animation === 'slideInLeft'
                    ? 'translateX(-40px)'
                    : animation === 'slideInRight'
                        ? 'translateX(40px)'
                        : 'translateY(0)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    };

    return (
        <div ref={ref} style={animationStyles} className={className}>
            {children}
        </div>
    );
}

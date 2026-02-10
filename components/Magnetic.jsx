'use client';
import { useRef, useState, useEffect } from 'react';

export default function Magnetic({ children, strength = 50 }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const { left, top, width, height } = element.getBoundingClientRect();
            const x = e.clientX - (left + width / 2);
            const y = e.clientY - (top + height / 2);

            // Only move if close enough (optional optimization)
            setPosition({ x: x * 0.3, y: y * 0.3 });
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.1s ease-out',
                display: 'inline-block'
            }}
        >
            {children}
        </div>
    );
}

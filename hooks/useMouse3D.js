import { useState, useEffect } from 'react';

export default function useMouse3D(ref, strength = 20) {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const splitX = rect.left + rect.width / 2;
            const splitY = rect.top + rect.height / 2;

            const mouseX = e.clientX - splitX;
            const mouseY = e.clientY - splitY;

            const rotateX = (mouseY / rect.height / 2) * -strength; // Invert Y
            const rotateY = (mouseX / rect.width / 2) * strength;

            setRotate({ x: rotateX, y: rotateY });
        };

        const handleMouseLeave = () => {
            setRotate({ x: 0, y: 0 });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, strength]);

    return rotate;
}

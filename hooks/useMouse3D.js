import { useEffect } from 'react';
import { usePerformanceTier } from './usePerformanceTier';

/**
 * useMouse3D - High performance 3D tilt effect using direct DOM manipulation.
 * Applies transform directly to the target element to avoid React re-renders.
 */
export default function useMouse3D(containerRef, targetRef, strength = 20) {
    const { reducedMotion } = usePerformanceTier();

    useEffect(() => {
        const container = containerRef.current;
        const target = targetRef.current;

        if (!container || !target || reducedMotion) return;

        let frameId;
        let rotateX = 0;
        let rotateY = 0;
        let currentRotateX = 0;
        let currentRotateY = 0;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Calculate target rotation
            rotateX = ((mouseY / rect.height) * -strength).toFixed(2);
            rotateY = ((mouseX / rect.width) * strength).toFixed(2);
        };

        const handleMouseLeave = () => {
            rotateX = 0;
            rotateY = 0;
        };

        // Smooth animation loop
        const loop = () => {
            // Linear interpolation (LERP) for smoothness
            currentRotateX += (rotateX - currentRotateX) * 0.1;
            currentRotateY += (rotateY - currentRotateY) * 0.1;

            target.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

            frameId = requestAnimationFrame(loop);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        frameId = requestAnimationFrame(loop);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(frameId);
            // Reset transform on cleanup
            if (target) target.style.transform = '';
        };
    }, [containerRef, targetRef, strength, reducedMotion]);
}

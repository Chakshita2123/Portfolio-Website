'use client';
import { useEffect, useRef } from 'react';

/**
 * useGlassTilt - Adds a subtle 3D tilt and specular glass reflection on hover
 * @param {number} maxTilt - Maximum rotation angle in degrees (default 6)
 */
export function useGlassTilt(maxTilt = 6) {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Check if device supports hover
        const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!isHoverable) return;

        // Ensure relative positioning and 3D space
        card.style.position = card.style.position || 'relative';
        card.style.transformStyle = 'preserve-3d';
        card.style.willChange = 'transform, box-shadow';

        // Add specular glass glare element if not present
        let glare = card.querySelector('.glass-specular-glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.className = 'glass-specular-glare';
            glare.style.position = 'absolute';
            glare.style.inset = '0';
            glare.style.borderRadius = 'inherit';
            glare.style.pointerEvents = 'none';
            glare.style.opacity = '0';
            glare.style.transition = 'opacity 0.25s ease';
            glare.style.zIndex = '4';
            card.appendChild(glare);
        }

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (((y - centerY) / centerY) * -maxTilt).toFixed(2);
            const rotateY = (((x - centerX) / centerX) * maxTilt).toFixed(2);

            // No transition during active tracking for zero-latency response
            card.style.transition = 'none';
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Directional dynamic drop-shadow
            const shadowX = (rotateY * -1.2).toFixed(1);
            const shadowY = (Math.abs(rotateX) * 1.5 + 8).toFixed(1);
            card.style.boxShadow = `${shadowX}px ${shadowY}px 28px rgba(43, 46, 39, 0.2)`;

            // Soft specular glass reflection
            if (glare) {
                glare.style.opacity = '0.14';
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.5) 0%, rgba(147, 168, 134, 0.15) 30%, transparent 65%)`;
            }
        };

        const handleMouseLeave = () => {
            // Smooth easing transition back to rest
            card.style.transition = 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.28s ease';
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.boxShadow = '';
            if (glare) {
                glare.style.opacity = '0';
            }
        };

        card.addEventListener('mousemove', handleMouseMove, { passive: true });
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
            if (glare && glare.parentNode === card) {
                card.removeChild(glare);
            }
        };
    }, [maxTilt]);

    return cardRef;
}

export default useGlassTilt;

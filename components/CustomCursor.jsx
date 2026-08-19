'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

const LERP_RING = 0.18;
const LERP_AMBIENT = 0.08;

export default function CustomCursor() {
    const [isTouch, setIsTouch] = useState(true);
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const ambientRef = useRef(null);

    const mousePos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const ambientPos = useRef({ x: -100, y: -100 });
    const isHovered = useRef(false);
    const isClicked = useRef(false);
    const isHidden = useRef(true);
    const rafId = useRef(null);

    useEffect(() => {
        // Detect if device has fine pointer & hover (desktop mouse)
        const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
        setIsTouch(!mediaQuery.matches);

        const handleMediaChange = (e) => {
            setIsTouch(!e.matches);
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMediaChange);
        }

        if (!mediaQuery.matches) {
            return () => {
                if (mediaQuery.removeEventListener) {
                    mediaQuery.removeEventListener('change', handleMediaChange);
                }
            };
        }

        // Add class to body to hide standard cursor on desktop
        document.documentElement.classList.add('has-custom-cursor');

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (isHidden.current) {
                isHidden.current = false;
                ringPos.current = { x: e.clientX, y: e.clientY };
                ambientPos.current = { x: e.clientX, y: e.clientY };
            }

            // Check if cursor is over interactive / clickable elements
            const target = e.target;
            const interactive = !!target.closest(
                'a, button, [role="button"], input, textarea, select, .btn, .card, [data-tilt], .clickable, .tag, [tabindex]'
            );
            isHovered.current = interactive;
        };

        const onMouseDown = () => {
            isClicked.current = true;
        };

        const onMouseUp = () => {
            isClicked.current = false;
        };

        const onMouseLeave = () => {
            isHidden.current = true;
        };

        const onMouseEnter = () => {
            isHidden.current = false;
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        // Smooth Animation Loop via requestAnimationFrame
        const render = () => {
            const target = mousePos.current;

            // Direct Dot Follow
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%) scale(${isClicked.current ? 0.75 : 1})`;
                dotRef.current.style.opacity = isHidden.current ? '0' : '1';
            }

            // Lerped Ring Follow
            ringPos.current.x += (target.x - ringPos.current.x) * LERP_RING;
            ringPos.current.y += (target.y - ringPos.current.y) * LERP_RING;

            if (ringRef.current) {
                const scale = isClicked.current ? 0.85 : isHovered.current ? 1.6 : 1;
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
                ringRef.current.style.opacity = isHidden.current ? '0' : isHovered.current ? '0.9' : '0.45';
                ringRef.current.style.borderColor = isHovered.current ? 'var(--accent-light)' : 'var(--accent)';
                ringRef.current.style.background = isHovered.current ? 'rgba(147, 168, 134, 0.12)' : 'transparent';
            }

            // Lerped Ambient Glow
            ambientPos.current.x += (target.x - ambientPos.current.x) * LERP_AMBIENT;
            ambientPos.current.y += (target.y - ambientPos.current.y) * LERP_AMBIENT;

            if (ambientRef.current) {
                ambientRef.current.style.transform = `translate3d(${ambientPos.current.x}px, ${ambientPos.current.y}px, 0) translate(-50%, -50%)`;
                ambientRef.current.style.opacity = isHidden.current ? '0' : '0.6';
            }

            rafId.current = requestAnimationFrame(render);
        };

        rafId.current = requestAnimationFrame(render);

        return () => {
            document.documentElement.classList.remove('has-custom-cursor');
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleMediaChange);
            }
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    if (isTouch) return null;

    return (
        <div ref={cursorRef} className={styles.cursorWrapper} aria-hidden="true">
            <div ref={ambientRef} className={styles.cursorAmbient} />
            <div ref={ringRef} className={styles.cursorRing} />
            <div ref={dotRef} className={styles.cursorDot} />
        </div>
    );
}

'use client';
import { useEffect, useRef, useCallback } from 'react';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import styles from './CustomCursor.module.css';

const LERP = 0.12;

/**
 * Optimized CustomCursor - Uses direct DOM manipulation instead of React state
 * to avoid re-renders on every mouse move event.
 */
export default function CustomCursor() {
    const cursorRef = useRef(null);
    const ambientRef = useRef(null);
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const trailRef = useRef({ x: 0, y: 0 });
    const stateRef = useRef({ hidden: false, clicked: false, linkHovered: false });
    const rafRef = useRef(0);
    const { reducedMotion } = usePerformanceTier();
    const ambientEnabled = !reducedMotion;

    const updateCursorClasses = useCallback(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;
        const { hidden, clicked, linkHovered } = stateRef.current;
        cursor.classList.toggle(styles.hidden, hidden);
        cursor.classList.toggle(styles.clicked, clicked);
        cursor.classList.toggle(styles.hovered, linkHovered);
    }, [styles.hidden, styles.clicked, styles.hovered]);

    useEffect(() => {
        const cursor = cursorRef.current;
        const ambient = ambientRef.current;
        if (!cursor) return;

        const onMouseMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY };

            // Direct DOM update - no React re-render
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            // Check for clickable elements
            const target = e.target;
            const isClickable = !!target.closest("a, button, .clickable, input, textarea, select");
            if (stateRef.current.linkHovered !== isClickable) {
                stateRef.current.linkHovered = isClickable;
                updateCursorClasses();
            }
        };

        const onMouseEnter = () => {
            stateRef.current.hidden = false;
            if (ambient) ambient.style.opacity = '1';
            updateCursorClasses();
        };

        const onMouseLeave = () => {
            stateRef.current.hidden = true;
            if (ambient) ambient.style.opacity = '0';
            updateCursorClasses();
        };

        const onMouseDown = () => {
            stateRef.current.clicked = true;
            updateCursorClasses();
        };

        const onMouseUp = () => {
            stateRef.current.clicked = false;
            updateCursorClasses();
        };

        document.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, [updateCursorClasses]);

    // Smooth trail animation loop
    useEffect(() => {
        if (!ambientEnabled || !ambientRef.current) return;

        const tick = () => {
            const t = targetRef.current;
            trailRef.current.x += (t.x - trailRef.current.x) * LERP;
            trailRef.current.y += (t.y - trailRef.current.y) * LERP;

            // Direct DOM update
            if (ambientRef.current) {
                ambientRef.current.style.left = `${trailRef.current.x}px`;
                ambientRef.current.style.top = `${trailRef.current.y}px`;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [ambientEnabled]);

    return (
        <>
            {ambientEnabled && (
                <div
                    ref={ambientRef}
                    className={styles.cursorAmbient}
                    aria-hidden="true"
                />
            )}
            <div ref={cursorRef} className={styles.cursor}>
                <div className={styles.cursorDot} />
                <div className={styles.cursorRing} />
            </div>
        </>
    );
}

'use client';
import { useEffect, useState, useRef } from 'react';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import styles from './CustomCursor.module.css';

const LERP = 0.12;

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const targetRef = useRef({ x: 0, y: 0 });
    const { reducedMotion } = usePerformanceTier();
    const ambientEnabled = !reducedMotion;

    useEffect(() => {
        const onMouseMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target;
            const isClickable = target.closest("a, button, .clickable, input, textarea, select");
            setLinkHovered(!!isClickable);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", () => setHidden(false));
        document.addEventListener("mouseleave", () => setHidden(true));
        document.addEventListener("mousedown", () => setClicked(true));
        document.addEventListener("mouseup", () => setClicked(false));

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", () => setHidden(false));
            document.removeEventListener("mouseleave", () => setHidden(true));
            document.removeEventListener("mousedown", () => setClicked(true));
            document.removeEventListener("mouseup", () => setClicked(false));
        };
    }, []);

    useEffect(() => {
        if (!ambientEnabled) return;
        let raf = 0;
        const tick = () => {
            const t = targetRef.current;
            setTrail((prev) => ({
                x: prev.x + (t.x - prev.x) * LERP,
                y: prev.y + (t.y - prev.y) * LERP
            }));
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [ambientEnabled]);

    return (
        <>
            {ambientEnabled && (
                <div
                    className={styles.cursorAmbient}
                    style={{
                        left: `${trail.x}px`,
                        top: `${trail.y}px`,
                        opacity: hidden ? 0 : 1
                    }}
                    aria-hidden="true"
                />
            )}
            <div
                className={`${styles.cursor} ${hidden ? styles.hidden : ''} ${clicked ? styles.clicked : ''} ${linkHovered ? styles.hovered : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
            >
                <div className={styles.cursorDot} />
                <div className={styles.cursorRing} />
            </div>
        </>
    );
}

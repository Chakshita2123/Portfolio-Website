'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './ScrollThoughts.module.css';

const THOUGHTS = [
    'Noting scroll depth.',
    'Section in view.',
    'User exploring.',
    'System ready.',
    'Portfolio context loaded.',
    'Smooth transition.',
    'Content focused.',
];

function getThoughtIndex(scrollY, docHeight, viewHeight) {
    const maxScroll = Math.max(0, docHeight - viewHeight);
    if (maxScroll <= 0) return 0;
    const progress = Math.min(1, scrollY / maxScroll);
    return Math.min(
        Math.floor(progress * THOUGHTS.length),
        THOUGHTS.length - 1
    );
}

export default function ScrollThoughts() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    const update = useCallback(() => {
        if (typeof document === 'undefined' || typeof window === 'undefined') return;
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const viewHeight = window.innerHeight;
        const newIndex = getThoughtIndex(scrollY, docHeight, viewHeight);
        setIndex(newIndex);
        setVisible(scrollY > 60);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [mounted, update]);

    if (!mounted) return null;

    return (
        <div
            className={styles.wrapper}
            data-visible={visible}
            aria-live="polite"
            aria-atomic="true"
        >
            <span className={styles.thought}>{THOUGHTS[index]}</span>
        </div>
    );
}

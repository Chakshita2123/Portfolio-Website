'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './ScrollThoughts.module.css';

const THOUGHTS = [
    'Initializing interface...',
    'Designing for clarity...',
    'Optimizing for scale...',
    'Syncing aesthetics...',
    'Crafting experiences...',
    'Shipping with intention...',
    'System synced.'
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

        // Hide on very top
        if (scrollY < 50) {
            setVisible(false);
            return;
        }

        const docHeight = document.documentElement.scrollHeight;
        const viewHeight = window.innerHeight;
        const newIndex = getThoughtIndex(scrollY, docHeight, viewHeight);

        setIndex(prev => {
            if (prev !== newIndex) {
                // Thought changed, show it momentarily
                setVisible(true);
                // Clear any existing timeout to keep it visible if skimming rapidly
                // But simplified: just let the effect handle the timeout
            }
            return newIndex;
        });
    }, []);

    // Auto-hide effect
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2500); // Sustainable duration
            return () => clearTimeout(timer);
        }
    }, [visible, index]); // Reset timer if index changes while visible

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
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
            <span className={styles.thought} key={index}>{THOUGHTS[index]}</span>
        </div>
    );
}

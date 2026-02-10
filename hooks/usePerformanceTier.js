'use client';

import { useState, useEffect } from 'react';

/**
 * Detects reduced-motion preference and low-end device signals.
 * Use to gracefully reduce effects without errors. Fails safe (assumes reduced motion if unsure).
 */
export function usePerformanceTier() {
    const [reducedMotion, setReducedMotion] = useState(false);
    const [lowTier, setLowTier] = useState(false);

    useEffect(() => {
        try {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            setReducedMotion(mediaQuery.matches);
            const handler = () => setReducedMotion(mediaQuery.matches);
            mediaQuery.addEventListener('change', handler);
            return () => mediaQuery.removeEventListener('change', handler);
        } catch {
            setReducedMotion(true);
        }
    }, []);

    useEffect(() => {
        try {
            const cores = navigator.hardwareConcurrency || 4;
            const memory = navigator.deviceMemory; // GB, may be undefined
            const lowCores = cores <= 2;
            const lowMemory = memory !== undefined && memory < 4;
            setLowTier(lowCores || lowMemory);
        } catch {
            setLowTier(false);
        }
    }, []);

    return { reducedMotion, lowTier };
}

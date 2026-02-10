'use client';

import { useEffect, usePathname } from 'next/navigation';
import usePerformanceTier from '@/hooks/usePerformanceTier';
import ScrollThoughts from '@/components/ScrollThoughts';
import SystemLog from '@/components/SystemLog';

const PAGE_MOOD_MAP = {
    '/': 'dynamic',
    '/about': 'calm',
    '/ask-ai': 'focused',
    '/projects': 'neutral',
    '/skills': 'neutral',
    '/contact': 'neutral',
};

function getPageMood(pathname) {
    return PAGE_MOOD_MAP[pathname] || 'neutral';
}

export default function PortfolioExperienceProvider({ children }) {
    const pathname = usePathname();
    const { reducedMotion, lowTier } = usePerformanceTier();

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-reduced-motion', reducedMotion ? 'true' : 'false');
        root.setAttribute('data-performance-tier', lowTier ? 'low' : 'normal');
    }, [reducedMotion, lowTier]);

    useEffect(() => {
        const mood = getPageMood(pathname);
        document.documentElement.setAttribute('data-page-mood', mood);
    }, [pathname]);

    return (
        <>
            {children}
            {!reducedMotion && <ScrollThoughts />}
            <SystemLog pathname={pathname} />
        </>
    );
}

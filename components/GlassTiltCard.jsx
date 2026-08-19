'use client';
import { useGlassTilt } from '@/hooks/useGlassTilt';

export default function GlassTiltCard({ children, className = '', maxTilt = 6, ...props }) {
    const cardRef = useGlassTilt(maxTilt);

    return (
        <div ref={cardRef} className={className} data-tilt="true" {...props}>
            {children}
        </div>
    );
}

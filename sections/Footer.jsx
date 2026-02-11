'use client';

import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative py-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-tertiary)' }}>
                    Built with <Heart size={14} className="text-pastel-pink-dark" fill="currentColor" /> by{' '}
                    <span className="font-semibold gradient-text">Chakshita</span>
                </p>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
}

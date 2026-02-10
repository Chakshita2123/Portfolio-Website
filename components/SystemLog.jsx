'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './SystemLog.module.css';

const LOG_PREFIX = '[SYS]';

function useSystemLogToggle() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const handler = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                setVisible((v) => !v);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);
    return visible;
}

export default function SystemLog({ pathname }) {
    const visible = useSystemLogToggle();
    const [entries, setEntries] = useState([]);
    const endRef = useRef(null);

    useEffect(() => {
        if (!pathname) return;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setEntries((prev) => [
            ...prev.slice(-19),
            { time, msg: `Page: ${pathname === '/' ? 'Home' : pathname.slice(1)}` },
        ]);
    }, [pathname]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [entries]);

    if (!visible) return null;

    return (
        <div className={styles.panel} role="log" aria-live="polite">
            <div className={styles.header}>
                <span className={styles.title}>System log</span>
                <span className={styles.hint}>Ctrl+Shift+L to toggle</span>
            </div>
            <div className={styles.body}>
                {entries.length === 0 && (
                    <div className={styles.line}>{LOG_PREFIX} No entries yet.</div>
                )}
                {entries.map((e, i) => (
                    <div key={i} className={styles.line}>
                        <span className={styles.time}>{e.time}</span>
                        <span>{LOG_PREFIX} {e.msg}</span>
                    </div>
                ))}
                <div ref={endRef} />
            </div>
        </div>
    );
}

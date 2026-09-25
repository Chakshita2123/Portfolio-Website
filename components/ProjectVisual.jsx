'use client';
/**
 * ProjectVisual.jsx
 * Pure CSS/SVG card header visuals — one per project.
 * No image assets. All colours from the design-system palette.
 */
import styles from './ProjectVisual.module.css';

/* ── Palette constants (match globals.css tokens) ── */
const C = {
    accent:      '#6B7F5E',
    accentHover: '#566B4A',
    accentLight: '#93A886',
    accentMuted: '#C4C4B2',
    bgPrimary:   '#EDEDE4',
    bgElevated:  '#F7F7F0',
    border:      '#D8D8C8',
    text:        '#2B2E27',
    textSec:     '#5F6459',
    textTert:    '#7D8376',
    red:         '#b45353',
    darkCode:    '#1e2220',
};

/* ─────────────────────────────────────────────────────
   1. Code Review AI — animated diff snippet
───────────────────────────────────────────────────── */
function CodeReviewVisual() {
    const lines = [
        { type: 'neutral', num: '14', text: <><span className={styles.kwType}>async function</span> <span className={styles.kwFn}>reviewCode</span>(input) {'{'}</> },
        { type: 'removed', num: '15', text: <><span className={styles.kwDel}>  const result = await ai.complete(input);</span></> },
        { type: 'added',   num: '15', text: <><span className={styles.kwAdd}>  const stream = await ai.stream(input, {'{'}</span></> },
        { type: 'added',   num: '16', text: <><span className={styles.kwAdd}>    template: <span className={styles.kwString}>&apos;security-review&apos;</span>,</span></> },
        { type: 'added',   num: '17', text: <><span className={styles.kwAdd}>    fallback: <span className={styles.kwString}>&apos;groq&apos;</span>,</span></> },
        { type: 'added',   num: '18', text: <><span className={styles.kwAdd}>  {'}'});</span></> },
        { type: 'neutral', num: '19', text: <><span className={styles.kwType}>  return</span> stream;<span className={styles.cursor} /></> },
        { type: 'neutral', num: '20', text: <>{'}'}</> },
    ];

    return (
        <div className={styles.visualFrame}>
            <div className={styles.codeWindow}>
                {lines.map((line, i) => (
                    <div
                        key={i}
                        className={`${styles.codeLine} ${
                            line.type === 'added'   ? styles.lineAdded   :
                            line.type === 'removed' ? styles.lineRemoved : styles.lineNeutral
                        }`}
                    >
                        <span className={styles.lineNum}>{line.num}</span>
                        <span className={`${styles.marker} ${
                            line.type === 'added'   ? styles.markerAdd  :
                            line.type === 'removed' ? styles.markerDel  : styles.markerNone
                        }`}>
                            {line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' '}
                        </span>
                        <span className={styles.codeText}>{line.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   2. Attendance Tracker — calendar with present/absent cells
───────────────────────────────────────────────────── */
function AttendanceVisual() {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    // P=present A=absent E=empty N=neutral (no class)
    const cells = [
        // week 1 — blank lead-in
        { v: 'E' }, { v: 'E' }, { v: 'P', n: 1 }, { v: 'P', n: 2 }, { v: 'A', n: 3 }, { v: 'P', n: 4 }, { v: 'N', n: 5 },
        { v: 'P', n: 6 }, { v: 'P', n: 7 }, { v: 'P', n: 8 }, { v: 'A', n: 9 }, { v: 'P', n: 10 }, { v: 'P', n: 11 }, { v: 'N', n: 12 },
        { v: 'P', n: 13 }, { v: 'A', n: 14 }, { v: 'P', n: 15 }, { v: 'P', n: 16 }, { v: 'P', n: 17 }, { v: 'P', n: 18, today: true }, { v: 'N', n: 19 },
    ];

    const cellClass = (v, today) => {
        if (v === 'E') return styles.cellEmpty;
        if (v === 'N') return styles.cellEmpty;
        const base = v === 'P' ? styles.cellPresent : styles.cellAbsent;
        return today ? `${base} ${styles.cellToday}` : base;
    };

    return (
        <div className={styles.visualFrame}>
            <div className={styles.calendar}>
                <div className={styles.calHeader}>
                    {days.map((d, i) => <span key={i} className={styles.calDay}>{d}</span>)}
                </div>
                <div className={styles.calGrid}>
                    {cells.map((c, i) => (
                        <div
                            key={i}
                            className={`${styles.calCell} ${cellClass(c.v, c.today)}`}
                            style={c.v === 'P' ? { animationDelay: `${i * 0.04}s` } : undefined}
                        >
                            {c.v !== 'E' && c.n}
                        </div>
                    ))}
                </div>
                <div className={styles.calLegend}>
                    <span className={styles.legendItem}>
                        <span className={`${styles.legendDot} ${styles.legendDotPresent}`} /> Present
                    </span>
                    <span className={styles.legendItem}>
                        <span className={`${styles.legendDot} ${styles.legendDotAbsent}`} /> Absent
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   3. Career Lens — JD skill-match bars
───────────────────────────────────────────────────── */
function CareerLensVisual() {
    const bars = [
        { label: 'React',        pct: 92 },
        { label: 'Node.js',      pct: 85 },
        { label: 'MongoDB',      pct: 78 },
        { label: 'AI / LLM',     pct: 88 },
        { label: 'REST APIs',    pct: 95 },
    ];

    return (
        <div className={styles.visualFrame}>
            <div className={styles.skillMatch}>
                <span className={styles.matchTitle}>Resume ↔ JD Match</span>
                {bars.map((b, i) => (
                    <div key={i} className={styles.matchRow}>
                        <span className={styles.matchLabel}>{b.label}</span>
                        <div className={styles.matchTrack}>
                            <div
                                className={styles.matchFill}
                                style={{ width: `${b.pct}%`, animationDelay: `${i * 0.1}s` }}
                            />
                        </div>
                        <span className={styles.matchPct}>{b.pct}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   4. Flipkart Analytics — bar chart (pure CSS/SVG)
───────────────────────────────────────────────────── */
function FlipkartVisual() {
    // Monthly avg price index per category, normalised 0-100
    const data = [
        { label: 'Phones',    val: 78, color: C.accent },
        { label: 'Laptops',   val: 91, color: C.accent },
        { label: 'TV',        val: 65, color: C.accentLight },
        { label: 'Fashion',   val: 42, color: C.accentMuted },
        { label: 'Books',     val: 28, color: C.accentMuted },
        { label: 'Kitchen',   val: 55, color: C.accentLight },
        { label: 'Toys',      val: 38, color: C.accentMuted },
        { label: 'Beauty',    val: 62, color: C.accentLight },
    ];

    return (
        <div className={styles.visualFrame}>
            <div className={styles.chartFrame}>
                <span className={styles.chartTitle}>Avg Price Index — by Category</span>
                <div className={styles.chartArea}>
                    {data.map((d, i) => (
                        <div
                            key={i}
                            className={styles.bar}
                            style={{ height: `${d.val}%`, background: d.color }}
                        />
                    ))}
                </div>
                <div className={styles.chartLabels}>
                    {data.map((d, i) => (
                        <span key={i} className={styles.chartLabel}>{d.label}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   5. Journey Curator AI — animated route map SVG
───────────────────────────────────────────────────── */
function JourneyVisual() {
    const stops = [
        { x: 52,  y: 130, label: 'Delhi',     active: false },
        { x: 148, y: 80,  label: 'Jaipur',    active: false },
        { x: 248, y: 105, label: 'Agra',      active: true  },
        { x: 340, y: 55,  label: 'Chandigarh',active: false },
    ];

    // bezier path through stops
    const path = `M ${stops[0].x} ${stops[0].y}
        C 100 120, 120 75, ${stops[1].x} ${stops[1].y}
        C 190 82, 220 110, ${stops[2].x} ${stops[2].y}
        C 290 100, 315 58, ${stops[3].x} ${stops[3].y}`;

    return (
        <div className={styles.visualFrame}>
            <div className={styles.routeMap}>
                <svg className={styles.routeSvg} viewBox="0 0 400 180" preserveAspectRatio="xMidYMid meet">
                    {/* terrain lines */}
                    <path d="M0 145 Q60 135 120 142 Q180 148 240 140 Q300 133 400 138" stroke={C.border} strokeWidth="1" fill="none" opacity="0.6" />
                    <path d="M0 160 Q80 155 160 158 Q240 162 320 155 Q370 151 400 154" stroke={C.border} strokeWidth="1" fill="none" opacity="0.4" />

                    {/* animated travel path */}
                    <path
                        d={path}
                        fill="none"
                        stroke={C.accent}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.routePath}
                        strokeDasharray="8 5"
                    />

                    {/* static faded background path */}
                    <path d={path} fill="none" stroke={C.accentMuted} strokeWidth="1.5" opacity="0.3" />

                    {/* stops */}
                    {stops.map((s, i) => (
                        <g key={i}>
                            <circle
                                cx={s.x} cy={s.y} r={s.active ? 7 : 5}
                                fill={s.active ? C.accent : C.bgElevated}
                                stroke={C.accent}
                                strokeWidth={s.active ? 2 : 1.5}
                                className={s.active ? styles.stopPulse : undefined}
                            />
                            <text
                                x={s.x} y={s.y - 12}
                                textAnchor="middle"
                                fontSize="9"
                                fontWeight={s.active ? '700' : '500'}
                                fontFamily="Inter, sans-serif"
                                fill={s.active ? C.accent : C.textTert}
                            >
                                {s.label}
                            </text>
                        </g>
                    ))}

                    {/* cost chip */}
                    <rect x="158" y="20" width="84" height="22" rx="6" fill={C.accent} opacity="0.12" />
                    <text x="200" y="35" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif" fill={C.accent}>
                        Est. ₹24,800 · 4 days
                    </text>
                </svg>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   6. Developer Portfolio — architecture graph SVG
───────────────────────────────────────────────────── */
function PortfolioVisual() {
    const nodes = [
        { x: 200, y: 88,  label: 'Portfolio Site',  sub: 'Next.js 14',    main: true  },
        { x: 62,  y: 40,  label: 'Navbar',          sub: 'CSS Modules',   main: false },
        { x: 62,  y: 136, label: 'AI Chat',         sub: 'Streaming SSE', main: false },
        { x: 338, y: 40,  label: 'Gemini API',      sub: 'Google AI',     main: false },
        { x: 338, y: 136, label: 'Projects',         sub: 'Static page',   main: false },
    ];

    const edges = [
        [200, 88, 62,  40 ],
        [200, 88, 62,  136],
        [200, 88, 338, 40 ],
        [200, 88, 338, 136],
    ];

    return (
        <div className={styles.visualFrame}>
            <div className={styles.archGraph}>
                <svg className={styles.archSvg} viewBox="0 0 400 176" preserveAspectRatio="xMidYMid meet">
                    {/* edges */}
                    {edges.map(([x1, y1, x2, y2], i) => (
                        <line
                            key={i}
                            x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke={C.accentMuted}
                            strokeWidth="1.5"
                            strokeDasharray="120"
                            strokeDashoffset="120"
                            className={styles.archEdge}
                            style={{ animationDelay: `${0.1 + i * 0.15}s` }}
                        />
                    ))}

                    {/* nodes */}
                    {nodes.map((n, i) => {
                        const w = n.main ? 88 : 74;
                        const h = n.main ? 36 : 28;
                        return (
                            <g
                                key={i}
                                className={styles.archNode}
                                style={{ animationDelay: `${0.05 + i * 0.15}s` }}
                            >
                                <rect
                                    x={n.x - w / 2} y={n.y - h / 2}
                                    width={w} height={h}
                                    rx="6"
                                    fill={n.main ? C.accent : C.bgElevated}
                                    stroke={n.main ? C.accentHover : C.border}
                                    strokeWidth={n.main ? 0 : 1}
                                />
                                <text
                                    x={n.x} y={n.y - (n.main ? 4 : 3)}
                                    textAnchor="middle"
                                    fontSize={n.main ? '9' : '8'}
                                    fontWeight="700"
                                    fontFamily="Inter, sans-serif"
                                    fill={n.main ? C.bgElevated : C.text}
                                >
                                    {n.label}
                                </text>
                                <text
                                    x={n.x} y={n.y + (n.main ? 8 : 8)}
                                    textAnchor="middle"
                                    fontSize="7"
                                    fontFamily="Inter, sans-serif"
                                    fill={n.main ? 'rgba(247,247,240,0.7)' : C.textTert}
                                >
                                    {n.sub}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   Progress Stepper — for in-progress projects
───────────────────────────────────────────────────── */
function ProgressStepper({ steps, currentStep }) {
    return (
        <div className={styles.visualFrame}>
            <div className={styles.stepper}>
                <span className={styles.stepperLabel}>Build Progress</span>
                <div className={styles.stepperTrack}>
                    {steps.map((step, i) => {
                        const isDone   = i < currentStep;
                        const isActive = i === currentStep;
                        return (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                <div className={styles.stepNode}>
                                    <div className={`${styles.stepDot} ${isDone ? styles.stepDotDone : isActive ? styles.stepDotActive : ''}`}>
                                        {isDone ? '✓' : i + 1}
                                    </div>
                                    <span className={`${styles.stepLabel} ${isActive ? styles.stepLabelActive : ''}`}>
                                        {step}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`${styles.stepConnector} ${isDone ? styles.stepConnectorDone : ''}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   Highlight chips row
───────────────────────────────────────────────────── */
export function HighlightChips({ chips }) {
    if (!chips || chips.length === 0) return null;
    return (
        <div className={styles.highlights}>
            {chips.map((chip, i) => (
                <span key={i} className={styles.chip}>
                    <span className={styles.chipDot} />
                    {chip}
                </span>
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   Main export — routes by projectId
───────────────────────────────────────────────────── */
export default function ProjectVisual({ projectId, status }) {
    if (status === 'in-progress') {
        const configs = {
            4: { steps: ['Data Pipeline', 'Analysis', 'UI / Charts', 'Deploy'], current: 2 },
            5: { steps: ['Data Collect', 'XGBoost Model', 'UI / Chat', 'Deploy'], current: 1 },
        };
        const cfg = configs[projectId] || { steps: ['Design', 'Build', 'Test', 'Deploy'], current: 1 };
        return <ProgressStepper steps={cfg.steps} currentStep={cfg.current} />;
    }

    switch (projectId) {
        case 1: return <CodeReviewVisual />;
        case 2: return <AttendanceVisual />;
        case 3: return <CareerLensVisual />;
        case 6: return <PortfolioVisual />;
        default: return null;
    }
}

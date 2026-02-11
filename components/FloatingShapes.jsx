'use client';

import { motion } from 'framer-motion';

const shapes = [
    { size: 300, color: 'from-lavender/30 to-pastel-pink/20', top: '10%', left: '5%', delay: 0 },
    { size: 250, color: 'from-peach/25 to-sky/15', top: '60%', right: '10%', delay: 2 },
    { size: 200, color: 'from-sky/20 to-lavender/15', top: '30%', right: '20%', delay: 4 },
    { size: 350, color: 'from-pastel-pink/20 to-peach/10', bottom: '15%', left: '15%', delay: 1 },
    { size: 180, color: 'from-mint/20 to-sky/15', top: '50%', left: '40%', delay: 3 },
];

export default function FloatingShapes() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-3xl`}
                    style={{
                        width: shape.size,
                        height: shape.size,
                        top: shape.top,
                        left: shape.left,
                        right: shape.right,
                        bottom: shape.bottom,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: shape.delay,
                    }}
                />
            ))}
        </div>
    );
}

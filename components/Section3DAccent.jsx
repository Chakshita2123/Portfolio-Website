'use client';
import { useEffect, useRef } from 'react';
import styles from './Section3DAccent.module.css';

export default function Section3DAccent({ variant = 'light', align = 'right' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const vsSource = `
            attribute vec2 position;
            varying vec2 vUv;
            void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fsSource = `
            precision mediump float;
            varying vec2 vUv;
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform float u_isContrast;

            float sphere(vec3 p, float r) {
                return length(p) - r;
            }

            float map(vec3 p) {
                float t = u_time * 0.5;
                float disp = sin(p.x * 3.0 + t) * sin(p.y * 3.0 + t * 0.8) * sin(p.z * 3.0 + t * 0.6) * 0.15;
                return sphere(p, 0.95) + disp;
            }

            vec3 calcNormal(vec3 p) {
                const float eps = 0.005;
                return normalize(vec3(
                    map(vec3(p.x + eps, p.y, p.z)) - map(vec3(p.x - eps, p.y, p.z)),
                    map(vec3(p.x, p.y + eps, p.z)) - map(vec3(p.x, p.y - eps, p.z)),
                    map(vec3(p.x, p.y, p.z + eps)) - map(vec3(p.x, p.y, p.z - eps))
                ));
            }

            void main() {
                vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
                vec3 ro = vec3(0.0, 0.0, 2.6);
                vec3 rd = normalize(vec3(uv, -1.3));

                float t = 0.0;
                float hit = 0.0;
                vec3 p;

                for(int i = 0; i < 36; i++) {
                    p = ro + rd * t;
                    float d = map(p);
                    if(d < 0.005) {
                        hit = 1.0;
                        break;
                    }
                    t += d * 0.9;
                    if(t > 4.5) break;
                }

                if(hit > 0.5) {
                    vec3 n = calcNormal(p);
                    vec3 lightDir = normalize(vec3(0.6, 0.8, 1.0));
                    float diff = max(dot(n, lightDir), 0.0);
                    float rim = pow(1.0 - max(dot(-rd, n), 0.0), 2.5);

                    vec3 colorBase = (u_isContrast > 0.5) 
                        ? vec3(0.42, 0.50, 0.37)  // #6B7F5E on contrast section
                        : vec3(0.58, 0.66, 0.53); // #93A886 on light sections

                    vec3 col = colorBase * (diff * 0.7 + 0.3) + vec3(0.85, 0.90, 0.82) * rim * 0.5;
                    float alpha = smoothstep(4.0, 1.5, t) * 0.45; // Soft ambient opacity
                    gl_FragColor = vec4(col, alpha);
                } else {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
                }
            }
        `;

        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,  1, -1, -1,  1,
            -1,  1,  1, -1,  1,  1,
        ]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const uResolution = gl.getUniformLocation(program, 'u_resolution');
        const uTime = gl.getUniformLocation(program, 'u_time');
        const uIsContrast = gl.getUniformLocation(program, 'u_isContrast');

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        let animationFrameId;
        let startTime = Date.now();

        const resize = () => {
            const dpr = 1;
            const displayWidth = Math.round(canvas.clientWidth * dpr);
            const displayHeight = Math.round(canvas.clientHeight * dpr);

            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
            }
        };

        const render = () => {
            resize();
            const elapsed = (Date.now() - startTime) * 0.001;

            gl.uniform2f(uResolution, canvas.width, canvas.height);
            gl.uniform1f(uTime, elapsed);
            gl.uniform1f(uIsContrast, variant === 'contrast' ? 1.0 : 0.0);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(program);
        };
    }, [variant]);

    return (
        <div className={`${styles.accentWrapper} ${styles[align]}`} aria-hidden="true">
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
}

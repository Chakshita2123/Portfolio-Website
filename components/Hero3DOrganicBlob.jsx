'use client';
import { useEffect, useRef } from 'react';
import styles from './Hero3DOrganicBlob.module.css';

export default function Hero3DOrganicBlob() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        // Vertex shader
        const vsSource = `
            attribute vec2 position;
            varying vec2 vUv;
            void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        // Fragment shader: 3D Raymarched Soft Organic Distorted Blob with Sage Palette
        const fsSource = `
            precision highp float;
            varying vec2 vUv;
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;

            // Simplex noise functions for organic wobble
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

            float snoise(vec3 v) {
                const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                vec3 i  = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min(g.xyz, l.zxy);
                vec3 i2 = max(g.xyz, l.zxy);
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;
                i = mod289(i);
                vec4 p = permute(permute(permute(
                            i.z + vec4(0.0, i1.z, i2.z, 1.0))
                        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                float n_ = 0.142857142857;
                vec3  ns = n_ * D.wyz - D.xzx;
                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_);
                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);
                vec4 b0 = vec4(x.xy, y.xy);
                vec4 b1 = vec4(x.zw, y.zw);
                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));
                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
                vec3 p0 = vec3(a0.xy, h.x);
                vec3 p1 = vec3(a0.zw, h.y);
                vec3 p2 = vec3(a1.xy, h.z);
                vec3 p3 = vec3(a1.zw, h.w);
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
            }

            // Signed distance function for organic distorted blob
            float map(vec3 p) {
                float t = u_time * 0.4;
                float noise = snoise(p * 1.1 + vec3(t * 0.5, t * 0.3, t * 0.4)) * 0.28;
                noise += snoise(p * 2.2 - vec3(t * 0.3, t * 0.5, 0.0)) * 0.12;
                return length(p) - (1.18 + noise);
            }

            // Calculate surface normal
            vec3 calcNormal(vec3 p) {
                const float eps = 0.001;
                return normalize(vec3(
                    map(vec3(p.x + eps, p.y, p.z)) - map(vec3(p.x - eps, p.y, p.z)),
                    map(vec3(p.x, p.y + eps, p.z)) - map(vec3(p.x, p.y - eps, p.z)),
                    map(vec3(p.x, p.y, p.z + eps)) - map(vec3(p.x, p.y, p.z - eps))
                ));
            }

            void main() {
                vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

                // Mouse parallax
                vec2 m = u_mouse * 0.25;
                vec3 ro = vec3(m.x, m.y + 0.05, 3.2); // camera ray origin
                vec3 rd = normalize(vec3(uv, -1.6));   // ray direction

                // Raymarching loop
                float t = 0.0;
                float hit = 0.0;
                vec3 p;

                for(int i = 0; i < 54; i++) {
                    p = ro + rd * t;
                    float d = map(p);
                    if(d < 0.002) {
                        hit = 1.0;
                        break;
                    }
                    t += d * 0.8;
                    if(t > 6.0) break;
                }

                if(hit > 0.5) {
                    vec3 n = calcNormal(p);
                    
                    // Sage color palette definitions
                    vec3 colorBase = vec3(0.42, 0.50, 0.37);      // #6B7F5E (olive-green accent)
                    vec3 colorLight = vec3(0.58, 0.66, 0.53);     // #93A886 (lighter sage)
                    vec3 colorSubsurface = vec3(0.66, 0.71, 0.63); // #A8B5A0 (soft muted sage)
                    vec3 colorShadow = vec3(0.24, 0.27, 0.23);    // #3D453A

                    // Lighting setup
                    vec3 lightDir = normalize(vec3(0.8, 1.0, 1.2));
                    vec3 lightDir2 = normalize(vec3(-0.9, -0.6, 0.5));

                    float diff = max(dot(n, lightDir), 0.0);
                    float diff2 = max(dot(n, lightDir2), 0.0) * 0.4;
                    float rim = pow(1.0 - max(dot(-rd, n), 0.0), 3.0) * 0.65;
                    
                    // Specular highlight
                    vec3 h = normalize(lightDir - rd);
                    float spec = pow(max(dot(n, h), 0.0), 28.0) * 0.45;

                    // Blend colors organically
                    vec3 col = mix(colorShadow, colorBase, diff * 0.8 + 0.2);
                    col = mix(col, colorLight, diff2);
                    col += colorSubsurface * rim * 0.75;
                    col += vec3(0.95, 0.96, 0.92) * spec; // soft neutral shine

                    // Soft alpha edge falloff
                    float alpha = smoothstep(5.5, 2.0, t) * 0.95;
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

        // Quad geometry
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
            -1,  1,
             1, -1,
             1,  1,
        ]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Uniforms
        const uResolution = gl.getUniformLocation(program, 'u_resolution');
        const uTime = gl.getUniformLocation(program, 'u_time');
        const uMouse = gl.getUniformLocation(program, 'u_mouse');

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        let animationFrameId;
        let startTime = Date.now();
        let targetMouse = { x: 0, y: 0 };
        let currentMouse = { x: 0, y: 0 };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            targetMouse.x = Math.max(-1, Math.min(1, x));
            targetMouse.y = Math.max(-1, Math.min(1, y));
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

            // Smooth mouse interpolation
            currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
            currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

            gl.uniform2f(uResolution, canvas.width, canvas.height);
            gl.uniform1f(uTime, elapsed);
            gl.uniform2f(uMouse, currentMouse.x, currentMouse.y);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            gl.deleteProgram(program);
        };
    }, []);

    return (
        <div className={styles.blobContainer} aria-hidden="true">
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.ambientGlow} />
        </div>
    );
}

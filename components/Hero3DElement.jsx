'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero3DElement.module.css';

/**
 * Hero3DElement - 3D Central Geometric Shape (Torus Knot) surrounded
 * by connected glowing neural-network nodes with interactive 360° drag-to-rotate.
 * Palette matches --accent (#6B7F5E) and --accent-light (#93A886).
 */
export default function Hero3DElement() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let animationFrameId;
        let renderer, scene, camera, controls, mainGroup;
        let geometries = [];
        let materials = [];
        let nodeObjects = [];
        let lineGeometry, lineMesh;
        let nodeConnections = [];
        let centralConnections = [];
        let autoRotateResumeTimeout = null;

        async function init() {
            const container = containerRef.current;
            const canvas = canvasRef.current;
            if (!container || !canvas || !isMounted) return;

            // Load Three.js and OrbitControls dynamically
            let THREE;
            let OrbitControls;

            try {
                // Try importing Three.js and OrbitControls via modern ESM CDN (esm.sh)
                THREE = await import(/* webpackIgnore: true */ 'https://esm.sh/three@0.160.0');
                const controlsModule = await import(/* webpackIgnore: true */ 'https://esm.sh/three@0.160.0/addons/controls/OrbitControls.js');
                OrbitControls = controlsModule.OrbitControls;
            } catch (err) {
                console.warn('CDN dynamic import failed, trying unpkg fallback...', err);
                try {
                    THREE = await import(/* webpackIgnore: true */ 'https://unpkg.com/three@0.160.0/build/three.module.js');
                    const controlsModule = await import(/* webpackIgnore: true */ 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js');
                    OrbitControls = controlsModule.OrbitControls;
                } catch (fallbackErr) {
                    console.error('Could not load Three.js:', fallbackErr);
                    return;
                }
            }

            if (!isMounted) return;

            // 1. Scene & Camera Setup
            scene = new THREE.Scene();
            
            const width = container.clientWidth || 360;
            const height = container.clientHeight || 360;
            
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
            camera.position.set(0, 0, 5.0);

            // 2. WebGL Renderer
            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(width, height, false);
            if (renderer.outputColorSpace) {
                renderer.outputColorSpace = THREE.SRGBColorSpace;
            }

            // 3. Lighting Setup
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
            scene.add(ambientLight);

            // Key directional light from top-right-front
            const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.15);
            dirLight1.position.set(3, 3, 3);
            scene.add(dirLight1);

            // Subtle sage-toned fill light from opposite corner
            const dirLight2 = new THREE.DirectionalLight(0x93A886, 0.45);
            dirLight2.position.set(-3, -2, -2);
            scene.add(dirLight2);

            // Soft rim light
            const dirLight3 = new THREE.DirectionalLight(0xA8B5A0, 0.3);
            dirLight3.position.set(0, -3, 2);
            scene.add(dirLight3);

            // 4. Main Combined Group
            mainGroup = new THREE.Group();
            scene.add(mainGroup);

            // 5. Central Geometric Shape (Smooth Torus Knot)
            // Visual metaphor for AI/ML + structured engineering
            const centralGeo = new THREE.TorusKnotGeometry(0.92, 0.26, 128, 32, 2, 3);
            geometries.push(centralGeo);

            const centralMat = new THREE.MeshStandardMaterial({
                color: 0x6B7F5E,        // --accent (#6B7F5E)
                roughness: 0.35,        // 0.3 - 0.4 for smooth clean sheen
                metalness: 0.15,        // 0.1 - 0.2
                flatShading: false
            });
            materials.push(centralMat);

            const centralMesh = new THREE.Mesh(centralGeo, centralMat);
            mainGroup.add(centralMesh);

            // 6. Neural Network Nodes (Spheres in loose orbital shell)
            const isMobile = window.innerWidth <= 768;
            const nodeCount = isMobile ? 7 : 11; // 8-14 nodes on desktop, fewer on mobile

            const nodeGeo = new THREE.SphereGeometry(0.065, 20, 20);
            geometries.push(nodeGeo);

            const nodeMat = new THREE.MeshStandardMaterial({
                color: 0x93A886,        // --accent-light (#93A886)
                emissive: 0x93A886,     // subtle emissive glow
                emissiveIntensity: 0.4,
                roughness: 0.3,
                metalness: 0.1
            });
            materials.push(nodeMat);

            // Generate organic distribution around central shape using spherical coordinates
            const basePositions = [];
            const phiOffset = Math.PI * (3 - Math.sqrt(5)); // Golden angle

            for (let i = 0; i < nodeCount; i++) {
                const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
                const radiusAtY = Math.sqrt(1 - y * y);
                const theta = phiOffset * i;

                // Shell radius between 1.75 and 2.15 with slight organic variation
                const shellRadius = 1.8 + Math.sin(i * 1.7) * 0.25;

                const posX = Math.cos(theta) * radiusAtY * shellRadius;
                const posY = y * shellRadius;
                const posZ = Math.sin(theta) * radiusAtY * shellRadius;

                const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
                nodeMesh.position.set(posX, posY, posZ);
                mainGroup.add(nodeMesh);

                const nodeData = {
                    mesh: nodeMesh,
                    basePos: new THREE.Vector3(posX, posY, posZ),
                    currentPos: new THREE.Vector3(posX, posY, posZ),
                    pulsePhase: i * 0.85,
                    pulseSpeed: 1.4 + (i % 3) * 0.3,
                    baseScale: 1.0
                };

                nodeObjects.push(nodeData);
                basePositions.push(new THREE.Vector3(posX, posY, posZ));
            }

            // 7. Neural Network Connecting Lines
            // Connect nearby nodes only (distance between 1.0 and 2.2 units, max 2-3 links per node)
            const connectionPairs = [];
            const nodeLinkCount = new Array(nodeCount).fill(0);

            for (let i = 0; i < nodeCount; i++) {
                for (let j = i + 1; j < nodeCount; j++) {
                    const dist = basePositions[i].distanceTo(basePositions[j]);
                    if (dist >= 0.8 && dist <= 2.1 && nodeLinkCount[i] < 3 && nodeLinkCount[j] < 3) {
                        connectionPairs.push([i, j]);
                        nodeLinkCount[i]++;
                        nodeLinkCount[j]++;
                    }
                }
            }

            // Also connect 2 select nodes to the central core for visual cohesion
            centralConnections = [
                { nodeIndex: 0, anchor: new THREE.Vector3(0.5, 0.4, 0.3) },
                { nodeIndex: Math.floor(nodeCount / 2), anchor: new THREE.Vector3(-0.4, -0.3, 0.4) }
            ];

            nodeConnections = connectionPairs;

            // Total lines: connectionPairs + centralConnections
            const totalLineSegments = nodeConnections.length + centralConnections.length;
            const linePositions = new Float32Array(totalLineSegments * 2 * 3);

            lineGeometry = new THREE.BufferGeometry();
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
            geometries.push(lineGeometry);

            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x93A886,
                transparent: true,
                opacity: 0.35,          // Low opacity so lines read as subtle connections
                depthWrite: false
            });
            materials.push(lineMaterial);

            lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
            mainGroup.add(lineMesh);

            // 8. OrbitControls (360° interactive drag rotation)
            controls = new OrbitControls(camera, canvas);
            controls.enableZoom = false;       // Disable zoom
            controls.enablePan = false;        // Disable pan
            controls.enableDamping = true;     // Smooth inertia
            controls.dampingFactor = 0.05;
            controls.rotateSpeed = 0.85;
            controls.autoRotate = true;        // Auto-rotate when idle
            controls.autoRotateSpeed = 1.2;

            // Handle user interaction states
            const onStartInteraction = () => {
                setIsInteracting(true);
                controls.autoRotate = false;
                if (autoRotateResumeTimeout) clearTimeout(autoRotateResumeTimeout);
            };

            const onEndInteraction = () => {
                setIsInteracting(false);
                if (autoRotateResumeTimeout) clearTimeout(autoRotateResumeTimeout);
                // Resume auto-rotate smoothly after a short pause
                autoRotateResumeTimeout = setTimeout(() => {
                    if (controls) controls.autoRotate = true;
                }, 1400);
            };

            controls.addEventListener('start', onStartInteraction);
            controls.addEventListener('end', onEndInteraction);

            // 9. Resize Handling
            const handleResize = () => {
                if (!container || !renderer || !camera) return;
                const newWidth = container.clientWidth;
                const newHeight = container.clientHeight;
                if (newWidth > 0 && newHeight > 0) {
                    camera.aspect = newWidth / newHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(newWidth, newHeight, false);
                }
            };

            window.addEventListener('resize', handleResize, { passive: true });

            // 10. Animation Loop
            let clockTime = 0;

            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                clockTime += 0.016;

                // Animate node pulsing (subtle independent breathing scale and small micro-drift)
                const posAttr = lineGeometry.attributes.position;
                let lineVertexIdx = 0;

                nodeObjects.forEach((node, idx) => {
                    const pulse = Math.sin(clockTime * node.pulseSpeed + node.pulsePhase);
                    
                    // Subtle scale breathing: 0.90x to 1.15x
                    const scale = 1.0 + pulse * 0.12;
                    node.mesh.scale.set(scale, scale, scale);

                    // Micro-orbital drift
                    const driftOffset = pulse * 0.04;
                    node.currentPos.copy(node.basePos).multiplyScalar(1.0 + driftOffset);
                    node.mesh.position.copy(node.currentPos);
                });

                // Update dynamic line positions
                for (let k = 0; k < nodeConnections.length; k++) {
                    const [i, j] = nodeConnections[k];
                    const posA = nodeObjects[i].currentPos;
                    const posB = nodeObjects[j].currentPos;

                    posAttr.array[lineVertexIdx++] = posA.x;
                    posAttr.array[lineVertexIdx++] = posA.y;
                    posAttr.array[lineVertexIdx++] = posA.z;

                    posAttr.array[lineVertexIdx++] = posB.x;
                    posAttr.array[lineVertexIdx++] = posB.y;
                    posAttr.array[lineVertexIdx++] = posB.z;
                }

                // Update lines connected to central core
                for (let c = 0; c < centralConnections.length; c++) {
                    const conn = centralConnections[c];
                    const nodePos = nodeObjects[conn.nodeIndex].currentPos;
                    
                    posAttr.array[lineVertexIdx++] = nodePos.x;
                    posAttr.array[lineVertexIdx++] = nodePos.y;
                    posAttr.array[lineVertexIdx++] = nodePos.z;

                    posAttr.array[lineVertexIdx++] = conn.anchor.x;
                    posAttr.array[lineVertexIdx++] = conn.anchor.y;
                    posAttr.array[lineVertexIdx++] = conn.anchor.z;
                }

                posAttr.needsUpdate = true;

                // Update controls for damping & auto-rotate
                controls.update();

                // Render scene
                renderer.render(scene, camera);
            };

            setIsLoaded(true);
            animate();
        }

        init();

        return () => {
            isMounted = false;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (autoRotateResumeTimeout) clearTimeout(autoRotateResumeTimeout);
            
            geometries.forEach(geo => geo.dispose());
            materials.forEach(mat => mat.dispose());
            if (renderer) renderer.dispose();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className={`${styles.elementContainer} ${isInteracting ? styles.interacting : ''}`}
            aria-label="Interactive 3D Neural Network Engineering Core"
            role="img"
        >
            <canvas 
                ref={canvasRef} 
                className={styles.canvas} 
            />
            {/* Ambient background soft glow matching the sage theme */}
            <div className={styles.ambientGlow} />
            
            {/* Subtle interactive hint */}
            <div className={`${styles.interactionHint} ${isLoaded ? styles.hintVisible : ''}`}>
                <span>Drag to rotate</span>
            </div>
        </div>
    );
}

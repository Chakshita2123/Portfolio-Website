'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero3DElement.module.css';

/**
 * Hero3DElement - Refined 3D Central Geometric Shape (Torus Knot) surrounded
 * by tightly integrated glowing neural-network nodes with interactive 360° drag-to-rotate.
 * Glossy sage palette with crisp specular highlights and rim lighting.
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
            
            const width = container.clientWidth || 380;
            const height = container.clientHeight || 380;
            
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
            camera.position.set(0, 0, 4.8);

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

            // 3. Lighting Setup — High contrast, defined highlights, rim lighting & soft fill
            // Ambient light: clear baseline illumination
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
            scene.add(ambientLight);

            // Key Light: Crisp top-front directional light for specular highlights
            const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
            keyLight.position.set(3.5, 3.5, 3.5);
            scene.add(keyLight);

            // Fill Light: Soft fill light from opposite angle to prevent dark undefined sides
            const fillLight = new THREE.DirectionalLight(0xffffff, 0.55);
            fillLight.position.set(-3.0, -2.0, 2.0);
            scene.add(fillLight);

            // Rim / Edge Light: Positioned behind/above to create an edge highlight separating from background
            const rimLight = new THREE.DirectionalLight(0xdce7d8, 0.75);
            rimLight.position.set(0, 4.0, -4.0);
            scene.add(rimLight);

            // Subtle lower fill
            const bottomFill = new THREE.DirectionalLight(0x93A886, 0.35);
            bottomFill.position.set(0, -3.5, -1.0);
            scene.add(bottomFill);

            // 4. Main Combined Group
            mainGroup = new THREE.Group();
            scene.add(mainGroup);

            // 5. Central Geometric Shape (Glossy Refined Torus Knot)
            const centralGeo = new THREE.TorusKnotGeometry(0.92, 0.26, 128, 32, 2, 3);
            geometries.push(centralGeo);

            // Glossy, reflective material with visible depth gradient and highlights
            const centralMat = new THREE.MeshStandardMaterial({
                color: 0x8FA880,        // Lighter vibrant sage green
                roughness: 0.20,        // Glossier surface (0.15 - 0.25)
                metalness: 0.35,        // Metallic sheen for premium depth (0.3 - 0.4)
                flatShading: false
            });
            materials.push(centralMat);

            const centralMesh = new THREE.Mesh(centralGeo, centralMat);
            mainGroup.add(centralMesh);

            // 6. Neural Network Nodes — Tightly hugging the knot contour
            const isMobile = window.innerWidth <= 768;
            const nodeCount = isMobile ? 7 : 10; // 8-12 nodes

            const nodeGeo = new THREE.SphereGeometry(0.08, 20, 20); // Slightly larger node radius
            geometries.push(nodeGeo);

            const nodeMat = new THREE.MeshStandardMaterial({
                color: 0x93A886,        // --accent-light (#93A886)
                emissive: 0x93A886,     // Bright glowing points
                emissiveIntensity: 0.55, // Enhanced emissive glow
                roughness: 0.2,
                metalness: 0.2
            });
            materials.push(nodeMat);

            // Position nodes closely hugging the outer contour of the torus knot (like orbiting satellites)
            const basePositions = [];
            const surfaceAnchors = [];

            for (let i = 0; i < nodeCount; i++) {
                const u = (i / nodeCount) * Math.PI * 2;
                
                // Torus knot centerline formula (p=2, q=3)
                const r0 = 0.92 + 0.18 * Math.cos(3 * u);
                const knotX = r0 * Math.cos(2 * u);
                const knotY = r0 * Math.sin(2 * u);
                const knotZ = 0.42 * Math.sin(3 * u);

                const surfaceAnchor = new THREE.Vector3(knotX, knotY, knotZ);
                surfaceAnchors.push(surfaceAnchor);

                // Offset outward along the radial normal from knot center line
                const normDir = surfaceAnchor.clone().normalize();
                
                // Tight shell distance: sits just outside the knot silhouette (1.25 - 1.40 units)
                const offsetDist = 0.32 + Math.sin(i * 2.1) * 0.08;
                const nodePos = surfaceAnchor.clone().add(normDir.multiplyScalar(offsetDist));

                const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
                nodeMesh.position.copy(nodePos);
                mainGroup.add(nodeMesh);

                const nodeData = {
                    mesh: nodeMesh,
                    basePos: nodePos.clone(),
                    currentPos: nodePos.clone(),
                    pulsePhase: i * 0.9,
                    pulseSpeed: 1.5 + (i % 3) * 0.35,
                    anchorPos: surfaceAnchor
                };

                nodeObjects.push(nodeData);
                basePositions.push(nodePos);
            }

            // 7. Neural Network Connecting Lines (Nearest neighbor connections + knot anchors)
            const connectionPairs = [];
            const nodeLinkCount = new Array(nodeCount).fill(0);

            // Connect each node to its 2 nearest neighboring nodes
            for (let i = 0; i < nodeCount; i++) {
                // Find nearest neighbors sorted by distance
                const distances = [];
                for (let j = 0; j < nodeCount; j++) {
                    if (i !== j) {
                        const d = basePositions[i].distanceTo(basePositions[j]);
                        distances.push({ index: j, dist: d });
                    }
                }
                distances.sort((a, b) => a.dist - b.dist);

                // Connect to up to 2 nearest neighbors if not already linked
                for (let n = 0; n < Math.min(2, distances.length); n++) {
                    const j = distances[n].index;
                    const pairKey = i < j ? `${i}-${j}` : `${j}-${i}`;
                    const alreadyExists = connectionPairs.some(([a, b]) => (a === i && b === j) || (a === j && b === i));
                    
                    if (!alreadyExists && nodeLinkCount[i] < 3 && nodeLinkCount[j] < 3 && distances[n].dist < 1.4) {
                        connectionPairs.push([i, j]);
                        nodeLinkCount[i]++;
                        nodeLinkCount[j]++;
                    }
                }
            }

            // Connect 3-4 select nodes to the nearest points on the torus knot surface itself
            centralConnections = [
                { nodeIndex: 0, anchor: surfaceAnchors[0] },
                { nodeIndex: Math.floor(nodeCount / 3), anchor: surfaceAnchors[Math.floor(nodeCount / 3)] },
                { nodeIndex: Math.floor((2 * nodeCount) / 3), anchor: surfaceAnchors[Math.floor((2 * nodeCount) / 3)] },
                { nodeIndex: nodeCount - 1, anchor: surfaceAnchors[nodeCount - 1] }
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
                opacity: 0.45,          // Increased opacity for clearer visibility
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

                nodeObjects.forEach((node) => {
                    const pulse = Math.sin(clockTime * node.pulseSpeed + node.pulsePhase);
                    
                    // Subtle scale breathing: 0.92x to 1.15x
                    const scale = 1.0 + pulse * 0.12;
                    node.mesh.scale.set(scale, scale, scale);

                    // Micro-orbital drift
                    const driftOffset = pulse * 0.025;
                    node.currentPos.copy(node.basePos).multiplyScalar(1.0 + driftOffset);
                    node.mesh.position.copy(node.currentPos);
                });

                // Update dynamic line positions between connected nodes
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

                // Update dynamic lines connecting select nodes directly to knot surface anchors
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

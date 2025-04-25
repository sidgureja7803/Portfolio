import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import CanvasLoader from "../Loader";

const GurejaSvgModel = () => {
  const groupRef = useRef(null);
  const particlesRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Animation
  useFrame((state, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.5;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1;
      particlesRef.current.rotation.x += delta * 0.05;
    }
  });

  useEffect(() => {
    // Create particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      colors[i] = Math.random() * 0.5 + 0.5;
      colors[i + 1] = Math.random() * 0.5 + 0.5;
      colors[i + 2] = Math.random() * 0.5 + 0.5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current.add(particles);

    // Load SVG
    const loader = new SVGLoader();
    loader.load(
      '/SIDDHANT.svg',
      (data) => {
        const paths = data.paths;
        
        paths.forEach((path) => {
          const shapes = path.toShapes(true);
          
          shapes.forEach((shape) => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 0.4,
              bevelEnabled: true,
              bevelThickness: 0.2,
              bevelSize: 0.1,
              bevelSegments: 5
            });
            
            const material = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(path.color),
              metalness: 0.5,
              roughness: 0.2,
              clearcoat: 1.0,
              clearcoatRoughness: 0.2,
              side: THREE.DoubleSide
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            groupRef.current.add(mesh);
          });
        });

        // Center the SVG
        const box = new THREE.Box3().setFromObject(groupRef.current);
        const center = box.getCenter(new THREE.Vector3());
        groupRef.current.position.sub(center);

        // Scale the SVG
        const boxSize = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(boxSize.x, boxSize.y);
        groupRef.current.scale.setScalar(2 / maxDim);
        
        setSvgLoaded(true);
      },
      undefined,
      (error) => {
        console.error('SVG loading failed:', error);
      }
    );

    return () => {
      if (particlesRef.current) {
        particlesRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }

      if (groupRef.current) {
        groupRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <>
      <group 
        ref={particlesRef}
        position={[0, 0, -10]}
      />
      
      <group 
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <hemisphereLight intensity={0.15} groundColor='black' />
        <pointLight intensity={1} position={[0, 0, 5]} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight intensity={1} position={[-5, 0, 3]} color="#0000ff" />
        <pointLight intensity={1} position={[5, 0, 3]} color="#ff0000" />
      </group>
    </>
  );
};

const GurejaSvgCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    setMounted(true);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [0, 0, 10], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        antialias: true,
        alpha: true 
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          enablePan={false}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
        <GurejaSvgModel />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default GurejaSvgCanvas; 
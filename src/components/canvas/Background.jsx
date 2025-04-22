import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Background = () => {
  const points = useRef();
  const galaxy = useRef();
  const { mouse, viewport } = useThree();
  
  // Generate particles with reduced count for better performance
  const particles = useMemo(() => {
    const temp = [];
    const particleCount = 150;
    
    // Main cluster
    for (let i = 0; i < particleCount; i++) {
      // Calculate position in spherical distribution
      const radius = Math.random() * 25;
      const theta = Math.random() * Math.PI * 2; // Random angle around y-axis
      const phi = Math.acos(2 * Math.random() - 1); // Random angle from top to bottom
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Add some randomness to create a more natural look
      const jitter = 5;
      const jx = (Math.random() - 0.5) * jitter;
      const jy = (Math.random() - 0.5) * jitter;
      const jz = (Math.random() - 0.5) * jitter;
      
      temp.push(x + jx, y + jy, z + jz);
    }
    
    // Create a few extra smaller clusters
    for (let c = 0; c < 3; c++) {
      // Random position for the center of this cluster
      const centerX = (Math.random() - 0.5) * 30;
      const centerY = (Math.random() - 0.5) * 30;
      const centerZ = (Math.random() - 0.5) * 30;
      
      // Add particles to this cluster
      for (let i = 0; i < 30; i++) {
        const radius = Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
        const y = centerY + radius * Math.sin(phi) * Math.sin(theta);
        const z = centerZ + radius * Math.cos(phi);
        
        temp.push(x, y, z);
      }
    }
    
    return new Float32Array(temp);
  }, []);

  // Create colors array for particles
  const colors = useMemo(() => {
    const temp = [];
    const count = particles.length / 3;
    
    const colorOptions = [
      new THREE.Color('#4299e1'), // blue-500
      new THREE.Color('#3182ce'), // blue-600
      new THREE.Color('#2b6cb0'), // blue-700
      new THREE.Color('#805ad5'), // purple-600
      new THREE.Color('#6b46c1'), // purple-700
      new THREE.Color('#ffffff'), // white
    ];
    
    for (let i = 0; i < count; i++) {
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      temp.push(color.r, color.g, color.b);
    }
    
    return new Float32Array(temp);
  }, [particles]);

  // Create sizes array for particles
  const sizes = useMemo(() => {
    const temp = [];
    const count = particles.length / 3;
    
    for (let i = 0; i < count; i++) {
      temp.push(Math.random() * 2 + 0.1);
    }
    
    return new Float32Array(temp);
  }, [particles]);

  // Add mouse interaction effect
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate the entire system
    if (galaxy.current) {
      galaxy.current.rotation.y = time * 0.05;
      galaxy.current.rotation.z = time * 0.025;
    }
    
    // Mouse interaction
    if (points.current && mouse) {
      // Convert mouse coordinates to 3D space
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      
      // Subtle rotation based on mouse position
      points.current.rotation.x = y * 0.01;
      points.current.rotation.y = x * 0.01;
    }
  });

  // Initial animation
  useEffect(() => {
    if (points.current) {
      // Starting scale
      points.current.scale.set(0.1, 0.1, 0.1);
      
      // Animate to full scale
      gsap.to(points.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 2,
        ease: "power3.out",
      });
      
      // Also animate opacity
      gsap.fromTo(
        points.current.material, 
        { opacity: 0 },
        { opacity: 0.8, duration: 2, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <group ref={galaxy}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation={true}
          vertexColors
          transparent={true}
          opacity={0.8}
          fog={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        >
          {/* Custom vertex shader to make particles look more natural */}
          <shaderMaterial
            attach="customMaterial"
            vertexShader={`
              attribute float size;
              varying vec3 vColor;
              
              void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
              }
            `}
            fragmentShader={`
              varying vec3 vColor;
              
              void main() {
                // Create circular particles
                float r = 0.5;
                vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                float r2 = dot(cxy, cxy);
                float opacity = 1.0 - smoothstep(r * (r - 0.1), r, r2);
                
                if (r2 > r * r) discard;
                
                gl_FragColor = vec4(vColor, opacity);
              }
            `}
          />
        </pointsMaterial>
      </points>
    </group>
  );
};

export default Background; 
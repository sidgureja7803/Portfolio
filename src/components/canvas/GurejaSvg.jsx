import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { PresentationControls, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';
import Loader from '../Loader';

// SVG path data extracted from your logo
const logoSVGPath = `
  M299.34 146.25C299.34 172.71 294.1 198.9 284.06 223.14C274.02 247.38 259.4 269.14 241.12 287.42C222.84 305.7 201.08 320.32 176.84 330.36C152.6 340.4 126.41 345.64 99.95 345.64V146.25H299.34ZM99.95 345.64C73.49 345.64 47.3 340.4 23.06 330.36C-1.18 320.32 -22.94 305.7 -41.22 287.42C-59.5 269.14 -74.12 247.38 -84.16 223.14C-94.2 198.9 -99.44 172.71 -99.44 146.25H99.95V345.64Z
  M216.34 246.25C216.34 272.71 211.1 298.9 201.06 323.14C191.02 347.38 176.4 369.14 158.12 387.42C139.84 405.7 118.08 420.32 93.84 430.36C69.6 440.4 43.41 445.64 16.95 445.64V246.25H216.34ZM16.95 445.64C-9.51 445.64 -35.7 440.4 -59.94 430.36C-84.18 420.32 -105.94 405.7 -124.22 387.42C-142.5 369.14 -157.12 347.38 -167.16 323.14C-177.2 298.9 -182.44 272.71 -182.44 246.25H16.95V445.64Z
`;

const Logo3D = () => {
  const groupRef = useRef();
  const [paths, setPaths] = useState([]);
  
  useEffect(() => {
    // Create a temporary SVG to parse the path data
    const tempSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-200 100 500 400">
        <path d="${logoSVGPath}" />
      </svg>
    `;
    
    // Use SVGLoader to parse the paths
    const loader = new SVGLoader();
    const svgData = loader.parse(tempSVG);
    setPaths(svgData.paths);
  }, []);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {paths.map((path, i) => (
        <React.Fragment key={i}>
          {path.subPaths.map((subPath, j) => {
            // Create an extrusion for each subpath
            const shapes = SVGLoader.createShapes(path);
            return shapes.map((shape, k) => (
              <mesh key={`${i}-${j}-${k}`} position={[0, 0, 0]}>
                <extrudeGeometry 
                  args={[
                    shape, 
                    { 
                      depth: 20, 
                      bevelEnabled: true,
                      bevelThickness: 2,
                      bevelSize: 1,
                      bevelSegments: 3
                    }
                  ]} 
                />
                <meshPhysicalMaterial 
                  color="#222222"
                  metalness={0.8}
                  roughness={0.2}
                  clearcoat={0.5}
                  clearcoatRoughness={0.3}
                />
              </mesh>
            ));
          })}
        </React.Fragment>
      ))}
      
      {/* Add text for "SIDDHANT GUREJA" */}
      <Text
        position={[0, -80, 0]}
        fontSize={16}
        color="#444444"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      >
        SIDDHANT
      </Text>
      <Text
        position={[0, -100, 0]}
        fontSize={16}
        color="#444444"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      >
        GUREJA
      </Text>
    </group>
  );
};

// Main component that sets up the scene
const GurejaSvgCanvas = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 200], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[100, 100, 100]} 
            angle={0.3} 
            penumbra={1} 
            intensity={1} 
            castShadow 
          />
          <spotLight 
            position={[-100, -100, -100]} 
            angle={0.3} 
            penumbra={1} 
            intensity={0.5} 
            castShadow 
          />
          
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <Logo3D />
          </PresentationControls>
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GurejaSvgCanvas;
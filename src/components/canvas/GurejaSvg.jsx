import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const GurejaSvg = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const groupRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLAvailable(false);
        return;
      }
    } catch (e) {
      setIsWebGLAvailable(false);
      return;
    }

    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera setup
    const aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup with error handling
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        canvas: mountRef.current,
      });
      
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      // Handle context loss
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);
    } catch (error) {
      console.error('WebGL renderer creation failed:', error);
      setIsWebGLAvailable(false);
      return;
    }

    // Group for SVG paths
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Load SVG with error handling
    const loader = new SVGLoader();
    loader.load(
      '/Gureja.svg',
      (data) => {
        if (!mounted) return;
        
        const paths = data.paths;
        
        paths.forEach((path) => {
          const shapes = path.toShapes(true);
          
          shapes.forEach((shape) => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 0.2,
              bevelEnabled: true,
              bevelThickness: 0.1,
              bevelSize: 0.1,
              bevelSegments: 3
            });
            
            const material = new THREE.MeshPhongMaterial({
              color: new THREE.Color(path.color),
              emissive: new THREE.Color(0x000000),
              specular: new THREE.Color(0x111111),
              shininess: 30,
              side: THREE.DoubleSide
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          });
        });

        // Center the SVG
        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        group.position.sub(center);

        // Scale based on container size
        const boxSize = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(boxSize.x, boxSize.y);
        const scale = Math.min(
          mountRef.current.clientWidth / maxDim,
          mountRef.current.clientHeight / maxDim
        ) * 0.8;
        group.scale.setScalar(scale);
      },
      undefined,
      (error) => {
        if (!mounted) return;
        console.error('SVG loading failed:', error);
        setIsWebGLAvailable(false);
      }
    );

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation
    const animate = () => {
      if (!mounted || contextLost) return;
      
      animationFrameRef.current = requestAnimationFrame(animate);

      if (groupRef.current) {
        groupRef.current.rotation.y += 0.005;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Handle context loss/restore
    function handleContextLost(event) {
      event.preventDefault();
      setContextLost(true);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    function handleContextRestored() {
      setContextLost(false);
      animate();
    }

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current || contextLost) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      const aspect = width / height;

      cameraRef.current.aspect = aspect;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Update scale if group exists
      if (groupRef.current) {
        const box = new THREE.Box3().setFromObject(groupRef.current);
        const boxSize = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(boxSize.x, boxSize.y);
        const scale = Math.min(width / maxDim, height / maxDim) * 0.8;
        groupRef.current.scale.setScalar(scale);
      }
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.domElement.removeEventListener('webglcontextlost', handleContextLost);
        rendererRef.current.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
        rendererRef.current.dispose();
      }
      
      if (groupRef.current) {
        groupRef.current.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
        scene.remove(groupRef.current);
      }

      // Clean up scene
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            object.material.dispose();
          }
        });
      }
    };
  }, []);

  if (!isWebGLAvailable) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-tertiary rounded-lg p-4">
        <p className="text-white text-center">
          3D rendering is not available on your device.
          Please try using a WebGL-supported browser.
        </p>
      </div>
    );
  }

  if (contextLost) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-tertiary rounded-lg p-4">
        <p className="text-white text-center">
          WebGL context was lost. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <canvas 
      ref={mountRef} 
      className="w-full h-full min-h-[300px] rounded-lg"
      style={{ touchAction: 'none' }}
    />
  );
};

export default GurejaSvg; 
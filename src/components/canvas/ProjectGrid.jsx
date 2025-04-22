import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image } from '@react-three/drei';

const ProjectCard = ({ project, position, onClick }) => {
  const mesh = useRef();
  const [hovered, setHovered] = React.useState(false);

  useFrame(() => {
    if (hovered) {
      mesh.current.rotation.y += 0.01;
      mesh.current.position.z = position[2] + Math.sin(Date.now() * 0.001) * 0.2;
    }
  });

  return (
    <group
      ref={mesh}
      position={position}
      onClick={() => onClick(project)}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Project Card */}
      <mesh>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial
          color={hovered ? '#4a90e2' : '#2a2a2a'}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Project Image */}
      <Image
        url={project.image}
        position={[0, 0.5, 0.06]}
        scale={[2.8, 1.3, 1]}
        transparent
      />

      {/* Project Title */}
      <Text
        position={[0, -0.7, 0.06]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
    </group>
  );
};

const ProjectGrid = ({ projects, onSelect }) => {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <group ref={group}>
      {projects.map((project, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const x = (col - 0.5) * 4;
        const y = (row - 0.5) * 3;
        
        return (
          <ProjectCard
            key={project.id}
            project={project}
            position={[x, y, 0]}
            onClick={onSelect}
          />
        );
      })}
    </group>
  );
};

export default ProjectGrid; 
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface Hero3DBlobProps {
  mousePosition: { x: number; y: number };
}

const Hero3DBlob = ({ mousePosition }: Hero3DBlobProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useCursor(hovered);

  // Smooth mouse position updates
  useFrame(() => {
    mouseRef.current.x += (mousePosition.x - mouseRef.current.x) * 0.1;
    mouseRef.current.y += (mousePosition.y - mouseRef.current.y) * 0.1;
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle rotation
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    
    // React to cursor position - use smoothed values
    const targetX = (mouseRef.current.x / window.innerWidth) * 2 - 1;
    const targetY = -(mouseRef.current.y / window.innerHeight) * 2 + 1;
    
    meshRef.current.rotation.x += targetY * 0.2; // Reduced intensity
    meshRef.current.rotation.y += targetX * 0.2; // Reduced intensity
    
    // Scale on hover
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={1}
      >
        <sphereGeometry args={[1.5, 32, 32]} /> {/* Reduced segments for performance */}
        <MeshDistortMaterial
          color="#E63946"
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
};

const Hero3DObject = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={[1, 1.5]} // Reduced DPR for better performance
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
        performance={{ min: 0.5 }} // Lower frame rate threshold
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#E63946" />
        <pointLight position={[5, -5, 5]} intensity={0.6} color="#FFFFFF" />
        
        <Hero3DBlob mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default Hero3DObject;


import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphericParticlesProps {
  mousePosition: { x: number; y: number };
}

const Particles = ({ mousePosition }: AtmosphericParticlesProps) => {
  const count = 100; // Reduced from 200 for better performance
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Smooth mouse position updates
  useFrame(() => {
    mouseRef.current.x += (mousePosition.x - mouseRef.current.x) * 0.1;
    mouseRef.current.y += (mousePosition.y - mouseRef.current.y) * 0.1;
  });
  
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      size[i] = Math.random() * 0.08 + 0.02;
    }
    
    return [pos, size];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Slow rotation - optimized
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    
    // Optimized cursor repulsion - only update if mouse moved significantly
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const normalizedX = (mouseRef.current.x / window.innerWidth) * 2 - 1;
    const normalizedY = -(mouseRef.current.y / window.innerHeight) * 2 + 1;
    
    // Only process particles near cursor for better performance
    const cursorRadius = 5;
    const updateInterval = 2; // Update every 2nd frame
    
    if (Math.floor(state.clock.elapsedTime * 30) % updateInterval === 0) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        
        // Calculate distance from cursor
        const dx = x - normalizedX * 10;
        const dy = y - normalizedY * 10;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repel effect - only if close enough
        if (distance < cursorRadius && distance > 0.1) {
          const force = (cursorRadius - distance) / cursorRadius;
          positions[i3] += (dx / distance) * force * 0.008;
          positions[i3 + 1] += (dy / distance) * force * 0.008;
        }
        
        // Gentle floating motion - reduced frequency
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i * 0.1) * 0.0003;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
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
        size={0.05}
        color="#E63946"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const AtmosphericParticles = ({ mousePosition }: AtmosphericParticlesProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 1.5]} // Reduced DPR for better performance
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
        performance={{ min: 0.5 }} // Lower frame rate threshold
      >
        <ambientLight intensity={0.3} />
        <Particles mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default AtmosphericParticles;

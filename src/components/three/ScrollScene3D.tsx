import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Torus - represents cycles/process
const FloatingTorus = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Rotation based on scroll + time
    meshRef.current.rotation.x = scrollProgress * Math.PI * 2 + t * 0.2;
    meshRef.current.rotation.y = scrollProgress * Math.PI + t * 0.3;

    // Position based on scroll
    meshRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 0.5 + 2;
    meshRef.current.position.x = -3 + scrollProgress * 1.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-3, 2, -2]}>
        <torusGeometry args={[0.8, 0.3, 16, 32]} />
        <MeshDistortMaterial
          color="#E63946"
          roughness={0.2}
          metalness={0.8}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

// Floating Icosahedron - represents innovation
const FloatingIcosahedron = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.3 + scrollProgress * Math.PI;
    meshRef.current.rotation.z = t * 0.2 + scrollProgress * Math.PI * 0.5;

    // Float up as user scrolls
    meshRef.current.position.y = -1 + scrollProgress * 3;
    meshRef.current.position.x = 3.5 - scrollProgress * 1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[3.5, -1, -3]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#ff6b6b"
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  );
};

// Floating Octahedron - represents precision
const FloatingOctahedron = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.y = t * 0.4 + scrollProgress * Math.PI * 2;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;

    // Move diagonally based on scroll
    meshRef.current.position.y = 1 - scrollProgress * 2;
    meshRef.current.position.z = -2 + scrollProgress * 1;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[-2, 1, -2]}>
        <octahedronGeometry args={[0.5, 0]} />
        <MeshWobbleMaterial
          color="#E63946"
          roughness={0.3}
          metalness={0.7}
          factor={0.3}
          speed={1}
        />
      </mesh>
    </Float>
  );
};

// Floating Sphere with distortion - represents creativity
const FloatingSphere = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3 + scrollProgress * Math.PI;

    // Circular motion based on scroll
    const angle = scrollProgress * Math.PI * 2;
    meshRef.current.position.x = 2.5 + Math.cos(angle) * 0.5;
    meshRef.current.position.y = 0.5 + Math.sin(angle) * 0.5;
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={1}>
      <mesh ref={meshRef} position={[2.5, 0.5, -1.5]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <MeshDistortMaterial
          color="#ff4d4d"
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={3}
        />
      </mesh>
    </Float>
  );
};

// Small floating particles
const FloatingParticles = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2,
      ] as [number, number, number],
      scale: Math.random() * 0.15 + 0.05,
      speed: Math.random() * 0.5 + 0.5,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const particle = particles[i];
      child.position.y = particle.position[1] + Math.sin(t * particle.speed + i) * 0.3;
      child.position.x = particle.position[0] + Math.cos(t * particle.speed * 0.5 + i) * 0.2;
      child.rotation.x = t * particle.speed;
      child.rotation.y = t * particle.speed * 0.5;

      // Slight movement based on scroll
      child.position.z = particle.position[2] + scrollProgress * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#E63946' : '#ff8a8a'}
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating Ring - represents unity/connection
const FloatingRing = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2;
    meshRef.current.rotation.z = t * 0.3 + scrollProgress * Math.PI;

    meshRef.current.position.y = -2 + scrollProgress * 2.5;
    meshRef.current.scale.setScalar(1 + scrollProgress * 0.3);
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[0, -2, -4]}>
        <torusGeometry args={[1.2, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#E63946"
          roughness={0.2}
          metalness={0.9}
          emissive="#E63946"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

// Main Scene Component
const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#E63946" />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#ff6b6b" />

      {/* 3D Objects */}
      <FloatingTorus scrollProgress={scrollProgress} />
      <FloatingIcosahedron scrollProgress={scrollProgress} />
      <FloatingOctahedron scrollProgress={scrollProgress} />
      <FloatingSphere scrollProgress={scrollProgress} />
      <FloatingRing scrollProgress={scrollProgress} />
      <FloatingParticles scrollProgress={scrollProgress} />
    </>
  );
};

interface ScrollScene3DProps {
  scrollProgress: number;
  className?: string;
}

const ScrollScene3D = ({ scrollProgress, className = '' }: ScrollScene3DProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default ScrollScene3D;

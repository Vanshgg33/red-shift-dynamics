import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}

const FloatingSphere = ({ position, scale = 1, speed = 1, color = '#E63946' }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 24, 24]} /> {/* Reduced segments for performance */}
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const FloatingTorus = ({ position, scale = 1, speed = 1, color = '#E63946' }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.4, 12, 64]} /> {/* Reduced segments for performance */}
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

const FloatingOctahedron = ({ position, scale = 1, speed = 1, color = '#FFFFFF' }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#E63946"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
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
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#E63946" />
        
        <FloatingSphere position={[-4, 2, -2]} scale={0.8} speed={0.8} />
        <FloatingSphere position={[4, -2, -1]} scale={0.5} speed={1.2} color="#FFFFFF" />
        <FloatingTorus position={[3, 2.5, -3]} scale={0.6} speed={0.6} />
        <FloatingTorus position={[-3, -2, -2]} scale={0.4} speed={1} color="#FFFFFF" />
        <FloatingOctahedron position={[0, 3, -4]} scale={0.7} speed={0.5} />
        <FloatingOctahedron position={[-5, 0, -3]} scale={0.5} speed={0.8} color="#E63946" />
        
        <Particles />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;

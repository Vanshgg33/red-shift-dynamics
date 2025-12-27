import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedText = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_bold.typeface.json"
          size={1}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          AMAZEBALLS
          <meshStandardMaterial
            color="#E63946"
            roughness={0.3}
            metalness={0.7}
          />
        </Text3D>
      </Center>
    </Float>
  );
};

const Text3DScene = () => {
  return (
    <div className="w-full h-[200px] md:h-[300px]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#E63946" />
        <AnimatedText />
      </Canvas>
    </div>
  );
};

export default Text3DScene;

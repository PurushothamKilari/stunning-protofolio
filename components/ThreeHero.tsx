import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Add global type declarations for Three.js elements to resolve JSX errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      icosahedronGeometry: any;
      meshPhysicalMaterial: any;
      dodecahedronGeometry: any;
      meshBasicMaterial: any;
      instancedMesh: any;
      meshPhongMaterial: any;
      ambientLight: any;
      pointLight: any;
    }
  }
}

// The "Drone" - Physics based movement
const HeroDrone: React.FC<{ isWarping: boolean }> = ({ isWarping }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();
  
  // Physics state
  const position = useRef(new THREE.Vector3(0, 0, 0));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.x += delta * (isWarping ? 2 : 0.2);
      meshRef.current.rotation.y += delta * (isWarping ? 3 : 0.3);

      // Physics Target (Mouse Position)
      const targetX = (mouse.x * viewport.width) / 2;
      const targetY = (mouse.y * viewport.height) / 2;
      
      // Acceleration towards target
      const ax = (targetX - position.current.x) * 2; 
      const ay = (targetY - position.current.y) * 2;

      // Update velocity (with damping)
      velocity.current.x += ax * delta;
      velocity.current.y += ay * delta;
      velocity.current.multiplyScalar(0.9); // Friction

      // Update Position
      position.current.add(velocity.current.clone().multiplyScalar(delta));

      // Apply position
      meshRef.current.position.copy(position.current);

      // Banking effect (tilt based on velocity)
      meshRef.current.rotation.z = -velocity.current.x * 0.05;
      
      // Warp Shake
      if (isWarping) {
        meshRef.current.position.x += (Math.random() - 0.5) * 0.2;
        meshRef.current.position.y += (Math.random() - 0.5) * 0.2;
      }
    }
  });

  return (
    <group>
      <mesh ref={meshRef} scale={isWarping ? 1.5 : 1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color={isWarping ? "#ffffff" : "#1a1a1a"}
          emissive={isWarping ? "#00f0ff" : "#00f0ff"}
          emissiveIntensity={isWarping ? 2 : 0.2}
          roughness={0.1}
          metalness={0.9}
          transmission={0.2}
          thickness={1}
          wireframe={true}
        />
        {/* Inner Core */}
        <mesh scale={0.5}>
             <dodecahedronGeometry args={[1, 0]} />
             <meshBasicMaterial color={isWarping ? "#00f0ff" : "#000"} />
        </mesh>
      </mesh>
    </group>
  );
};

// Starfield that reacts to Warp
const WarpStars: React.FC<{ isWarping: boolean }> = ({ isWarping }) => {
  const count = 1000;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const stars = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      temp.push({ x, y, z, speed: Math.random() * 0.5 + 0.1 });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    stars.forEach((star, i) => {
      // Move stars towards camera (z-axis)
      star.z += star.speed * (isWarping ? 20 : 1);
      
      // Reset if behind camera
      if (star.z > 20) star.z = -80;

      dummy.position.set(star.x, star.y, star.z);
      
      // Stretch effect during warp
      const scale = isWarping ? 5 : 0.2;
      dummy.scale.set(0.2, 0.2, scale);
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshBasicMaterial color="#ffffff" />
    </instancedMesh>
  );
};

const ThreeHero: React.FC = () => {
  const [isWarping, setIsWarping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

 return (
  <div 
    className="relative h-screen w-full overflow-hidden bg-space select-none"
    onMouseDown={() => setIsWarping(true)}
    onMouseUp={() => setIsWarping(false)}
    onTouchStart={() => setIsWarping(true)}
    onTouchEnd={() => setIsWarping(false)}
  >
    {/* HUD - Improvement Status */}
    <div
      className={`absolute bottom-24 left-6 md:left-12 z-20 transition-opacity duration-300 ${
        isWarping ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-accent font-mono text-xl font-bold animate-pulse">
        CONTINUOUS IMPROVEMENT ACTIVE
      </div>
      <div className="w-64 h-1 bg-accent/30 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-accent animate-[width_0.5s_ease-in-out_infinite]"
          style={{ width: '100%' }}
        />
      </div>
      <div className="mt-2 text-[0.7rem] font-mono text-accent/70 tracking-widest uppercase">
        Analyzing flow • Identifying bottlenecks • Reducing waste
      </div>
    </div>

    {/* Available / Open to Work Status */}
    <div className="absolute top-24 right-6 md:right-12 flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md z-20 hover:bg-white/10 transition-colors cursor-pointer">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
      <span className="text-xs font-mono text-green-400 font-bold tracking-wider">
        OPEN TO OPPORTUNITIES
      </span>
    </div>

    {/* 3D Canvas Layer */}
    <div className="absolute inset-0 z-0">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 10]}
          fov={isWarping ? 100 : 75}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000ff" />

        {!isMobile && <HeroDrone isWarping={isWarping} />}
        <WarpStars isWarping={isWarping} />
      </Canvas>
    </div>

    {/* HTML Overlay Layer */}
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isWarping ? 0.5 : 1,
          y: 0,
          scale: isWarping ? 0.9 : 1
        }}
        transition={{ duration: 0.3 }}
        className="text-center px-4"
      >
        <h2 className="text-accent text-lg md:text-xl font-mono mb-4 tracking-widest uppercase">
          Hi, I&apos;m Manoj Kumar
        </h2>
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight mix-blend-difference mb-6">
          OPTIMIZING MANUFACTURING
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
            &amp; OPERATIONS PERFORMANCE
          </span>
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-sm md:text-lg font-mono leading-relaxed">
          Industrial Engineer &amp; Six Sigma Green Belt focused on Lean
          manufacturing, continuous improvement, quality engineering, and EHS.
          I use tools like DMAIC, VSM, SMED, Minitab, and Power BI to reduce
          defects, cut cycle time, and unlock data-driven decisions on the shop
          floor.
        </p>

        <div className="mt-8 text-xs text-white/30 font-mono hidden md:block">
          [ CLICK AND HOLD TO ANALYZE FLOW ]
        </div>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-20"
      animate={{ y: [0, 10, 0], opacity: isWarping ? 0 : 1 }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
        <div className="w-1 h-1 bg-accent rounded-full mb-1" />
      </div>
    </motion.div>
  </div>
);
}

export default ThreeHero;
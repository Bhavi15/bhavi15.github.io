import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function DataCube({ position, size = 0.3, color = '#00D4FF', delay = 0 }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime + delay;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.y = t * 0.6;
    ref.current.material.emissiveIntensity = 0.4 + Math.sin(t * 1.2) * 0.3;
  });
  return (
    <Float floatIntensity={0.6} speed={1 + delay * 0.2}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.1} metalness={0.9} wireframe />
      </mesh>
      <mesh position={position}>
        <boxGeometry args={[size * 0.95, size * 0.95, size * 0.95]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.05} roughness={0.1} />
      </mesh>
    </Float>
  );
}

function RingOrbit({ radius, count, color, speed = 1, tilt = 0 }) {
  const group = useRef();
  useFrame((s) => {
    if (group.current) group.current.rotation.y = s.clock.elapsedTime * speed * 0.3;
  });
  const positions = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      return [Math.cos(a) * radius, 0, Math.sin(a) * radius];
    }), [radius, count]
  );
  return (
    <group ref={group} rotation={[tilt, 0, 0]}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 80]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.08} />
      </mesh>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} roughness={0.1} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function CentralCore() {
  const outer = useRef();
  const inner = useRef();
  const core  = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (outer.current) outer.current.rotation.y = t * 0.2;
    if (outer.current) outer.current.rotation.z = t * 0.13;
    if (inner.current) inner.current.rotation.x = -t * 0.3;
    if (inner.current) inner.current.rotation.y = t * 0.4;
    if (core.current)  core.current.material.emissiveIntensity = 1 + Math.sin(t * 2) * 0.4;
  });
  return (
    <group>
      {/* Outer shell */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.4} transparent opacity={0.08} wireframe={false} roughness={0.05} metalness={0.95} />
      </mesh>
      {/* Wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.8} wireframe transparent opacity={0.3} />
      </mesh>
      {/* Inner */}
      <mesh ref={inner}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#7B2FFF" emissive="#7B2FFF" emissiveIntensity={0.6} roughness={0.05} metalness={0.9} transparent opacity={0.6} />
      </mesh>
      {/* Core */}
      <mesh ref={core}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1.2} />
      </mesh>
      <pointLight color="#00D4FF" intensity={0.25} distance={8} decay={2} />
      <pointLight color="#7B2FFF" intensity={0.35} distance={6} decay={2} />
    </group>
  );
}

function TensorSlice({ y, color, speed = 1 }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * speed * 0.15;
    ref.current.material.opacity = 0.06 + Math.sin(s.clock.elapsedTime * 0.8 + y) * 0.03;
  });
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.5, 6.5, 64]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  );
}

function FloatingEquation({ position, delay }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.6 + delay) * 0.3;
    ref.current.material.opacity = 0.15 + Math.sin(s.clock.elapsedTime * 0.8 + delay) * 0.08;
  });
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1.4, 0.5]} />
      <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.4} transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function ResearchScene() {
  const cubes = useMemo(() => Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const r = 4.5 + Math.sin(i * 1.3) * 1.5;
    const colors = ['#00D4FF','#00FF88','#FF3366','#7B2FFF','#FFB800'];
    return {
      pos: [Math.cos(a)*r, (Math.random()-0.5)*3, Math.sin(a)*r],
      size: 0.18 + Math.random()*0.22,
      color: colors[i % colors.length],
      delay: i * 0.4,
    };
  }), []);

  return (
    <group>
      {/* Ambient */}
      <ambientLight intensity={0.3} color="#0A0E1A" />
      <pointLight position={[0,6,0]} intensity={0.35} color="#00D4FF" decay={2} />
      <pointLight position={[-6,2,-4]} intensity={0.5} color="#7B2FFF" decay={2} />
      <pointLight position={[6,2,-4]}  intensity={0.5} color="#00FF88" decay={2} />

      {/* Central atom-like structure */}
      <CentralCore />

      {/* Orbital rings */}
      <RingOrbit radius={2.4} count={8}  color="#00D4FF" speed={1.0}  tilt={0.3}  />
      <RingOrbit radius={3.6} count={12} color="#7B2FFF" speed={-0.7} tilt={1.1}  />
      <RingOrbit radius={5.0} count={16} color="#00FF88" speed={0.5}  tilt={0.6}  />

      {/* Tensor cross-section planes */}
      <TensorSlice y={-2}   color="#00D4FF" speed={1}    />
      <TensorSlice y={0}    color="#7B2FFF" speed={-1.3} />
      <TensorSlice y={2}    color="#00FF88" speed={0.8}  />

      {/* Floating cubes / data artifacts */}
      {cubes.map((c, i) => (
        <DataCube key={i} position={c.pos} size={c.size} color={c.color} delay={c.delay} />
      ))}

      {/* Formula planes */}
      {[[-4,1.5,-2],[-3.5,-1,3],[4,2,2],[3.5,-1.5,-3]].map((p,i) => (
        <FloatingEquation key={i} position={p} delay={i * 1.1} />
      ))}

      <Sparkles count={18} scale={[14,8,14]} size={0.9} speed={0.06} opacity={0.08} color="#00D4FF" />
      <Sparkles count={20}  scale={[10,6,10]} size={1.4} speed={0.04} opacity={0.06} color="#7B2FFF" />
    </group>
  );
}

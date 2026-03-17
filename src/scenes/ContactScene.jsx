import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function SignalRing({ radius, speed, delay, color }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    const t   = (s.clock.elapsedTime * speed + delay) % 3;
    const sc  = 0.3 + t * 0.5;
    const op  = Math.max(0, 1 - t / 3);
    ref.current.scale.setScalar(sc);
    ref.current.material.opacity = op * 0.6;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 0.9, radius, 48]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

function TransmissionTower() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.children[0].material.emissiveIntensity = 0.8 + Math.sin(s.clock.elapsedTime * 4) * 0.5;
  });
  return (
    <group ref={ref} position={[0, 0, -2]}>
      {/* Top beacon */}
      <mesh position={[0, 3.5, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#FF3366" emissive="#FF3366" emissiveIntensity={1} />
      </mesh>
      <pointLight position={[0,3.5,0]} color="#FF3366" intensity={1.2} distance={8} decay={2} />

      {/* Main mast */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.04, 0.1, 3, 6]} />
        <meshStandardMaterial color="#1A2A3A" roughness={0.4} metalness={0.9} />
      </mesh>

      {/* Cross beams */}
      {[0, 0.8, 1.8].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 1.4 - i * 0.3, 5]} />
            <meshStandardMaterial color="#1A2A3A" roughness={0.4} metalness={0.9} />
          </mesh>
          {/* Guy wire endpoints */}
          {[-1,1].map((side,j) => (
            <mesh key={j} position={[side*(0.65-i*0.12), 0, 0]}>
              <sphereGeometry args={[0.04, 5, 5]} />
              <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Base platform */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.15, 8]} />
        <meshStandardMaterial color="#0D1525" roughness={0.5} metalness={0.9} />
      </mesh>
      {/* Base ring glow */}
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI/2,0,0]}>
        <ringGeometry args={[0.58, 0.82, 30]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function DataStream({ angle, length = 8, color }) {
  const ref    = useRef();
  const life   = useRef(Math.random());
  const speed  = 0.15 + Math.random() * 0.2;

  useFrame((_, delta) => {
    if (!ref.current) return;
    life.current += delta * speed;
    if (life.current > 1) life.current -= 1;
    const d = life.current * length;
    ref.current.position.set(
      Math.cos(angle) * d,
      0.5 - life.current * 0.5,
      Math.sin(angle) * d - 2
    );
    ref.current.material.opacity = Math.sin(life.current * Math.PI) * 0.8;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 5, 5]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.8} />
    </mesh>
  );
}

function HexGrid() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.material.opacity = 0.04 + Math.sin(s.clock.elapsedTime * 0.4) * 0.02;
  });
  return (
    <mesh ref={ref} position={[0,-0.5,-2]} rotation={[-Math.PI/2,0,0]}>
      <planeGeometry args={[22,22,22,22]} />
      <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.3} transparent opacity={0.04} wireframe />
    </mesh>
  );
}

export default function ContactScene() {
  const signals = useMemo(() => Array.from({length:5}, () => ({
    r: 1.0 + Math.random() * 2.5,
    sp: 0.2 + Math.random() * 0.4,
    delay: Math.random() * 3,
    col: ['#00D4FF','#00FF88','#FF3366'][Math.floor(Math.random()*3)],
  })), []);

  const streams = useMemo(() => Array.from({length:12}, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    col: ['#00D4FF','#00FF88','#7B2FFF'][i%3],
  })), []);

  return (
    <group>
      <ambientLight intensity={0.2} color="#040810" />
      <pointLight position={[0,6,-2]}  intensity={1.0} color="#00D4FF" decay={2} />
      <pointLight position={[-5,2,0]}  intensity={0.5} color="#7B2FFF" decay={2} />
      <pointLight position={[5,2,0]}   intensity={0.5} color="#00FF88" decay={2} />
      <pointLight position={[0,-1,-2]} intensity={0.35} color="#FF3366" decay={2} />

      <HexGrid />
      <TransmissionTower />

      {/* Concentric signal rings */}
      {signals.map((s, i) => (
        <SignalRing key={i} radius={s.r} speed={s.sp} delay={s.delay} color={s.col} />
      ))}

      {/* Data streams radiating outward */}
      {streams.map((s, i) => (
        <DataStream key={i} angle={s.angle} color={s.col} length={6 + i * 0.3} />
      ))}

      {/* Floating hexagonal shapes */}
      {[[-4,2,-1],[4,1.5,-1],[-3,3.5,-3],[3,3,-3],[0,4,-4]].map((p,i) => (
        <Float key={i} floatIntensity={0.5} speed={0.8+i*0.2}>
          <mesh position={p}>
            <cylinderGeometry args={[0.25,0.25,0.08,6]} />
            <meshStandardMaterial
              color={['#00D4FF','#00FF88','#7B2FFF'][i%3]}
              emissive={['#00D4FF','#00FF88','#7B2FFF'][i%3]}
              emissiveIntensity={0.6} roughness={0.1} metalness={0.9}
            />
          </mesh>
        </Float>
      ))}

      <Sparkles count={30} scale={[14,8,14]} size={0.8} speed={0.06} opacity={0.08} color="#00D4FF" />
    </group>
  );
}

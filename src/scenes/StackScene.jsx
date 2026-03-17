import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function HelixStrand({ color1 = '#00D4FF', color2 = '#7B2FFF', turns = 4, radius = 1.2 }) {
  const group = useRef();
  const POINTS = 80;
  const HEIGHT = 8;

  const { geo1, geo2, rungs } = useMemo(() => {
    const p1 = [], p2 = [], r = [];
    for (let i = 0; i <= POINTS; i++) {
      const t = i / POINTS;
      const angle = t * turns * Math.PI * 2;
      const y = t * HEIGHT - HEIGHT / 2;
      p1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      p2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
      if (i % 8 === 0) r.push(i);
    }
    const c1 = new THREE.CatmullRomCurve3(p1);
    const c2 = new THREE.CatmullRomCurve3(p2);
    return {
      geo1: new THREE.TubeGeometry(c1, 120, 0.04, 6, false),
      geo2: new THREE.TubeGeometry(c2, 120, 0.04, 6, false),
      rungs: r.map(i => ({ p1: p1[i], p2: p2[i] })),
    };
  }, [turns, radius]);

  useFrame((s) => {
    if (group.current) group.current.rotation.y = s.clock.elapsedTime * 0.2;
  });

  return (
    <group ref={group}>
      <mesh geometry={geo1}>
        <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={0.7} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh geometry={geo2}>
        <meshStandardMaterial color={color2} emissive={color2} emissiveIntensity={0.7} roughness={0.1} metalness={0.8} />
      </mesh>
      {rungs.map((r, i) => {
        const mid = r.p1.clone().lerp(r.p2, 0.5);
        const len = r.p1.distanceTo(r.p2);
        const q   = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          r.p2.clone().sub(r.p1).normalize()
        );
        return (
          <mesh key={i} position={mid} quaternion={q}>
            <cylinderGeometry args={[0.025, 0.025, len, 5]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00FF88' : '#FFB800'}
              emissive={i % 2 === 0 ? '#00FF88' : '#FFB800'}
              emissiveIntensity={0.6}
              roughness={0.2} metalness={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function TechSphere({ position, label, color, index }) {
  const ref  = useRef();
  const ring = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (ref.current) {
      ref.current.children[0].material.emissiveIntensity = 0.5 + Math.sin(t * 1.5 + index) * 0.3;
      ref.current.rotation.x = t * 0.3 + index;
      ref.current.rotation.y = t * 0.4;
    }
    if (ring.current) ring.current.rotation.z = t * 0.5 + index;
  });
  return (
    <Float floatIntensity={0.4} speed={0.8 + index * 0.1}>
      <group position={position}>
        <group ref={ref}>
          <mesh>
            <icosahedronGeometry args={[0.28, 1]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.05} metalness={0.95} />
          </mesh>
        </group>
        {/* Orbit ring around sphere */}
        <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.44, 0.012, 6, 30]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.6} />
        </mesh>
        <pointLight color={color} intensity={0.4} distance={2} decay={2} />
      </group>
    </Float>
  );
}

function GridCeiling() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.material.opacity = 0.04 + Math.sin(s.clock.elapsedTime * 0.35) * 0.015;
  });
  return (
    <mesh ref={ref} position={[0, 5, -4]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshStandardMaterial color="#7B2FFF" emissive="#7B2FFF" emissiveIntensity={0.4} transparent opacity={0.04} wireframe />
    </mesh>
  );
}

export default function StackScene() {
  const techSpheres = useMemo(() => {
    const items = [
      ['PyTorch','#FF3366'],['LangChain','#00FF88'],['HuggingFace','#FFB800'],
      ['AWS','#00D4FF'],['FastAPI','#7B2FFF'],['LangGraph','#FF3366'],
      ['FAISS','#00FF88'],['TensorFlow','#00D4FF'],['Docker','#7B2FFF'],
    ];
    return items.map(([name,col], i) => {
      const angle = (i / items.length) * Math.PI * 2;
      const r     = 4.5;
      const yOff  = (Math.random() - 0.5) * 2;
      return { name, col, pos: [Math.cos(angle)*r, yOff, Math.sin(angle)*r - 2] };
    });
  }, []);

  return (
    <group>
      <ambientLight intensity={0.2} color="#050812" />
      <pointLight position={[0,6,-2]} intensity={1.2} color="#7B2FFF" decay={2} />
      <pointLight position={[-5,0,2]} intensity={0.25} color="#00D4FF" decay={2} />
      <pointLight position={[5,0,2]}  intensity={0.25} color="#00FF88" decay={2} />

      <GridCeiling />

      {/* Central DNA helix */}
      <HelixStrand color1="#00D4FF" color2="#7B2FFF" turns={3} radius={1.0} />

      {/* Orbiting tech spheres */}
      {techSpheres.map((ts, i) => (
        <TechSphere key={ts.name} position={ts.pos} label={ts.name} color={ts.col} index={i} />
      ))}

      {/* Connection lines from helix center to spheres */}
      {techSpheres.map((ts, i) => {
        const pts = [new THREE.Vector3(0,0,-2), new THREE.Vector3(...ts.pos)];
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color={ts.col} transparent opacity={0.08} />
          </line>
        );
      })}

      <Sparkles count={30} scale={[12,8,12]} size={0.8} speed={0.05} opacity={0.07} color="#7B2FFF" />
      <Sparkles count={18} scale={[8,5,8]}   size={1.2} speed={0.04} opacity={0.05} color="#00D4FF" />
    </group>
  );
}

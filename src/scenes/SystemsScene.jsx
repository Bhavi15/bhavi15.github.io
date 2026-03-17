import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Pipeline({ from, to, color = '#00D4FF', packets = 5 }) {
  const refs = useRef(Array.from({ length: packets }, () => ({ t: Math.random() })));
  const meshRefs = useRef([]);

  useFrame((_, delta) => {
    refs.current.forEach((p, i) => {
      p.t += delta * (0.3 + i * 0.05);
      if (p.t > 1) p.t -= 1;
      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.lerpVectors(
          new THREE.Vector3(...from),
          new THREE.Vector3(...to),
          p.t
        );
        mesh.material.opacity = Math.sin(p.t * Math.PI) * 0.95;
      }
    });
  });

  // Tube geometry for pipeline
  const tubePts = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
  const curve   = new THREE.CatmullRomCurve3(tubePts);

  return (
    <group>
      {/* Pipeline tube */}
      <mesh>
        <tubeGeometry args={[curve, 8, 0.018, 6, false]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.35} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Data packets */}
      {Array.from({ length: packets }, (_, i) => (
        <mesh key={i} ref={el => meshRefs.current[i] = el}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function ServerRack({ position, color = '#00D4FF' }) {
  const ref  = useRef();
  const leds = useMemo(() => Array.from({ length: 6 }, (_, i) => i), []);
  useFrame((s) => {
    if (ref.current) {
      ref.current.children.forEach((c, i) => {
        if (c.isMesh && i > 1) {
          c.material.emissiveIntensity = Math.random() > 0.97 ? 2 : (0.4 + Math.sin(s.clock.elapsedTime * 3 + i) * 0.2);
        }
      });
    }
  });
  return (
    <group ref={ref} position={position}>
      {/* Rack body */}
      <mesh castShadow>
        <boxGeometry args={[0.6, 2.2, 0.4]} />
        <meshStandardMaterial color="#0A0F1A" roughness={0.4} metalness={0.9} />
      </mesh>
      {/* Face plate */}
      <mesh position={[0, 0, 0.21]}>
        <boxGeometry args={[0.58, 2.18, 0.02]} />
        <meshStandardMaterial color="#0D1525" roughness={0.5} metalness={0.95} />
      </mesh>
      {/* LED row lights */}
      {leds.map(i => (
        <mesh key={i} position={[0.2, -0.85 + i * 0.32, 0.22]}>
          <boxGeometry args={[0.06, 0.02, 0.01]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* Rack border glow */}
      <mesh position={[0, 0, 0.22]}>
        <boxGeometry args={[0.62, 2.22, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.06} />
      </mesh>
      <pointLight position={[0, 0, 1]} color={color} intensity={0.25} distance={3} decay={2} />
    </group>
  );
}

function ProcessingNode({ position, label, color }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.5;
    ref.current.children[0].material.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * 2 + position[0]) * 0.3;
  });
  return (
    <Float floatIntensity={0.25} speed={1.2}>
      <group ref={ref} position={position}>
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.05} metalness={0.95} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.06} wireframe />
        </mesh>
        <pointLight color={color} intensity={0.35} distance={3} decay={2} />
      </group>
    </Float>
  );
}

function GridFloor() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.material.opacity = 0.06 + Math.sin(s.clock.elapsedTime * 0.4) * 0.02;
  });
  return (
    <mesh ref={ref} position={[0, -2, -4]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[24, 18, 24, 18]} />
      <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.3} transparent opacity={0.06} wireframe />
    </mesh>
  );
}

export default function SystemsScene() {
  // Pipeline graph: nodes connected by data flows
  const nodePositions = {
    ingest:   [-5,  0.5, -2],
    process1: [-1.8, 1,  -2],
    process2: [-1.8,-0.8,-2],
    model:    [1.2,  0.2,-2],
    serve1:   [4.2,  1,  -2],
    serve2:   [4.2, -0.8,-2],
  };

  const pipelines = [
    { from: nodePositions.ingest,   to: nodePositions.process1, color: '#00D4FF', pkts: 6 },
    { from: nodePositions.ingest,   to: nodePositions.process2, color: '#00D4FF', pkts: 4 },
    { from: nodePositions.process1, to: nodePositions.model,    color: '#7B2FFF', pkts: 5 },
    { from: nodePositions.process2, to: nodePositions.model,    color: '#7B2FFF', pkts: 3 },
    { from: nodePositions.model,    to: nodePositions.serve1,   color: '#00FF88', pkts: 7 },
    { from: nodePositions.model,    to: nodePositions.serve2,   color: '#00FF88', pkts: 5 },
  ];

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.25} color="#040810" />
      <pointLight position={[0,4,0]}   intensity={0.35}   color="#00D4FF" decay={2} />
      <pointLight position={[-6,2,-1]} intensity={0.25} color="#7B2FFF" decay={2} />
      <pointLight position={[6,2,-1]}  intensity={0.25} color="#00FF88" decay={2} />

      <GridFloor />

      {/* Server racks — background */}
      {[[-7,0,-5],[-5.5,0,-5],[-4,0,-5],[4,0,-5],[5.5,0,-5],[7,0,-5]].map((p,i) => (
        <ServerRack key={i} position={p} color={['#00D4FF','#7B2FFF','#00FF88'][i%3]} />
      ))}

      {/* Processing nodes */}
      <ProcessingNode position={nodePositions.ingest}   color="#00D4FF" label="INGEST" />
      <ProcessingNode position={nodePositions.process1} color="#7B2FFF" label="PROC-A" />
      <ProcessingNode position={nodePositions.process2} color="#7B2FFF" label="PROC-B" />
      <ProcessingNode position={nodePositions.model}    color="#FF3366" label="MODEL"  />
      <ProcessingNode position={nodePositions.serve1}   color="#00FF88" label="SVC-A"  />
      <ProcessingNode position={nodePositions.serve2}   color="#00FF88" label="SVC-B"  />

      {/* Data pipelines */}
      {pipelines.map((p, i) => (
        <Pipeline key={i} from={p.from} to={p.to} color={p.color} packets={p.pkts} />
      ))}

      {/* Floating metric cubes */}
      {[
        [[-2.5,3,-1],'#00D4FF'],[[2,3.5,-1],'#00FF88'],[[-4,2.5,-3],'#FF3366'],[[4.5,2,-3],'#7B2FFF'],
      ].map(([pos,col],i) => (
        <Float key={i} floatIntensity={0.4} speed={1+i*0.3}>
          <mesh position={pos}>
            <boxGeometry args={[0.35,0.35,0.35]} />
            <meshStandardMaterial color={col} emissive={col} emissiveIntensity={0.4} roughness={0.1} metalness={0.9} wireframe />
          </mesh>
        </Float>
      ))}

      <Sparkles count={60} scale={[16,8,16]} size={0.7} speed={0.05} opacity={0.2} color="#00D4FF" />
    </group>
  );
}

import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ── Node cluster that forms a brain-like structure ── */
const NODE_COUNT  = 120;
const CONN_RADIUS = 2.8; // max distance to draw a connection

function buildNodes() {
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    // Arrange in loose spherical clusters
    const phi   = Math.acos(1 - 2 * (i + 0.5) / NODE_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r     = 3.5 + (Math.random() - 0.5) * 2.5;
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta) * 0.65, // flatten Y slightly
      r * Math.cos(phi),
    );
  });
}

function buildConnections(nodes) {
  const conns = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < CONN_RADIUS) {
        conns.push([i, j]);
      }
    }
  }
  return conns;
}

export default function NeuralScene() {
  const { size, mouse } = useThree();
  const nodes      = useMemo(buildNodes,               []);
  const conns      = useMemo(() => buildConnections(nodes), [nodes]);
  const groupRef   = useRef();
  const linesRef   = useRef();
  const nodesRef   = useRef();
  const pulses     = useRef([]); // active signal pulses [{connIdx, t, speed}]
  const fireTimer  = useRef(0);

  // Build line geometry from connections
  const lineGeo = useMemo(() => {
    const positions = new Float32Array(conns.length * 6); // 2 verts * 3 coords
    conns.forEach(([a, b], i) => {
      positions.set([nodes[a].x, nodes[a].y, nodes[a].z], i * 6);
      positions.set([nodes[b].x, nodes[b].y, nodes[b].z], i * 6 + 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [conns, nodes]);

  // Node instance geometry
  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.06, 6, 6), []);
  const nodeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00D4FF', emissive: '#00D4FF', emissiveIntensity: 0.35,
    roughness: 0.2, metalness: 0.6,
  }), []);
  const nodeMatrix = useMemo(() => {
    const dummy = new THREE.Object3D();
    return nodes.map(n => {
      dummy.position.copy(n);
      dummy.updateMatrix();
      return dummy.matrix.clone();
    });
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    // Slow rotation
    groupRef.current.rotation.y = t * 0.04;
    groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.15;

    // Mouse influence
    groupRef.current.rotation.y += mouse.x * 0.08;
    groupRef.current.rotation.x += mouse.y * 0.04;

    // Pulse fires
    fireTimer.current += state.clock.getDelta ? 0.016 : 0.016;
    if (Math.random() < 0.04) {
      const connIdx = Math.floor(Math.random() * conns.length);
      pulses.current.push({ connIdx, t: 0, speed: 0.4 + Math.random() * 0.8 });
    }
    pulses.current = pulses.current.filter(p => p.t < 1);

    // Animate line colors based on pulses
    if (linesRef.current) {
      const col = linesRef.current.material;
      col.opacity = 0.12 + Math.sin(t * 0.5) * 0.04;
    }

    // Update node emissive pulse
    if (nodesRef.current) {
      nodesRef.current.material.emissiveIntensity = 0.2 + Math.sin(t * 2) * 0.1;
    }

    // Advance pulses
    pulses.current.forEach(p => { p.t += 0.016 * p.speed; });
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeo} frustumCulled={false}>
        <lineBasicMaterial
          color="#00D4FF" transparent opacity={0.06}
          linewidth={1} vertexColors={false}
        />
      </lineSegments>

      {/* Nodes as instanced mesh */}
      <instancedMesh
        ref={nodesRef}
        args={[nodeGeo, nodeMat, NODE_COUNT]}
        castShadow={false}
      >
        {nodes.map((n, i) => null)}
      </instancedMesh>
      {/* Set instance matrices imperatively after mount */}
      <InstanceSetter nodesRef={nodesRef} nodeMatrix={nodeMatrix} nodes={nodes} />

      {/* Brighter hub nodes (larger) */}
      {nodes.slice(0, 15).map((n, i) => (
        <HubNode key={i} position={n} index={i} />
      ))}

      {/* Data packets flying along connections */}
      {conns.slice(0, 30).map(([a, b], i) => (
        <DataPacket key={i} from={nodes[a]} to={nodes[b]} delay={i * 0.18} />
      ))}

      {/* Ambient depth sparkles */}
      <Sparkles count={50} scale={[12, 8, 12]} size={0.5} speed={0.05} opacity={0.12} color="#00D4FF" />
      <Sparkles count={25} scale={[8, 5, 8]} size={0.8} speed={0.04} opacity={0.07} color="#7B2FFF" />
    </group>
  );
}

function InstanceSetter({ nodesRef, nodeMatrix, nodes }) {
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    if (!nodesRef.current) return;
    nodes.forEach((n, i) => {
      dummy.position.copy(n);
      dummy.updateMatrix();
      nodesRef.current.setMatrixAt(i, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
  });
  return null;
}

function HubNode({ position, index }) {
  const ref = useRef();
  const phase = index * 0.7;
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.material.emissiveIntensity = 0.3 + Math.sin(t * 1.5 + phase) * 0.15;
    const sc = 1 + Math.sin(t * 2 + phase) * 0.12;
    ref.current.scale.setScalar(sc);
  });
  const colors = ['#00D4FF','#00FF88','#7B2FFF','#FF3366'];
  const col    = colors[index % colors.length];
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.14, 10, 10]} />
      <meshStandardMaterial color={col} emissive={col} emissiveIntensity={0.35} roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

function DataPacket({ from, to, delay }) {
  const ref  = useRef();
  const life = useRef(Math.random()); // start at random point in cycle
  const speed= 0.25 + Math.random() * 0.35;

  useFrame((s, delta) => {
    if (!ref.current) return;
    life.current += delta * speed;
    if (life.current > 1) life.current -= 1;
    ref.current.position.lerpVectors(from, to, life.current);
    ref.current.material.opacity = Math.sin(life.current * Math.PI) * 0.9;
  });

  const col = ['#00D4FF','#00FF88','#FF3366'][Math.floor(delay * 3) % 3];
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 5, 5]} />
      <meshStandardMaterial color={col} emissive={col} emissiveIntensity={0.7} transparent opacity={0.9} />
    </mesh>
  );
}

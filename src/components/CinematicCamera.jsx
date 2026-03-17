import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CinematicCamera({ scene, transitioning, cfg }) {
  const camPos  = useRef(new THREE.Vector3(...cfg.pos));
  const lookAt  = useRef(new THREE.Vector3(0, 0, 0));
  const { camera } = useThree();

  useFrame((state) => {
    const mx = state.mouse.x * 0.3;
    const my = state.mouse.y * 0.2;
    const t  = state.clock.elapsedTime;

    const target = new THREE.Vector3(
      cfg.pos[0] + mx,
      cfg.pos[1] + my + Math.sin(t * 0.3) * 0.05,
      cfg.pos[2]
    );
    const look = new THREE.Vector3(
      mx * 0.2,
      my * 0.1,
      0
    );

    const speed = transitioning ? 0.02 : 0.035;
    camPos.current.lerp(target, speed);
    lookAt.current.lerp(look, speed * 1.5);

    camera.position.copy(camPos.current);
    camera.lookAt(lookAt.current);
  });

  return null;
}

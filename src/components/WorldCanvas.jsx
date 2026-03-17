import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { ACESFilmicToneMapping } from 'three';
import CinematicCamera from './CinematicCamera';
import NeuralScene   from '../scenes/NeuralScene';
import ResearchScene from '../scenes/ResearchScene';
import SystemsScene  from '../scenes/SystemsScene';
import StackScene    from '../scenes/StackScene';
import ContactScene  from '../scenes/ContactScene';

// Map new scene names → 3D backgrounds
const SCENES = {
  ABOUT:      NeuralScene,
  EXPERIENCE: SystemsScene,
  PROJECTS:   ResearchScene,
  SKILLS:     StackScene,
  CONTACT:    ContactScene,
};

const CAM_CONFIGS = {
  ABOUT:      { pos:[0, 0.5, 7],   fov:60 },
  EXPERIENCE: { pos:[0, 1.5, 8],   fov:65 },
  PROJECTS:   { pos:[0, 0.5, 8],   fov:58 },
  SKILLS:     { pos:[0, 0.5, 8.5], fov:62 },
  CONTACT:    { pos:[0, 1.0, 7],   fov:60 },
};

export default function WorldCanvas({ scene, transitioning }) {
  const SceneComponent = SCENES[scene] || NeuralScene;
  const camCfg = CAM_CONFIGS[scene] || CAM_CONFIGS.ABOUT;

  return (
    <Canvas
      camera={{ position: camCfg.pos, fov: camCfg.fov, near: 0.1, far: 400 }}
      gl={{
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 0.55,
        antialias: true,
      }}
      style={{ width: '100%', height: '100%', background: '#030508' }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <CinematicCamera scene={scene} transitioning={transitioning} cfg={camCfg} />
      <Suspense fallback={null}>
        <SceneComponent />
      </Suspense>
    </Canvas>
  );
}

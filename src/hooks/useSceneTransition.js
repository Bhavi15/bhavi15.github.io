import { useState, useCallback, useRef } from 'react';
import { SCENES } from '../data/portfolio';

export function useSceneTransition() {
  const [sceneIndex,   setSceneIndex]   = useState(0);
  const [transitioning,setTransitioning]= useState(false);
  const [fadeAlpha,    setFadeAlpha]    = useState(0);
  const [phase,        setPhase]        = useState('idle'); // idle | out | in
  const timers = useRef([]);

  const after = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const go = useCallback((nextIdx) => {
    if (transitioning || nextIdx < 0 || nextIdx >= SCENES.length) return;
    setTransitioning(true);
    setPhase('out');

    after(() => setFadeAlpha(1),       20);
    after(() => { setSceneIndex(nextIdx); setPhase('in'); }, 700);
    after(() => setFadeAlpha(0),       800);
    after(() => { setTransitioning(false); setPhase('idle'); }, 1800);
  }, [transitioning]);

  const goNext = useCallback(() => go(sceneIndex + 1), [sceneIndex, go]);
  const goPrev = useCallback(() => go(sceneIndex - 1), [sceneIndex, go]);
  const goTo   = useCallback((i) => go(i),             [go]);

  return {
    sceneIndex, scene: SCENES[sceneIndex],
    isFirst: sceneIndex === 0, isLast: sceneIndex === SCENES.length - 1,
    transitioning, fadeAlpha, phase,
    goNext, goPrev, goTo,
  };
}

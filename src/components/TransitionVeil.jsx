import { useEffect, useState } from 'react';

const mono = "'JetBrains Mono', monospace";

export default function TransitionVeil({ alpha, scene }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (alpha > 0.5) {
      setGlitch(true);
      const id = setTimeout(() => setGlitch(false), 300);
      return () => clearTimeout(id);
    }
  }, [alpha]);

  if (alpha <= 0.005) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: '#040508',
      opacity: alpha,
      transition: `opacity ${alpha > 0.5 ? '0.35s' : '0.65s'} ease`,
      pointerEvents: alpha > 0.4 ? 'auto' : 'none',
    }}>
      {alpha > 0.7 && (
        <>
          {/* Scan lines during transition */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)',
            pointerEvents: 'none',
          }} />

          {/* Central text */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}>
            {/* Loading bar */}
            <div style={{ width: 200, height: 1, background: 'rgba(0,212,255,0.12)', overflow:'hidden' }}>
              <div style={{
                width: '60%', height: '100%',
                background: 'linear-gradient(90deg, transparent, #00D4FF, transparent)',
                animation: 'shimmerX 0.4s ease infinite',
              }} />
            </div>
            <div style={{
              fontFamily: mono, fontSize: 9, letterSpacing: 5,
              color: 'rgba(0,212,255,0.25)',
              animation: glitch ? 'glitch1 0.3s ease' : 'none',
            }}>
              LOADING_{scene}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

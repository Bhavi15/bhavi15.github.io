import { useState, useEffect } from 'react';
import { SCENES, SCENE_META, engineer } from '../data/portfolio';

const mono = "'JetBrains Mono', monospace";
const disp = "'Syne', sans-serif";
const body = "'Space Grotesk', sans-serif";

const ACCENT = { ABOUT:'#00D4FF', EXPERIENCE:'#00FF88', PROJECTS:'#7B2FFF', SKILLS:'#FFB800', CONTACT:'#FF3366' };

export default function HUD({ scene, sceneIndex, onNavigate, transitioning }) {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const accent = ACCENT[scene] || '#00D4FF';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      pointerEvents: 'none',
      opacity: vis ? 1 : 0,
      transition: 'opacity 0.8s ease',
    }}>

      {/* ── TOP BAR ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 58,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
        background: 'rgba(3,5,10,0.88)',
        borderBottom: `1px solid ${accent}18`,
        backdropFilter: 'blur(20px)',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div style={{
            width: 30, height: 30,
            border: `1.5px solid ${accent}80`,
            clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 14px ${accent}30`,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
          </div>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 2, color: 'rgba(220,235,255,0.75)' }}>
            BP<span style={{ color: accent }}>.</span>AI
          </div>
        </div>

        {/* ── NAV TABS — large, clear, fully labelled ── */}
        <nav style={{ display: 'flex', gap: 2, pointerEvents: 'auto' }}>
          {SCENES.map((s, i) => {
            const m = SCENE_META[s];
            const isActive = s === scene;
            const col = ACCENT[s];
            return (
              <button
                key={s}
                onClick={() => !transitioning && onNavigate(i)}
                disabled={transitioning}
                style={{
                  fontFamily: body,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: 0.5,
                  padding: '0 20px',
                  height: 58,
                  background: isActive ? `${col}14` : 'transparent',
                  color: isActive ? col : 'rgba(200,215,255,0.5)',
                  border: 'none',
                  borderBottom: isActive ? `2px solid ${col}` : '2px solid transparent',
                  cursor: transitioning ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  pointerEvents: 'auto',
                }}
                onMouseEnter={e => {
                  if (isActive || transitioning) return;
                  e.currentTarget.style.color = col;
                  e.currentTarget.style.background = `${col}0A`;
                }}
                onMouseLeave={e => {
                  if (isActive) return;
                  e.currentTarget.style.color = 'rgba(200,215,255,0.5)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 8, color: isActive ? `${col}80` : 'rgba(255,255,255,0.2)', display: 'block', letterSpacing: 2, marginBottom: 2 }}>0{i + 1}</span>
                {m.name.toUpperCase()}
              </button>
            );
          })}
        </nav>

        {/* Right — availability badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 10px #00FF88', animation: 'pulse 2s ease infinite' }} />
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: 2, color: 'rgba(0,255,136,0.8)' }}>AVAILABLE</span>
        </div>
      </div>

      {/* ── RIGHT EDGE — vertical scene progress ── */}
      <div style={{
        position: 'absolute', right: 24, top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        pointerEvents: 'auto',
      }}>
        {SCENES.map((s, i) => {
          const isActive = sceneIndex === i;
          const col = ACCENT[s];
          return (
            <button key={s} onClick={() => !transitioning && onNavigate(i)} title={SCENE_META[s].name} style={{
              width: isActive ? 3 : 2,
              height: isActive ? 32 : 14,
              background: isActive ? col : i < sceneIndex ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
              border: 'none', borderRadius: 2, cursor: 'pointer',
              boxShadow: isActive ? `0 0 10px ${col}` : 'none',
              transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              padding: 0,
            }} />
          );
        })}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
        background: 'rgba(3,5,10,0.7)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <span style={{ fontFamily: mono, fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: 2 }}>
          BHAVISHA_PATEL
        </span>
        <span style={{ fontFamily: mono, fontSize: 8, color: 'rgba(255,255,255,0.18)', letterSpacing: 2 }}>
          {String(sceneIndex + 1).padStart(2,'0')} / {String(SCENES.length).padStart(2,'0')} — USE ARROWS OR NAV TO EXPLORE
        </span>
      </div>
    </div>
  );
}

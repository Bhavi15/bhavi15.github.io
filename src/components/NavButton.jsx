import { SCENE_META, SCENES } from '../data/portfolio';

const mono = "'JetBrains Mono', monospace";
const body = "'Inter', 'Space Grotesk', sans-serif";

const ACCENT = { ABOUT:'#00D4FF', EXPERIENCE:'#00FF88', PROJECTS:'#7B2FFF', SKILLS:'#FFB800', CONTACT:'#FF3366' };

export default function NavButton({ scene, sceneIndex, onNext, onPrev, isFirst, isLast, transitioning }) {
  const nextScene = !isLast  ? SCENES[sceneIndex + 1] : null;
  const prevScene = !isFirst ? SCENES[sceneIndex - 1] : null;
  const nextMeta  = nextScene ? SCENE_META[nextScene] : null;
  const prevMeta  = prevScene ? SCENE_META[prevScene] : null;
  const nextColor = nextScene ? ACCENT[nextScene] : '#00D4FF';

  return (
    <div style={{
      position: 'fixed', bottom: 52, right: 48,
      zIndex: 600, display: 'flex', flexDirection: 'column', gap: 8,
      alignItems: 'flex-end', pointerEvents: 'auto',
    }}>
      {!isFirst && (
        <button data-hover onClick={onPrev} disabled={transitioning} style={{
          fontFamily: mono, fontSize: 9, letterSpacing: 2, padding: '8px 16px',
          /* Solid bg so it's always visible */
          background: 'rgba(4,7,16,0.92)',
          color: 'rgba(200,215,255,0.7)',
          border: '1px solid rgba(255,255,255,0.18)',
          cursor: transitioning ? 'default' : 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
        onMouseEnter={e => !transitioning && (e.currentTarget.style.color = '#FFFFFF', e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)')}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,215,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}>
          ← {prevMeta?.name.toUpperCase()}
        </button>
      )}

      {!isLast && (
        <button data-hover onClick={onNext} disabled={transitioning} style={{
          fontFamily: body, fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
          padding: '14px 28px',
          /* Always visible: solid bg + strong border */
          background: `rgba(4,7,16,0.95)`,
          color: '#FFFFFF',
          border: `1.5px solid ${nextColor}`,
          boxShadow: `0 0 30px ${nextColor}25, 0 4px 24px rgba(0,0,0,0.6)`,
          cursor: transitioning ? 'default' : 'pointer',
          transition: 'all 0.22s',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3,
          position: 'relative', overflow: 'hidden',
          opacity: transitioning ? 0.4 : 1,
        }}
        onMouseEnter={e => {
          if (transitioning) return;
          e.currentTarget.style.background = `${nextColor}18`;
          e.currentTarget.style.boxShadow = `0 0 50px ${nextColor}40, 0 4px 24px rgba(0,0,0,0.6)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(4,7,16,0.95)';
          e.currentTarget.style.boxShadow = `0 0 30px ${nextColor}25, 0 4px 24px rgba(0,0,0,0.6)`;
        }}>
          {nextMeta && (
            <span style={{ fontFamily: mono, fontSize: 7.5, color: nextColor, letterSpacing: 2.5 }}>
              NEXT: {nextMeta.name.toUpperCase()}
            </span>
          )}
          <span>→</span>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(90deg,transparent,${nextColor}12,transparent)`,
            animation: 'shimmerX 2.5s ease infinite', pointerEvents: 'none',
          }} />
        </button>
      )}

      {isLast && (
        <button data-hover onClick={() => window.location.reload()} style={{
          fontFamily: body, fontSize: 12, fontWeight: 600, letterSpacing: 1, padding: '12px 22px',
          background: 'rgba(4,7,16,0.95)', color: '#FFFFFF',
          border: '1.5px solid rgba(255,51,102,0.6)',
          boxShadow: '0 0 28px rgba(255,51,102,0.2), 0 4px 20px rgba(0,0,0,0.5)',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='rgba(255,51,102,0.14)'; e.currentTarget.style.boxShadow='0 0 44px rgba(255,51,102,0.35), 0 4px 20px rgba(0,0,0,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.background='rgba(4,7,16,0.95)'; e.currentTarget.style.boxShadow='0 0 28px rgba(255,51,102,0.2), 0 4px 20px rgba(0,0,0,0.5)'; }}>
          ↺ Restart
        </button>
      )}
    </div>
  );
}

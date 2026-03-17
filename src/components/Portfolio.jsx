import { useState, useEffect, useRef, useCallback } from 'react';
import { research, systems, stack } from '../data/portfolio';

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS  — Dark editorial / cinematic
═══════════════════════════════════════════════════════════ */
const T = {
  // Dark base
  bg:     '#F7F5FF',
  bg1:    '#F0EEFF',
  bg2:    '#FFFFFF',
  bg3:    '#EDE9FE',

  // Text
  ink:    '#1a1025',
  inkMd:  '#3d2f5a',
  inkSub: '#6d5f8a',
  inkDim: '#a89fc0',

  // Primary violet
  v:      '#6d28d9',
  vMd:    '#7c3aed',
  vL:     '#a78bfa',
  vXL:    'rgba(109,40,217,0.10)',
  vGlow:  'rgba(109,40,217,0.18)',

  // Accent rose/magenta
  r:      '#be185d',
  rL:     '#f472b6',
  rXL:    'rgba(190,24,93,0.09)',

  // Accent amber
  a:      '#b45309',
  aL:     '#fbbf24',
  aXL:    'rgba(180,83,9,0.09)',

  // Accent emerald
  e:      '#065f46',
  eL:     '#34d399',
  eXL:    'rgba(6,95,70,0.09)',

  // Glass & borders
  glass:  'rgba(255,255,255,0.78)',
  glassH: 'rgba(255,255,255,0.92)',
  border: '1px solid rgba(109,40,217,0.10)',
  borderV:'rgba(109,40,217,0.22)',

  // Fonts
  disp:   "'Syne', sans-serif",
  body:   "'Satoshi', sans-serif",
  mono:   "'JetBrains Mono', monospace",

  // Radius
  r4: '4px', r8: '8px', r12: '12px', r16: '16px',
  r20: '20px', r24: '24px', rFull: '9999px',

  // Shadows / glows
  gv:   '0 4px 20px rgba(109,40,217,0.15)',
  gr:   '0 4px 16px rgba(190,24,93,0.12)',
  shadowCard: '0 2px 8px rgba(109,40,217,0.07), 0 8px 24px rgba(0,0,0,0.06)',
  shadowLg:   '0 8px 32px rgba(109,40,217,0.12), 0 24px 64px rgba(0,0,0,0.10)',
  shadowXl:   '0 16px 48px rgba(109,40,217,0.14), 0 32px 80px rgba(0,0,0,0.12)',
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════ */
const GCSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&display=swap');

@keyframes fadeUp    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
@keyframes fadeIn    { from{opacity:0} to{opacity:1} }
@keyframes fadeLeft  { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:none} }
@keyframes pulseGlow { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.95)} }
@keyframes spinSlow  { to{transform:rotate(360deg)} }
@keyframes spinFast  { to{transform:rotate(360deg)} }
@keyframes bobFloat  { 0%,100%{transform:translateY(0) rotate(-0.5deg)} 50%{transform:translateY(-14px) rotate(0.5deg)} }
@keyframes waveHand  { 0%,100%{transform:rotate(0deg) translateX(0)} 20%{transform:rotate(25deg) translateX(3px)} 50%{transform:rotate(-8deg) translateX(0)} 80%{transform:rotate(15deg) translateX(2px)} }
@keyframes eyeBlink  { 0%,88%,100%{transform:scaleY(1)} 94%{transform:scaleY(0.08)} }
@keyframes shimmerH  { 0%{background-position:-200% center} 100%{background-position:200% center} }
@keyframes orbitRing { from{transform:rotateZ(0deg) rotateX(72deg)} to{transform:rotateZ(360deg) rotateX(72deg)} }
@keyframes glowPulse { 0%,100%{box-shadow:0 0 30px rgba(139,92,246,0.3)} 50%{box-shadow:0 0 60px rgba(139,92,246,0.6)} }
@keyframes slideDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:none} }
@keyframes modalIn   { from{opacity:0;transform:scale(0.85) translateY(24px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes scanLine  { from{top:-8px} to{top:108%} }
@keyframes floatUp   { 0%{transform:translateY(0) scale(1);opacity:0.6} 100%{transform:translateY(-120px) scale(0.4);opacity:0} }
@keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes glowDrift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(0.96)} }
@keyframes neuralPulse { 0%,100%{r:4} 50%{r:7} }
@keyframes orbitSpin1 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes orbitSpin2 { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
@keyframes orbitSpin3 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes beamSweep  { 0%{opacity:0;transform:scaleX(0) translateX(-50%)} 20%{opacity:1} 80%{opacity:1} 100%{opacity:0;transform:scaleX(1.2) translateX(10%)} }
@keyframes counterSpin{ from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
@keyframes typeOn    { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
@keyframes msgSlide  { from{opacity:0;transform:translateY(16px) scale(0.94)} to{opacity:1;transform:none} }
@keyframes gridGlow  { 0%,100%{opacity:0.04} 50%{opacity:0.08} }
@keyframes dotPulse  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.5} }
@keyframes haloRing  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes codeRain  { 0%{transform:translateY(-20px);opacity:0} 10%{opacity:1} 90%{opacity:0.5} 100%{transform:translateY(420px);opacity:0} }

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body { background:#F7F5FF; color:#1a1025; font-family:'Satoshi',sans-serif; -webkit-font-smoothing:antialiased; overflow-x:hidden; font-size:19px; line-height:1.75; }
a { color:inherit; text-decoration:none; }
button { font-family:inherit; border:none; background:none; cursor:pointer; }
input { font-family:inherit; }
::selection { background:rgba(139,92,246,0.35); color:#fff; }

/* Light mode — no grain overlay */

.nav-btn { font-size:17px; font-weight:500; color:#6d5f8a; letter-spacing:0.01em; transition:color 0.15s; cursor:pointer; background:none; border:none; padding:0; }
.nav-btn:hover { color:#1a1025; }

/* Chat quick chips */
.qchip {
  display:inline-flex; align-items:center; gap:8px;
  padding:12px 20px; border-radius:14px; font-size:15px; font-weight:500;
  background:rgba(255,255,255,0.72); border:1px solid rgba(109,40,217,0.14);
  color:#6d5f8a; cursor:pointer; backdrop-filter:blur(10px);
  transition:all 0.2s cubic-bezier(.22,1,.36,1); text-align:left;
}
.qchip:hover {
  background:rgba(109,40,217,0.10); border-color:rgba(109,40,217,0.3);
  color:#6d28d9; transform:translateY(-2px);
  box-shadow:0 8px 24px rgba(139,92,246,0.2);
}

/* Tag pill */
.tag {
  display:inline-block; font-family:'JetBrains Mono',monospace;
  font-size:11px; font-weight:500; padding:4px 10px; border-radius:5px;
  letter-spacing:0.03em;
}

/* Primary button */
.btn-primary {
  display:inline-flex; align-items:center; gap:8px;
  padding:14px 30px; border-radius:9999px; font-size:16px; font-weight:700;
  background:linear-gradient(135deg,#6d28d9,#7c3aed);
  color:#fff; border:none; cursor:pointer; letter-spacing:-0.01em;
  box-shadow:0 0 0 1px rgba(109,40,217,0.4),0 8px 30px rgba(109,40,217,0.30);
  transition:all 0.22s ease;
}
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 0 1px rgba(139,92,246,0.6),0 12px 40px rgba(139,92,246,0.55); }

/* Ghost button */
.btn-ghost {
  display:inline-flex; align-items:center; gap:8px;
  padding:13px 28px; border-radius:9999px; font-size:15px; font-weight:600;
  background:rgba(255,255,255,0.70); border:1px solid rgba(109,40,217,0.14);
  color:#3d2f5a; cursor:pointer;
  transition:all 0.2s ease;
}
.btn-ghost:hover { background:rgba(109,40,217,0.08); border-color:rgba(109,40,217,0.25); color:#1a1025; }

/* Card glass */
.card {
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.08);
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
}

/* Subtle shimmer on hover */
.shimmer-hover {
  position:relative; overflow:hidden;
}
.shimmer-hover::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.06) 50%,transparent 70%);
  background-size:200% 100%; background-position:200% center;
  transition:background-position 0.6s ease; pointer-events:none;
}
.shimmer-hover:hover::after { background-position:-200% center; }

/* Modal overlay */
.modal-overlay {
  position:fixed; inset:0; z-index:9000;
  background:rgba(100,80,140,0.40);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
  display:flex; align-items:center; justify-content:center; padding:20px;
  animation:fadeIn 0.2s ease;
}
.modal-card {
  width:100%; max-width:740px; max-height:90vh; overflow-y:auto;
  background:#FFFFFF;
  border:1px solid rgba(109,40,217,0.18);
  border-radius:24px;
  box-shadow:0 0 0 1px rgba(109,40,217,0.08), 0 24px 80px rgba(109,40,217,0.12), 0 4px 20px rgba(0,0,0,0.06);
  animation:modalIn 0.35s cubic-bezier(.22,1,.36,1);
}
`;

let _gcssInjected = false;
function injectGCSS() {
  if (_gcssInjected) return;
  _gcssInjected = true;
  const s = document.createElement('style');
  s.textContent = GCSS;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════ */
function useVisible(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ═══════════════════════════════════════════════════════════
   AMBIENT BACKGROUND — animated mesh + grid
═══════════════════════════════════════════════════════════ */
function AmbientBG() {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
      {/* Radial mesh */}
      <div style={{ position:'absolute', inset:0, background:`
        radial-gradient(ellipse 70% 60% at 15% 10%, rgba(167,139,250,0.28) 0%, transparent 55%),
        radial-gradient(ellipse 55% 50% at 88% 12%, rgba(244,114,182,0.20) 0%, transparent 50%),
        radial-gradient(ellipse 60% 55% at 80% 92%, rgba(251,191,36,0.14) 0%, transparent 50%),
        radial-gradient(ellipse 45% 50% at 5% 90%,  rgba(167,139,250,0.18) 0%, transparent 52%),
        radial-gradient(ellipse 35% 35% at 50% 50%, rgba(236,207,255,0.12) 0%, transparent 60%),
        #F7F5FF
      `}} />
      {/* Animated glow orbs */}
      {[
        { w:600, h:500, t:'2%',  l:'-6%', bg:'rgba(196,167,255,0.30)', anim:'bobFloat 20s ease-in-out infinite 0s',    blur:90 },
        { w:450, h:420, t:'4%',  r:'-3%', bg:'rgba(255,182,213,0.26)',  anim:'bobFloat 26s ease-in-out infinite 5s',    blur:80 },
        { w:500, h:450, b:'4%',  l:'1%',  bg:'rgba(196,167,255,0.22)', anim:'bobFloat 22s ease-in-out infinite 10s',   blur:84 },
        { w:420, h:400, b:'3%',  r:'3%',  bg:'rgba(253,210,153,0.22)',  anim:'bobFloat 28s ease-in-out infinite 15s',   blur:76 },
      ].map((o,i) => (
        <div key={i} style={{
          position:'absolute', width:o.w, height:o.h,
          ...(o.t&&{top:o.t}), ...(o.b&&{bottom:o.b}),
          ...(o.l&&{left:o.l}), ...(o.r&&{right:o.r}),
          background:o.bg, filter:`blur(${o.blur}px)`,
          animation:o.anim, borderRadius:'50%',
          willChange:'transform',
        }} />
      ))}
      {/* Dot grid */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'radial-gradient(circle, rgba(109,40,217,0.12) 1px, transparent 1px)',
        backgroundSize:'36px 36px',
        animation:'gridGlow 6s ease-in-out infinite',
      }} />
      {/* Horizontal scan line */}
      <div style={{
        position:'absolute', left:0, right:0, height:'1px',
        background:'linear-gradient(90deg,transparent,rgba(109,40,217,0.18),rgba(190,24,93,0.12),transparent)',
        animation:'scanLine 8s linear infinite', opacity:0.6,
      }} />
      {/* Floating particles */}
      {Array.from({length:18},(_,i)=>(
        <div key={i} style={{
          position:'absolute',
          left:`${5+((i*17+i*i*3)%90)}%`,
          bottom:`${(i*13)%40}%`,
          width: i%3===0?3:i%3===1?2:1.5,
          height: i%3===0?3:i%3===1?2:1.5,
          borderRadius:'50%',
          background: i%4===0?'rgba(109,40,217,0.55)':i%4===1?'rgba(190,24,93,0.45)':i%4===2?'rgba(167,139,250,0.50)':'rgba(244,114,182,0.40)',
          animation:`floatUp ${8+i*1.3}s ease-in infinite ${i*0.7}s`,
          pointerEvents:'none',
        }}/>
      ))}
      {/* Large cinematic gradient blobs — extra layer */}
      <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', width:900, height:500, background:'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 65%)', filter:'blur(40px)', animation:'glowDrift 18s ease-in-out infinite', pointerEvents:'none' }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO VISUAL — Professional data card replacing avatar
═══════════════════════════════════════════════════════════ */
function HeroVisual() {
  const cvRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const resize = () => {
      cv.width  = cv.offsetWidth  || 480;
      cv.height = cv.offsetHeight || 520;
    };
    resize();
    window.addEventListener('resize', resize);

    // ─ Floating hexagon / circuit board grid visual ─
    // Consistent with portfolio violet/rose/teal palette
    const HEX_COLORS = [
      '#a78bfa','#7c3aed','#f472b6','#be185d',
      '#34d399','#0891b2','#fbbf24','#6d28d9',
    ];
    const cells = Array.from({length:28}, (_,i) => ({
      x: 0.08 + (i % 7) * 0.13 + (Math.floor(i/7)%2===0 ? 0 : 0.065),
      y: 0.1  + Math.floor(i/7) * 0.22,
      s: 28 + (i % 3) * 8,
      c: HEX_COLORS[i % HEX_COLORS.length],
      speed: 0.6 + (i % 5) * 0.25,
      phase: (i * 1.37) % (Math.PI * 2),
      alpha: 0.12 + (i % 4) * 0.07,
    }));
    // Connection pairs (nearby cells)
    const conns = [];
    cells.forEach((a,ai) => {
      cells.forEach((b,bi) => {
        if (bi <= ai) return;
        const dx = a.x - b.x, dy = a.y - b.y;
        if (Math.sqrt(dx*dx+dy*dy) < 0.18) conns.push([ai,bi]);
      });
    });

    let t = 0;
    const draw = () => {
      const W = cv.width, H = cv.height;
      const ctx = cv.getContext('2d');
      ctx.clearRect(0,0,W,H);

      // Draw connections
      conns.forEach(([ai,bi]) => {
        const a = cells[ai], b = cells[bi];
        const ax = a.x*W, ay = a.y*H + Math.sin(t*a.speed+a.phase)*12;
        const bx = b.x*W, by = b.y*H + Math.sin(t*b.speed+b.phase)*12;
        const [ar,ag,ab2] = hexRGB2(a.c);
        const [br,bg,bb]  = hexRGB2(b.c);
        const pulse = (Math.sin(t*1.1 + ai*0.4)*0.5+0.5) * 0.18;
        const g = ctx.createLinearGradient(ax,ay,bx,by);
        g.addColorStop(0, `rgba(${ar},${ag},${ab2},${pulse})`);
        g.addColorStop(1, `rgba(${br},${bg},${bb},${pulse})`);
        ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by);
        ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.stroke();
      });

      // Draw hexagons
      cells.forEach((cell,i) => {
        const x = cell.x * W;
        const y = cell.y * H + Math.sin(t * cell.speed + cell.phase) * 12;
        const s = cell.s;
        const pulse = Math.sin(t*cell.speed*0.7 + cell.phase)*0.5+0.5;
        const alpha = cell.alpha + pulse * 0.12;
        const [r,g,b] = hexRGB2(cell.c);

        // Hex path
        ctx.beginPath();
        for (let j=0;j<6;j++) {
          const a = (j/6)*Math.PI*2 - Math.PI/6;
          const hx = x + s * Math.cos(a);
          const hy = y + s * Math.sin(a);
          j===0 ? ctx.moveTo(hx,hy) : ctx.lineTo(hx,hy);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
        // Border
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha*1.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner dot
        if (i % 4 === 0) {
          ctx.beginPath();
          ctx.arc(x, y, 3+pulse*2, 0, Math.PI*2);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.55+pulse*0.35})`;
          ctx.fill();
        }
      });

      // Slow scan line
      const scanY = ((t*18) % (H+40)) - 20;
      const sg = ctx.createLinearGradient(0, scanY-8, 0, scanY+8);
      sg.addColorStop(0, 'rgba(109,40,217,0)');
      sg.addColorStop(0.5, 'rgba(109,40,217,0.06)');
      sg.addColorStop(1, 'rgba(109,40,217,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY-8, W, 16);

      t += 0.012;
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{ width:'100%', height:'100%', minHeight:440, position:'relative' }}>
      <canvas ref={cvRef} style={{ width:'100%', height:'100%', display:'block', borderRadius:24 }} />
      {/* Subtle corner label */}
      <div style={{
        position:'absolute', bottom:18, right:18,
        fontFamily:T.mono, fontSize:10.5, color:T.inkDim, letterSpacing:'0.14em',
        background:'rgba(255,255,255,0.72)', padding:'5px 12px', borderRadius:9999,
        backdropFilter:'blur(8px)',
        border:'1px solid rgba(109,40,217,0.10)',
      }}>AI / ML PORTFOLIO</div>
    </div>
  );
}

function hexRGB2(hex) {
  return [parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];
}


function hexRGB(hex) {
  return [parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];
}


/* ═══════════════════════════════════════════════════════════
   SKILLS NEURAL GLOBE — slow rotation, visible edges, no cyan
═══════════════════════════════════════════════════════════ */
const GLOBE_NODES = [
  { name:'Python',       color:'#7C3AED', r:14 }, { name:'PyTorch',      color:'#8B5CF6', r:13 },
  { name:'LangChain',    color:'#9333EA', r:13 }, { name:'LangGraph',    color:'#A78BFA', r:12 },
  { name:'HuggingFace',  color:'#EC4899', r:13 }, { name:'GPT-4V',       color:'#F472B6', r:11 },
  { name:'Claude API',   color:'#DB2777', r:13 }, { name:'RAG',          color:'#BE185D', r:12 },
  { name:'CrewAI',       color:'#EC4899', r:11 }, { name:'AWS Bedrock',  color:'#9D174D', r:12 },
  { name:'TensorFlow',   color:'#F59E0B', r:12 }, { name:'Transformers', color:'#D97706', r:12 },
  { name:'FAISS',        color:'#B45309', r:11 }, { name:'Sklearn',      color:'#F59E0B', r:11 },
  { name:'OpenCV',       color:'#92400E', r:11 }, { name:'MLOps',        color:'#D97706', r:11 },
  { name:'FastAPI',      color:'#10B981', r:11 }, { name:'Docker',       color:'#059669', r:11 },
  { name:'AWS',          color:'#047857', r:12 }, { name:'Flask',        color:'#10B981', r:10 },
  { name:'NLP',          color:'#8B5CF6', r:12 }, { name:'DistilBERT',   color:'#EC4899', r:11 },
  { name:'NumPy',        color:'#7C3AED', r:11 }, { name:'Pandas',       color:'#D97706', r:11 },
  { name:'SageMaker',    color:'#9D174D', r:12 }, { name:'Pydantic',     color:'#F59E0B', r:10 },
  { name:'Claude Code',  color:'#6D28D9', r:13 }, { name:'Cursor AI',    color:'#9333EA', r:12 },
  { name:'Prompt Eng',   color:'#7C3AED', r:12 }, { name:'Vertex AI',    color:'#0369A1', r:12 },
  { name:'OpenAI API',   color:'#10B981', r:13 }, { name:'Pinecone',     color:'#BE185D', r:11 },
  { name:'Azure AI',     color:'#0EA5E9', r:12 }, { name:'Weights&Biases',color:'#F59E0B',r:10 },
  { name:'vLLM',         color:'#8B5CF6', r:11 }, { name:'Streamlit',    color:'#EC4899', r:10 },
];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return [r,g,b];
}

function SkillGlobe() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const [wrapRef, vis] = useVisible(0.05);
  const [tooltip, setTooltip] = useState(null);
  const state = useRef({
    rotY:0, rotX:0.22, velY:0.0012, velX:0,
    drag:false, lastX:0, lastY:0, hovIdx:-1,
    nodes:[], W:0, H:0,
  });

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    // Fibonacci sphere
    const N = GLOBE_NODES.length;
    const phi = Math.PI * (3 - Math.sqrt(5));
    state.current.nodes = GLOBE_NODES.map((nd, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y*y));
      return { ...nd, ox: Math.cos(phi*i)*radius, oy: y, oz: Math.sin(phi*i)*radius };
    });

    const resize = () => {
      const parent = cv.parentElement;
      const rect = parent.getBoundingClientRect();
      const dim = Math.min(rect.width || 720, 760);
      state.current.W = cv.width  = dim;
      state.current.H = cv.height = dim;
    };
    resize();
    window.addEventListener('resize', resize);

    const frame = () => {
      const { W, H, rotX, rotY, hovIdx } = state.current;
      const ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, W, H);
      const CX = W/2, CY = H/2;
      const R = W * 0.46; // bigger globe

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      // Project all nodes
      const projected = state.current.nodes.map((nd, i) => {
        const x1 = nd.ox*cosY + nd.oz*sinY;
        const z1 = -nd.ox*sinY + nd.oz*cosY;
        const y1 = nd.oy*cosX - z1*sinX;
        const z2 = nd.oy*sinX + z1*cosX;
        const scale = 1 / (1.6 - z2*0.38);
        return { ...nd, i, px: CX + x1*R*scale, py: CY + y1*R*scale, z:z2, sc:scale };
      }).sort((a,b) => a.z - b.z);

      // ─── EDGES — clearly visible neural network lines ───
      for (let a = 0; a < projected.length; a++) {
        for (let b = a+1; b < projected.length; b++) {
          const A = projected[a], B = projected[b];
          const dx = A.px - B.px, dy = A.py - B.py;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const maxDist = R * 0.70;
          if (dist > maxDist) continue;
          if (A.z < -0.28 || B.z < -0.28) continue;

          const falloff = Math.pow(1 - dist/maxDist, 1.5);
          const depth = ((A.z + B.z)*0.5 + 0.9) * 0.56;
          const isHov = (hovIdx === A.i || hovIdx === B.i);
          const alpha = isHov ? falloff * 1.0 : falloff * depth * 0.38;

          const [ar,ag,ab] = hexToRgb(A.color);
          const [br,bg,bb] = hexToRgb(B.color);

          ctx.beginPath();
          ctx.moveTo(A.px, A.py);
          ctx.lineTo(B.px, B.py);

          {
            const grad = ctx.createLinearGradient(A.px, A.py, B.px, B.py);
            grad.addColorStop(0,   `rgba(${ar},${ag},${ab},${alpha})`);
            grad.addColorStop(0.5, `rgba(${Math.round((ar+br)/2)},${Math.round((ag+bg)/2)},${Math.round((ab+bb)/2)},${alpha*0.7})`);
            grad.addColorStop(1,   `rgba(${br},${bg},${bb},${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = isHov ? 3.0 : 1.5;
          }
          ctx.stroke();
        }
      }

      // ─── NODES ───
      projected.forEach(nd => {
        if (nd.z < -0.72) return;
        const isH = nd.i === hovIdx;
        const depthFade = (nd.z + 1) * 0.5;
        const baseR = nd.r || 10;
        const nr = (isH ? baseR*1.7 : baseR) * nd.sc * (0.65 + nd.z*0.35);

        const [nr2,ng2,nb2] = hexToRgb(nd.color);

        // Glow halo
        const glow = ctx.createRadialGradient(nd.px, nd.py, 0, nd.px, nd.py, nr*3.2);
        glow.addColorStop(0, `rgba(${nr2},${ng2},${nb2},${isH ? 0.5 : depthFade*0.22})`);
        glow.addColorStop(1, `rgba(${nr2},${ng2},${nb2},0)`);
        ctx.beginPath();
        ctx.arc(nd.px, nd.py, nr*3.2, 0, Math.PI*2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Crystal sphere
        const sphere = ctx.createRadialGradient(
          nd.px - nr*0.38, nd.py - nr*0.38, 0,
          nd.px, nd.py, nr
        );
        sphere.addColorStop(0, 'rgba(255,255,255,0.96)');
        sphere.addColorStop(0.35, `rgba(${nr2},${ng2},${nb2},0.7)`);
        sphere.addColorStop(1, `rgba(${nr2},${ng2},${nb2},${Math.min(1, depthFade+0.2)})`);

        ctx.beginPath();
        ctx.arc(nd.px, nd.py, nr, 0, Math.PI*2);
        ctx.fillStyle = sphere;
        ctx.fill();
        ctx.strokeStyle = isH ? nd.color : `rgba(255,255,255,${depthFade*0.55})`;
        ctx.lineWidth = isH ? 2 : 1;
        ctx.stroke();

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(nd.px, nd.py, nr*0.28, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${nr2},${ng2},${nb2},${depthFade})`;
        ctx.fill();

        // Label
        if (depthFade > 0.38 || isH) {
          const textAlpha = Math.min(1, (depthFade - 0.28) * 2.2);
          ctx.font = `${isH?700:500} ${Math.round((isH?12.5:10.5)*nd.sc*(0.75+nd.z*0.25))}px 'Satoshi',sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = `rgba(26,16,37,${textAlpha * (isH?1:0.8)})`;
          ctx.fillText(nd.name, nd.px, nd.py + nr + 13*nd.sc);
        }
      });

      // Tick
      state.current.rotY += state.current.velY;
      state.current.velX *= 0.94;
      state.current.velY += (0.0012 - state.current.velY) * 0.005; // ease back to medium
      state.current.rotX = Math.max(-0.5, Math.min(0.5, state.current.rotX));

      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    // Mouse interactions
    const onMove = e => {
      const s = state.current;
      const rect = cv.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (s.drag) {
        const dx = e.clientX - s.lastX, dy = e.clientY - s.lastY;
        s.velY = dx * 0.0055;
        s.velX = dy * 0.0055;
        s.rotY += dx * 0.0055;
        s.rotX += dy * 0.0055;
        s.lastX = e.clientX; s.lastY = e.clientY;
      }

      // Hit test
      const { W, H, rotX, rotY } = s;
      const CX=W/2, CY=H/2, RR=W*0.44;
      const cX=Math.cos(rotX),sX=Math.sin(rotX),cY=Math.cos(rotY),sY=Math.sin(rotY);
      let bestIdx=-1, bestDist=30;
      s.nodes.forEach((nd,i)=>{
        const x1=nd.ox*cY+nd.oz*sY, z1=-nd.ox*sY+nd.oz*cY;
        const y1=nd.oy*cX-z1*sX, z2=nd.oy*sX+z1*cX;
        const sc=1/(1.6-z2*0.38);
        const px=CX+x1*RR*sc, py=CY+y1*RR*sc;
        const d=Math.hypot(mx-px, my-py);
        if(d<bestDist){bestDist=d;bestIdx=i;}
      });
      s.hovIdx = bestIdx;
      setTooltip(bestIdx>=0 ? { name:s.nodes[bestIdx].name, x:mx, y:my } : null);
      cv.style.cursor = bestIdx>=0 ? 'pointer' : (s.drag ? 'grabbing' : 'grab');
    };
    const onDown = e => {
      const s = state.current; s.drag=true; s.lastX=e.clientX; s.lastY=e.clientY;
      cv.style.cursor='grabbing';
    };
    const onUp = () => { state.current.drag=false; cv.style.cursor='grab'; };

    cv.addEventListener('mousemove', onMove);
    cv.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mouseup', onUp);
      cv.removeEventListener('mousemove', onMove);
      cv.removeEventListener('mousedown', onDown);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position:'relative', width:'100%', maxWidth:780 }}>
      <canvas
        ref={canvasRef}
        style={{
          width:'100%', height:'auto', display:'block', cursor:'grab',
          borderRadius:'24px',
          opacity: vis ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      />
      {tooltip && (
        <div style={{
          position:'absolute', left:tooltip.x+16, top:tooltip.y-18,
          padding:'6px 14px', borderRadius:'9999px',
          background:'rgba(255,255,255,0.95)',
          border:'1px solid rgba(109,40,217,0.3)',
          boxShadow:'0 4px 20px rgba(139,92,246,0.3)',
          fontSize:13, fontWeight:600, color:'#1a1025',
          backdropFilter:'blur(10px)',
          pointerEvents:'none', whiteSpace:'nowrap',
          fontFamily:"'JetBrains Mono',monospace",
          animation:'fadeIn 0.15s ease',
        }}>{tooltip.name}</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   AI CHAT INTERFACE — Aaaby inspired
   Center: avatar → headline → search bar → icon chips below
═══════════════════════════════════════════════════════════ */
const SYS = `You are Bhavisha Patel's AI portfolio assistant. Reply in 1–2 warm, direct sentences. No markdown or bullets. Plain text only.

Bhavisha = AI/ML engineer & learner, Scarborough Ontario Canada. Open to full-time AI/ML roles.
Learning and building: LangChain/LangGraph, AWS Bedrock, Claude API, GPT-4V, PyTorch, HuggingFace, RAG pipelines.
TCS experience (6+ months): VS Code AI extension (90% code approval, 60% QA reduction), AWS Strands security agent, LangGraph SDLC pipelines.
Education: dual 4.0 GPA — AI + Business Analytics graduate certificates, Seneca Polytechnic (2023–25). B.Tech IT with Distinction GTU (2018–22).
7 GitHub projects: Multimodal RAG, DistilBERT fine-tuning, Currency Forecasting, Gujarati OCR, Crime Prediction, Traffic EDA, Mental Health App.
She describes herself as an eager learner who loves exploring AI and builds everything hands-on.`;

function detectIntent(q) {
  const t = q.toLowerCase();
  if (/project|built|rag|ocr|bert|currency|crime|mental|github/.test(t)) return 'projects';
  if (/skill|stack|tech|python|pytorch|langchain|aws|tool|framework|know/.test(t)) return 'skills';
  if (/tcs|experience|work|career|job|company|internship|achieve/.test(t)) return 'experience';
  if (/contact|email|hire|reach|linkedin|available|connect/.test(t)) return 'contact';
  if (/about|who|yourself|tell|introduce|background|learner/.test(t)) return 'about';
  return 'general';
}

const QUICK_CHIPS = [
  { label:'About Me',  icon:'◉', q:'Tell me about Bhavisha' },
  { label:'Projects',  icon:'◈', q:'Show me your projects'   },
  { label:'Skills',    icon:'⬡', q:'What technologies do you use?' },
  { label:'Experience',icon:'◎', q:'Tell me about your work at TCS' },
  { label:'Contact',   icon:'✦', q:'How can I reach you?' },
];

function buildStructuredReply(intent, scrollTo) {
  if (intent === 'projects') return {
    text: "Here are featured AI/ML projects I've built — each one click-expandable with full details.",
    miniProjects: research.slice(0,4),
    action: { label:'View featured projects ↗', sectionId:'projects' },
    suggestions: ["What technologies do you use?","Tell me about TCS","How to contact?"],
  };
  if (intent === 'skills') return {
    text: "These are the core AI/ML tools I'm actively building with:",
    skillGroups: [
      { label:'GenAI & Agents', color:T.v,   bg:T.vXL,  items:['LangChain','LangGraph','AWS Bedrock','Claude API','GPT-4V','CrewAI'] },
      { label:'ML & Vision',   color:T.r,   bg:T.rXL,  items:['PyTorch','TensorFlow','HuggingFace','FAISS','OpenCV','Sklearn'] },
      { label:'Dev & Cloud',   color:T.a,   bg:T.aXL,  items:['Python','FastAPI','Docker','AWS','Flask','SQL'] },
    ],
    action: { label:'Explore skills globe', sectionId:'skills' },
    suggestions: ["Show projects","About TCS experience","How to contact?"],
  };
  if (intent === 'experience') return {
    text: null,
    expCard: {
      role:'GenAI Developer', company:'Tata Consultancy Services',
      period:'Aug 2025 – Jan 2026',
      pts:['VS Code AI extension → 90% code approval, 60% QA reduction','Autonomous AWS Strands security agent for a top Canadian bank','Agentic SDLC pipelines with LangGraph'],
    },
    eduChip: { gpa:'4.0 × 2', school:'Seneca Polytechnic', courses:'AI + Business Analytics (2023–25)' },
    action: { label:'Full experience timeline', sectionId:'experience' },
    suggestions: ["See projects","What's your tech stack?","Contact info"],
  };
  if (intent === 'contact') return {
    text: "Open to exciting AI/ML Engineer roles! Let's connect ✦",
    contactLinks: [
      { icon:'✉️', label:'pbhavu1507@gmail.com',       href:'mailto:pbhavu1507@gmail.com' },
      { icon:'↗', label:'linkedin/bhavishapatel',      href:'https://linkedin.com/in/bhavishapatel' },
      { icon:'↗', label:'github.com/Bhavi15',          href:'https://github.com/Bhavi15' },
    ],
    suggestions: ["See projects","What skills?"],
  };
  if (intent === 'about') return {
    text: null,
    aboutCard: {
      name:'Bhavisha Patel',
      role:'AI/ML Engineer',
      loc:'Scarborough, Ontario, CA',
      bio:"I'm an eager AI/ML learner who loves building real things — RAG pipelines, transformer models, computer vision apps. Shipped enterprise AI tools at TCS and have 7 open-source projects on GitHub.",
      stats:[{v:'7',l:'Projects'},{v:'4.0',l:'GPA'},{v:'90%',l:'Code ✓'},{v:'6mo+',l:'Industry'}],
    },
    suggestions: ["Show projects","What technologies?","How to contact?"],
  };
  return { text:null, suggestions:["About Bhavisha","Show projects","Tech stack","Contact"] };
}

function ChatBubbleBody({ msg, onChip, scrollTo }) {
  const d = msg.structured;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      {msg.text && (
        <p style={{ fontSize:16, lineHeight:1.75, color:T.inkMd }}>{msg.text}</p>
      )}

      {/* Mini project cards */}
      {d?.miniProjects?.map((p,i) => (
        <div key={i} onClick={() => scrollTo('projects')}
          style={{
            padding:'13px 15px', borderRadius:'12px', cursor:'pointer',
            background:T.glass, border:T.border,
            transition:'all 0.18s ease',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(139,92,246,0.1)';e.currentTarget.style.borderColor='rgba(139,92,246,0.3)';}}
          onMouseLeave={e=>{e.currentTarget.style.background=T.glass;e.currentTarget.style.borderColor=T.border;}}>
          <div style={{ fontSize:13.5, fontWeight:700, color:T.ink, marginBottom:4, fontFamily:T.disp }}>{p.title}</div>
          <p style={{ fontSize:12, color:T.inkSub, marginBottom:7, lineHeight:1.55 }}>{p.abstract.split('.')[0]}.</p>
          <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
            {p.tags.slice(0,4).map(t=><span key={t} className="tag" style={{ background:T.vXL, color:T.vMd, border:`1px solid rgba(139,92,246,0.2)` }}>{t}</span>)}
          </div>
          <div style={{ fontSize:11, color:T.vMd, fontFamily:T.mono, marginTop:6, fontWeight:600 }}>✦ {p.impact}</div>
        </div>
      ))}

      {/* Skill groups */}
      {d?.skillGroups?.map((g,i) => (
        <div key={i} style={{ padding:'11px 14px', borderRadius:'11px', background:g.bg, border:`1px solid ${g.color}28` }}>
          <div style={{ fontSize:11, fontFamily:T.mono, fontWeight:700, color:g.color, letterSpacing:'0.1em', marginBottom:7 }}>{g.label.toUpperCase()}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
            {g.items.map(it=><span key={it} style={{ fontSize:12, padding:'3px 9px', borderRadius:'9999px', background:`${g.color}20`, border:`1px solid ${g.color}35`, color:g.color, fontFamily:T.mono }}>{it}</span>)}
          </div>
        </div>
      ))}

      {/* Experience card */}
      {d?.expCard && (
        <div style={{ padding:'14px 16px', borderRadius:'12px', background:T.glass, border:T.border }}>
          <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8, marginBottom:10 }}>
            <div>
              <div style={{ fontSize:14.5, fontWeight:700, color:T.ink, fontFamily:T.disp }}>{d.expCard.role}</div>
              <div style={{ fontSize:13, color:T.v, fontWeight:600, marginTop:3 }}>{d.expCard.company}</div>
            </div>
            <span style={{ fontSize:11, fontFamily:T.mono, color:T.inkDim, padding:'3px 9px', borderRadius:'9999px', background:'rgba(109,40,217,0.06)', border:'1px solid rgba(109,40,217,0.12)', whiteSpace:'nowrap' }}>{d.expCard.period}</span>
          </div>
          {d.expCard.pts.map((pt,i)=>(
            <div key={i} style={{ display:'flex', gap:7, marginBottom:5 }}>
              <span style={{ color:T.v, fontWeight:700, flexShrink:0 }}>–</span>
              <span style={{ fontSize:13, color:T.inkSub, lineHeight:1.6 }}>{pt}</span>
            </div>
          ))}
        </div>
      )}
      {d?.eduChip && (
        <div style={{ padding:'11px 14px', borderRadius:'11px', background:T.vXL, border:`1px solid ${T.v}30`, display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:24, fontWeight:900, color:T.v, fontFamily:T.mono }}>{d.eduChip.gpa}</span>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:T.ink }}>{d.eduChip.school}</div>
            <div style={{ fontSize:11.5, color:T.vMd, marginTop:2 }}>{d.eduChip.courses}</div>
          </div>
        </div>
      )}

      {/* Contact links */}
      {d?.contactLinks?.map((l,i)=>(
        <a key={i} href={l.href} target="_blank" rel="noreferrer"
          style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 14px', borderRadius:'11px', background:T.glass, border:T.border, transition:'all 0.16s' }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(139,92,246,0.1)';e.currentTarget.style.borderColor='rgba(139,92,246,0.3)';}}
          onMouseLeave={e=>{e.currentTarget.style.background=T.glass;e.currentTarget.style.borderColor=T.border;}}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:16 }}>{l.icon}</span>
            <span style={{ fontSize:13, color:T.inkMd }}>{l.label}</span>
          </div>
          <span style={{ color:T.v }}>↗</span>
        </a>
      ))}

      {/* About card */}
      {d?.aboutCard && (
        <div style={{ padding:'16px', borderRadius:'14px', background:T.glass, border:T.border }}>
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:15, fontWeight:700, color:T.ink, fontFamily:T.disp }}>{d.aboutCard.name}</div>
            <div style={{ fontSize:13, color:T.v, marginTop:2, fontWeight:600 }}>{d.aboutCard.role}</div>
            <div style={{ fontSize:12, color:T.inkDim, marginTop:2 }}>{d.aboutCard.loc}</div>
          </div>
          <p style={{ fontSize:13, color:T.inkSub, lineHeight:1.7, marginBottom:12 }}>{d.aboutCard.bio}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:7 }}>
            {d.aboutCard.stats.map(s=>(
              <div key={s.l} style={{ textAlign:'center', padding:'9px 4px', background:T.vXL, borderRadius:'9px', border:`1px solid rgba(139,92,246,0.18)` }}>
                <div style={{ fontSize:16, fontWeight:900, color:T.vMd, fontFamily:T.mono }}>{s.v}</div>
                <div style={{ fontSize:9.5, color:T.inkDim, marginTop:3, letterSpacing:'0.05em' }}>{s.l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action button */}
      {d?.action && (
        <button onClick={()=>scrollTo(d.action.sectionId)} style={{
          alignSelf:'flex-start', padding:'8px 18px', borderRadius:'9999px',
          background:`linear-gradient(135deg,${T.v},${T.vMd})`,
          color:'#fff', fontSize:13, fontWeight:600, border:'none', cursor:'pointer',
          boxShadow:`0 4px 16px rgba(139,92,246,0.35)`,
          transition:'all 0.18s',
        }}
          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='none'}>
          {d.action.label} →
        </button>
      )}

      {/* Suggestion chips */}
      {d?.suggestions && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:4 }}>
          {d.suggestions.map(s=>(
            <button key={s} className="qchip" onClick={()=>onChip(s)}
              style={{ padding:'6px 13px', fontSize:12.5 }}>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AIChat({ scrollTo }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const historyRef = useRef(null);
  const inputRef   = useRef(null);

  // Scroll chat history on new messages
  useEffect(() => {
    if (historyRef.current && messages.length > 0) {
      requestAnimationFrame(() => {
        if (historyRef.current)
          historyRef.current.scrollTop = historyRef.current.scrollHeight;
      });
    }
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role:'user', text:q }]);
    setLoading(true);

    const intent = detectIntent(q);
    const structured = buildStructuredReply(intent, scrollTo);

    try {
      const history = messages.filter(m=>!m.structured).slice(-6).map(m=>({ role:m.role, content:m.text }));
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514', max_tokens:120,
          system:SYS,
          messages:[...history, { role:'user', content:q }],
        }),
      });
      const data = await res.json();
      const aiText = (data.content||[]).map(b=>b.text||'').join('').trim();
      const useAI = intent==='general' || (!structured.miniProjects && !structured.skillGroups && !structured.expCard && !structured.aboutCard && !structured.contactLinks);
      setMessages(prev=>[...prev, {
        role:'assistant',
        text: useAI ? aiText : structured.text,
        structured: useAI ? null : structured,
      }]);
    } catch {
      setMessages(prev=>[...prev, {
        role:'assistant',
        text: structured.text,
        structured,
      }]);
    }
    setLoading(false);
  }, [loading, messages, scrollTo]);

  return (
    <div style={{ width:'100%', maxWidth:860 }}>
      {/* Chat history */}
      {messages.length > 0 && (
        <div
          ref={historyRef}
          onWheel={e => e.stopPropagation()}
          style={{
            marginBottom:14, maxHeight:560, overflowY:'auto',
            display:'flex', flexDirection:'column', gap:12,
            padding:'16px 18px',
            background:'rgba(255,255,255,0.82)',
            backdropFilter:'blur(20px)',
            border:'1px solid rgba(109,40,217,0.12)',
            borderRadius:'20px',
            boxShadow:'0 8px 32px rgba(109,40,217,0.08)',
            scrollbarWidth:'thin',
            scrollbarColor:`rgba(109,40,217,0.3) transparent`,
          }}>
          {messages.map((m,i) => (
            <div key={i} style={{
              display:'flex',
              flexDirection: m.role==='user' ? 'row-reverse' : 'row',
              gap:10,
              animation:'msgSlide 0.28s ease both',
            }}>
              {m.role==='assistant' && (
                <div style={{
                  width:34, height:34, borderRadius:'50%', flexShrink:0, marginTop:2,
                  background:`linear-gradient(135deg,${T.v},${T.vMd})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:14, boxShadow:`0 0 20px rgba(139,92,246,0.5)`,
                }}>✦</div>
              )}
              <div style={{ maxWidth: m.role==='user' ? '75%' : '100%', flex: m.role==='assistant' ? 1 : 'none' }}>
                {m.role==='user' ? (
                  <div style={{
                    padding:'10px 16px',
                    borderRadius:`18px 18px 4px 18px`,
                    background:'rgba(109,40,217,0.10)',
                    border:'1px solid rgba(109,40,217,0.22)',
                    fontSize:14.5, color:T.ink, lineHeight:1.65,
                  }}>{m.text}</div>
                ) : (
                  <ChatBubbleBody msg={m} onChip={sendMessage} scrollTo={scrollTo} />
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display:'flex', gap:10 }}>
              <div style={{ width:34, height:34, borderRadius:'50%', flexShrink:0, background:`linear-gradient(135deg,${T.v},${T.vMd})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>✦</div>
              <div style={{ display:'flex', gap:6, padding:'12px 16px', borderRadius:`4px 18px 18px 18px`, background:T.glass, border:T.border }}>
                {[0,1,2].map(i=><div key={i} style={{ width:7, height:7, borderRadius:'50%', background:T.vMd, animation:`dotPulse 1.4s ${i*0.22}s ease-in-out infinite` }}/>)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search bar (Aaaby-style) */}
      <div style={{
        display:'flex', alignItems:'center', gap:10,
        background:'rgba(255,255,255,0.88)',
        backdropFilter:'blur(20px)',
        border:`1px solid rgba(109,40,217,0.22)`,
        borderRadius:'9999px',
        padding:'13px 13px 13px 24px',
        boxShadow:`0 0 0 4px rgba(109,40,217,0.06), 0 8px 24px rgba(109,40,217,0.10)`,
        transition:'box-shadow 0.2s, border-color 0.2s',
      }}
        onFocus={e=>{e.currentTarget.style.borderColor='rgba(139,92,246,0.5)';e.currentTarget.style.boxShadow=`0 0 0 4px rgba(139,92,246,0.12), 0 8px 40px rgba(139,92,246,0.2)`;}}
        onBlur={e=>{e.currentTarget.style.borderColor='rgba(139,92,246,0.25)';e.currentTarget.style.boxShadow=`0 0 0 4px rgba(139,92,246,0.07), 0 8px 32px rgba(0,0,0,0.3)`;}}
        tabIndex={-1}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Ask me anything..."
          style={{
            flex:1, background:'transparent', border:'none', outline:'none',
            fontSize:18, color:'#1a1025',
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          style={{
            width:46, height:46, borderRadius:'50%', flexShrink:0,
            background: (input.trim() && !loading) ? `linear-gradient(135deg,${T.v},${T.vMd})` : 'rgba(255,255,255,0.06)',
            border: 'none',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:19.5, color: (input.trim() && !loading) ? '#fff' : T.inkDim,
            boxShadow: (input.trim() && !loading) ? `0 0 20px rgba(139,92,246,0.5)` : 'none',
            transition:'all 0.2s ease', cursor:'pointer',
          }}
        >
          {loading
            ? <div style={{ width:16, height:16, border:`2.5px solid ${T.v}`, borderTopColor:'transparent', borderRadius:'50%', animation:'spinFast 0.65s linear infinite' }} />
            : '↑'
          }
        </button>
      </div>

      {/* Bottom Aaaby-style icon chips */}
      <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap' }}>
        {QUICK_CHIPS.map(ch => (
          <button key={ch.label} className="qchip" onClick={() => sendMessage(ch.q)}>
            <span style={{ fontSize:16 }}>{ch.icon}</span>
            <span>{ch.label}</span>
          </button>
        ))}
      </div>

      {/* Clear / Refresh button */}
      {messages.length > 0 && (
        <div style={{ display:'flex', justifyContent:'flex-end', marginTop:8 }}>
          <button
            onClick={() => setMessages([])}
            style={{
              display:'flex', alignItems:'center', gap:5,
              fontSize:12.5, color:T.inkDim, cursor:'pointer', fontFamily:T.mono,
              padding:'4px 12px', borderRadius:'9999px',
              border:`1px solid rgba(255,255,255,0.08)`,
              background:'transparent',
              transition:'all 0.15s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.color=T.vMd;e.currentTarget.style.borderColor='rgba(139,92,246,0.3)';}}
            onMouseLeave={e=>{e.currentTarget.style.color=T.inkDim;e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';}}
          >
            ↺ New chat
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════ */
function Nav({ scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      height:66, display:'flex', alignItems:'center',
      justifyContent:'space-between',
      padding:'0 clamp(24px,5vw,100px)',
      background: scrolled ? 'rgba(247,245,255,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(109,40,217,0.14)' : 'transparent'}`,
      transition:'all 0.35s ease',
    }}>
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
        style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', background:'none', border:'none' }}
      >
        <div style={{
          width:36, height:36, borderRadius:'10px',
          background:`linear-gradient(135deg,${T.v},${T.vMd})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:13, fontWeight:800, color:'#fff', fontFamily:T.mono,
          boxShadow:`0 0 20px rgba(139,92,246,0.5)`,
        }}>BP</div>
        <span style={{ fontSize:17, fontWeight:700, color:'#1a1025', fontFamily:T.disp, letterSpacing:'-0.02em' }}>
          Bhavisha Patel
        </span>
      </button>

      {/* Links */}
      <div style={{ display:'flex', gap:28, alignItems:'center' }}>
        {[['About','about'],['Skills','skills'],['Projects','projects'],['Experience','experience']].map(([l,id]) => (
          <button key={l} className="nav-btn" onClick={() => scrollTo(id)}>{l}</button>
        ))}
        <button className="btn-primary" onClick={() => scrollTo('contact')} style={{ padding:'10px 22px', fontSize:14 }}>
          Hire me ✦
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO — Aaaby-inspired: big title above, avatar center,
   search bar below, icon chips underneath
═══════════════════════════════════════════════════════════ */
function Hero({ scrollTo }) {
  return (
    <section style={{
      minHeight:'100svh', display:'flex', alignItems:'center',
      padding:'0 clamp(32px,5vw,100px)',
      position:'relative', zIndex:1, overflow:'hidden',
    }}>
      <div style={{ maxWidth:1600, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center', paddingTop:80, paddingBottom:40 }}>

        {/* LEFT — Headline + chat */}
        <div style={{ animation:'fadeUp 0.6s 0.1s ease both', opacity:0, display:'flex', flexDirection:'column', justifyContent:'center' }}>
          {/* Status pill */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'8px 18px 8px 13px', borderRadius:'9999px', marginBottom:28,
            background:'rgba(16,185,129,0.10)', border:'1px solid rgba(16,185,129,0.32)',
            backdropFilter:'blur(10px)',
          }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#10B981', animation:'pulseGlow 2.5s ease-in-out infinite', boxShadow:'0 0 10px rgba(16,185,129,0.9)' }} />
            <span style={{ fontSize:13, color:'#065f46', fontFamily:T.mono, fontWeight:700, letterSpacing:'0.09em' }}>OPEN TO AI/ML ROLES</span>
          </div>

          {/* Greeting */}
          <p style={{ fontSize:22, color:T.inkSub, fontWeight:500, marginBottom:12, letterSpacing:'0.01em', fontFamily:T.mono }}>
            AI / ML Engineer
          </p>

          {/* Big headline */}
          <h1 style={{
            fontFamily:T.disp,
            fontSize:'clamp(60px,6.2vw,96px)',
            fontWeight:800, letterSpacing:'-0.05em', lineHeight:1.0,
            color:T.ink, marginBottom:20,
          }}>
            <span style={{
              background:`linear-gradient(135deg,${T.v} 0%,${T.vL} 45%,${T.rL} 100%)`,
              backgroundSize:'200% 200%',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              backgroundClip:'text',
              animation:'gradShift 5s ease infinite',
            }}>Bhavisha</span>
            <br />Patel
          </h1>

          <p style={{ fontSize:22, color:T.inkSub, lineHeight:1.85, maxWidth:520, marginBottom:32, fontWeight:400 }}>
            Building production AI — multimodal RAG pipelines and agentic systems for Canada's top bank. Systems that genuinely solve problems.
            Ask me anything below.
          </p>

          {/* Aaaby-style chat widget */}
          <AIChat scrollTo={scrollTo} />
        </div>

        {/* RIGHT — Career journey visual */}
        <div style={{ animation:'fadeIn 0.8s 0.4s ease both', opacity:0, position:'relative', display:'flex', alignItems:'center' }}>
          <HeroVisual />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:6,
        animation:'fadeIn 1.4s 2.5s ease both', opacity:0,
      }}>
        <span style={{ fontSize:10, color:T.inkDim, fontFamily:T.mono, letterSpacing:'0.18em' }}>SCROLL</span>
        <div style={{ width:1, height:32, background:`linear-gradient(to bottom,${T.inkDim},transparent)` }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════ */
function About() {
  const [ref, vis] = useVisible(0.07);
  return (
    <section id="about" style={{ minHeight:'100svh', display:'flex', alignItems:'center', padding:'clamp(80px,9vh,110px) clamp(40px,6vw,100px) clamp(40px,5vh,70px)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1600, margin:'0 auto', width:'100%' }}>
        <div ref={ref} style={{ opacity:vis?1:0, transform:vis?'none':'translateY(28px)', transition:'opacity 0.7s ease, transform 0.7s ease', width:'100%' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
            {/* Left — text */}
            <div>
              <div style={{ fontSize:12, fontFamily:T.mono, fontWeight:700, color:T.v, letterSpacing:'0.18em', marginBottom:14 }}>
                01 · ABOUT ME
              </div>
              <h2 style={{ fontFamily:T.disp, fontSize:'clamp(36px,3.8vw,56px)', fontWeight:800, letterSpacing:'-0.045em', lineHeight:1.06, color:T.ink, marginBottom:20 }}>
                Always learning,<br />
                <span style={{ background:`linear-gradient(135deg,${T.v},${T.rL})`, backgroundSize:'200% 200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'gradShift 5s ease infinite' }}>always building</span>
              </h2>
              <p style={{ fontSize:19, color:T.inkSub, lineHeight:1.85, marginBottom:18 }}>
                I'm an AI/ML engineer and enthusiastic learner based in Scarborough, Ontario. I had the opportunity to ship real enterprise AI tools at{' '}
                <strong style={{ color:T.ink, fontWeight:700 }}>Tata Consultancy Services</strong> — a VS Code AI extension achieving <strong style={{ color:T.vMd }}>90% code approval</strong>, and an autonomous AWS Strands security agent for a top Canadian bank.
              </p>
              <p style={{ fontSize:19, color:T.inkSub, lineHeight:1.85, marginBottom:24 }}>
                Earned dual <strong style={{ color:T.v }}>4.0 GPA</strong> graduate certificates at Seneca Polytechnic. Everything I build lives openly on GitHub.
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <a href="https://github.com/Bhavi15" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:15, padding:'13px 26px' }}>GitHub ↗</a>
                <a href="https://linkedin.com/in/bhavishapatel" target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize:15 }}>LinkedIn ↗</a>
              </div>
            </div>

            {/* Right — stat cards */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {[
                { v:'◈',   l:'Open-source Projects',   icon:'◈', color:T.v,  bg:T.vXL,  border:`rgba(109,40,217,0.16)` },
                { v:'4.0',  l:'GPA in both certs',      icon:'★', color:T.vMd, bg:T.vXL, border:`rgba(124,58,237,0.16)` },
                { v:'90%',  l:'Code approval at TCS',   icon:'⚡', color:T.r,  bg:T.rXL,  border:`rgba(190,24,93,0.16)` },
                { v:'6mo+', l:'Industry AI engineering',icon:'⚙', color:T.a,  bg:T.aXL,  border:`rgba(180,83,9,0.16)` },
              ].map((s,i) => (
                <div key={i} className="shimmer-hover" style={{
                  padding:'20px 18px', borderRadius:'18px',
                  background:s.bg, border:`1.5px solid ${s.border}`,
                  boxShadow:'0 4px 20px rgba(109,40,217,0.08)',
                  cursor:'default',
                  animation:`fadeUp 0.5s ${0.1+i*0.1}s ease both`,
                  transition:'transform 0.22s ease, box-shadow 0.22s ease',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(109,40,217,0.14)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 20px rgba(109,40,217,0.08)';}}
                >
                  <div style={{ fontSize:38, fontWeight:900, color:s.color, fontFamily:T.mono, lineHeight:1, marginBottom:8 }}>{s.v}</div>
                  <div style={{ fontSize:17, color:T.inkMd, lineHeight:1.5, fontWeight:500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILLS — Globe + tabbed skill bars
═══════════════════════════════════════════════════════════ */
function Skills() {
  const [hRef, hVis] = useVisible(0.07);
  const [bRef, bVis] = useVisible(0.07);
  const [tab, setTab] = useState(0);
  const tabs = [
    { label:'GenAI & LLMs',      data:stack.genai,  accent:T.v  },
    { label:'ML / Deep Learning',data:stack.ml,     accent:T.r  },
    { label:'Infra & Cloud',     data:stack.infra,  accent:T.a  },
  ];

  return (
    <section id="skills" style={{ minHeight:'100svh', display:'flex', alignItems:'center', padding:'clamp(80px,9vh,110px) clamp(40px,6vw,100px) clamp(30px,4vh,60px)', position:'relative', zIndex:1, background:'rgba(109,40,217,0.025)' }}>
      <div style={{ maxWidth:1600, margin:'0 auto', width:'100%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 0.6fr', gap:44, alignItems:'center' }}>
          {/* Globe — full height, no top gap */}
          <div>
            <div ref={hRef} style={{ marginBottom:12, opacity:hVis?1:0, transform:hVis?'none':'translateY(24px)', transition:'opacity 0.7s ease, transform 0.7s ease' }}>
              <div style={{ fontSize:12, fontFamily:T.mono, fontWeight:700, color:T.v, letterSpacing:'0.18em', marginBottom:6 }}>02 · SKILLS</div>
              <h2 style={{ fontFamily:T.disp, fontSize:'clamp(36px,3.8vw,56px)', fontWeight:800, letterSpacing:'-0.045em', lineHeight:1.06, color:T.ink }}>
                The full AI stack
              </h2>
            </div>
            <SkillGlobe />
          </div>

          {/* Bars */}
          <div ref={bRef}>
            {/* Tab buttons */}
            <div style={{ display:'flex', gap:4, marginBottom:20, padding:'5px', borderRadius:'9999px', background:'rgba(255,255,255,0.80)', border:'1px solid rgba(109,40,217,0.10)', width:'fit-content', boxShadow:'0 2px 12px rgba(109,40,217,0.08)' }}>
              {tabs.map((t,i) => (
                <button key={t.label} onClick={() => setTab(i)} style={{
                  padding:'8px 17px', borderRadius:'9999px', fontSize:14, fontWeight:500,
                  border:'none', cursor:'pointer',
                  background: tab===i ? 'rgba(139,92,246,0.25)' : 'transparent',
                  color: tab===i ? T.vL : T.inkSub,
                  boxShadow: tab===i ? '0 2px 10px rgba(139,92,246,0.25)' : 'none',
                  transition:'all 0.2s ease',
                }}>{t.label}</button>
              ))}
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {tabs[tab].data.map((sk,i) => (
                <div key={sk.name} style={{ animation:`fadeUp 0.4s ${i*0.07}s ease both` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:6 }}>
                    <div>
                      <span style={{ fontSize:19, fontWeight:700, color:T.ink, fontFamily:T.disp }}>
                        {sk.name.split('/')[0].split('(')[0].trim()}
                      </span>
                      {sk.sub && <div style={{ fontSize:15, color:T.inkDim, marginTop:2 }}>{sk.sub.split(' ').slice(0,5).join(' ')}</div>}
                    </div>
                    <span style={{ fontSize:17, color:tabs[tab].accent, fontFamily:T.mono, fontWeight:700 }}>{sk.level}%</span>
                  </div>
                  <div style={{ height:9, borderRadius:'9999px', background:'rgba(109,40,217,0.08)', overflow:'hidden' }}>
                    <div style={{
                      height:'100%', borderRadius:'9999px',
                      background:`linear-gradient(90deg,${T.v},${T.vL})`,
                      width: bVis ? `${sk.level}%` : '0%',
                      transition:`width 1.3s ${i*0.09}s cubic-bezier(.22,1,.36,1)`,
                      position:'relative', overflow:'hidden',
                    }}>
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.3) 50%,transparent 100%)', backgroundSize:'200% 100%', animation:'shimmerH 2.8s ease infinite' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECT VIZ — canvas animation per project type
═══════════════════════════════════════════════════════════ */
const PROJ_THEMES = {
  p1: { type:'neural',   accent:'#6d28d9', grad:'linear-gradient(135deg,#f5f3ff,#ede9fe)',  border:'rgba(109,40,217,0.18)' },
  p2: { type:'tokens',   accent:'#0891b2', grad:'linear-gradient(135deg,#ecfeff,#cffafe)',  border:'rgba(8,145,178,0.20)' },
  p7: { type:'wave',     accent:'#7c3aed', grad:'linear-gradient(135deg,#faf5ff,#ede9fe)',  border:'rgba(124,58,237,0.18)' },
  p4: { type:'grid',     accent:'#0f766e', grad:'linear-gradient(135deg,#f0fdfa,#ccfbf1)',  border:'rgba(15,118,110,0.20)' },
  p5: { type:'scatter',  accent:'#be185d', grad:'linear-gradient(135deg,#fdf4ff,#fce7f3)',  border:'rgba(190,24,93,0.20)' },
  p6: { type:'bars',     accent:'#d97706', grad:'linear-gradient(135deg,#fffbeb,#fef3c7)',  border:'rgba(217,119,6,0.20)' },
  p3: { type:'pulse',    accent:'#0369a1', grad:'linear-gradient(135deg,#f0f9ff,#dbeafe)',  border:'rgba(3,105,161,0.18)' },
};

function ProjCanvas({ type, accent }) {
  const cvRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    cv.width = 340; cv.height = 110;
    const ctx = cv.getContext('2d');
    let t = 0;

    const [cr,cg,cb] = accent.startsWith('#') ? [
      parseInt(accent.slice(1,3),16),
      parseInt(accent.slice(3,5),16),
      parseInt(accent.slice(5,7),16),
    ] : [139,92,246];

    const draw = () => {
      ctx.clearRect(0,0,340,110);
      t += 0.018;

      if (type === 'neural') {
        const layers = [[{x:20,y:55}],[{x:85,y:18},{x:85,y:55},{x:85,y:92}],[{x:170,y:18},{x:170,y:55},{x:170,y:92}],[{x:255,y:37},{x:255,y:74}],[{x:320,y:55}]];
        layers.forEach((lyr,li) => {
          if (li >= layers.length-1) return;
          lyr.forEach(a => layers[li+1].forEach(b => {
            const p = Math.sin(t*1.5+a.x*0.03+b.y*0.03)*0.5+0.5;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${0.06+p*0.12})`;
            ctx.lineWidth = 0.9; ctx.stroke();
          }));
        });
        layers.flat().forEach((nd,i) => {
          const p = Math.sin(t*2+i*0.9)*0.5+0.5;
          const r = 5 + p*3.5;
          const g = ctx.createRadialGradient(nd.x,nd.y,0,nd.x,nd.y,r+4);
          g.addColorStop(0,'rgba(255,255,255,0.95)'); g.addColorStop(1,`rgba(${cr},${cg},${cb},0.8)`);
          ctx.beginPath(); ctx.arc(nd.x,nd.y,r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
        });

      } else if (type === 'tokens') {
        const tokens = ['BERT','[CLS]','embed','▸','token','∥','GPT']; const spds = [22,-18,16,-20,14,-17,20];
        for (let row=0;row<3;row++) {
          tokens.forEach((tk,i) => {
            const x = ((i*52 + t*spds[i%7]*0.5 + 800) % 380) - 20;
            const y = 18+row*34+Math.sin(t+i+row)*2.5;
            ctx.font = `${row===1?12:10}px 'JetBrains Mono',monospace`;
            ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.15+Math.sin(t+i+row*0.7)*0.08})`;
            ctx.fillText(tk,x,y);
          });
        }
        for (let a=0;a<4;a++) {
          const x1=20+a*80, x2=40+((a+2)%5)*60;
          ctx.beginPath(); ctx.moveTo(x1,5); ctx.bezierCurveTo(x1,55,x2,55,x2,105);
          ctx.strokeStyle=`rgba(${cr},${cg},${cb},0.05)`; ctx.lineWidth=0.8; ctx.stroke();
        }

      } else if (type === 'wave') {
        [[1.0,1.0],[0.6,1.8],[0.38,2.6]].forEach(([amp,freq],wi) => {
          ctx.beginPath();
          for (let x=0;x<=340;x+=2) {
            const y = 55 + amp*28*Math.sin(freq*x*0.038+t*(1+wi*0.28));
            x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
          }
          ctx.strokeStyle=`rgba(${cr},${cg},${cb},${0.6-wi*0.15})`; ctx.lineWidth=1.8-wi*0.4; ctx.stroke();
        });
        const hx=170+Math.sin(t*0.65)*100, hy=55+Math.sin(1.0*hx*0.038+t)*26;
        ctx.beginPath(); ctx.arc(hx,hy,5+Math.sin(t*3)*1.5,0,Math.PI*2);
        ctx.fillStyle=`rgba(${cr},${cg},${cb},0.95)`; ctx.fill();

      } else if (type === 'grid') {
        const chars = ['ક','ખ','ગ','ઘ','ચ','છ','જ','ઝ','ણ','ત','થ','દ','ધ','ન','પ'];
        chars.forEach((c,i) => {
          const cxx=22+(i%11)*28, cyy=28+Math.floor(i/11)*38+Math.sin(t+i*0.6)*2.5;
          const hi = Math.floor(t*1.5%15)===i;
          ctx.font=`${hi?14.5:11}px serif`;
          ctx.fillStyle=hi?`rgba(${cr},${cg},${cb},0.95)`:`rgba(${cr},${cg},${cb},${0.2+Math.sin(t+i)*0.08})`;
          ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(c,cxx,cyy);
          if(hi) { ctx.strokeStyle=`rgba(${cr},${cg},${cb},0.5)`; ctx.lineWidth=1; ctx.strokeRect(cxx-11,cyy-11,22,22); }
        });
        ctx.textAlign='left'; ctx.textBaseline='alphabetic';
        const scan=(t*55%110); ctx.fillStyle=`rgba(${cr},${cg},${cb},0.06)`; ctx.fillRect(0,scan-5,340,10);

      } else if (type === 'scatter') {
        const pts = Array.from({length:32},(_,i)=>({ x:18+((i*43+i*i*7)%304), y:10+((i*59+i*37)%90) }));
        ctx.beginPath(); ctx.moveTo(20,100); ctx.lineTo(320,10);
        ctx.strokeStyle=`rgba(${cr},${cg},${cb},0.18)`; ctx.lineWidth=1.5; ctx.setLineDash([5,4]); ctx.stroke(); ctx.setLineDash([]);
        pts.forEach((p,i) => {
          const pulse = Math.sin(t*1.3+i*0.5);
          ctx.beginPath(); ctx.arc(p.x,p.y,2.6+pulse,0,Math.PI*2);
          ctx.fillStyle=`rgba(${cr},${cg},${cb},${0.5+pulse*0.3})`; ctx.fill();
        });

      } else if (type === 'bars') {
        const vals = [58,74,50,88,66,92,62,78];
        vals.forEach((v,i) => {
          const h=(v/100)*88*(0.72+Math.sin(t*0.65+i*0.45)*0.1);
          const x=15+i*40;
          const g=ctx.createLinearGradient(0,104-h,0,104);
          g.addColorStop(0,`rgba(${cr},${cg},${cb},0.7)`); g.addColorStop(1,`rgba(${cr},${cg},${cb},0.12)`);
          ctx.fillStyle=g; ctx.fillRect(x,104-h,28,h);
          ctx.strokeStyle=`rgba(${cr},${cg},${cb},0.45)`; ctx.lineWidth=1; ctx.strokeRect(x,104-h,28,h);
        });

      } else { // pulse — emotion
        [0,1,2].forEach(ring => {
          const rx=(ring+1)*22*(0.65+Math.sin(t*0.7+ring)*0.35);
          ctx.beginPath(); ctx.arc(170,55,rx,0,Math.PI*2);
          ctx.strokeStyle=`rgba(${cr},${cg},${cb},${(0.45-ring*0.12)*(Math.sin(t*1.2+ring)*0.4+0.6)})`;
          ctx.lineWidth=1.8; ctx.stroke();
        });
        ctx.beginPath(); ctx.arc(170,55,9,0,Math.PI*2);
        ctx.fillStyle=`rgba(${cr},${cg},${cb},0.95)`; ctx.fill();
        const emojis = ['😊','😔','😤','😢'];
        emojis.forEach((em,i) => {
          const ex=50+i*66, ey=55+Math.sin(t*1.1+i*0.9)*18;
          ctx.font='15px serif'; ctx.globalAlpha=0.45+Math.sin(t+i)*0.3;
          ctx.textAlign='center'; ctx.fillText(em,ex,ey);
        });
        ctx.globalAlpha=1; ctx.textAlign='left';
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [type, accent]);

  return (
    <canvas ref={cvRef} width={340} height={110}
      style={{ width:'100%', height:110, display:'block', borderRadius:'14px 14px 0 0' }} />
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECT MODAL
═══════════════════════════════════════════════════════════ */
function ProjectModal({ project, theme, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key==='Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow=''; };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={e => { if (e.target===e.currentTarget) onClose(); }}>
      <div className="modal-card">
        {/* Canvas viz header */}
        <div style={{ overflow:'hidden', borderRadius:'24px 24px 0 0', background:theme.grad }}>
          <ProjCanvas type={theme.type} accent={theme.accent} />
          <div style={{ height:4, background:`linear-gradient(90deg,${theme.accent},transparent)` }} />
        </div>

        {/* Content */}
        <div style={{ padding:'28px 32px 36px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, fontFamily:T.mono, fontWeight:700, color:theme.accent, letterSpacing:'0.12em', marginBottom:9, background:`${theme.accent}18`, padding:'3px 10px', borderRadius:'5px', display:'inline-block' }}>
                {project.type.toUpperCase()}
              </div>
              <h2 style={{ fontFamily:T.disp, fontSize:28, fontWeight:800, color:T.ink, letterSpacing:'-0.04em', lineHeight:1.15, marginTop:8 }}>
                {project.title}
              </h2>
              <p style={{ fontSize:13.5, color:T.inkDim, fontFamily:T.mono, marginTop:5 }}>{project.venue}</p>
            </div>
            <button onClick={onClose} style={{
              width:40, height:40, borderRadius:'50%', flexShrink:0,
              background:'rgba(109,40,217,0.06)', border:'1px solid rgba(109,40,217,0.15)',
              fontSize:20, color:T.inkSub, display:'flex', alignItems:'center', justifyContent:'center',
              transition:'background 0.15s',
            }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
            >×</button>
          </div>

          {/* Impact */}
          <div style={{ padding:'12px 16px', borderRadius:'12px', background:`${theme.accent}14`, border:`1px solid ${theme.accent}30`, marginBottom:20 }}>
            <span style={{ fontSize:12, fontFamily:T.mono, color:theme.accent, fontWeight:700 }}>✦ IMPACT: </span>
            <span style={{ fontSize:13.5, color:theme.accent, fontWeight:600 }}>{project.impact}</span>
          </div>

          {/* Full abstract */}
          <p style={{ fontSize:17, color:T.inkSub, lineHeight:1.88, marginBottom:22 }}>{project.abstract}</p>

          {/* Tags */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:28 }}>
            {project.tags.map(t => (
              <span key={t} className="tag" style={{ background:`${theme.accent}18`, color:theme.accent, border:`1px solid ${theme.accent}30` }}>{t}</span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:'flex', gap:12 }}>
            <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:15, padding:'13px 28px' }}>
              View on GitHub ↗
            </a>
            <button onClick={onClose} className="btn-ghost">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECT CARD — click to expand
═══════════════════════════════════════════════════════════ */
function ProjCard({ project, idx, onOpen }) {
  const [ref, vis] = useVisible(0.07);
  const [hovered, setHovered] = useState(false);
  const theme = PROJ_THEMES[project.id] || PROJ_THEMES.p1;

  return (
    <div
      ref={ref}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:'20px', cursor:'pointer', overflow:'hidden', position:'relative',
        background: theme.grad,
        border:`1px solid ${hovered ? theme.accent+'60' : theme.border}`,
        opacity: vis ? 1 : 0,
        transform: vis ? (hovered ? 'translateY(-7px) scale(1.015)' : 'none') : 'translateY(20px)',
        boxShadow: hovered
          ? `0 0 0 1px ${theme.accent}30, 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${theme.accent}20`
          : T.shadowCard,
        transition: `opacity 0.55s ${idx*0.07}s ease, transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s, border-color 0.25s`,
      }}
    >
      {/* Canvas visualization */}
      <div style={{ background:theme.grad, overflow:'hidden' }}>
        <ProjCanvas type={theme.type} accent={theme.accent} />
      </div>

      {/* Body */}
      <div style={{ padding:'20px 22px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <span style={{ fontSize:11, fontFamily:T.mono, fontWeight:700, letterSpacing:'0.1em', color:theme.accent, background:`${theme.accent}18`, padding:'3px 9px', borderRadius:'5px' }}>
            {project.type.split('/')[0].trim().toUpperCase()}
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:6, opacity: hovered ? 1 : 0.35, transition:'opacity 0.2s' }}>
            <span style={{ fontSize:12, color:theme.accent, fontFamily:T.mono }}>expand</span>
            <div style={{ width:26, height:26, borderRadius:'8px', background:`${theme.accent}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:theme.accent }}>⤢</div>
          </div>
        </div>

        <h3 style={{ fontFamily:T.disp, fontSize:20, fontWeight:800, letterSpacing:'-0.03em', color:T.ink, marginBottom:9, lineHeight:1.25 }}>
          {project.title}
        </h3>
        <p style={{ fontSize:15, color:T.inkSub, lineHeight:1.7, marginBottom:14 }}>
          {project.abstract.split('.')[0]}.
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
          {project.tags.slice(0,5).map(t => (
            <span key={t} className="tag" style={{ background:`${theme.accent}14`, color:theme.accent, border:`1px solid ${theme.accent}25` }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize:12.5, fontFamily:T.mono, color:theme.accent, fontWeight:700, paddingTop:12, borderTop:`1px solid ${theme.border}` }}>
          ✦ {project.impact}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, vis] = useVisible(0.06);
  const [modal, setModal] = useState(null);

  return (
    <section id="projects" style={{ padding:'140px clamp(32px,6vw,140px)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1600, margin:'0 auto' }}>
        <div ref={ref} style={{ marginBottom:60, opacity:vis?1:0, transform:vis?'none':'translateY(24px)', transition:'opacity 0.7s ease, transform 0.7s ease', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20 }}>
          <div>
            <div style={{ fontSize:12, fontFamily:T.mono, fontWeight:700, color:T.v, letterSpacing:'0.18em', marginBottom:14 }}>03 · PROJECTS</div>
            <h2 style={{ fontFamily:T.disp, fontSize:'clamp(36px,3.8vw,56px)', fontWeight:800, letterSpacing:'-0.045em', color:T.ink, lineHeight:1.06 }}>
              What I've built
            </h2>
          </div>
          <a href="https://github.com/Bhavi15" target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize:15 }}>
            View on GitHub ↗
          </a>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(350px,1fr))', gap:20 }}>
          {research.map((p,i) => (
            <ProjCard key={p.id} project={p} idx={i} onOpen={setModal} />
          ))}
        </div>
      </div>

      {modal && (
        <ProjectModal
          project={modal}
          theme={PROJ_THEMES[modal.id] || PROJ_THEMES.p1}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXPERIENCE & EDUCATION
═══════════════════════════════════════════════════════════ */
const EXP_PALS = [
  { dot:T.v,  bg:T.vXL,  accent:T.v,  border:'rgba(109,40,217,0.18)' },
  { dot:T.e,  bg:T.eXL,  accent:T.e,  border:'rgba(6,95,70,0.18)'    },
  { dot:T.a,  bg:T.aXL,  accent:T.a,  border:'rgba(180,83,9,0.18)'   },
];

function ExpCard({ item, idx }) {
  const [ref, vis] = useVisible(0.09);
  const [hov, setHov] = useState(false);
  const pal = EXP_PALS[idx % EXP_PALS.length];

  return (
    <div ref={ref} style={{ display:'flex', gap:24, alignItems:'flex-start', opacity:vis?1:0, transform:vis?'none':'translateX(-24px)', transition:`opacity 0.65s ${idx*0.15}s ease, transform 0.65s ${idx*0.15}s cubic-bezier(.22,1,.36,1)` }}>
      {/* Timeline dot */}
      <div style={{ flexShrink:0, width:44, display:'flex', flexDirection:'column', alignItems:'center', paddingTop:20 }}>
        <div style={{
          width:18, height:18, borderRadius:'50%', background:pal.dot,
          border:`4px solid #F7F5FF`,
          boxShadow:`0 0 0 2px ${pal.dot}50, 0 0 20px ${pal.dot}50`,
          transition:'transform 0.2s', transform:hov?'scale(1.5)':'scale(1)',
        }} />
      </div>

      {/* Card */}
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          flex:1, padding:'18px 24px', borderRadius:'18px',
          background: hov ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.80)',
          border:`1px solid ${hov ? pal.dot+'60' : 'rgba(109,40,217,0.10)'}`,
          borderLeft:`4px solid ${pal.dot}`,
          boxShadow: hov ? T.shadowLg : T.shadowCard,
          transform: hov ? 'translateY(-3px)' : 'none',
          transition:'all 0.25s cubic-bezier(.22,1,.36,1)',
        }}
      >
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18, flexWrap:'wrap', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:52, height:52, borderRadius:'14px', background:pal.bg, border:`1px solid ${pal.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:T.mono, fontSize:12, fontWeight:800, color:pal.accent }}>
              {item.name.slice(0,3)}
            </div>
            <div>
              <h3 style={{ fontFamily:T.disp, fontSize:26, fontWeight:800, color:T.ink, letterSpacing:'-0.03em', lineHeight:1 }}>{item.name}</h3>
              <p style={{ fontSize:16, color:pal.accent, fontWeight:600, marginTop:5 }}>{item.type.split('·')[0].trim()}</p>
            </div>
          </div>
          <span style={{ fontSize:12.5, fontFamily:T.mono, color:T.inkDim, padding:'5px 14px', borderRadius:'9999px', background:'rgba(109,40,217,0.06)', border:'1px solid rgba(109,40,217,0.12)', whiteSpace:'nowrap' }}>
            {item.year}
          </span>
        </div>

        <p style={{ fontSize:18, color:T.inkSub, lineHeight:1.85, marginBottom:14 }}>{item.desc}</p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:14 }}>
          {item.metrics.map((m,j) => (
            <div key={j} style={{ padding:'9px 6px', textAlign:'center', borderRadius:'10px', background:pal.bg, border:`1px solid ${pal.border}` }}>
              <div style={{ fontSize:15, fontWeight:900, color:pal.accent, fontFamily:T.mono, lineHeight:1 }}>{m.v}</div>
              <div style={{ fontSize:10, color:T.inkDim, letterSpacing:'0.06em', marginTop:4 }}>{m.k.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {item.tech.map(t => (
            <span key={t} className="tag" style={{ background:pal.bg, color:pal.accent, border:`1px solid ${pal.border}` }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const [ref, vis] = useVisible(0.06);
  return (
    <section id="experience" style={{ minHeight:'100svh', display:'flex', alignItems:'center', padding:'clamp(80px,9vh,110px) clamp(40px,6vw,100px) clamp(30px,4vh,60px)', position:'relative', zIndex:1, background:'rgba(109,40,217,0.02)' }}>
      <div style={{ maxWidth:1600, margin:'0 auto', width:'100%' }}>
        <div ref={ref} style={{ marginBottom:28, opacity:vis?1:0, transform:vis?'none':'translateY(24px)', transition:'opacity 0.7s ease, transform 0.7s ease' }}>
          <div style={{ fontSize:12, fontFamily:T.mono, fontWeight:700, color:T.v, letterSpacing:'0.18em', marginBottom:20 }}>04 · EXPERIENCE</div>
          <h2 style={{ fontFamily:T.disp, fontSize:'clamp(36px,3.8vw,56px)', fontWeight:800, letterSpacing:'-0.045em', color:T.ink, lineHeight:1.06 }}>
            Experience &<br/><span style={{ background:`linear-gradient(135deg,${T.v},${T.eL})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Education</span>
          </h2>
        </div>

        <div style={{ position:'relative' }}>
          {/* Vertical line */}
          <div style={{ position:'absolute', left:25, top:0, bottom:0, width:3, background:`linear-gradient(180deg,${T.v} 0%,#a78bfa 30%,${T.rL} 60%,${T.eL} 100%)`, borderRadius:'9999px', boxShadow:`0 0 12px rgba(109,40,217,0.22)` }} />
          <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
            {systems.map((s,i) => <ExpCard key={s.id} item={s} idx={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════ */
function Contact() {
  const [ref, vis] = useVisible(0.07);
  return (
    <section id="contact" style={{ minHeight:'100svh', display:'flex', alignItems:'center', padding:'clamp(80px,9vh,110px) clamp(40px,6vw,100px) clamp(40px,5vh,70px)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1600, margin:'0 auto' }}>
        <div ref={ref} style={{ opacity:vis?1:0, transform:vis?'none':'translateY(24px)', transition:'opacity 0.7s ease, transform 0.7s ease' }}>
          <div style={{
            borderRadius:'28px', overflow:'hidden', position:'relative',
            padding:'clamp(36px,4vw,60px) clamp(36px,5vw,72px)',
            background:'linear-gradient(145deg, rgba(196,167,255,0.30) 0%, rgba(109,40,217,0.10) 40%, rgba(253,210,153,0.14) 70%, rgba(255,182,213,0.18) 100%)',
            border:'1px solid rgba(109,40,217,0.20)',
            boxShadow:`0 0 0 1px rgba(109,40,217,0.06), ${T.shadowXl}`,
          }}>
            {/* Glow orbs */}
            <div style={{ position:'absolute', top:'-80px', right:'-60px', width:400, height:400, borderRadius:'50%', background:'rgba(167,139,250,0.28)', filter:'blur(70px)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:'-100px', left:'10%', width:350, height:350, borderRadius:'50%', background:'rgba(255,182,213,0.24)', filter:'blur(70px)', pointerEvents:'none' }} />
            {/* Grid pattern */}
            <div style={{ position:'absolute', inset:0, opacity:0.07, backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.12) 1px,transparent 1px)', backgroundSize:'26px 26px', pointerEvents:'none' }} />

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontSize:12, fontFamily:T.mono, fontWeight:700, color:T.v, letterSpacing:'0.18em', marginBottom:14 }}>05 · CONTACT</div>
              <h2 style={{ fontFamily:T.disp, fontSize:'clamp(36px,3.8vw,56px)', fontWeight:800, letterSpacing:'-0.045em', letterSpacing:'-0.05em', color:T.ink, lineHeight:1.02, marginBottom:16 }}>
                Let's build<br />
                <span style={{ background:`linear-gradient(135deg,${T.v},${T.rL})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>something great.</span>
              </h2>
              <p style={{ fontSize:20, color:T.inkSub, maxWidth:500, lineHeight:1.78, marginBottom:32 }}>
                Open to full-time AI/ML Engineer roles. Love to chat about cool AI ideas or ambitious projects!
              </p>
              <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                <a href="mailto:pbhavu1507@gmail.com" className="btn-primary" style={{ fontSize:16, padding:'15px 32px' }}>
                  pbhavu1507@gmail.com ✦
                </a>
                {[['LinkedIn →','https://linkedin.com/in/bhavishapatel'],['GitHub →','https://github.com/Bhavi15']].map(([l,h]) => (
                  <a key={l} href={h} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize:16, padding:'15px 28px' }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      position:'relative', zIndex:1,
      borderTop:'1px solid rgba(109,40,217,0.10)',
      padding:'24px clamp(24px,5vw,100px)',
      background:'rgba(247,245,255,0.75)',
      backdropFilter:'blur(16px)',
      display:'flex', justifyContent:'space-between', alignItems:'center',
      flexWrap:'wrap', gap:14,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:30, height:30, borderRadius:'9px', background:`linear-gradient(135deg,${T.v},${T.vMd})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#fff', fontFamily:T.mono }}>B</div>
        <span style={{ fontSize:15.5, fontWeight:700, color:T.inkMd, fontFamily:T.disp }}>Bhavisha Patel</span>
      </div>
      <p style={{ fontSize:13, color:T.inkDim, fontFamily:T.mono }}>© 2026 · Scarborough, Ontario, Canada</p>
      <div style={{ display:'flex', gap:22 }}>
        {[['GitHub','https://github.com/Bhavi15'],['LinkedIn','https://linkedin.com/in/bhavishapatel'],['Email','mailto:pbhavu1507@gmail.com']].map(([l,h]) => (
          <a key={l} href={h} target="_blank" rel="noreferrer" style={{ fontSize:14, fontWeight:500, color:T.inkDim, transition:'color 0.14s' }}
            onMouseEnter={e=>e.currentTarget.style.color=T.vMd}
            onMouseLeave={e=>e.currentTarget.style.color=T.inkDim}>{l} ↗</a>
        ))}
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT PORTFOLIO
═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  useEffect(() => { injectGCSS(); }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  }, []);

  return (
    <div style={{ background:T.bg, minHeight:'100vh', color:T.ink, fontFamily:T.body, position:'relative', overflowX:'hidden' }}>
      <AmbientBG />
      <Nav scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

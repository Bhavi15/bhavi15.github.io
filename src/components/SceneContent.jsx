import { useState, useEffect, useRef } from 'react';
import { engineer, research, systems, stack } from '../data/portfolio';
export { SystemsContent } from './ProjectsScene';

const mono = "'JetBrains Mono', monospace";
const disp = "'Syne', sans-serif";
const body = "'Inter', 'Space Grotesk', sans-serif";

function ap(d = 0) {
  return { animation: `slideUp 0.55s ${d}s cubic-bezier(0.22,1,0.36,1) both` };
}

/* Truly solid panel */
function Panel({ children, style = {}, delay = 0, accent = '#00D4FF' }) {
  return (
    <div style={{
      background: 'rgba(4,7,16,0.97)',
      backdropFilter: 'blur(24px)',
      border: `1px solid ${accent}28`,
      boxShadow: `0 8px 64px rgba(0,0,0,0.9), inset 0 0 0 0.5px ${accent}08`,
      ...ap(delay), ...style,
    }}>
      {children}
    </div>
  );
}

function Chip({ text, color = '#00D4FF' }) {
  return (
    <span style={{
      fontFamily: mono, fontSize: 9.5, letterSpacing: 1, padding: '3px 10px',
      border: `1px solid ${color}35`, color: '#FFFFFF', background: `${color}15`,
      display: 'inline-block', whiteSpace: 'nowrap', borderRadius: 2,
    }}>{text}</span>
  );
}

function Eye({ text, color = '#00D4FF', delay = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, ...ap(delay) }}>
      <div style={{ width: 24, height: 1.5, background: color, flexShrink: 0 }} />
      <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: 4.5, color, whiteSpace: 'nowrap' }}>{text}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   01  ABOUT
═══════════════════════════════════════════════════ */
export function NeuralContent({ vis }) {
  const [typed, setTyped] = useState('');
  const [cursorOn, setCursorOn] = useState(true);
  const text = engineer.tagline;
  const idx  = useRef(0);

  useEffect(() => {
    if (!vis) return;
    idx.current = 0; setTyped('');
    const id = setInterval(() => {
      setTyped(text.slice(0, idx.current + 1));
      idx.current++;
      if (idx.current >= text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [vis]);

  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  if (!vis) return null;

  return (
    /* Scrollable wrapper — pointerEvents auto so wheel works */
    <div style={{
      position: 'absolute', inset: 0,
      overflowY: 'auto', overflowX: 'hidden',
      pointerEvents: 'auto',
    }}>
      <div style={{
        minHeight: '100%',
        display: 'flex', alignItems: 'center',
        padding: '70px 0 50px',
      }}>
        {/* Left */}
        <div style={{ flex: 1, padding: '0 6% 0 7%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Eye text="GENAI DEVELOPER & ML ENGINEER" color="#00D4FF" delay={0.05} />
          <h1 style={{
            fontFamily: disp, fontWeight: 900,
            fontSize: 'clamp(48px, 6.5vw, 88px)',
            lineHeight: 0.88, letterSpacing: -3,
            color: '#FFFFFF', marginBottom: 22,
            textShadow: '0 2px 60px rgba(0,0,0,0.9)',
            ...ap(0.1),
          }}>
            BHAVISHA<br />
            <span style={{ color: '#00D4FF', textShadow: '0 0 80px rgba(0,212,255,0.5)' }}>PATEL</span>
          </h1>
          <div style={{
            fontFamily: body, fontSize: 14.5, lineHeight: 1.85,
            color: 'rgba(215,228,255,0.92)', marginBottom: 30, maxWidth: 540,
            ...ap(0.2),
          }}>
            <span style={{ color: 'rgba(0,212,255,0.5)', fontFamily: mono, fontSize: 12 }}>{'> '}</span>
            {typed}
            <span style={{
              display: 'inline-block', width: 2, height: 15,
              background: cursorOn ? '#00D4FF' : 'transparent',
              marginLeft: 2, verticalAlign: 'middle',
            }} />
          </div>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 26, flexWrap: 'wrap', ...ap(0.3) }}>
            {engineer.stats.map((s, i) => (
              <div key={i} style={{
                padding: '12px 22px',
                background: 'rgba(4,7,16,0.97)',
                border: '1px solid rgba(0,212,255,0.15)',
                borderLeft: i > 0 ? 'none' : '1px solid rgba(0,212,255,0.15)',
              }}>
                <div style={{ fontFamily: disp, fontSize: 22, fontWeight: 800, color: '#00D4FF', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: 1.5, color: 'rgba(180,205,255,0.55)', marginTop: 5 }}>{s.l.toUpperCase()}</div>
              </div>
            ))}
          </div>
          {/* Status */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.28)', alignSelf: 'flex-start', ...ap(0.4) }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 12px #00FF88', animation: 'pulse 2s ease infinite' }} />
            <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: 2.5, color: '#00FF88' }}>{engineer.status}</span>
          </div>
        </div>

        {/* Right */}
        <div style={{ width: '38%', padding: '0 5% 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: 4, color: 'rgba(0,212,255,0.65)', marginBottom: 6, ...ap(0.14) }}>
            WHY HIRE ME
          </div>
          {engineer.highlights.map((h, i) => (
            <div key={i} data-hover style={{
              display: 'flex', alignItems: 'flex-start', gap: 14, padding: '15px 18px',
              background: 'rgba(4,7,16,0.96)', border: '1px solid rgba(255,255,255,0.07)',
              transition: 'all 0.2s', cursor: 'default',
              ...ap(0.2 + i * 0.07),
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.background = 'rgba(0,212,255,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(4,7,16,0.96)'; }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{h.icon}</span>
              <div>
                <div style={{ fontFamily: body, fontSize: 13.5, fontWeight: 600, color: '#FFFFFF', marginBottom: 3 }}>{h.label}</div>
                <div style={{ fontFamily: body, fontSize: 12.5, color: 'rgba(195,215,255,0.75)', lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 6, ...ap(0.56) }}>
            <a href={`https://${engineer.github}`} target="_blank" rel="noreferrer" data-hover style={{
              fontFamily: mono, fontSize: 9, letterSpacing: 2.5, padding: '9px 16px',
              background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.35)',
              color: '#00FF88', textDecoration: 'none', transition: 'all 0.2s', pointerEvents: 'auto',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,136,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,136,0.08)'}>
              GITHUB ↗
            </a>
            <a href={`https://${engineer.linkedin}`} target="_blank" rel="noreferrer" data-hover style={{
              fontFamily: mono, fontSize: 9, letterSpacing: 2.5, padding: '9px 16px',
              background: 'rgba(123,47,255,0.08)', border: '1px solid rgba(123,47,255,0.35)',
              color: '#A78BFA', textDecoration: 'none', transition: 'all 0.2s', pointerEvents: 'auto',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(123,47,255,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(123,47,255,0.08)'}>
              LINKEDIN ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   02  EXPERIENCE — scrollable
═══════════════════════════════════════════════════ */
export function ResearchContent({ vis }) {
  const [active, setActive] = useState(0);
  const sys = systems[active];
  if (!vis) return null;

  return (
    <div style={{
      position: 'absolute', top: 58, left: 0, right: 0, bottom: 40,
      overflowY: 'auto', overflowX: 'hidden',
      pointerEvents: 'auto',
    }}>
      <div style={{ minHeight: '100%', padding: '16px 6%', display: 'flex', gap: 16, alignItems: 'flex-start', minWidth: 0 }}>

        {/* Sidebar — sticky */}
        <div style={{ width: 235, flexShrink: 0, position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: 4, ...ap(0.04) }}>
          <Eye text="CAREER TIMELINE" color="#00FF88" delay={0.04} />
          <h2 style={{ fontFamily: disp, fontWeight: 800, fontSize: 'clamp(18px,2.2vw,28px)', color: '#FFFFFF', letterSpacing: -0.5, marginBottom: 16 }}>
            Experience &amp;<br /><span style={{ color: '#00FF88' }}>Education</span>
          </h2>
          {systems.map((s, i) => (
            <button key={s.id} data-hover onClick={() => setActive(i)} style={{
              display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px',
              cursor: 'pointer', textAlign: 'left',
              background: active === i ? 'rgba(4,7,16,0.99)' : 'rgba(4,7,16,0.6)',
              border: 'none',
              borderLeft: `3px solid ${active === i ? s.color : 'rgba(255,255,255,0.07)'}`,
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              transition: 'all 0.2s', pointerEvents: 'auto',
            }}>
              <span style={{ fontFamily: disp, fontWeight: 700, fontSize: 16, color: active === i ? s.color : 'rgba(200,215,255,0.55)', letterSpacing: 0.3 }}>
                {s.name}
              </span>
              <span style={{ fontFamily: mono, fontSize: 8, color: 'rgba(180,200,255,0.38)', letterSpacing: 1 }}>{s.year}</span>
            </button>
          ))}
        </div>

        {/* Detail */}
        {sys && (
          <Panel key={sys.id} accent={sys.color} delay={0.08} style={{ flex: 1, padding: '28px 34px', display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: 4, color: sys.color, marginBottom: 8 }}>{sys.year.toUpperCase()}</div>
                <h3 style={{ fontFamily: disp, fontWeight: 800, fontSize: 'clamp(26px,3.2vw,42px)', color: '#FFFFFF', letterSpacing: -1, lineHeight: 1 }}>{sys.name}</h3>
                <p style={{ fontFamily: body, fontSize: 13, color: 'rgba(180,205,255,0.65)', marginTop: 6 }}>
                  {sys.type.split('·').slice(1).join('·').trim()}
                </p>
              </div>
              <div style={{ width: 46, height: 46, border: `1.5px solid ${sys.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 20 }}>
                <div style={{ width: 14, height: 14, background: sys.color, clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)' }} />
              </div>
            </div>
            <p style={{ fontFamily: body, fontSize: 14.5, color: 'rgba(220,232,255,0.92)', lineHeight: 1.85 }}>{sys.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {sys.metrics.map((m, i) => (
                <div key={i} style={{ padding: '13px 15px', background: 'rgba(0,0,0,0.45)', border: `1px solid ${sys.color}22` }}>
                  <div style={{ fontFamily: disp, fontWeight: 700, fontSize: 19, color: sys.color, lineHeight: 1 }}>{m.v}</div>
                  <div style={{ fontFamily: mono, fontSize: 7.5, color: 'rgba(180,205,255,0.5)', letterSpacing: 1.5, marginTop: 5 }}>{m.k.toUpperCase()}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {sys.tech.map(t => <Chip key={t} text={t} color={sys.color} />)}
            </div>
          </Panel>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════
   04  SKILLS — scrollable, 3 tabs
═══════════════════════════════════════════════════ */
export function StackContent({ vis }) {
  const [tab, setTab] = useState('genai');
  if (!vis) return null;

  const TABS = [
    { k: 'genai', l: 'GenAI & LLMs',      items: stack.genai },
    { k: 'ml',    l: 'ML / Deep Learning', items: stack.ml   },
    { k: 'infra', l: 'Infra & Cloud',      items: stack.infra },
  ];
  const items = TABS.find(t => t.k === tab).items;

  return (
    <div style={{
      position: 'absolute', top: 58, left: 0, right: 0, bottom: 40,
      overflowY: 'auto', overflowX: 'hidden',
      pointerEvents: 'auto',
    }}>
      <div style={{ padding: '16px 6%', display: 'flex', gap: 22, minHeight: 'calc(100% - 0px)', alignItems: 'flex-start' }}>

        {/* Left — skill bars */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, ...ap(0.04) }}>
          <div>
            <Eye text="TECHNICAL SKILLS" color="#FFB800" delay={0.04} />
            <h2 style={{ fontFamily: disp, fontWeight: 800, fontSize: 'clamp(20px,2.5vw,30px)', color: '#FFFFFF', letterSpacing: -0.5, marginBottom: 14 }}>
              Tools &amp; <span style={{ color: '#FFB800' }}>Expertise</span>
            </h2>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, ...ap(0.1) }}>
            {TABS.map((t, i) => (
              <button key={t.k} data-hover onClick={() => setTab(t.k)} style={{
                fontFamily: body, fontSize: 12, fontWeight: tab === t.k ? 600 : 400,
                letterSpacing: 0.3, padding: '9px 18px', cursor: 'pointer',
                background: tab === t.k ? 'rgba(255,184,0,0.18)' : 'rgba(4,7,16,0.92)',
                color: tab === t.k ? '#FFFFFF' : 'rgba(200,215,255,0.65)',
                border: `1px solid ${tab === t.k ? 'rgba(255,184,0,0.6)' : 'rgba(255,255,255,0.12)'}`,
                borderLeft: i > 0 ? 'none' : undefined,
                transition: 'all 0.2s', pointerEvents: 'auto',
              }}
              onMouseEnter={e => { if (tab !== t.k) { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}}
              onMouseLeave={e => { if (tab !== t.k) { e.currentTarget.style.color = 'rgba(200,215,255,0.65)'; e.currentTarget.style.background = 'rgba(4,7,16,0.92)'; }}}
              >{t.l}</button>
            ))}
          </div>

          {/* Skill bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((sk, i) => (
              <div key={sk.name + tab} style={{ ...ap(0.14 + i * 0.04) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: body, fontSize: 13.5, fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap' }}>{sk.name}</span>
                    <span style={{ fontFamily: mono, fontSize: 8, color: 'rgba(190,210,255,0.6)', letterSpacing: 0.8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sk.sub}</span>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: '#FFB800', flexShrink: 0, marginLeft: 12 }}>{sk.level}</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 2,
                    background: tab === 'genai'
                      ? 'linear-gradient(90deg,#00D4FF,#7B2FFF)'
                      : tab === 'ml'
                      ? 'linear-gradient(90deg,#7B2FFF,#00FF88)'
                      : 'linear-gradient(90deg,#FFB800,#FF3366)',
                    boxShadow: '0 0 10px rgba(255,184,0,0.45)',
                    width: `${sk.level}%`,
                    animation: `progressFill 1s ${0.2 + i * 0.055}s ease both`,
                    '--target-w': `${sk.level}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — domains — sticky */}
        <div style={{ width: 255, flexShrink: 0, position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 5, ...ap(0.12) }}>
          <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: 4, color: 'rgba(255,184,0,0.75)', marginBottom: 8 }}>
            DOMAIN EXPERTISE
          </div>
          {stack.domains.map((d, i) => (
            <div key={d.name} data-hover style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px',
              background: 'rgba(4,7,16,0.96)', border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.18s', cursor: 'default',
              ...ap(0.16 + i * 0.03),
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,184,0,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,184,0,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(4,7,16,0.96)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
              <span style={{ color: '#FFB800', fontSize: 7, flexShrink: 0, opacity: 0.8 }}>◆</span>
              <span style={{ fontFamily: body, fontSize: 12.5, color: '#FFFFFF', fontWeight: 400 }}>{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   05  CONTACT — scrollable
═══════════════════════════════════════════════════ */
export function ContactContent({ vis }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent]  = useState(false);
  const [busy, setBusy]  = useState(false);
  const submit = e => { e.preventDefault(); setBusy(true); setTimeout(() => { setBusy(false); setSent(true); }, 1400); };
  if (!vis) return null;

  return (
    <div style={{
      position: 'absolute', top: 58, left: 0, right: 0, bottom: 40,
      overflowY: 'auto', pointerEvents: 'auto',
    }}>
      <div style={{ padding: '16px 6%', display: 'flex', justifyContent: 'center', minHeight: '100%', alignItems: 'center' }}>
        <div style={{ width: 'min(640px,88vw)' }}>
          <Panel accent="#FF3366" delay={0.06} style={{ padding: '38px 44px' }}>
            <Eye text="GET IN TOUCH" color="#FF3366" delay={0.1} />
            <h2 style={{ fontFamily: disp, fontWeight: 800, fontSize: 'clamp(26px,3.5vw,42px)', color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.05, marginBottom: 8, ...ap(0.16) }}>
              Let's Build<br /><span style={{ color: '#FF3366' }}>Something Real.</span>
            </h2>
            <p style={{ fontFamily: body, fontSize: 14, color: 'rgba(210,225,255,0.82)', lineHeight: 1.8, marginBottom: 22, ...ap(0.22) }}>
              Open to AI/ML Engineer roles, GenAI consulting &amp; interesting collaborations.
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', ...ap(0.28) }}>
              {[
                { l:'EMAIL',    v: engineer.email,   href:`mailto:${engineer.email}`,     c:'#00D4FF' },
                { l:'GITHUB',   v:'Bhavi15',          href:`https://${engineer.github}`,   c:'#00FF88' },
                { l:'LINKEDIN', v:'bhavishapatel',    href:`https://${engineer.linkedin}`, c:'#A78BFA' },
              ].map(lk => (
                <a key={lk.l} href={lk.href} target="_blank" rel="noreferrer" data-hover style={{
                  display: 'flex', flexDirection: 'column', gap: 3, padding: '10px 16px',
                  background: `${lk.c}0E`, border: `1px solid ${lk.c}35`,
                  textDecoration: 'none', transition: 'all 0.18s', pointerEvents: 'auto',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${lk.c}22`; e.currentTarget.style.borderColor = `${lk.c}75`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${lk.c}0E`; e.currentTarget.style.borderColor = `${lk.c}35`; }}>
                  <span style={{ fontFamily: mono, fontSize: 7, letterSpacing: 3, color: lk.c }}>{lk.l}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: '#FFFFFF' }}>{lk.v}</span>
                </a>
              ))}
            </div>
            {sent ? (
              <div style={{ padding: '28px', textAlign: 'center', border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.06)', animation: 'fadeIn 0.4s ease' }}>
                <div style={{ fontSize: 30, color: '#00FF88', marginBottom: 8 }}>✓</div>
                <div style={{ fontFamily: disp, fontWeight: 700, fontSize: 20, letterSpacing: 2, color: '#00FF88' }}>MESSAGE RECEIVED</div>
                <p style={{ fontFamily: mono, fontSize: 9, color: 'rgba(180,200,255,0.5)', marginTop: 10, letterSpacing: 1 }}>Response in &lt;24h</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['NAME','name','text'],['EMAIL','email','email']].map(([label,key,type]) => (
                  <div key={key}>
                    <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: 2.5, color: 'rgba(0,212,255,0.7)', marginBottom: 6 }}>
                      {label} <span style={{ color: '#FF3366' }}>*</span>
                    </div>
                    <input type={type} required value={form[key]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                      style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)', fontFamily: body, fontSize: 14, outline: 'none', transition: 'border 0.18s' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.65)'}
                      onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />
                  </div>
                ))}
                <div>
                  <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: 2.5, color: 'rgba(0,212,255,0.7)', marginBottom: 6 }}>
                    MESSAGE <span style={{ color: '#FF3366' }}>*</span>
                  </div>
                  <textarea required rows={4} value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ width: '100%', padding: '12px 14px', resize: 'vertical', background: 'rgba(255,255,255,0.04)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)', fontFamily: body, fontSize: 14, outline: 'none', transition: 'border 0.18s', minHeight: 100 }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.65)'}
                    onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                  />
                </div>
                <button type="submit" disabled={busy} data-hover style={{
                  fontFamily: body, fontSize: 13, fontWeight: 600, letterSpacing: 1.5, padding: '14px 32px',
                  cursor: busy ? 'wait' : 'pointer',
                  background: 'rgba(0,212,255,0.12)', color: '#FFFFFF',
                  border: '1px solid rgba(0,212,255,0.5)',
                  transition: 'all 0.2s', alignSelf: 'flex-start',
                  opacity: busy ? 0.55 : 1, pointerEvents: 'auto',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => !busy && (e.currentTarget.style.background = 'rgba(0,212,255,0.24)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.12)')}>
                  {busy ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

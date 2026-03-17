import { useState, useEffect, useRef, useCallback } from 'react';
import { engineer, research, systems, stack } from '../data/portfolio';

/* ─── design tokens ─── */
const C = {
  bg:       '#0B0F1A',
  panel:    '#0F1422',
  surface:  '#141928',
  border:   'rgba(255,255,255,0.07)',
  borderHi: 'rgba(99,179,237,0.3)',
  cyan:     '#63B3ED',
  cyanDim:  'rgba(99,179,237,0.55)',
  cyanFaint:'rgba(99,179,237,0.12)',
  green:    '#68D391',
  greenDim: 'rgba(104,211,145,0.6)',
  white:    '#EDF2F7',
  muted:    'rgba(226,232,240,0.55)',
  faint:    'rgba(226,232,240,0.28)',
  chip:     '#1A2035',
};
const mono = "'JetBrains Mono','Fira Code',monospace";
const sans = "'Space Grotesk','Inter',sans-serif";
const disp = "'Syne',sans-serif";

/* ─── tiny helpers ─── */
const Dot = ({ color = C.cyan, size = 6, pulse = false }) => (
  <span style={{
    display: 'inline-block', width: size, height: size, borderRadius: '50%',
    background: color, boxShadow: `0 0 ${size*1.5}px ${color}`,
    animation: pulse ? 'pulse 2s ease infinite' : 'none', flexShrink: 0,
  }}/>
);

/* ─── typing indicator ─── */
function TypingDots() {
  return (
    <div style={{ display:'flex', gap:5, alignItems:'center', padding:'10px 4px' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width:7, height:7, borderRadius:'50%',
          background: C.cyanDim,
          animation: `typingBounce 1.2s ${i*0.18}s ease-in-out infinite`,
        }}/>
      ))}
    </div>
  );
}

/* ─── project card ─── */
function ProjectCard({ p, onDetails }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onDetails(p)}
      style={{
        background: hov ? C.surface : '#111827',
        border: `1px solid ${hov ? p.color + '55' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 10, padding: '14px 16px', cursor: 'pointer',
        transition: 'all .22s ease',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:p.color, boxShadow:`0 0 8px ${p.color}`, flexShrink:0 }}/>
          <span style={{ fontFamily:mono, fontSize:9, letterSpacing:2, color:p.color, opacity:.75 }}>{p.type.toUpperCase()}</span>
        </div>
        <span style={{ fontFamily:mono, fontSize:9, color:C.faint }}>→</span>
      </div>
      <div style={{ fontFamily:sans, fontWeight:600, fontSize:13.5, color:C.white, marginBottom:6, lineHeight:1.3 }}>{p.title}</div>
      <div style={{ fontFamily:mono, fontSize:9, color:C.muted, letterSpacing:.3, marginBottom:10, lineHeight:1.6 }}>{p.impact}</div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
        {p.tags.slice(0,3).map(t => (
          <span key={t} style={{
            fontFamily:mono, fontSize:8, letterSpacing:.4, padding:'2px 8px',
            background:`${p.color}12`, border:`1px solid ${p.color}30`,
            color:C.muted, borderRadius:4,
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── skill bar ─── */
function SkillBar({ name, level, sub, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(level), delay + 100); return () => clearTimeout(t); }, [level, delay]);
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
        <span style={{ fontFamily:sans, fontSize:12, color:C.white, fontWeight:500 }}>{name}</span>
        <span style={{ fontFamily:mono, fontSize:9.5, color:C.cyanDim }}>{level}%</span>
      </div>
      <div style={{ height:2, background:'rgba(255,255,255,.06)', borderRadius:2, overflow:'hidden' }}>
        <div style={{
          height:'100%', width:`${w}%`,
          background:`linear-gradient(90deg,rgba(60,100,200,.8),${C.cyan})`,
          boxShadow:`0 0 6px ${C.cyan}80`,
          transition:`width 1s ${delay}ms cubic-bezier(.22,1,.36,1)`,
        }}/>
      </div>
      <div style={{ fontFamily:mono, fontSize:8.5, color:C.faint, marginTop:3 }}>{sub}</div>
    </div>
  );
}

/* ─── experience card ─── */
function ExpCard({ s }) {
  return (
    <div style={{
      background:'#111827', border:`1px solid rgba(255,255,255,0.06)`,
      borderLeft:`3px solid ${s.color}`, borderRadius:8, padding:'14px 16px', marginBottom:10,
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:4 }}>
        <span style={{ fontFamily:disp, fontWeight:700, fontSize:15, color:C.white }}>{s.name}</span>
        <span style={{ fontFamily:mono, fontSize:8.5, color:C.faint }}>{s.year}</span>
      </div>
      <div style={{ fontFamily:sans, fontSize:11, color:s.color, marginBottom:8, opacity:.8 }}>{s.type}</div>
      <div style={{ fontFamily:sans, fontSize:12, color:C.muted, lineHeight:1.7, marginBottom:10 }}>{s.desc}</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:6 }}>
        {s.metrics.map((m,i) => (
          <div key={i} style={{ background:`${s.color}0A`, border:`1px solid ${s.color}1A`, borderRadius:6, padding:'6px 10px' }}>
            <div style={{ fontFamily:disp, fontWeight:700, fontSize:13, color:s.color }}>{m.v}</div>
            <div style={{ fontFamily:mono, fontSize:7.5, color:C.faint, letterSpacing:1 }}>{m.k.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── message bubble ─── */
function Bubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{
      display:'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 18, animation: 'msgIn .3s cubic-bezier(.22,1,.36,1) both',
    }}>
      {!isUser && (
        <div style={{
          width:30, height:30, borderRadius:'50%', flexShrink:0, marginRight:10, marginTop:2,
          background:`linear-gradient(135deg,#1a2540,#1e3050)`,
          border:`1.5px solid ${C.borderHi}`,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <span style={{ fontFamily:mono, fontSize:8.5, fontWeight:700, color:C.cyan }}>BP</span>
        </div>
      )}
      <div style={{ maxWidth:'82%' }}>
        {!isUser && (
          <div style={{ fontFamily:mono, fontSize:8.5, color:C.cyanDim, marginBottom:5, letterSpacing:1 }}>
            BHAVISHA · AI ASSISTANT
          </div>
        )}
        <div style={{
          background: isUser
            ? `linear-gradient(135deg,#1a2a45,#1e3258)`
            : C.surface,
          border: `1px solid ${isUser ? C.borderHi : C.border}`,
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          padding: '11px 15px',
          fontFamily: sans, fontSize: 13.5, color: C.white, lineHeight: 1.7,
        }}>
          {msg.content}
        </div>
        {msg.cards && (
          <div style={{ marginTop:12, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:10 }}>
            {msg.cards.map(p => <ProjectCard key={p.id} p={p} onDetails={msg.onDetails}/>)}
          </div>
        )}
        {msg.skills && (
          <div style={{ marginTop:12, background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:'16px 18px' }}>
            {msg.skills.map((s,i) => <SkillBar key={s.name} name={s.name} level={s.level} sub={s.sub} delay={i*60}/>)}
          </div>
        )}
        {msg.experience && (
          <div style={{ marginTop:12 }}>
            {msg.experience.map(s => <ExpCard key={s.id} s={s}/>)}
          </div>
        )}
        {msg.chips && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginTop:12 }}>
            {msg.chips.map((ch,i) => (
              <button key={i} onClick={() => msg.onChip(ch)} style={{
                fontFamily:mono, fontSize:9.5, letterSpacing:.5,
                padding:'6px 13px', borderRadius:20,
                background:C.cyanFaint, border:`1px solid ${C.borderHi}`,
                color:C.cyan, cursor:'pointer', transition:'all .18s ease',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=`rgba(99,179,237,0.22)`;e.currentTarget.style.borderColor=C.cyan;}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.cyanFaint;e.currentTarget.style.borderColor=C.borderHi;}}>
                {ch}
              </button>
            ))}
          </div>
        )}
        {msg.link && (
          <a href={msg.link} target="_blank" rel="noreferrer" style={{
            display:'inline-flex', alignItems:'center', gap:6, marginTop:10,
            fontFamily:mono, fontSize:9.5, letterSpacing:1,
            color:C.cyan, textDecoration:'none',
            padding:'6px 13px', borderRadius:6,
            background:C.cyanFaint, border:`1px solid ${C.borderHi}`,
            transition:'all .2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(99,179,237,0.2)'}
          onMouseLeave={e=>e.currentTarget.style.background=C.cyanFaint}>
            ↗ {msg.linkLabel || 'Open Link'}
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── detail modal ─── */
function DetailModal({ p, onClose }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 20); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  if (!p) return null;
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:999,
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:20,
    }}>
      <div onClick={onClose} style={{
        position:'absolute', inset:0,
        background:'rgba(5,8,18,.85)', backdropFilter:'blur(10px)',
        opacity:show?1:0, transition:'opacity .3s ease',
      }}/>
      <div style={{
        position:'relative', width:'min(580px,95%)', maxHeight:'88vh',
        background:C.panel, border:`1px solid ${p.color}35`,
        borderRadius:16, overflowY:'auto',
        opacity:show?1:0, transform:show?'scale(1)':'scale(.94)',
        transition:'all .35s cubic-bezier(.22,1,.36,1)',
        boxShadow:`0 40px 100px rgba(0,0,0,.8),0 0 0 1px ${p.color}18`,
      }}>
        <div style={{ height:3, background:`linear-gradient(90deg,${p.color},${p.color}40,transparent)`, borderRadius:'16px 16px 0 0' }}/>
        <div style={{ padding:'22px 26px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontFamily:mono, fontSize:8.5, letterSpacing:3, color:p.color, marginBottom:8, opacity:.75 }}>{p.type.toUpperCase()}</div>
              <h2 style={{ fontFamily:disp, fontWeight:800, fontSize:22, color:C.white, lineHeight:1.2 }}>{p.title}</h2>
              <div style={{ fontFamily:mono, fontSize:9.5, color:C.faint, marginTop:6 }}>{p.venue}</div>
            </div>
            <button onClick={onClose} style={{
              width:32, height:32, borderRadius:8, flexShrink:0, marginLeft:12,
              background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)',
              color:C.muted, fontSize:16, cursor:'pointer', transition:'all .2s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.12)';e.currentTarget.style.color=C.white;}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.06)';e.currentTarget.style.color=C.muted;}}>
              ✕
            </button>
          </div>
          <div style={{
            background:`${p.color}0C`, border:`1px solid ${p.color}28`,
            borderRadius:8, padding:'10px 14px', marginBottom:16,
            fontFamily:mono, fontSize:11, color:C.white, letterSpacing:.3,
          }}>
            ◆ &nbsp;{p.impact}
          </div>
          <p style={{ fontFamily:sans, fontSize:13.5, color:C.muted, lineHeight:1.8, marginBottom:18 }}>{p.abstract}</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:20 }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontFamily:mono, fontSize:8.5, padding:'3px 10px',
                background:`${p.color}10`, border:`1px solid ${p.color}25`,
                color:C.muted, borderRadius:4,
              }}>{t}</span>
            ))}
          </div>
          <a href={p.link} target="_blank" rel="noreferrer" style={{
            display:'block', textAlign:'center',
            fontFamily:sans, fontWeight:600, fontSize:12.5, letterSpacing:2,
            padding:'12px', borderRadius:8,
            background:`${p.color}18`, border:`1px solid ${p.color}45`,
            color:C.white, textDecoration:'none', transition:'all .22s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}30`;}}
          onMouseLeave={e=>{e.currentTarget.style.background=`${p.color}18`;}}>
            VIEW ON GITHUB ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   RESPONSES — what the AI says for each intent
───────────────────────────────────────────────────────── */
function buildResponse(intent, onDetails) {
  switch (intent) {
    case 'projects':
      return [
        { role:'assistant', content:"Here are my 7 projects — each one ships to GitHub. Tap any card to see the full breakdown." },
        { role:'assistant', content:'', cards: research, onDetails },
      ];
    case 'skills':
    case 'models':
      return [
        { role:'assistant', content:"I work across the full GenAI stack — from LLM orchestration to fine-tuning transformers to deploying production APIs. Here's a snapshot:" },
        { role:'assistant', content:'', skills: stack.genai.slice(0,5) },
        { role:'assistant', content:'Also deep on the ML/DL side: PyTorch, HuggingFace, TensorFlow/Keras, FAISS for vector search, and OpenCV for vision tasks.', chips:['Show ML stack','Show infra & tools'], onChip: () => {} },
      ];
    case 'ml_stack':
      return [{ role:'assistant', content:'', skills: stack.ml }];
    case 'infra':
      return [{ role:'assistant', content:'', skills: stack.infra }];
    case 'experience':
      return [
        { role:'assistant', content:"I've worked at TCS as a GenAI Developer and completed dual graduate certs at Seneca Polytechnic — both with 4.0 GPA." },
        { role:'assistant', content:'', experience: systems },
      ];
    case 'about':
      return [{
        role:'assistant',
        content:`I'm Bhavisha Patel — a GenAI Developer & ML Engineer based in Scarborough, Ontario. I build multimodal AI systems: RAG pipelines that read PDFs and images, fine-tuned transformers, computer vision models, and LLM-powered agents.\n\nAt TCS I delivered enterprise GenAI tools for one of Canada's top financial institutions — a VS Code extension with 90% code approval rates and an autonomous AWS Strands security agent.\n\nDual 4.0 GPA across AI and Business Analytics at Seneca Polytechnic. 7 projects shipped to GitHub. Open to AI/ML Engineer roles.`,
        chips:['See my projects','Show my skills','Download resume'], onChip: () => {},
      }];
    case 'contact':
      return [{
        role:'assistant',
        content:`Best ways to reach me:\n\n📧 pbhavu1507@gmail.com\n🔗 linkedin.com/in/bhavishapatel\n💻 github.com/Bhavi15\n\nI'm currently open to full-time AI/ML Engineer roles. Feel free to reach out!`,
        chips:['Visit GitHub','Visit LinkedIn'], onChip: () => {},
      }];
    case 'resume':
      return [{
        role:'assistant',
        content:"My resume covers my TCS GenAI role, dual Seneca certificates, and all 7 GitHub projects. You can find it linked on my LinkedIn profile.",
        link:'https://linkedin.com/in/bhavishapatel', linkLabel:'View LinkedIn Profile',
      }];
    case 'github':
      return [{ role:'assistant', content:"All my projects are on GitHub — feel free to browse the repos.", link:'https://github.com/Bhavi15', linkLabel:'github.com/Bhavi15' }];
    case 'linkedin':
      return [{ role:'assistant', content:"Connect with me on LinkedIn.", link:'https://linkedin.com/in/bhavishapatel', linkLabel:'linkedin.com/in/bhavishapatel' }];
    case 'hi':
      return [{
        role:'assistant',
        content:"Hey! 👋 I'm Bhavisha's AI assistant. I can tell you about her projects, skills, experience, or how to get in touch. What would you like to know?",
        chips:['Tell me about you','Show projects','What AI do you build?','Get in touch'], onChip: () => {},
      }];
    default:
      return [{
        role:'assistant',
        content:"I'm not sure I understood that — here are some things you can ask me:",
        chips:['Tell me about you','Show projects','What AI do you build?','Work experience','Download resume','Get in touch'], onChip: () => {},
      }];
  }
}

function detectIntent(text) {
  const t = text.toLowerCase();
  if (/\b(hi|hey|hello|sup|yo)\b/.test(t)) return 'hi';
  if (/project|built|work|portfolio|demo|github repo/.test(t)) return 'projects';
  if (/ml stack|machine learning stack/.test(t)) return 'ml_stack';
  if (/infra|tool|devops|cloud|docker|aws/.test(t)) return 'infra';
  if (/skill|model|ai|llm|gpt|bert|transformer|genai|langchain|rag|faiss/.test(t)) return 'skills';
  if (/experience|work|job|tcs|seneca|career|background/.test(t)) return 'experience';
  if (/about|who|yourself|you are/.test(t)) return 'about';
  if (/contact|email|reach|hire|available|open/.test(t)) return 'contact';
  if (/resume|cv/.test(t)) return 'resume';
  if (/github/.test(t)) return 'github';
  if (/linkedin/.test(t)) return 'linkedin';
  return 'fallback';
}

/* chip label → intent */
const CHIP_INTENT = {
  'Tell me about you': 'about',
  'Show projects':     'projects',
  'What AI do you build?': 'skills',
  'Work experience':   'experience',
  'Download resume':   'resume',
  'Get in touch':      'contact',
  'See my projects':   'projects',
  'Show my skills':    'skills',
  'Show ML stack':     'ml_stack',
  'Show infra & tools':'infra',
  'Visit GitHub':      'github',
  'Visit LinkedIn':    'linkedin',
};

/* ─────────────────────────────────────────────────────────
   QUICK ACTIONS — shown on fresh load below input
───────────────────────────────────────────────────────── */
const QUICK = [
  { label:'🗂  Show projects',         intent:'projects'   },
  { label:'🤖  What AI do you build?', intent:'skills'     },
  { label:'💼  Work experience',       intent:'experience' },
  { label:'👤  About Bhavisha',        intent:'about'      },
  { label:'📬  Get in touch',          intent:'contact'    },
  { label:'📄  Resume',                intent:'resume'     },
];

/* ─────────────────────────────────────────────────────────
   LEFT PANEL — identity card
───────────────────────────────────────────────────────── */
function IdentityPanel({ onQuick }) {
  return (
    <div style={{
      width:'clamp(260px,28%,320px)', flexShrink:0,
      background:C.panel, borderRight:`1px solid ${C.border}`,
      display:'flex', flexDirection:'column',
      padding:'32px 24px',
      overflowY:'auto',
    }}>
      {/* Avatar area */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginBottom:28 }}>
        <div style={{
          width:72, height:72, borderRadius:'50%',
          background:`linear-gradient(135deg,#1a2a4a,#1e3458)`,
          border:`2px solid ${C.borderHi}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 0 28px rgba(99,179,237,.15)`,
          marginBottom:14,
          fontSize:26,
        }}>🤖</div>
        <h1 style={{ fontFamily:disp, fontWeight:800, fontSize:20, color:C.white, textAlign:'center', marginBottom:5, letterSpacing:-.3 }}>
          Bhavisha Patel
        </h1>
        <div style={{ fontFamily:mono, fontSize:9.5, letterSpacing:2, color:C.cyanDim, textAlign:'center', marginBottom:10 }}>
          GENAI DEVELOPER · ML ENGINEER
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <Dot color={C.green} size={7} pulse />
          <span style={{ fontFamily:mono, fontSize:8.5, letterSpacing:1.5, color:C.greenDim }}>OPEN TO HIRE</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height:1, background:C.border, marginBottom:20 }}/>

      {/* Quick stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:20 }}>
        {[['7','Projects'],['4.0','GPA'],['90%','Approval'],['6+','Months']].map(([v,l]) => (
          <div key={l} style={{
            background:C.surface, border:`1px solid ${C.border}`,
            borderRadius:8, padding:'10px 12px', textAlign:'center',
          }}>
            <div style={{ fontFamily:disp, fontWeight:700, fontSize:18, color:C.cyan, lineHeight:1 }}>{v}</div>
            <div style={{ fontFamily:mono, fontSize:7.5, color:C.faint, letterSpacing:1.5, marginTop:4 }}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height:1, background:C.border, marginBottom:20 }}/>

      {/* Quick nav */}
      <div style={{ fontFamily:mono, fontSize:8, letterSpacing:3, color:C.faint, marginBottom:12 }}>QUICK ACCESS</div>
      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
        {QUICK.map(q => (
          <button key={q.label} onClick={() => onQuick(q.intent, q.label)} style={{
            textAlign:'left', padding:'9px 13px', borderRadius:8, cursor:'pointer',
            background:'transparent', border:`1px solid ${C.border}`,
            fontFamily:sans, fontSize:12.5, color:C.muted,
            transition:'all .18s ease',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background=C.cyanFaint;e.currentTarget.style.borderColor=C.borderHi;e.currentTarget.style.color=C.white;}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.muted;}}>
            {q.label}
          </button>
        ))}
      </div>

      {/* Footer links */}
      <div style={{ marginTop:'auto', paddingTop:24, borderTop:`1px solid ${C.border}`, display:'flex', flexDirection:'column', gap:8 }}>
        {[
          { label:'github.com/Bhavi15',          href:'https://github.com/Bhavi15' },
          { label:'linkedin.com/in/bhavishapatel', href:'https://linkedin.com/in/bhavishapatel' },
          { label:'pbhavu1507@gmail.com',          href:'mailto:pbhavu1507@gmail.com' },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
            fontFamily:mono, fontSize:8.5, color:C.faint, textDecoration:'none', letterSpacing:.3,
            transition:'color .15s',
          }}
          onMouseEnter={e=>e.currentTarget.style.color=C.cyan}
          onMouseLeave={e=>e.currentTarget.style.color=C.faint}>
            → {l.label}
          </a>
        ))}
        <div style={{ fontFamily:mono, fontSize:7.5, color:'rgba(255,255,255,.12)', marginTop:4, letterSpacing:.5 }}>
          📍 Scarborough, Ontario, Canada
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN CHAT PORTFOLIO
───────────────────────────────────────────────────────── */
export default function ChatPortfolio() {
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [typing, setTyping]       = useState(false);
  const [detail, setDetail]       = useState(null);
  const [mobile, setMobile]       = useState(window.innerWidth < 700);
  const [showPanel, setShowPanel] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  /* responsive */
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 700);
    window.addEventListener('resize', h); return () => window.removeEventListener('resize', h);
  }, []);

  /* initial greeting */
  useEffect(() => {
    setTimeout(() => {
      setMessages([{
        role:'assistant',
        content:"Hi! I'm Bhavisha's AI portfolio assistant. Ask me anything — about her projects, skills, experience, or how to get in touch.",
        chips:['Tell me about you','Show projects','What AI do you build?','Work experience','Get in touch'],
        onChip: handleChip,
      }]);
    }, 400);
  }, []); // eslint-disable-line

  const scrollBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:'smooth' }), 60);
  }, []);

  const addMessages = useCallback((msgs, onDetails) => {
    /* patch onChip + onDetails into msgs */
    const patched = msgs.map(m => ({
      ...m,
      onDetails: m.cards ? onDetails : undefined,
      onChip: m.chips
        ? (chip) => {
            const intent = CHIP_INTENT[chip] || detectIntent(chip);
            sendIntent(intent, chip);
          }
        : undefined,
    }));
    setMessages(prev => [...prev, ...patched]);
    scrollBottom();
  }, [scrollBottom]); // eslint-disable-line

  const sendIntent = useCallback((intent, label) => {
    const userMsg = { role:'user', content: label };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    scrollBottom();
    setTimeout(() => {
      setTyping(false);
      const resp = buildResponse(intent, (p) => setDetail(p));
      addMessages(resp, (p) => setDetail(p));
    }, 800 + Math.random() * 400);
  }, [addMessages, scrollBottom]);

  const handleChip = useCallback((chip) => {
    const intent = CHIP_INTENT[chip] || detectIntent(chip);
    sendIntent(intent, chip);
  }, [sendIntent]);

  const handleSend = useCallback(() => {
    const text = input.trim(); if (!text) return;
    setInput('');
    const intent = detectIntent(text);
    sendIntent(intent, text);
    inputRef.current?.focus();
  }, [input, sendIntent]);

  return (
    <div style={{
      position:'fixed', inset:0, background:C.bg,
      display:'flex', fontFamily:sans,
      overflow:'hidden',
    }}>

      {/* ── MOBILE panel overlay ── */}
      {mobile && showPanel && (
        <div style={{ position:'absolute', inset:0, zIndex:50, display:'flex' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(5,8,18,.7)' }} onClick={() => setShowPanel(false)}/>
          <div style={{ position:'relative', zIndex:1, height:'100%', overflowY:'auto' }}>
            <IdentityPanel onQuick={(intent, label) => { sendIntent(intent, label); setShowPanel(false); }}/>
          </div>
        </div>
      )}

      {/* ── LEFT PANEL (desktop) ── */}
      {!mobile && <IdentityPanel onQuick={(intent, label) => sendIntent(intent, label)} />}

      {/* ── RIGHT: CHAT PANEL ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>

        {/* Header */}
        <div style={{
          height:58, borderBottom:`1px solid ${C.border}`,
          display:'flex', alignItems:'center', padding:'0 20px', gap:12, flexShrink:0,
          background:C.panel,
        }}>
          {mobile && (
            <button onClick={() => setShowPanel(true)} style={{
              width:34, height:34, borderRadius:8, background:C.surface,
              border:`1px solid ${C.border}`, color:C.muted, fontSize:16, cursor:'pointer',
            }}>☰</button>
          )}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Dot color={C.green} size={7} pulse />
            <span style={{ fontFamily:mono, fontSize:9.5, letterSpacing:2, color:C.muted }}>BHAVISHA · AI ASSISTANT</span>
          </div>
          <div style={{ marginLeft:'auto', fontFamily:mono, fontSize:8, color:'rgba(255,255,255,.15)', letterSpacing:1 }}>
            powered by gpt-4v · langchain
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex:1, overflowY:'auto', padding:'24px 20px',
          display:'flex', flexDirection:'column',
        }}>
          {messages.map((m, i) => <Bubble key={i} msg={m} />)}
          {typing && (
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
              <div style={{ width:30, height:30, borderRadius:'50%',
                background:`linear-gradient(135deg,#1a2540,#1e3050)`,
                border:`1.5px solid ${C.borderHi}`,
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              }}>
                <span style={{ fontFamily:mono, fontSize:8.5, fontWeight:700, color:C.cyan }}>BP</span>
              </div>
              <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:'16px 16px 16px 4px', padding:'4px 14px' }}>
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div style={{
          borderTop:`1px solid ${C.border}`, padding:'14px 20px',
          background:C.panel, flexShrink:0,
        }}>
          {/* Suggestion chips — only on empty state */}
          {messages.length <= 1 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:12 }}>
              {QUICK.slice(0,4).map(q => (
                <button key={q.label} onClick={() => sendIntent(q.intent, q.label)} style={{
                  fontFamily:mono, fontSize:9, letterSpacing:.5,
                  padding:'5px 12px', borderRadius:16,
                  background:C.cyanFaint, border:`1px solid ${C.borderHi}`,
                  color:C.cyan, cursor:'pointer', transition:'all .18s ease',
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(99,179,237,0.22)';}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.cyanFaint;}}>
                  {q.label.replace(/^.+\s{2}/,'')}
                </button>
              ))}
            </div>
          )}

          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <div style={{
              flex:1, display:'flex', alignItems:'center',
              background:C.surface, border:`1px solid ${C.border}`,
              borderRadius:12, padding:'0 14px',
              transition:'border-color .2s',
            }}>
              <span style={{ fontFamily:mono, fontSize:11, color:C.cyanDim, marginRight:8, userSelect:'none' }}>›</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                placeholder="Ask me anything…"
                style={{
                  flex:1, background:'transparent', border:'none', outline:'none',
                  fontFamily:sans, fontSize:13.5, color:C.white,
                  padding:'13px 0',
                  caretColor: C.cyan,
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                width:44, height:44, borderRadius:12, flexShrink:0,
                background: input.trim() ? C.cyan : C.surface,
                border: `1px solid ${input.trim() ? C.cyan : C.border}`,
                color: input.trim() ? C.bg : C.faint,
                fontSize:18, cursor: input.trim() ? 'pointer' : 'default',
                transition:'all .2s ease', display:'flex', alignItems:'center', justifyContent:'center',
              }}
            >↑</button>
          </div>
          <div style={{ fontFamily:mono, fontSize:7.5, color:'rgba(255,255,255,.14)', textAlign:'center', marginTop:9, letterSpacing:1 }}>
            Try: "show projects" · "what AI do you build" · "get in touch"
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {detail && <DetailModal p={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { research } from '../data/portfolio';

const mono = "'JetBrains Mono', monospace";
const disp = "'Syne', sans-serif";
const body = "'DM Sans','Inter',sans-serif";

/* ══════════════════════════════════════════════════════
   SVG VISUALS — per-project animated banner art
══════════════════════════════════════════════════════ */
function RagViz({ color }) {
  const nodes = [{x:10,y:50},{x:25,y:22},{x:25,y:78},{x:43,y:36},{x:43,y:64},{x:60,y:22},{x:60,y:50},{x:60,y:78},{x:78,y:36},{x:78,y:64},{x:92,y:50}];
  const edges = [[0,1],[0,2],[1,3],[2,4],[3,5],[3,6],[4,6],[4,7],[5,8],[6,8],[6,9],[7,9],[8,10],[9,10]];
  return (
    <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%',overflow:'visible'}}>
      {edges.map(([a,b],i)=>(
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={color} strokeWidth="0.6" strokeOpacity="0.35" strokeDasharray="3 2">
          <animate attributeName="stroke-dashoffset" from="0" to="-10" dur={`${1.4+i*.1}s`} repeatCount="indefinite"/>
        </line>
      ))}
      {nodes.map((n,i)=>(
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="3.2" fill="none" stroke={color} strokeWidth="0.7" strokeOpacity="0.45">
            <animate attributeName="r" values="3.2;4.2;3.2" dur={`${2+i*.25}s`} repeatCount="indefinite"/>
          </circle>
          <circle cx={n.x} cy={n.y} r="1.4" fill={color} opacity="0.8">
            <animate attributeName="opacity" values="0.8;1;0.8" dur={`${2+i*.25}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
    </svg>
  );
}

function TransformerViz({ color }) {
  return (
    <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%'}}>
      {Array.from({length:6},(_,r)=>Array.from({length:6},(_,c)=>{
        const v = 0.1 + Math.random()*.75;
        return (
          <rect key={`${r}-${c}`} x={14+c*13} y={12+r*13} width={11} height={11} rx={1.5} fill={color} opacity={v}>
            <animate attributeName="opacity" values={`${v};${Math.min(v+.3,.95)};${v}`}
              dur={`${1.6+Math.random()*2}s`} begin={`${Math.random()*1.4}s`} repeatCount="indefinite"/>
          </rect>
        );
      }))}
    </svg>
  );
}

function CurrencyViz({ color }) {
  const path = (amp,freq,ph) => Array.from({length:48},(_,i)=>{
    const x=5+i*1.88, y=50+amp*Math.sin(freq*i+ph)+amp*.4*Math.sin(freq*2.2*i+ph*1.5);
    return `${i===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%'}}>
      <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth=".3" strokeOpacity=".2"/>
      {[[13,.22,0],[8,.25,1.1],[18,.19,2.2],[6,.28,3.3]].map(([a,f,p],i)=>(
        <path key={i} d={path(a,f,p)} fill="none" stroke={color} strokeWidth={i===0?1.4:.8} strokeOpacity={.15+i*.12}>
          <animateTransform attributeName="transform" type="translate" values="0,0;1.5,0;0,0" dur={`${3+i}s`} repeatCount="indefinite"/>
        </path>
      ))}
    </svg>
  );
}

function OcrViz({ color }) {
  const chars = 'ઋઌઍઓઔકખગઘઙ'.split('');
  return (
    <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%'}}>
      {Array.from({length:6},(_,r)=>Array.from({length:8},(_,c)=>(
        <text key={`${r}-${c}`} x={8+c*12} y={16+r*14} fill={color} opacity=".3" fontSize="9" fontFamily="serif" textAnchor="middle">
          {chars[(r*8+c)%chars.length]}
          <animate attributeName="opacity" values=".3;.8;.3" dur={`${2+Math.random()*2}s`} begin={`${(r*8+c)*.04}s`} repeatCount="indefinite"/>
        </text>
      )))}
    </svg>
  );
}

function CrimeViz({ color }) {
  const dots = Array.from({length:55},()=>({x:8+Math.random()*84,y:8+Math.random()*84,r:.8+Math.random()*2.4,v:Math.random()}));
  return (
    <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%'}}>
      {[25,50,75].map(v=>(
        <g key={v}>
          <line x1={v} y1="5" x2={v} y2="95" stroke={color} strokeWidth=".2" strokeOpacity=".12"/>
          <line x1="5" y1={v} x2="95" y2={v} stroke={color} strokeWidth=".2" strokeOpacity=".12"/>
        </g>
      ))}
      {dots.map((d,i)=>(
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={color} opacity={d.v*.5+.1}>
          <animate attributeName="r" values={`${d.r};${d.r*1.9};${d.r}`} dur={`${1.8+d.v*3}s`} begin={`${i*.03}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

function TrafficViz({ color }) {
  return (
    <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%'}}>
      <rect x="43" y="5" width="14" height="90" fill={color} opacity=".07" rx="2"/>
      <rect x="5" y="43" width="90" height="14" fill={color} opacity=".07" rx="2"/>
      {[12,28,62,78,92].map(x=>(<line key={x} x1={x} y1="48" x2={x} y2="52" stroke={color} strokeWidth="1.5" strokeOpacity=".3">
        <animate attributeName="opacity" values=".3;.8;.3" dur={`${1.2+x/60}s`} repeatCount="indefinite"/>
      </line>))}
      {[[18,50,true,1.8],[70,50,true,-1.8],[50,18,false,1.8],[50,74,false,-1.8]].map(([x,y,h,s],i)=>(
        <rect key={i} x={x-2} y={y-1.5} width="4" height="3" fill={color} opacity=".7" rx=".5">
          <animateTransform attributeName="transform" type="translate" values={h?`0,0;${s*22},0;0,0`:`0,0;0,${s*22};0,0`} dur={`${2.8+i*.65}s`} repeatCount="indefinite"/>
        </rect>
      ))}
    </svg>
  );
}

function MentalHealthViz({ color }) {
  return (
    <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%'}}>
      <defs><filter id="hg"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <path d="M5,50 L18,50 L23,24 L28,76 L33,50 L52,50 L57,34 L62,66 L67,50 L95,50"
        fill="none" stroke={color} strokeWidth="1.8" opacity=".6" filter="url(#hg)">
        <animate attributeName="stroke-dasharray" values="0,500;500,0" dur="3.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".6;.95;.6" dur="3.2s" repeatCount="indefinite"/>
      </path>
      {[[50,32,10],[38,25,3.5],[62,25,3.5]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={i===0?".8":"1.4"} opacity={i===0?.14:.32}>
          <animate attributeName="opacity" values={`${i===0?.14:.32};${i===0?.28:.6};${i===0?.14:.32}`} dur={`${2.4+i*.5}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

const VIZ = { p1:RagViz, p2:TransformerViz, p7:CurrencyViz, p4:OcrViz, p5:CrimeViz, p6:TrafficViz, p3:MentalHealthViz };

/* ══════════════════════════════════════════════════════
   MODAL — centered overlay, not a side drawer
══════════════════════════════════════════════════════ */
function Modal({ p, onClose }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 20); return () => clearTimeout(t); }, []);
  const V = VIZ[p.id] || RagViz;

  // Close on Escape
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div style={{
      position:'absolute', inset:0, zIndex:60,
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'24px', pointerEvents:'auto',
    }}>
      {/* Dark backdrop — click to close */}
      <div style={{
        position:'absolute', inset:0,
        background:'rgba(1,2,10,.88)',
        backdropFilter:'blur(10px)',
        opacity:show?1:0, transition:'opacity .3s ease',
        cursor:'pointer',
      }} onClick={onClose}/>

      {/* Modal card */}
      <div style={{
        position:'relative',
        width:'min(680px,96%)',
        maxHeight:'88vh',
        background:'rgba(5,8,22,.99)',
        border:`1px solid ${p.color}30`,
        boxShadow:`0 40px 120px rgba(0,0,0,.9), 0 0 0 1px ${p.color}15`,
        overflowY:'auto',
        opacity:show?1:0,
        transform:show?'scale(1) translateY(0)':'scale(.94) translateY(20px)',
        transition:'all .4s cubic-bezier(.22,1,.36,1)',
        display:'flex', flexDirection:'column',
      }}>

        {/* Color accent top */}
        <div style={{height:3, background:`linear-gradient(90deg,${p.color},${p.color}50,transparent)`, flexShrink:0}}/>

        {/* Header row */}
        <div style={{
          display:'flex', alignItems:'flex-start', justifyContent:'space-between',
          padding:'24px 28px 0',
        }}>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontFamily:mono, fontSize:9, letterSpacing:3.5, color:p.color, marginBottom:8}}>{p.type.toUpperCase()}</div>
            <h2 style={{fontFamily:disp, fontWeight:800, fontSize:'clamp(20px,2.8vw,28px)', color:'#FFFFFF', letterSpacing:-.4, lineHeight:1.1, margin:0}}>{p.title}</h2>
            <div style={{fontFamily:mono, fontSize:10, color:'rgba(160,185,255,.5)', marginTop:7, letterSpacing:.8}}>{p.venue}</div>
          </div>
          <button data-hover onClick={onClose} style={{
            width:34, height:34, flexShrink:0, marginLeft:16,
            background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.14)',
            color:'rgba(255,255,255,.6)', fontSize:16, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all .2s', pointerEvents:'auto',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.14)';e.currentTarget.style.color='#fff';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.06)';e.currentTarget.style.color='rgba(255,255,255,.6)';}}>
            ✕
          </button>
        </div>

        {/* Two-column body */}
        <div style={{display:'flex', gap:20, padding:'20px 28px 28px', flexWrap:'wrap'}}>

          {/* Left — viz + impact */}
          <div style={{flex:'0 0 clamp(180px,30%,240px)', display:'flex', flexDirection:'column', gap:12}}>
            {/* Viz */}
            <div style={{
              height:160, borderRadius:2, overflow:'hidden',
              background:`radial-gradient(ellipse 100% 100% at 50% 50%, ${p.color}0E 0%, transparent 70%)`,
              border:`1px solid ${p.color}20`,
              padding:'12px',
            }}>
              <V color={p.color}/>
            </div>

            {/* Impact */}
            <div style={{padding:'14px 16px', background:`${p.color}0C`, border:`1px solid ${p.color}30`}}>
              <div style={{fontFamily:mono, fontSize:7.5, letterSpacing:3, color:p.color, marginBottom:6, opacity:.65}}>KEY METRIC</div>
              <div style={{fontFamily:disp, fontWeight:700, fontSize:13.5, color:'#FFFFFF', lineHeight:1.45}}>{p.impact}</div>
            </div>

            {/* Tags */}
            <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
              {p.tags.map(t=>(
                <span key={t} style={{
                  fontFamily:mono, fontSize:8, letterSpacing:.5, padding:'3px 8px',
                  border:`1px solid ${p.color}28`, background:`${p.color}0E`, color:'rgba(210,225,255,.8)',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right — description + CTA */}
          <div style={{flex:1, minWidth:200, display:'flex', flexDirection:'column', gap:16}}>
            <p style={{fontFamily:body, fontSize:14, color:'rgba(210,225,255,.88)', lineHeight:1.85, margin:0}}>{p.abstract}</p>
            <a href={p.link} target="_blank" rel="noreferrer" data-hover style={{
              fontFamily:body, fontWeight:600, fontSize:12.5, letterSpacing:2,
              padding:'13px 20px', textAlign:'center', display:'block', marginTop:'auto',
              background:`${p.color}15`, border:`1px solid ${p.color}50`,
              color:'#FFFFFF', textDecoration:'none', transition:'all .25s',
              position:'relative', overflow:'hidden', pointerEvents:'auto',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}30`;e.currentTarget.style.boxShadow=`0 0 35px ${p.color}25`;}}
            onMouseLeave={e=>{e.currentTarget.style.background=`${p.color}15`;e.currentTarget.style.boxShadow='none';}}>
              VIEW ON GITHUB ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CARD — 2-col vertical grid, readable fonts
══════════════════════════════════════════════════════ */
function Card({ p, idx, onOpen }) {
  const V = VIZ[p.id] || RagViz;
  return (
    <div data-hover style={{
      display:'flex', flexDirection:'column',
      background:'rgba(3,6,16,.96)',
      border:'1px solid rgba(255,255,255,.08)',
      overflow:'hidden', cursor:'pointer',
      transition:'all .28s cubic-bezier(.22,1,.36,1)',
      animation:`slideUp .45s ${.06+idx*.06}s cubic-bezier(.22,1,.36,1) both`,
    }}
    onMouseEnter={e=>{
      e.currentTarget.style.borderColor=`${p.color}55`;
      e.currentTarget.style.transform='translateY(-4px)';
      e.currentTarget.style.boxShadow=`0 20px 55px rgba(0,0,0,.75), 0 0 0 1px ${p.color}22`;
    }}
    onMouseLeave={e=>{
      e.currentTarget.style.borderColor='rgba(255,255,255,.08)';
      e.currentTarget.style.transform='translateY(0)';
      e.currentTarget.style.boxShadow='none';
    }}
    onClick={()=>onOpen(idx)}>

      {/* Accent line */}
      <div style={{height:2.5, background:`linear-gradient(90deg,${p.color},${p.color}00)`, flexShrink:0}}/>

      {/* SVG banner */}
      <div style={{
        height:110, position:'relative', overflow:'hidden', flexShrink:0,
        background:`radial-gradient(ellipse 90% 90% at 50% 50%, ${p.color}0C 0%, transparent 70%)`,
      }}>
        <div style={{position:'absolute', inset:'10px 12px'}}><V color={p.color}/></div>
        {/* Type badge */}
        <div style={{
          position:'absolute', top:9, left:11,
          fontFamily:mono, fontSize:8, letterSpacing:2,
          padding:'3px 8px', background:`${p.color}1E`, border:`1px solid ${p.color}35`, color:p.color,
        }}>{p.type.toUpperCase()}</div>
        {/* Number watermark */}
        <div style={{
          position:'absolute', top:2, right:10,
          fontFamily:disp, fontWeight:900, fontSize:42,
          color:p.color, opacity:.055, lineHeight:1, pointerEvents:'none', userSelect:'none',
        }}>{String(idx+1).padStart(2,'0')}</div>
      </div>

      {/* Text */}
      <div style={{padding:'16px 18px 18px', display:'flex', flexDirection:'column', gap:10}}>

        {/* Title — readable size */}
        <h3 style={{
          fontFamily:disp, fontWeight:700,
          fontSize:17, letterSpacing:-.25, lineHeight:1.22,
          color:'#FFFFFF', margin:0,
        }}>{p.title}</h3>

        {/* Stack pills */}
        <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
          {p.venue.split('·').slice(0,3).map(s=>(
            <span key={s} style={{
              fontFamily:mono, fontSize:8.5, letterSpacing:.4,
              padding:'2px 8px',
              background:'rgba(255,255,255,.055)', border:'1px solid rgba(255,255,255,.1)',
              color:'rgba(185,205,255,.7)',
            }}>{s.trim()}</span>
          ))}
        </div>

        {/* Impact */}
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          padding:'9px 12px',
          background:`${p.color}0D`, border:`1px solid ${p.color}2A`,
        }}>
          <div style={{width:5, height:5, borderRadius:'50%', background:p.color, boxShadow:`0 0 7px ${p.color}`, flexShrink:0}}/>
          <span style={{fontFamily:mono, fontSize:9.5, color:'#FFFFFF', letterSpacing:.3, lineHeight:1.4}}>{p.impact}</span>
        </div>

        {/* Actions */}
        <div style={{display:'flex', gap:8}}>
          <button data-hover onClick={e=>{e.stopPropagation();onOpen(idx);}} style={{
            flex:1, fontFamily:mono, fontSize:8.5, letterSpacing:2,
            padding:'8px 10px',
            background:'rgba(255,255,255,.055)', border:'1px solid rgba(255,255,255,.13)',
            color:'rgba(255,255,255,.78)', cursor:'pointer', transition:'all .2s', pointerEvents:'auto',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.13)';e.currentTarget.style.color='#fff';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.055)';e.currentTarget.style.color='rgba(255,255,255,.78)';}}>
            DETAILS
          </button>
          <a href={p.link} target="_blank" rel="noreferrer" data-hover onClick={e=>e.stopPropagation()} style={{
            fontFamily:mono, fontSize:8.5, letterSpacing:2, padding:'8px 12px',
            background:`${p.color}16`, border:`1px solid ${p.color}48`,
            color:'#FFFFFF', textDecoration:'none', transition:'all .2s', pointerEvents:'auto',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}32`;}}
          onMouseLeave={e=>{e.currentTarget.style.background=`${p.color}16`;}}>
            GH ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */
export function SystemsContent({ vis }) {
  const [open, setOpen] = useState(null);
  if (!vis) return null;

  return (
    <div style={{
      position:'absolute', top:58, left:0, right:0, bottom:40,
      overflowY:'auto', overflowX:'hidden',
      pointerEvents:'auto',
    }}>
      <div style={{padding:'14px 5% 28px'}}>

        {/* Header */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          marginBottom:16,
          animation:'slideUp .4s .04s cubic-bezier(.22,1,.36,1) both',
        }}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:20, height:1.5, background:'#7B2FFF'}}/>
            <span style={{fontFamily:mono, fontSize:9, letterSpacing:4, color:'#7B2FFF'}}>PROJECTS</span>
            <h2 style={{fontFamily:disp, fontWeight:800, fontSize:'clamp(17px,2vw,22px)', color:'#FFFFFF', letterSpacing:-.4, margin:0}}>
              What I've <span style={{color:'#7B2FFF'}}>Built</span>
            </h2>
          </div>
          <span style={{fontFamily:disp, fontWeight:900, fontSize:26, color:'rgba(123,47,255,.1)', letterSpacing:-1}}>
            {String(research.length).padStart(2,'0')}
          </span>
        </div>

        {/* 2-col grid */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12}}>
          {research.map((p,i)=><Card key={p.id} p={p} idx={i} onOpen={setOpen}/>)}
        </div>
      </div>

      {/* Centered modal overlay */}
      {open !== null && <Modal p={research[open]} onClose={()=>setOpen(null)}/>}
    </div>
  );
}

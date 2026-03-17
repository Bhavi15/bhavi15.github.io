import { useState, useEffect, useRef, useCallback } from 'react';

const mono = "'JetBrains Mono','Fira Code',monospace";
const disp = "'Syne',sans-serif";
const sans = "'Space Grotesk','Inter',sans-serif";

function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random()-.5)*.22, vy: (Math.random()-.5)*.22,
      r: .7 + Math.random()*1.2,
      phase: Math.random()*Math.PI*2,
      cyan: Math.random() > .4,
    }));

    const draw = () => {
      const W = c.width, H = c.height, cx = W/2, cy = H/2;
      ctx.fillStyle = 'rgba(11,15,26,0.4)';
      ctx.fillRect(0,0,W,H);

      const bloom = ctx.createRadialGradient(cx,cy*.88,0,cx,cy*.88,Math.min(W,H)*.52);
      bloom.addColorStop(0,  'rgba(99,179,237,0.05)');
      bloom.addColorStop(.6, 'rgba(60,90,180,0.02)');
      bloom.addColorStop(1,  'rgba(0,0,0,0)');
      ctx.fillStyle = bloom; ctx.fillRect(0,0,W,H);

      pts.forEach((n,i) => {
        n.x+=n.vx; n.y+=n.vy; n.phase+=.008;
        if(n.x<0||n.x>W) n.vx*=-1;
        if(n.y<0||n.y>H) n.vy*=-1;
        for(let j=i+1;j<pts.length;j++){
          const m=pts[j], ed=Math.hypot(n.x-m.x,n.y-m.y);
          if(ed>115) continue;
          ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(m.x,m.y);
          ctx.strokeStyle=`rgba(99,179,237,${(1-ed/115)*.08})`;
          ctx.lineWidth=.4; ctx.stroke();
        }
        const p=.5+.5*Math.sin(n.phase);
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
        ctx.fillStyle=n.cyan?`rgba(99,179,237,${.15+p*.18})`:`rgba(100,120,220,${.1+p*.12})`;
        ctx.fill();
      });

      const vig=ctx.createRadialGradient(cx,cy,Math.min(W,H)*.2,cx,cy,Math.min(W,H)*.88);
      vig.addColorStop(0,'rgba(11,15,26,0)');
      vig.addColorStop(1,'rgba(11,15,26,.72)');
      ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);

      raf=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',resize); };
  },[]);
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>;
}

function Typewriter({text,active,speed=55}) {
  const [n,setN]=useState(0);
  const [blink,setBlink]=useState(true);
  useEffect(()=>{
    if(!active) return; setN(0);
    const id=setInterval(()=>setN(c=>{if(c>=text.length){clearInterval(id);return c;}return c+1;}),speed);
    return()=>clearInterval(id);
  },[active,text,speed]);
  useEffect(()=>{const id=setInterval(()=>setBlink(v=>!v),520);return()=>clearInterval(id);},[]);
  return <span>{text.slice(0,n)}{n<text.length&&<span style={{opacity:blink?1:0,color:'#63B3ED',transition:'opacity .12s'}}>|</span>}</span>;
}

export default function LoadScreen({onDone}) {
  const [ph,setPh]=useState(0);
  const [leaving,setLeaving]=useState(false);
  const [prog,setProg]=useState(0);
  const [label,setLabel]=useState('INITIALIZING');
  const [ready,setReady]=useState(false);
  const fired=useRef(false);

  const STEPS=[
    {p:20,l:'LOADING MODELS'},
    {p:42,l:'INDEXING PROJECTS'},
    {p:63,l:'BUILDING CONTEXT'},
    {p:80,l:'CONNECTING APIS'},
    {p:95,l:'ALMOST READY'},
    {p:100,l:'SYSTEM READY'},
  ];

  useEffect(()=>{
    const T=[[80,()=>setPh(1)],[350,()=>setPh(2)],[680,()=>setPh(3)],[1050,()=>setPh(4)],[1800,()=>setPh(5)],[2000,()=>setReady(true)]];
    const ids=T.map(([ms,fn])=>setTimeout(fn,ms));
    return()=>ids.forEach(clearTimeout);
  },[]);

  useEffect(()=>{
    if(ph<3) return; let i=0;
    const tick=()=>{if(i>=STEPS.length)return;setProg(STEPS[i].p);setLabel(STEPS[i].l);i++;if(i<STEPS.length)setTimeout(tick,140);};
    tick();
  },[ph]); // eslint-disable-line

  const doEnter=useCallback(()=>{
    if(!ready||fired.current)return;
    fired.current=true; setLeaving(true);
    setTimeout(onDone,700);
  },[ready,onDone]);

  useEffect(()=>{
    const h=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();doEnter();}};
    window.addEventListener('keydown',h); return()=>window.removeEventListener('keydown',h);
  },[doEnter]);

  const v=p=>ph>=p;

  return (
    <div onClick={doEnter} style={{
      position:'fixed',inset:0,zIndex:99999,
      background:'#0B0F1A',
      display:'flex',alignItems:'center',justifyContent:'center',
      overflow:'hidden',cursor:ready?'pointer':'default',
      opacity:leaving?0:1,transition:leaving?'opacity .7s ease':'none',
    }}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 50% 44%,#0f1828 0%,#0B0F1A 65%)'}}/>

      <ParticleCanvas/>

      {/* corner brackets */}
      {[{t:20,l:20},{t:20,r:20},{b:20,l:20},{b:20,r:20}].map((pos,i)=>(
        <div key={i} style={{
          position:'absolute',
          top:pos.t,right:pos.r,bottom:pos.b,left:pos.l,
          width:20,height:20,
          borderTop:    pos.t!==undefined?'1.5px solid rgba(99,179,237,.4)':'none',
          borderBottom: pos.b!==undefined?'1.5px solid rgba(99,179,237,.4)':'none',
          borderLeft:   pos.l!==undefined?'1.5px solid rgba(99,179,237,.4)':'none',
          borderRight:  pos.r!==undefined?'1.5px solid rgba(99,179,237,.4)':'none',
          opacity:v(1)?1:0,transition:'opacity .6s ease',pointerEvents:'none',
        }}/>
      ))}

      {/* centre card */}
      <div style={{
        position:'relative',zIndex:10,
        display:'flex',flexDirection:'column',alignItems:'center',
        textAlign:'center',padding:'0 24px',
        opacity:v(2)?1:0,transform:v(2)?'translateY(0)':'translateY(16px)',
        transition:'opacity .6s ease,transform .7s cubic-bezier(.22,1,.36,1)',
      }}>

        {/* icon */}
        <div style={{
          width:68,height:68,borderRadius:'50%',
          background:'linear-gradient(135deg,#13203a,#1a2e50)',
          border:'1.5px solid rgba(99,179,237,.45)',
          boxShadow:'0 0 30px rgba(99,179,237,.15)',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:28,marginBottom:24,
          opacity:v(1)?1:0,transform:v(1)?'scale(1)':'scale(.3)',
          transition:'all .8s cubic-bezier(.34,1.56,.64,1)',
        }}>🤖</div>

        {/* name */}
        <div style={{fontFamily:disp,fontWeight:800,fontSize:'clamp(28px,4vw,48px)',letterSpacing:6,color:'#EDF2F7',lineHeight:1,marginBottom:10}}>
          {v(3)&&<Typewriter text="BHAVISHA PATEL" active={v(3)}/>}
        </div>

        {/* role */}
        <div style={{fontFamily:mono,fontSize:11,letterSpacing:4,color:'rgba(99,179,237,.75)',marginBottom:8,opacity:v(3)?1:0,transition:'opacity .5s .2s ease'}}>
          GENAI DEVELOPER · ML ENGINEER
        </div>

        {/* tagline */}
        <div style={{fontFamily:sans,fontSize:13,color:'rgba(226,232,240,.5)',marginBottom:38,maxWidth:360,lineHeight:1.6,opacity:v(4)?1:0,transition:'opacity .5s .1s ease'}}>
          AI-powered portfolio — ask me anything
        </div>

        {/* progress */}
        <div style={{width:'clamp(220px,28vw,300px)',marginBottom:34,opacity:v(3)?1:0,transition:'opacity .5s ease'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:7}}>
            <span style={{fontFamily:mono,fontSize:8.5,letterSpacing:1.5,color:prog===100?'rgba(104,211,145,.9)':'rgba(99,179,237,.7)'}}>{prog===100?'✓ ':''}{label}</span>
            <span style={{fontFamily:mono,fontSize:8.5,color:'rgba(255,255,255,.25)'}}>{prog}%</span>
          </div>
          <div style={{height:2,background:'rgba(255,255,255,.07)',borderRadius:2,overflow:'hidden'}}>
            <div style={{height:'100%',width:`${prog}%`,background:'linear-gradient(90deg,rgba(60,100,200,.8),#63B3ED)',boxShadow:'0 0 6px rgba(99,179,237,.5)',transition:'width .3s ease'}}/>
          </div>
        </div>

        {/* enter */}
        <div style={{opacity:v(5)?1:0,transform:v(5)?'translateY(0)':'translateY(10px)',transition:'all .6s cubic-bezier(.22,1,.36,1)'}}>
          <button onClick={e=>{e.stopPropagation();doEnter();}} style={{
            fontFamily:sans,fontWeight:600,fontSize:12,letterSpacing:4,
            padding:'13px 50px',borderRadius:10,
            background:'rgba(99,179,237,.1)',color:'rgba(237,242,247,.9)',
            border:'1px solid rgba(99,179,237,.4)',cursor:ready?'pointer':'default',
            transition:'all .25s ease',outline:'none',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(99,179,237,.18)';e.currentTarget.style.borderColor='rgba(99,179,237,.7)';e.currentTarget.style.boxShadow='0 0 24px rgba(99,179,237,.2)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(99,179,237,.1)';e.currentTarget.style.borderColor='rgba(99,179,237,.4)';e.currentTarget.style.boxShadow='none';}}>
            ENTER PORTFOLIO
          </button>
          <div style={{fontFamily:mono,fontSize:8,color:'rgba(255,255,255,.2)',marginTop:12,letterSpacing:1}}>
            press ENTER or click anywhere
          </div>
        </div>
      </div>

      {/* bottom status */}
      <div style={{position:'absolute',bottom:22,left:0,right:0,textAlign:'center',opacity:v(4)?1:0,transition:'opacity .5s ease',pointerEvents:'none'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:7}}>
          <div style={{width:6,height:6,borderRadius:'50%',background:'#68D391',boxShadow:'0 0 8px rgba(104,211,145,.6)',animation:'pulse 2s ease infinite'}}/>
          <span style={{fontFamily:mono,fontSize:8,letterSpacing:2,color:'rgba(104,211,145,.75)'}}>OPEN TO AI/ML ENGINEER ROLES</span>
        </div>
      </div>
    </div>
  );
}

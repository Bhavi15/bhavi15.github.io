import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: -300, y: -300 });
  const smooth   = useRef({ x: -300, y: -300 });
  const hov      = useRef(false);
  const clicking = useRef(false);
  const raf      = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const isHov = !!e.target.closest('button,a,[data-hover],input,textarea,select');
      hov.current = isHov;
      if (dotRef.current) {
        dotRef.current.style.background = isHov ? '#00FF88' : '#00D4FF';
        dotRef.current.style.boxShadow  = isHov ? '0 0 10px #00FF88' : '0 0 10px #00D4FF';
      }
    };
    const onDown = () => {
      clicking.current = true;
      if (ringRef.current) ringRef.current.style.transform = ringRef.current.style.transform.replace(/scale\([^)]+\)/, '') + ' scale(0.7)';
    };
    const onUp = () => {
      clicking.current = false;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    const animate = () => {
      const lerpFactor = 0.1;
      smooth.current.x += (pos.current.x - smooth.current.x) * lerpFactor;
      smooth.current.y += (pos.current.y - smooth.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x - 3}px`;
        dotRef.current.style.top  = `${pos.current.y - 3}px`;
      }
      if (ringRef.current) {
        const scale = clicking.current ? 0.7 : hov.current ? 1.6 : 1;
        ringRef.current.style.left      = `${smooth.current.x - 20}px`;
        ringRef.current.style.top       = `${smooth.current.y - 20}px`;
        ringRef.current.style.transform = `scale(${scale})`;
        ringRef.current.style.borderColor = hov.current ? 'rgba(0,255,136,0.7)' : 'rgba(0,212,255,0.6)';
      }
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []); // ← stable, runs once only

  return (
    <>
      {/* Dot — exact cursor position */}
      <div ref={dotRef} style={{
        position: 'fixed', zIndex: 99999,
        width: 6, height: 6, borderRadius: '50%',
        background: '#00D4FF', boxShadow: '0 0 10px #00D4FF',
        pointerEvents: 'none',
        top: -300, left: -300,
      }} />
      {/* Ring — smoothly follows */}
      <div ref={ringRef} style={{
        position: 'fixed', zIndex: 99998,
        width: 40, height: 40, borderRadius: '50%',
        border: '1.5px solid rgba(0,212,255,0.6)',
        pointerEvents: 'none',
        top: -300, left: -300,
        transition: 'border-color 0.15s, transform 0.12s ease-out',
      }} />
    </>
  );
}

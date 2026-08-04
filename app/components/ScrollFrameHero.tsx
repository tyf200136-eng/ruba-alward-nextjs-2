'use client';

import { useEffect, useRef, useState } from 'react';

// عدد الفريمات المستخرجة من الفيديو (12fps × 10 ثواني)
const FRAME_COUNT = 120;
const FRAME_PATH = (i: number) =>
  `/hero-frames/frame_${(i + 1).toString().padStart(4, '0')}.jpg`;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export default function ScrollFrameHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const [ready, setReady] = useState(false);

  // 1) تحميل كل الفريمات مقدمًا
  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === FRAME_COUNT) setReady(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // 2) رسم فريم معيّن على الكانفاس (object-cover)
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const canvasRatio = cw / ch;
    const imgRatio = img.width / img.height;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;

    if (imgRatio > canvasRatio) {
      sh = img.height;
      sw = sh * canvasRatio;
      sx = (img.width - sw) / 2;
    } else {
      sw = img.width;
      sh = sw / canvasRatio;
      sy = (img.height - sh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  };

  // 3) ربط السكرول بالفريم المستهدف + حلقة rAF بتنعيم (lerp)
  useEffect(() => {
    if (!ready) return;

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const progress = clamp(-rect.top / Math.max(scrollable, 1), 0, 1);
      targetFrameRef.current = progress * (FRAME_COUNT - 1);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    drawFrame(0);

    const tick = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const next = current + (target - current) * 0.22; // smoothing factor
      currentFrameRef.current = next;
      drawFrame(Math.round(next));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready]);

  return (
    <div id="hero-track" ref={containerRef} className="relative z-10 h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className={`h-full w-full transition-opacity duration-200 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(10,5,5,.45), rgba(10,5,5,0) 45%), linear-gradient(to bottom, rgba(10,5,5,.3), rgba(10,5,5,0) 30%)',
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 pointer-events-none">
          <p className="text-sm tracking-widest opacity-80 mb-3">الشفا · الطائف</p>
          <h1 className="font-display font-bold text-4xl md:text-6xl">منتجع ربى الورد</h1>
          <p className="mt-4 max-w-xl text-white/85">
            بين مزارع الورد الطائفي وقمم جبال الشفا
          </p>
          <div className="flex gap-4 mt-9 pointer-events-auto">
            <a
              href="#booking"
              className="bg-rose text-white px-7 py-3.5 rounded-full font-bold text-[15px] hover:bg-roseDeep transition-colors"
            >
              احجز إقامتك
            </a>
            <a
              href="#rooms"
              className="border border-white/55 text-white px-7 py-3.5 rounded-full font-bold text-[15px] hover:bg-white/10 transition-colors"
            >
              استكشف الغرف
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
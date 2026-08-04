'use client';

import { useEffect, useMemo, useState } from 'react';

/**
 * تساقط بتلات ورد خفيف وطبيعي — طبقة واحدة عامة، ثابتة الشاشة (fixed)،
 * بـ z-index واطي جدًا. المحتوى (الأقسام) لازم يكون عنده z-index أعلى
 * صراحة (relative + z-10 مثلًا) عشان يترسم فوقها دايمًا بغض النظر عن
 * ترتيب الكود.
 *
 * أنيميشن CSS بحت (لا JS بكل فريم)، ويحترم prefers-reduced-motion،
 * ويقلّل العدد على الموبايل.
 */
export default function FallingPetals() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCount(0);
      return;
    }
    const w = window.innerWidth;
    if (w < 480) setCount(8);
    else if (w < 900) setCount(12);
    else setCount(18);
  }, []);

  const petals = useMemo(() => {
    const tints = ['#F6D3DE', '#EFC0CE', '#E8A9BC', '#F3E1E7'];
    return Array.from({ length: count }).map((_, i) => {
      const size = 12 + Math.random() * 16; // 12–28px
      const left = Math.random() * 100;
      const duration = 16 + Math.random() * 18; // 16–34s
      const delay = -Math.random() * duration; // سالب = تبدأ بنص الرحلة
      const sway = 30 + Math.random() * 50;
      const swayDur = 4 + Math.random() * 4;
      const rotDur = 6 + Math.random() * 8;
      const opacity = 0.3 + Math.random() * 0.3;
      const tint = tints[i % tints.length];
      return { size, left, duration, delay, sway, swayDur, rotDur, opacity, tint, i };
    });
  }, [count]);

  if (count === 0) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      <style>{`
        @keyframes petal-fall {
          0%   { transform: translate3d(0, -10vh, 0); }
          100% { transform: translate3d(0, 110vh, 0); }
        }
        @keyframes petal-sway {
          0%, 100% { transform: translate3d(calc(var(--sway) * -1), 0, 0); }
          50%      { transform: translate3d(var(--sway), 0, 0); }
        }
        @keyframes petal-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .petal-fall { will-change: transform; animation: petal-fall linear infinite; }
        .petal-sway { will-change: transform; animation: petal-sway ease-in-out infinite alternate; }
        .petal-spin { will-change: transform; animation: petal-spin linear infinite; }
      `}</style>
      {petals.map((p) => (
        <div
          key={p.i}
          className="petal-fall absolute top-0"
          style={{ left: `${p.left}%`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}
        >
          <div
            className="petal-sway"
            style={{ ['--sway' as any]: `${p.sway}px`, animationDuration: `${p.swayDur}s` }}
          >
            <div className="petal-spin" style={{ animationDuration: `${p.rotDur}s` }}>
              <div
                style={{
                  width: `${p.size}px`,
                  height: `${p.size * 1.6}px`,
                  borderRadius: '100% 0 100% 0',
                  background: `radial-gradient(ellipse at 30% 30%, ${p.tint}, ${p.tint}00 75%), linear-gradient(135deg, ${p.tint}, #AD3A5B)`,
                  opacity: p.opacity,
                  filter: 'blur(0.5px)',
                  boxShadow: '0 2px 6px rgba(122,30,60,0.12)',
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
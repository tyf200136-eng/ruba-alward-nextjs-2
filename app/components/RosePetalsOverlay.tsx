'use client';

import { useEffect, useRef, useState } from 'react';

const PETAL_COUNT = 18;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type Petal = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  rotateStart: number;
  gradientFrom: string;
  gradientTo: string;
};

const PALETTES = [
  { from: '#F6D3DE', to: '#AD3A5B' }, // وردي فاتح → وردي غامق
  { from: '#FBE6EC', to: '#C65478' }, // وردي فاتح جدًا → وردي متوسط
  { from: '#EFC0CE', to: '#7E2740' }, // وردي مزهر → وردي عميق
];

/**
 * يغلّف مجموعة أقسام، ويضيف طبقة تساقط ورد خفيفة (ثابتة على الشاشة)
 * تظهر فقط أثناء وجود أي جزء من الأقسام المغلّفة داخل الشاشة.
 *
 * ملاحظة: كل الألوان والأشكال هنا inline style عمدًا (بدون كلاسات
 * Tailwind مخصصة) لتفادي أي مشكلة بقراءة ثيم الألوان أو الصيغ الحرة.
 */
export default function RosePetalsOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: PETAL_COUNT }).map((_, i) => {
      const palette = PALETTES[i % PALETTES.length];
      return {
        id: i,
        left: rand(2, 96),
        size: rand(20, 38),
        duration: rand(12, 22),
        delay: rand(-20, 0),
        drift: rand(-60, 60),
        opacity: rand(0.5, 0.8),
        rotateStart: rand(0, 360),
        gradientFrom: palette.from,
        gradientTo: palette.to,
      };
    });
    setPetals(generated);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {children}

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity .7s ease',
        }}
      >
        {petals.map((p) => (
          <span
            key={p.id}
            className="petal"
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: '-6%',
              width: p.size,
              height: p.size * 1.15,
              opacity: p.opacity,
              filter: 'drop-shadow(0 2px 4px rgba(122,30,60,0.3))',
              animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
              ['--drift' as any]: `${p.drift}px`,
              ['--rotate-start' as any]: `${p.rotateStart}deg`,
            }}
          >
            <svg
              viewBox="0 0 24 28"
              width="100%"
              height="100%"
              style={{ display: 'block' }}
            >
              <defs>
                <radialGradient id={`petal-grad-${p.id}`} cx="35%" cy="25%" r="75%">
                  <stop offset="0%" stopColor={p.gradientFrom} />
                  <stop offset="100%" stopColor={p.gradientTo} />
                </radialGradient>
              </defs>
              {/* شكل بتلة: مدببة من فوق، تتّسع وتستدير من تحت — زي بتلة ورد حقيقية */}
              <path
                d="M12 1C7.5 5 3 11 3 17c0 6 4 10 9 10s9-4 9-10c0-6-4.5-12-9-16z"
                fill={`url(#petal-grad-${p.id})`}
              />
              {/* خط عرق خفيف بمنتصف البتلة */}
              <path
                d="M12 4C12 4 12 20 12 25"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.6"
                fill="none"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
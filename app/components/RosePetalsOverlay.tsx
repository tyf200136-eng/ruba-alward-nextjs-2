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
  color: string;
};

const COLORS = ['#AD3A5B', '#D98FA6'];

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
    const generated = Array.from({ length: PETAL_COUNT }).map((_, i) => ({
      id: i,
      left: rand(2, 96),
      size: rand(18, 34),
      duration: rand(12, 22),
      delay: rand(-20, 0),
      drift: rand(-60, 60),
      opacity: rand(0.45, 0.75),
      color: COLORS[i % COLORS.length],
    }));
    setPetals(generated);
    // eslint-disable-next-line no-console
    console.log('[RosePetalsOverlay] generated petals:', generated.length);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        // eslint-disable-next-line no-console
        console.log('[RosePetalsOverlay] visible:', entry.isIntersecting);
      },
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
              height: p.size * 0.8,
              opacity: p.opacity,
              backgroundColor: p.color,
              borderRadius: '60% 40% 60% 40%',
              boxShadow: '0 2px 6px rgba(122,30,60,0.35)',
              animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
              ['--drift' as any]: `${p.drift}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
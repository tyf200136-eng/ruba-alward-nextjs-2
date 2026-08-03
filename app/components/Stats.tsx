'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollFillHeading from './ScrollFillHeading';

const STATS = [
  {
    value: '20',
    label: 'غرفة وجناح',
    desc: 'بوتيك حصري، مصمم بالكامل ليطل على الورد والجبل.',
    accent: false,
  },
  {
    value: '4.9/5',
    label: 'تقييم الضيوف',
    desc: 'بناءً على تقييمات النزلاء خلال الموسم الماضي.',
    accent: true,
  },
  {
    value: '7 دقائق',
    label: 'من مزرعة الورد',
    desc: 'أقرب مزرعة ورد طائفي على بعد دقائق بالسيارة فقط.',
    accent: false,
  },
];

export default function Stats() {
  // هذا الـ container أطول من الشاشة عشان يعطي مسافة "pinning"
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // الكروت تظهر بالتتابع (stagger) خلال أول 60% من مسافة التثبيت
  const opacities = STATS.map((_, i) =>
    useTransform(
      scrollYProgress,
      [i * 0.15, i * 0.15 + 0.25],
      [0, 1]
    )
  );
  const translateYs = STATS.map((_, i) =>
    useTransform(
      scrollYProgress,
      [i * 0.15, i * 0.15 + 0.25],
      [24, 0]
    )
  );

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative bg-bgSoft"
      style={{ height: '180vh' }} // مسافة السكرول اللي يبقى فيها القسم مثبتًا
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-[1180px] mx-auto px-7 w-full">
          <div className="max-w-xl mb-14">
            <span className="inline-flex items-center gap-2 text-[13px] font-bold text-roseDeep bg-roseSofter border border-roseSoft px-4 py-1.5 rounded-full mb-4">
              ❀ بالأرقام
            </span>
            <ScrollFillHeading text="منتجع صغير، تفاصيل كبيرة" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                style={{ opacity: opacities[i], y: translateYs[i] }}
                className={`relative bg-white border border-line rounded-[22px] p-8 shadow-[0_20px_50px_-25px_rgba(60,20,30,.35)] ${
                  s.accent ? 'md:-translate-y-3' : ''
                }`}
              >
                {s.accent && (
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-rose" />
                )}
                <div className="font-display font-bold text-4xl md:text-5xl text-roseDeep">
                  {s.value}
                </div>
                <div className="text-lg font-bold mt-2">{s.label}</div>
                <p className="text-inkSoft text-sm mt-2">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

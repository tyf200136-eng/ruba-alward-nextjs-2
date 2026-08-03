'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * عنوان يتحول تدريجيًا من رمادي فاتح إلى داكن كلما اقترب من
 * منتصف الشاشة أثناء السكرول (نفس تأثير lagom-development.com)
 *
 * الاستخدام:
 * <ScrollFillHeading text="غرف وأجنحة مطلّة على الورد" />
 */
export default function ScrollFillHeading({
  text,
  className = '',
  dark = false, // فعّلها لو الخلفية داكنة (زي قسم الحجز)
}: {
  text: string;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  // "start end" → "center center" → "end start": يدخل، يتوسط، يطلع
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'center center', 'end 0.15'],
  });

  // على خلفية بيضاء: رمادي فاتح -> داكن -> رمادي فاتح
  // على خلفية داكنة: رمادي معتم -> أبيض -> رمادي معتم
  const color = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    dark
      ? ['rgba(255,255,255,0.25)', '#FFFFFF', 'rgba(255,255,255,0.25)']
      : ['#C9BFBB', '#241B1D', '#C9BFBB']
  );

  return (
    <motion.h2
      ref={ref}
      style={{ color }}
      className={`font-display font-bold text-3xl md:text-[42px] leading-tight ${className}`}
    >
      {text}
    </motion.h2>
  );
}

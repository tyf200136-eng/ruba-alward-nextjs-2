'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import ScrollFillHeading from './ScrollFillHeading';

type Room = {
  img: string;
  title: string;
  desc: string;
  amenities: string[];
  price: number;
  tag?: string;
};

const ROOMS: Room[] = [
  {
    img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80&auto=format&fit=crop',
    title: 'غرفة ديلوكس — إطلالة الورد',
    desc: 'غرفة واسعة بشرفة خاصة تطل مباشرة على حديقة الورد الداخلية، بفراش فندقي فاخر وإضاءة دافئة.',
    amenities: ['شرفة خاصة', 'إفطار مجاني', '32م²'],
    price: 750,
  },
  {
    img: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=900&q=80&auto=format&fit=crop',
    title: 'جناح الشفا العائلي',
    desc: 'جناح بغرفتي نوم وصالة مستقلة، مثالي للعائلات، مع منطقة جلوس تطل على جبال الشفا الضبابية.',
    amenities: ['غرفتا نوم', 'صالة خاصة', '55م²'],
    price: 980,
  },
  {
    img: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=900&q=80&auto=format&fit=crop',
    title: 'جناح ربى الورد الفاخر',
    desc: 'أكبر أجنحتنا، بمدخل خاص وجاكوزي وإطلالة بانورامية على المزرعة والجبل معًا.',
    amenities: ['جاكوزي', 'مدخل خاص', '78م²'],
    price: 1450,
  },
];

type Rect = { x: number; y: number; w: number; h: number };

// أثناء التجمّع: زوايا ميلان + إزاحة بسيطة داخل نقطة الإرساء (يسار الشاشة)
const CLUSTER_ROTATE = [-9, 4, 11];
const CLUSTER_DX = [-16, 8, 30];
const CLUSTER_DY = [12, -10, 18];

/** الصورة المسافرة: تبدأ فوق التجمّع، وتنتهي بالضبط فوق الإطار المخصص لها */
function TravelingImage({
  room,
  index,
  progress,
  origin,
  target,
  measured,
}: {
  room: (typeof ROOMS)[number];
  index: number;
  progress: MotionValue<number>;
  origin: Rect;
  target: Rect;
  measured: boolean;
}) {
  const x = useTransform(
    progress,
    [0.12, 0.62],
    [origin.x + CLUSTER_DX[index], target.x]
  );
  const y = useTransform(
    progress,
    [0.12, 0.62],
    [origin.y + CLUSTER_DY[index], target.y]
  );
  const rotate = useTransform(progress, [0.12, 0.62], [CLUSTER_ROTATE[index], 0]);

  const w = target.w || origin.w || 220;
  const h = target.h || origin.h || 180;

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        width: w,
        height: h,
        zIndex: 50 - index,
        opacity: measured ? 1 : 0,
      }}
      className="absolute top-0 left-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(60,20,30,.45)] border-[3px] border-white"
    >
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${room.img})` }}
      />
      {room.tag && (
        <span className="absolute top-3 right-3 bg-white/92 text-roseDeep text-[10px] font-bold px-2.5 py-1 rounded-full">
          {room.tag}
        </span>
      )}
    </motion.div>
  );
}

/** الوصف + السعر + الزر تحت كل إطار — يظهر بعد ما توصل الصورة تقريبًا */
function RoomText({
  room,
  progress,
}: {
  room: (typeof ROOMS)[number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0.55, 0.85], [0, 1]);
  const y = useTransform(progress, [0.55, 0.85], [14, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <h3 className="text-lg font-display font-bold mb-1.5">{room.title}</h3>
      <p className="text-inkSoft text-[13px] leading-relaxed">{room.desc}</p>
      <div className="flex gap-2 mt-3 flex-wrap">
        {room.amenities.map((a) => (
          <span
            key={a}
            className="text-[11px] bg-roseSofter text-roseDeep px-2.5 py-1 rounded-full font-medium"
          >
            {a}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-dashed border-line">
        <div className="font-display font-bold text-xl text-roseDeep">
          {room.price}{' '}
          <small className="font-body text-[12px] text-inkSoft font-normal">
            ﷼ / لليلة
          </small>
        </div>
      </div>
      <a
        href="#booking"
        className="mt-3.5 block w-full text-center py-2.5 rounded-xl bg-ink text-white font-bold text-[13px] hover:bg-rose transition-colors"
      >
        احجز هذه الغرفة
      </a>
    </motion.div>
  );
}

export default function Rooms() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clusterAnchorRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isDesktop, setIsDesktop] = useState(false);
  const [measured, setMeasured] = useState(false);
  const [origin, setOrigin] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const [targets, setTargets] = useState<Rect[]>([
    { x: 0, y: 0, w: 0, h: 0 },
    { x: 0, y: 0, w: 0, h: 0 },
    { x: 0, y: 0, w: 0, h: 0 },
  ]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const measure = () => {
      const container = containerRef.current;
      const anchor = clusterAnchorRef.current;
      if (!container || !anchor) return;
      const cRect = container.getBoundingClientRect();
      const aRect = anchor.getBoundingClientRect();

      setOrigin({
        x: aRect.left - cRect.left,
        y: aRect.top - cRect.top,
        w: aRect.width,
        h: aRect.height,
      });

      setTargets(
        frameRefs.current.map((el) => {
          if (!el) return { x: 0, y: 0, w: 0, h: 0 };
          const r = el.getBoundingClientRect();
          return {
            x: r.left - cRect.left,
            y: r.top - cRect.top,
            w: r.width,
            h: r.height,
          };
        })
      );
      setMeasured(true);
    };

    measure();
    const t = setTimeout(measure, 60);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.22], [0, -36]);

  const secondHeadingOpacity = useTransform(scrollYProgress, [0.14, 0.32], [0, 1]);
  const secondHeadingY = useTransform(scrollYProgress, [0.14, 0.32], [20, 0]);

  const framesOpacity = useTransform(scrollYProgress, [0.05, 0.28], [0, 1]);
  const framesY = useTransform(scrollYProgress, [0.05, 0.28], [26, 0]);

  return (
    <section
      id="rooms"
      ref={sectionRef}
      className="bg-bgSoft/60 relative z-10"
      style={{ height: isDesktop ? '340vh' : 'auto' }}
    >
      <div
        className={
          isDesktop
            ? 'sticky top-0 h-screen overflow-hidden flex items-center'
            : 'py-28'
        }
      >
        <div
          ref={containerRef}
          className="max-w-[1180px] mx-auto px-7 w-full relative"
        >
          {isDesktop ? (
            <div className="flex flex-col">
              {/* منطقة العنوان: تلاشي متبادل بنفس المساحة (بدون فراغ) */}
              <div className="relative h-44 shrink-0">
                {/* العنوان الأول — يختفي مع بداية السكرول */}
                <motion.div
                  style={{ opacity: headingOpacity, y: headingY }}
                  className="absolute inset-0 flex items-start justify-between gap-10"
                >
                  <div className="max-w-md">
                    <span className="inline-flex items-center gap-2 text-[13px] font-bold text-roseDeep bg-roseSofter border border-roseSoft px-4 py-1.5 rounded-full mb-4">
                      ❀ الإقامة
                    </span>
                    <ScrollFillHeading text="غرف وأجنحة مطلّة على الورد" />
                    <p className="text-inkSoft text-[17px] mt-3.5">
                      كل غرفة صُممت لتفتح على المشهد نفسه: ضباب الجبل صباحًا، وورد الطائف عند الغروب.
                    </p>
                  </div>
                </motion.div>

                {/* نقطة إرساء التجمّع — ثابتة دايمًا (غير مرئية، للقياس فقط) */}
                <div ref={clusterAnchorRef} className="absolute top-0 left-0 w-64 h-40" />

                {/* العنوان الثاني — يظهر بمكان الأول بالضبط، فوق الكروت مباشرة */}
                <motion.div
                  style={{ opacity: secondHeadingOpacity, y: secondHeadingY }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                  <span className="inline-flex items-center gap-2 text-[13px] font-bold text-roseDeep bg-roseSofter border border-roseSoft px-4 py-1.5 rounded-full mb-3">
                    ❀ من التفاصيل
                  </span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl">
                    غرف تتحدث عن نفسها
                  </h3>
                  <p className="text-inkSoft text-sm mt-2 max-w-md">
                    من نافذة الجبل إلى رائحة الورد على الوسادة، كل تفصيلة هنا تستحق أن تُروى.
                  </p>
                </motion.div>
              </div>

              {/* الإطارات النهائية — ثابتة بمكانها من البداية (فاضية) */}
              <motion.div style={{ opacity: framesOpacity, y: framesY }} className="mt-2">
                <div className="grid grid-cols-3 gap-7">
                  {ROOMS.map((room, i) => (
                    <div
                      key={room.title}
                      ref={(el) => {
                        frameRefs.current[i] = el;
                      }}
                      className="rounded-2xl border border-line bg-white h-44 shadow-[0_20px_50px_-25px_rgba(60,20,30,.2)]"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-7 mt-4">
                  {ROOMS.map((room) => (
                    <RoomText key={room.title} room={room} progress={scrollYProgress} />
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7">
              <div className="max-w-xl mb-4">
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-roseDeep bg-roseSofter border border-roseSoft px-4 py-1.5 rounded-full mb-4">
                  ❀ الإقامة
                </span>
                <h2 className="font-display font-bold text-3xl leading-tight">
                  غرف وأجنحة مطلّة على الورد
                </h2>
                <p className="text-inkSoft text-[17px] mt-3.5">
                  كل غرفة صُممت لتفتح على المشهد نفسه: ضباب الجبل صباحًا، وورد الطائف عند الغروب.
                </p>
              </div>
              {ROOMS.map((room) => (
                <div
                  key={room.title}
                  className="bg-white rounded-[22px] overflow-hidden border border-line shadow-[0_20px_50px_-25px_rgba(60,20,30,.35)]"
                >
                  <div
                    className="h-56 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${room.img})` }}
                  >
                    {room.tag && (
                      <span className="absolute top-4 right-4 bg-white/92 text-roseDeep text-xs font-bold px-3.5 py-1.5 rounded-full">
                        {room.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-6 pb-7">
                    <h3 className="text-2xl font-display font-bold mb-2">{room.title}</h3>
                    <p className="text-inkSoft text-[14.5px]">{room.desc}</p>
                    <div className="flex gap-2.5 mt-5 flex-wrap">
                      {room.amenities.map((a) => (
                        <span
                          key={a}
                          className="text-xs bg-roseSofter text-roseDeep px-3 py-1.5 rounded-full font-medium"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-dashed border-line">
                      <div className="font-display font-bold text-2xl text-roseDeep">
                        {room.price}{' '}
                        <small className="font-body text-[13px] text-inkSoft font-normal">
                          ﷼ / لليلة
                        </small>
                      </div>
                    </div>
                    <a
                      href="#booking"
                      className="mt-5 block w-full text-center py-3 rounded-xl bg-ink text-white font-bold text-sm hover:bg-rose transition-colors"
                    >
                      احجز هذه الغرفة
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isDesktop &&
            ROOMS.map((room, i) => (
              <TravelingImage
                key={room.title}
                room={room}
                index={i}
                progress={scrollYProgress}
                origin={origin}
                target={targets[i]}
                measured={measured}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
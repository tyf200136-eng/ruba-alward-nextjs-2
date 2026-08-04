'use client';

import { useEffect, useState } from 'react';
import ScrollFillHeading from './ScrollFillHeading';

const ITEMS = [
  {
    title: 'مطعم "عبق الورد"',
    desc: 'إفطار طائفي تقليدي، وأطباق مشوية على الفحم، وأخيرًا شاي بالورد الطائفي يُقدَّم على شرفة تطل على الحديقة.',
    img: '/rs.png',
  },
  {
    title: 'مسبح خارجي مُدفّأ',
    desc: 'مفتوح على مدار العام بإطلالة جبلية. مساحة هادئة للسباحة صباحًا أو مساءً، بعيدًا عن الضجيج.',
    img: '/po.png',
  },
  {
    title: 'سبا ربى الورد',
    desc: 'جلسات عناية بزيت الورد الطائفي الأصلي، في أجواء هادئة مطلة على الحديقة.',
    img: '/sa.png',
  },
  {
    title: 'حديقة الورد الخاصة',
    desc: 'مساحة هادئة لجلسات الصباح والشاي، محاطة بنفس الورد الطائفي الذي تشتهر به المنطقة.',
    img: '/gr.png',
  },
  {
    title: 'نادي رياضي',
    desc: 'أجهزة حديثة مع إطلالة على الوادي، مفتوح على مدار الساعة لنزلاء المنتجع.',
    img: '/gy.png',
  },
];



const SLIDE_DURATION = 4000; // مدة كل عنصر بالمللي ثانية

export default function Dining() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    setProgress(0);

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1));
    }, 30);

    const timeout = setTimeout(() => {
      setActive((prev) => (prev + 1) % ITEMS.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [active]);

  return (
    <section id="dining" className="py-28 relative z-10">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-14 items-center">
          {/* الصورة — تتغيّر مع العنصر النشط */}
          <div className="relative rounded-[26px] h-[280px] md:h-[460px] overflow-hidden shadow-[0_20px_50px_-25px_rgba(60,20,30,.35)]">
            {ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
                style={{
                  backgroundImage: `url(${item.img})`,
                  opacity: active === i ? 1 : 0,
                }}
              />
            ))}
          </div>

          {/* العنوان + القائمة المتزامنة */}
          <div>
            <span className="inline-flex items-center gap-2 text-[13px] font-bold text-roseDeep bg-roseSofter border border-roseSoft px-4 py-1.5 rounded-full mb-4">
              ❀ المطعم والمرافق
            </span>
            <ScrollFillHeading
              text="المطعم والمرافق"
              className="text-[28px] md:text-[38px] mb-2"
            />

            <div className="mt-6 space-y-1">
              {ITEMS.map((item, i) => (
                <button
                  key={item.title}
                  onClick={() => setActive(i)}
                  className="w-full text-right border-t border-line py-4 last:border-b"
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${active === i ? 'text-rose' : 'text-ink'}`}>
                      0{i + 1}&nbsp;&nbsp;{item.title}
                    </span>
                  </div>

                  {active === i && (
                    <>
                      <p className="text-sm text-inkSoft mt-2 max-w-md">{item.desc}</p>
                      <div className="h-[2px] bg-roseSoft mt-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose"
                          style={{ width: `${progress * 100}%` }}
                        />
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
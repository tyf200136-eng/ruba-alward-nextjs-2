'use client';

import { useEffect, useState } from 'react';

const FACILITIES = [
  {
    title: 'مسبح خارجي مُدفّأ',
    desc: 'مفتوح على مدار العام بإطلالة جبلية. مساحة هادئة للسباحة صباحًا أو مساءً، بعيدًا عن الضجيج.',
  },
  {
    title: 'سبا ربى الورد',
    desc: 'جلسات عناية بزيت الورد الطائفي الأصلي، في أجواء هادئة مطلة على الحديقة.',
  },
  {
    title: 'حديقة الورد الخاصة',
    desc: 'مساحة هادئة لجلسات الصباح والشاي، محاطة بنفس الورد الطائفي الذي تشتهر به المنطقة.',
  },
  {
    title: 'نادي رياضي',
    desc: 'أجهزة حديثة مع إطلالة على الوادي، مفتوح على مدار الساعة لنزلاء المنتجع.',
  },
];

const SLIDE_DURATION = 4000; // مدة كل عنصر بالمللي ثانية

export default function FacilitiesAccordion() {
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
      setActive((prev) => (prev + 1) % FACILITIES.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [active]);

  return (
    <div className="mt-8 space-y-1">
      {FACILITIES.map((f, i) => (
        <button
          key={f.title}
          onClick={() => setActive(i)}
          className="w-full text-right border-t border-line py-4 last:border-b"
        >
          <div className="flex items-center justify-between">
            <span className={`font-bold ${active === i ? 'text-rose' : 'text-ink'}`}>
              0{i + 1}&nbsp;&nbsp;{f.title}
            </span>
          </div>

          {active === i && (
            <>
              <p className="text-sm text-inkSoft mt-2 max-w-md">{f.desc}</p>
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
  );
}

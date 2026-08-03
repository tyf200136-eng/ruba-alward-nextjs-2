'use client';

import { useEffect, useRef, useState } from 'react';

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // إخفاء عند النزول، إظهار فورًا عند الصعود
      const goingDown = y > lastY.current;
      const pastThreshold = y > 120; // ما نخفيه قبل ما يبعد عن الهيرو شوي
      setHidden(goingDown && pastThreshold);

      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[100] flex items-center justify-between py-3.5 px-8
        bg-white/45 backdrop-blur-xl backdrop-saturate-150 border-b border-white/50
        shadow-[0_4px_24px_-8px_rgba(0,0,0,0.15)]
        transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="flex items-center gap-2.5 font-display font-bold text-xl text-ink">
        <span className="w-8 h-8 rounded-full bg-rose text-white flex items-center justify-center text-sm shrink-0">
          ر
        </span>
        منتجع ربى الورد
      </div>
      <div className="hidden md:flex gap-8 text-[15px] font-medium text-ink">
        <a href="#rooms" className="opacity-80 hover:opacity-100">الغرف</a>
        <a href="#dining" className="opacity-80 hover:opacity-100">المطعم والمرافق</a>
        <a href="#location" className="opacity-80 hover:opacity-100">الموقع</a>
      </div>
      <a
        href="#booking"
        className="bg-rose text-white px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap hover:bg-roseDeep transition-colors"
      >
        احجز الآن
      </a>
    </nav>
  );
}
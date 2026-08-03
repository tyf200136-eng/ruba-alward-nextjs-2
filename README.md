# منتجع ربى الورد — Next.js Project

موقع وهمي لفندق خيالي في الشفا، الطائف، بجانب مزارع الورد الطائفي.

## التشغيل

```bash
npm install
npm run dev
```

افتح http://localhost:3000

## هيكل المشروع

```
app/
  layout.tsx          — RTL root layout + الخطوط
  page.tsx            — يجمع كل الأقسام بالترتيب
  globals.css         — Tailwind + خطوط Markazi Text / Tajawal
  components/
    Nav.tsx                  — الناف بار (يتحول solid عند السكرول)
    ScrollCrossfadeHero.tsx  — الهيرو السينمائي (crossfade + zoom بين 6 لقطات)
    Rooms.tsx                — الغرف والأسعار
    Dining.tsx                — المطعم والمرافق
    Location.tsx              — الموقع + خريطة تفاعلية
    Reviews.tsx                — آراء الزوار
    Booking.tsx                 — نموذج الحجز (تجريبي، client component)
    Footer.tsx                   — الفوتر
public/
  hero-shots/          — الصور الست لهيرو السكرول (شوت المزرعة → داخل الغرفة)
```

## التخصيص السريع

- **ألوان الموقع**: `tailwind.config.ts` → rose / roseDeep / roseSoft / ink / bgSoft
- **توقيت هيرو السكرول**: `ScrollCrossfadeHero.tsx` →
  - `VH_PER_SHOT`: مدة كل لقطة بالسكرول (vh)
  - `OVERLAP`: مدى تداخل الـ crossfade بين اللقطات
  - `ZOOM_AMOUNT`: مقدار الزوم أثناء كل لقطة
- **الأسعار والغرف**: `Rooms.tsx` → مصفوفة `ROOMS`
- **الإحداثيات على الخريطة**: `Location.tsx` → رابط iframe (bbox + marker)

هذا موقع تجريبي بالكامل — النموذج في قسم الحجز لا يرسل بيانات فعلية.

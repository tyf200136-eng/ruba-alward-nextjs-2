'use client';

import { useState } from 'react';
import ScrollFillHeading from './ScrollFillHeading';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-white/20 bg-white/[.06] text-white text-[14.5px] placeholder-white/40 mb-4 focus:outline focus:outline-2 focus:outline-rose focus:border-transparent';

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="booking" className="bg-ink text-white py-28 relative z-10">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="max-w-xl mb-14">
          <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#F3C4CF] bg-white/10 border border-white/25 px-4 py-1.5 rounded-full mb-4">
            ❀ الحجز
          </span>
          <ScrollFillHeading text="جهّز إقامتك بين الورد والجبل" dark />
          <p className="text-white/65 text-[17px] mt-3.5">
            عبّئ النموذج وسيتواصل معك فريق الاستقبال لتأكيد الحجز خلال ساعات العمل.
          </p>
        </div>

        <form
          className="max-w-[760px] bg-white/5 border border-white/10 p-9 rounded-3xl"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          {submitted && (
            <div className="bg-roseSofter text-roseDeep border border-roseSoft px-4.5 py-3.5 rounded-2xl text-sm font-semibold mb-4.5 text-center">
              تم استلام طلبك! سنتواصل معك قريبًا لتأكيد الحجز. (نموذج تجريبي)
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
            <div>
              <label className="block text-[13px] text-white/70 mb-2 font-medium">الاسم الكامل</label>
              <input className={inputClass} type="text" placeholder="مثال: عبدالله المالكي" required />
            </div>
            <div>
              <label className="block text-[13px] text-white/70 mb-2 font-medium">رقم الجوال</label>
              <input className={inputClass} type="tel" placeholder="05xxxxxxxx" required />
            </div>
            <div>
              <label className="block text-[13px] text-white/70 mb-2 font-medium">تاريخ الوصول</label>
              <input className={inputClass} type="date" required />
            </div>
            <div>
              <label className="block text-[13px] text-white/70 mb-2 font-medium">تاريخ المغادرة</label>
              <input className={inputClass} type="date" required />
            </div>
            <div>
              <label className="block text-[13px] text-white/70 mb-2 font-medium">نوع الغرفة</label>
              <select className={inputClass}>
                <option>ديلوكس — إطلالة الورد</option>
                <option>جناح الشفا العائلي</option>
                <option>جناح ربى الورد الفاخر</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] text-white/70 mb-2 font-medium">عدد الضيوف</label>
              <select className={inputClass} defaultValue="2">
                <option value="1">ضيف واحد</option>
                <option value="2">ضيفان</option>
                <option value="3">3 ضيوف</option>
                <option value="4">4 ضيوف فأكثر</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[13px] text-white/70 mb-2 font-medium">ملاحظات إضافية (اختياري)</label>
              <textarea className={inputClass} rows={3} placeholder="مثال: نرغب بغرفة في الطابق العلوي" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-rose hover:bg-roseDeep transition-colors text-white font-bold py-3.5 rounded-full text-[15px]"
          >
            إرسال طلب الحجز
          </button>
          
        </form>
      </div>
    </section>
  );
}
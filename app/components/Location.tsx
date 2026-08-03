import ScrollFillHeading from './ScrollFillHeading';

export default function Location() {
  return (
    <section id="location" className="bg-bgSoft py-28">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="max-w-xl mb-14">
          <span className="inline-flex items-center gap-2 text-[13px] font-bold text-roseDeep bg-roseSofter border border-roseSoft px-4 py-1.5 rounded-full mb-4">
            ❀ الموقع
          </span>
          <ScrollFillHeading text="على أعتاب مزارع الورد الطائفي" />
          <p className="text-inkSoft text-[17px] mt-3.5">
            يقع المنتجع في قلب الشفا، على بعد دقائق من أشهر مزارع الورد الطائفي، وحوالي 30 دقيقة
            من وسط مدينة الطائف.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[.85fr_1.15fr] gap-11">
          <div className="bg-white border border-line rounded-[22px] p-8 shadow-[0_20px_50px_-25px_rgba(60,20,30,.35)] flex flex-col justify-between">
            <div>
              <LocItem title="العنوان" desc="الشفا، طريق مزارع الورد، محافظة الطائف، منطقة مكة المكرمة" />
              <LocItem title="القرب من مزرعة الورد" desc="7 دقائق بالسيارة من أقرب مزرعة ورد طائفي" />
              <LocItem title="من مدينة الطائف" desc="حوالي 30 دقيقة عبر طريق الشفا الرئيسي" />
            </div>
            <a
              href="#booking"
              className="text-center bg-rose text-white px-7 py-3.5 rounded-full font-bold text-[15px] hover:bg-roseDeep transition-colors mt-3"
            >
              احجز إقامتك الآن
            </a>
          </div>

          <div className="rounded-[22px] overflow-hidden border border-line shadow-[0_20px_50px_-25px_rgba(60,20,30,.35)] min-h-[420px]">
            <iframe
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=40.20%2C21.00%2C40.32%2C21.09&layer=mapnik&marker=21.048%2C40.255"
              title="خريطة موقع المنتجع في الشفا، الطائف"
              className="w-full h-full min-h-[420px] border-0 block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function LocItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3.5 mb-5">
      <div className="w-10 h-10 rounded-xl bg-roseSofter flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" className="w-[19px] h-[19px] stroke-roseDeep">
          <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
          <circle cx="12" cy="9" r="2.3" />
        </svg>
      </div>
      <div>
        <h4 className="text-[15px] font-bold mb-1">{title}</h4>
        <p className="text-[13.5px] text-inkSoft">{desc}</p>
      </div>
    </div>
  );
}

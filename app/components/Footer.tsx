export default function Footer() {
  return (
    <footer className="bg-[#150F0E] text-white/70 pt-16 pb-8">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 font-display font-bold text-xl text-white">
              <span className="w-8 h-8 rounded-full bg-rose text-white flex items-center justify-center text-sm">ر</span>
              منتجع ربى الورد
            </div>
            <p className="text-sm mt-3.5 max-w-xs text-white/55">
              نُزل هادئ في قلب الشفا بالطائف، على مقربة من مزارع الورد الطائفي الشهيرة.
            </p>
          </div>
          <div>
            <h5 className="text-white text-[15px] font-bold mb-4">روابط سريعة</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#rooms">الغرف والأسعار</a></li>
              <li><a href="#dining">المطعم والمرافق</a></li>
              <li><a href="#location">الموقع</a></li>
              <li><a href="#booking">احجز الآن</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-[15px] font-bold mb-4">تواصل معنا</h5>
            <ul className="space-y-2.5 text-sm">
              <li>الشفا، طريق مزارع الورد، الطائف</li>
              <li>+966 5X XXX XXXX</li>
              <li>info@rubaalward.example</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2.5 pt-6 text-[13px] text-white/45">
          <span>© 2026 مجموعة تركي عمر. جميع الحقوق محفوظة.</span>
          <span>الشفا · الطائف · المملكة العربية السعودية</span>
        </div>
      </div>
    </footer>
  );
}

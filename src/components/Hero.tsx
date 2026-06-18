import { useState } from "react";
import { CreditCard, ShieldCheck, Zap, Cpu, ArrowRightLeft, Sparkles } from "lucide-react";

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-slate-50" style={{ backgroundColor: "#f8fafc" }}>
      {/* Background Decorative Mesh Filter */}
      <div className="absolute inset-0 bg-[grid-linear-gradient] opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="absolute top-1/4 right-[5%] w-96 h-96 bg-blue-900/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-indigo-900/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 space-y-8 text-right">
            {/* Promo Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-slate-200/60 text-blue-900 font-bold px-4 py-1.5 rounded-full text-xs">
              <Sparkles className="w-4 h-4 text-blue-800" />
              <span>چاپ مستقیم از چاپخانه اختصاصی رایانس کارت</span>
            </div>

            {/* Main Headings */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                چاپ حرفه‌ای و تخصصی <br />
                <span className="text-blue-900 bg-gradient-to-l from-blue-900 to-blue-700 bg-clip-text text-transparent">
                  انواع کارت PVC هوشمند
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                ارائه راهکارهای هوشمند برای انواع کارت‌های پرسنلی، باشگاه مشتریان، هوشمند RFID، حضور و غیاب، تخفیف، گارانتی و مغناطیسی با بالاترین کیفیت چاپ و ماندگاری تضمین شده.
              </p>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button
                onClick={() => setActiveTab("order")}
                className="bg-blue-900 hover:bg-blue-850 text-white font-bold px-8 py-3.5 rounded-lg shadow-md hover:scale-[1.01] transition-all duration-200 text-center text-sm"
              >
                ثبت سفارش آنلاین
              </button>
              <button
                onClick={() => setActiveTab("portfolio")}
                className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-8 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center text-sm flex items-center justify-center gap-2"
              >
                مشاهده گالری نمونه‌کارها
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="flex gap-8 pt-6 border-t border-slate-200/60 max-w-lg">
              <div className="flex flex-col border-r-2 border-blue-900 pr-4">
                <span className="text-2xl font-extrabold text-slate-900 font-mono">100%</span>
                <span className="text-xs text-slate-500 font-bold">تضمین کیفیت رنگ</span>
              </div>
              <div className="flex flex-col border-r-2 border-blue-900 pr-4">
                <span className="text-2xl font-extrabold text-slate-900 font-mono">۴۸ الی ۷۲ساعت</span>
                <span className="text-xs text-slate-500 font-bold font-sans">تحویل سریع فوری</span>
              </div>
              <div className="flex flex-col border-r-2 border-blue-900 pr-4">
                <span className="text-2xl font-extrabold text-slate-900 font-mono">+۱۰ نوع</span>
                <span className="text-xs text-slate-500 font-bold">پوشش سفارشی</span>
              </div>
            </div>
          </div>

          {/* Left Column: Premium Interactive 3D Card Simulation */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group perspective-1000 w-full max-w-sm aspect-[1.586/1]">
              <div className="absolute inset-0 bg-blue-600/10 rounded-2xl blur-2xl group-hover:bg-indigo-600/20 transition-colors duration-500" />
              
              {/* Spinning 3D Animated Card Frame */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                className="relative w-full h-full rounded-2xl duration-700 preserve-3d shadow-2xl shadow-blue-900/10 transition-all cursor-pointer border border-white/50 bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 text-white p-6 flex flex-col justify-between overflow-hidden"
              >
                
                {/* Diagonal Holographic shine highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-all pointer-events-none" />
                
                {/* CARD FRONT SIDE */}
                <div 
                  className="absolute inset-0 p-6 flex flex-col justify-between backface-hidden"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider">Premium Access</p>
                      <h4 className="font-extrabold text-base tracking-wide text-slate-100">رایانس کارت</h4>
                    </div>
                    {/* Chip and Signal icon */}
                    <div className="flex items-center gap-2 block">
                      {/* Signal Contactless */}
                      <div className="flex gap-0.5 items-end h-5">
                        <span className="w-[2px] h-1.5 bg-blue-300 rounded-full" />
                        <span className="w-[2px] h-2.5 bg-blue-300 rounded-full" />
                        <span className="w-[2px] h-3.5 bg-blue-300 rounded-full" />
                        <span className="w-[2px] h-4.5 bg-blue-300 rounded-full" />
                      </div>
                      {/* Golden Smart Card Chip representation */}
                      <div className="w-9 h-7 bg-gradient-to-tr from-yellow-300 via-amber-200 to-yellow-400 rounded-md shadow-inner border border-amber-400 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full border-t border-b border-amber-600/30 opacity-60 flex justify-between px-1">
                          <span className="w-[1px] h-full bg-amber-600/40" />
                          <span className="w-[2px] h-full bg-amber-600/40" />
                          <span className="w-[1px] h-full bg-amber-600/40" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-mono text-lg tracking-widest text-slate-300 text-right">
                      ۵۰۲۲  ۹۶۳۶  ۲۴۸۱  ۷۰۹۵
                    </p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400">
                      <div className="text-right">
                        <span>اعتبار کارت</span>
                        <p className="font-mono text-slate-200">۱۴۰۸/۰۴</p>
                      </div>
                      <div className="text-right">
                        <span>دارنده کارت</span>
                        <p className="font-medium text-slate-100 font-sans">محتاج پوریا</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD BACK SIDE (Visible on Hover/Click) */}
                <div 
                  className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950 text-white backface-hidden"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  {/* Magnetic Stripe representation */}
                  <div className="absolute top-6 left-0 right-0 h-10 bg-black/90 shadow-inner" />
                  
                  {/* Signature panel and CVV */}
                  <div className="mt-14 flex items-center gap-3">
                    <div className="flex-1 h-8 bg-slate-100 flex items-center justify-end px-3 select-none text-slate-600 font-mono italic text-xs tracking-wider font-semibold rounded shadow-inner" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ddd, #ddd 10px, #eee 10px, #eee 20px)' }}>
                      <span>Signature Panel</span>
                    </div>
                    <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center font-mono text-xs font-bold border border-slate-700">
                      ۷۶۲
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-[10px] text-slate-400">
                    <div className="text-right space-y-0.5">
                      <p>رایانس کارت: پیشرو در فناوری‌های چاپ تماسی و غیرتماسی</p>
                      <p className="font-mono text-[8px] text-slate-500">ISO 7810 Standard | CR-80 Format</p>
                    </div>
                    {/* Tiny secure hologram */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 via-teal-400 to-indigo-500 opacity-60 animate-spin-slow shadow-inner" />
                  </div>
                </div>

              </div>

              {/* Interactive Flip Trigger Button */}
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="absolute -bottom-5 right-1/2 translate-x-1/2 bg-blue-900 text-white text-[11px] font-extrabold px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:bg-blue-800 transition-all duration-200 cursor-pointer border border-blue-800"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-blue-300" />
                <span>{isFlipped ? "مشاهده روی کارت" : "مشاهده پشت کارت (چرخش ۳D)"}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Feature Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 sm:mt-28">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 text-right space-y-3">
            <div className="bg-blue-50 p-3 rounded-xl inline-block text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">کیفیت چاپ ماندگار</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              روکش لمینت حرارتی محافظ در دو سمت کارت که رنگ‌ها را در برابر سایش، آب، و فرسایش سال‌ها زنده نگه می‌دارد.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 text-right space-y-3">
            <div className="bg-emerald-50 p-3 rounded-xl inline-block text-emerald-600">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">تراشه‌های هوشمند (Smart)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              تعبیه پردازنده‌های تماسی و غیرتماسی فرکانس‌های ۱۲۵ کیلوهرتز و ۱۳.۵۶ مگاهرتز (Mifare 1K) با اصالت ۱۰۰٪.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 text-right space-y-3">
            <div className="bg-indigo-50 p-3 rounded-xl inline-block text-indigo-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">تحویل فوری ۴۸ ساعته</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              چاپ دیجیتال تک و تیراژ محدود حداکثر در ۲ روز کاری و تحویل در مجهزترین مرکز توزیع کارت پایتخت.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 text-right space-y-3">
            <div className="bg-amber-50 p-3 rounded-xl inline-block text-amber-600">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">تنوع گسترده گرانژ</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              چاپ کارت متالایز براق طلایی و نقره‌ای برای مشتریان VIP، گیفت‌کارت‌ها و روکش‌های محافظ ضخیم مات و شنی.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

import { CreditCard, Landmark, ShieldCheck, Mail, MapPin, Phone, MessageSquare } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-850 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Logo brand & paragraph */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg bg-gradient-to-l from-white to-slate-200 bg-clip-text text-transparent">
                رایانِـس کارت
              </span>
            </div>
            <p className="text-[11.5px] text-slate-400 leading-relaxed">
              مرکز چاپ کارت پی‌وی‌سی رایانس کارت به عنوان مرجع تخصصی طراحی، پیاده‌سازی و لایه‌کوبی فرکانس‌های هوشمند RFID و مگنت‌های عابربانکی، خدمات پایدار چاپی خود را همراه با گارانتی بی قید و شرط ماندگاری رنگ به کل ایران ارایه می‌کند.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white">اقلام چاپی اصلی</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab("showcase")} className="hover:text-blue-400 transition-colors">
                  کارت هوشمند و تماس مخابراتی
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("showcase")} className="hover:text-blue-400 transition-colors">
                  کارت مغناطیسی و هتلی
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("showcase")} className="hover:text-blue-400 transition-colors">
                  کارت‌های لوکس VIP طلایی
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("showcase")} className="hover:text-blue-400 transition-colors">
                  کارت گارانتی با پنل اسکرچ
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white font-sans">بخش مشتریان</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab("order")} className="hover:text-blue-400 transition-colors">
                  کیت برآورد آنلاین تعرفه چاپ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("portfolio")} className="hover:text-blue-400 transition-colors">
                  شیوه‌نامه ارسال نمونه اولیه‌ها
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("history")} className="hover:text-blue-400 transition-colors">
                  رهگیری محموله‌های ارسالی
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("faq")} className="hover:text-blue-400 transition-colors">
                  تضمین برگشت کالا (مرجوعی)
                </button>
              </li>
            </ul>
          </div>

          {/* Certificates eNamad mock badges */}
          <div className="space-y-4 text-right">
            <h4 className="font-bold text-sm text-white">نمادهای اعتماد و اصالت</h4>
            <p className="text-[11px] text-slate-400">مجوز رسمی از اتحادیه و صنف چاپ و تبلیغات تهران</p>
            
            {/* Visual simulation of seals */}
            <div className="flex gap-2 justify-start pt-1">
              
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center items-center text-center p-1 cursor-pointer hover:bg-white/10 transition-colors">
                <Landmark className="w-6 h-6 text-blue-400" />
                <span className="text-[7.5px] font-sans text-slate-300 block mt-1.5 font-semibold">اتحادیه چاپ</span>
              </div>

              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center items-center text-center p-1 cursor-pointer hover:bg-white/10 transition-colors">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="text-[7.5px] font-sans text-slate-300 block mt-1.5 font-semibold">ساماندهی</span>
              </div>

              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center items-center text-center p-1 cursor-pointer hover:bg-white/10 transition-colors">
                <Mail className="w-6 h-6 text-amber-400" />
                <span className="text-[7.5px] font-sans text-slate-300 block mt-1.5 font-semibold">ای‌نماد طلایی</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="font-mono text-[10px] sm:text-xs">
            © {new Date().getFullYear()} RAYANS CARD CO. All rights reserved. Registered in Tehran, Iran.
          </p>
          <p className="font-sans">
            طراحی شده با استاندارد چاپ لمینتی و کیفیت ٣٠٠DPI برای حفاظت همیشگی از سرمایه هویتی کسب‌وکار شما.
          </p>
        </div>

      </div>
    </footer>
  );
}

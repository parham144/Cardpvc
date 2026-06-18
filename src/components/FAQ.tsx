import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Check, ShieldCheck, Mail, Phone, Clock } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "ابعاد طراحی استاندارد و حاشیه امن کارت‌های پی‌وی‌سی چقدر است؟",
      a: "ابعاد نهایی و فیزیکی کارت پی‌وی‌سی بر اساس استاندارد جهانی CR80 دقیقاً ۸۵.۶ × ۵۳.۹ میلی‌متر است. اما برای طراحی در نرم‌افزارهای گرافیکی مانند فتوشاپ یا ایلاستریتور، شما باید سند خود را با ابعاد فرضی ۸۹ × ۵۷ میلی‌متر با رزولوشن ۳۰۰ DPI بسازید. این محدوده اضافه (موسوم به ۲ میلی‌متر حاشیه امن خط برش از هر طرف) تضمین می‌کند که پس از عملیات دایکات و پانچ صنعتی، هدر رفت رنگ و حواشی سفید ایجاد نخواهد شد."
    },
    {
      q: "تفاوت کیفیت خروجی لایه‌کوبی براق، مات مخملی و پوشش شنی چیست؟",
      a: "براق (Glossy): یک لایه صیقلی، درخشان و بسیار صاف پلاستیکی است که عمق رنگ‌ها را افزایش داده و طرح را بسیار زنده و چشمگیر نشان می‌دهد. مات (Matte): بافتی بدون بازتابش نور است که ظاهری وزین، مدرن و با پرستیژ به کارت می‌دهد و اثر انگشت روی آن جذب نمی‌شود. شنی (Sand): روکشی خشن و ضد خش عالی با بافتی ماسه‌‌ای ملموس فوق‌العاده است که در برابر مخدوش شدن، کلیدها یا شستشو به طور کامل مصونیت صدمه دارد."
    },
    {
      q: "کارت‌های هوشمند RFID با چه دستگاه‌های حضور و غیابی در ایران سازگار هستند؟",
      a: "ما به طور کلی دو مدل فرکانس اصلی و پرکاربرد تولید می‌کنیم. کارت‌های مایفر (Mifare 1K/4K) با فرکانس ۱۳.۵۶ مگاهرتز کار می‌کنند که از سیستم‌های امنیتی خواندن و نوشتن اطلاعات و انکدینگ پیشرفته پشتیبانی کرده و با تمام دستگاه‌های حضور و غیاب مدرن (علم و صنعت، جهان‌گستر، کارا دوهزار و غیره) سازگارند. کارت‌های پروکسیمیتی ۱۲۵ کیلوهرتز فقط خواندنی (Read-Only) هستند که بیشتر برای قفل الکترونیک هتل‌ها، کمدهای استخرها و گیت‌های کنترل تردد قدیمی‌تر استفاده خواهند شد."
    },
    {
      q: "چرا باید مشخصات رنگ سند طراحی من روی فرمت CMYK باشد؟",
      a: "دستگاه‌های چاپ دیجیتال صنعتی تک چاپ و افست کارت پی‌وی‌سی همگی از ترکیب چهار رنگ اصلی کارتریج (سیان، مجنتا، زرد، کلید مشکی) استفاده می‌کنند. اگر بنر خود را با فرمت RGB (سنسور صفحه نمایش دیجیتال) ذخیره کنید، در هنگام چاپ به طرز محسوسی با افت نور یا کدر شدن و تغییر طیف‌های سرمه‌ای پدیدار خواهد شد. لذا مقتضی است خروجی خود را با پروفایل پیش‌فرض رنگی CMYK Coated FOGRA39 ذخیره کنید."
    },
    {
      q: "روال بررسی تضمین سلامت رنگ و گارانتی فیزیکی چگونه است? ",
      a: "ما به کار خود اطمینان داریم. چنانچه رنگ نهایی بیش از ۵ درصد با استاندارد لایه‌باز شما تفاوت داشته باشد یا لایه‌های کارت در اثر خم شدن چروک و پوسته کند، کل مبلغ فاکتور بدون نیاز به قید و شرط عودت داده شده یا کالا با تیراژ اصلی پس از بازبینی به صورت ضرب‌الاجل مجددا غوطه‌ور در چاپخانه تولید می‌گردد."
    },
    {
      q: "سفارش عمده بالای ۱۰۰۰ عدد در قالب فرم‌های عمومی چاپ چقدر زمان نیاز دارد؟",
      a: "چاپ‌های عادی دیجیتال تک معمولاً ظرف ۲ الی ۳ روز کاری بسته شده و با پیک ارسال می‌شوند. سفارشات فرم عمومی و افست تیراژ بالا (مانند ۵۰۰۰ عدد به بالا) به دلیل لایه لایه پیوستن به دستگاه همگن لمینت پرس شیت بزرگ، حدوداً ۷ الی ۱۰ روز کاری به طول خواهند انجامید که موجب تسهیل و کاهش قیمت تمام شده تا ۴۰٪ خواهد شد."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 bg-slate-50 text-right" style={{ backgroundColor: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Right Column: Interactive FAQ Accordions (Cols 7) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="space-y-3 mb-8">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold border border-slate-200/50">
                <HelpCircle className="w-4 h-4 text-blue-800 animate-pulse" />
                <span>پاسخ به ابهامات متداول مشتریان</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                سوالات فنی و راهنمای کامل چاپ کارت PVC
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                اگر در بستر ضخامت، ساختار فایل‌های چاپی، روکش یا تراشه‌های هوشمند انتخابی سوالی دارید، موارد پر تکرار زیر را از دپارتمان فنی ما بخوانید.
              </p>
            </div>

            {/* Accordion list */}
            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`border transition-all duration-300 overflow-hidden rounded-lg ${
                      isOpen
                        ? "bg-white border-blue-900/40 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center px-5 py-4 text-right focus:outline-none cursor-pointer"
                    >
                      <span className={`text-xs sm:text-sm font-extrabold ${isOpen ? "text-blue-900" : "text-slate-800"}`}>
                        {faq.q}
                      </span>
                      <div className={`p-1.5 rounded-md ${isOpen ? "bg-blue-100/50 text-blue-900" : "bg-slate-50 text-slate-400"}`}>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 pb-5 px-5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-normal">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left Column: Contact and Support Widgets Widget Card (Cols 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box Card */}
            <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-6 sm:p-8 shadow-xl text-right relative overflow-hidden">
              
              {/* background element */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-950/40 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative">
                <div className="space-y-2">
                  <span className="text-xs text-blue-400 font-bold tracking-wider">SUPPORT DEPARTMENT</span>
                  <h3 className="text-lg sm:text-xl font-bold">نیاز به ارتباط یا راهنمایی تلفنی فوری دارید؟</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    اگر در گام‌های انتخاب تراشه سردرگم هستید، کارشناسان بخش فنی رایانس کارت آماده ارایه مشاوره‌های حرفه‌ای به سازمان‌ها و شرکت‌ها می‌باشند.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
                  
                  <div className="flex gap-3 items-center">
                    <div className="bg-white/5 p-2.5 rounded-md text-blue-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">مرکز پاسخگویی تلفنی (تهران):</span>
                      <strong className="text-white text-sm font-mono mt-0.5 block tracking-widest leading-none">۰۲۱ - ۸۸۹۶ ۴۸۲۰</strong>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="bg-white/5 p-2.5 rounded-md text-blue-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">پشتیبانی پست الکترونیک:</span>
                      <strong className="text-white text-xs font-mono mt-0.5 block tracking-wider leading-none">sales@rayanscard.ir</strong>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="bg-white/5 p-2.5 rounded-md text-blue-400 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">ساعات کاری چاپخانه و پاسخگویی:</span>
                      <p className="text-slate-300 text-[11px] font-sans mt-0.5">شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰ | پنجشنبه‌ها تا ۱۳:۳۰</p>
                    </div>
                  </div>

                </div>

                <div className="pt-2">
                  <a
                    href="tel:02188964820"
                    className="block w-full text-center bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    تماس مستقیم با کارشناس فروش
                  </a>
                </div>
              </div>

            </div>

            {/* Print checklist guarantee card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-right space-y-4 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm flex gap-2 items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>استانداردهای فریم تضمینی ما</span>
              </h4>
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                {[
                  "صد در صد پی‌وی‌سی خالص",
                  "انعطاف و مقاومت فیزیکی بالا",
                  "برش‌های یکنواخت عابربانکی",
                  "شفافیت و پایداری رنگ",
                  "چیپست‌های اورجینال RFID",
                  "بسته‌بندی کارتنی اصولی"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-1.5 items-center text-slate-700 text-[11px] font-medium">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

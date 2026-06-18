import { useState } from "react";
import { PortfolioSample } from "../types";
import { Eye, Layers, Rotate3d, Info, Check, Calendar, ArrowRightLeft, X, ClipboardCheck, ArrowLeft } from "lucide-react";

interface PortfolioProps {
  setActiveTab: (tab: string) => void;
  setSelectedCardTypeForOrder: (id: string) => void;
}

export default function Portfolio({ setActiveTab, setSelectedCardTypeForOrder }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSample, setSelectedSample] = useState<PortfolioSample | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const categories = [
    { id: "all", label: "همه نمونه اولیه‌ها" },
    { id: "personnel", label: "پرسنلی و تردد" },
    { id: "membership", label: "باشگاه مشتریان و تخفیف" },
    { id: "smart", label: "دسترسی RFID و هوشمند" },
    { id: "luxury", label: "متالایز و لوکس VIP" },
  ];

  const samples: PortfolioSample[] = [
    {
      id: "esp_vip",
      title: "کارت طلایی عضویت ویژه هتل اسپیناس پالاس",
      category: "luxury",
      description: "چاپ شده بر روی پی‌وی‌سی متالایز طلایی مرغوب با روکش لمینیشن براق، مجهز به نوار مغناطیسی HiCo ضدخش جهت کنترل گیت‌های دندانه‌دار و باز کردن اتاق‌ها به طور ایمن.",
      thickness: "۷۶۰ مایکرو (استاندارد عابربانک)",
      finish: "براق طلایی متالایز اکلیلی",
      frontImage: "bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700",
      backImage: "bg-gradient-to-tr from-stone-900 to-slate-800",
      specialOptions: ["نوار مگنت استاندارد HiCo", "کدگذاری متغیر اطلاعات مشتری", "لمینت حرارتی محافظ صیقلی"],
      accentColor: "amber",
      textColor: "text-amber-100",
      cardNumber: "۸۵۲۰   ۰۱۹۲   ۳۶۴۱   ۹۰۰۲",
      holderName: "جناب آقای کمال تبریزی"
    },
    {
      id: "nioc_smart",
      title: "کارت تردد هوشمند شرکت ملی پالایش نفت ایران",
      category: "personnel",
      description: "کارت پرسنلی با روکش پی‌وی‌سی مغزی مایفر هوشمند ۱۳.۵۶ مگاهرتز جهت ورود پرسنل به بخش فنی و اتاق سرور، دارای چاپ عکس پرسنل با کیفیت ۳۰۰ DPI، کد استخدامی و هولوگرام لیزری نقره‌ای ضد جعل.",
      thickness: "۸۰۰ مایکرو (مغزی سیم‌بست مجهز به فرکانس RFID)",
      finish: "مات مخملی با روکش سلفن لمینت گرم",
      frontImage: "bg-gradient-to-tr from-teal-900 via-emerald-800 to-emerald-950",
      backImage: "bg-gradient-to-tr from-slate-900 to-slate-800",
      specialOptions: ["تراشه مایفر Mifare 1K داخلی", "چاپ اطلاعات متغیر به همراه بارکد دوبعدی QR", "پانچ بیضی بالای کارت"],
      accentColor: "emerald",
      textColor: "text-emerald-100",
      cardNumber: "استخدامی: ۹۶-۴۸۰۱-۶۲",
      holderName: "مهندس رضا کریمی (امور فنی)"
    },
    {
      id: "shahrvand_loyalty",
      title: "کارت VIP باشگاه وفاداری شهروند اول",
      category: "membership",
      description: "برای مشتریان تراز اول فروشگاه‌های زنجیره‌ای شهروند، چاپ بر روی شیت نقره‌ای متالایز شیک به همراه بارکد خطی استاندارد کد ۱۲۸ در ابعاد CR80 دوربری شده.",
      thickness: "۵۰۰ مایکرو (نیمه‌انعطاف‌پذیر)",
      finish: "مات ساتن شکیل با حاشیه نقره‌ای",
      frontImage: "bg-gradient-to-tr from-slate-800 via-indigo-900 to-slate-900",
      backImage: "bg-gradient-to-tr from-slate-900 to-indigo-950",
      specialOptions: ["بارکد تک‌بعدی لیزری مرودست", "روکش محافظ شنی ضد خش مخصوص", "کدگذاری متوالی شماره عضویت"],
      accentColor: "indigo",
      textColor: "text-indigo-100",
      cardNumber: "کد وفاداری: ۷۰۸۵-۲۹۶",
      holderName: "سرکار خانم نرگس جواهری"
    },
    {
      id: "aquila_rfid",
      title: "کارت غیرتماسی باشگاه ورزشی اکسیژن سعادت‌آباد",
      category: "smart",
      description: "کارت هوشمند غیرتماسی فرکانس ۱۲۵ کیلوهرتز (Read-Only) مناسب برای گیت ورود اسکنر باشگاه، رختکن‌های کمد مچ‌بنددار و بوفه خرید اعتباری داخلی با طراحی بسیار شاداب.",
      thickness: "۷۶۰ مایکرو (سخت استاندارد)",
      finish: "روکش محافظ شکیب شنی (Sand Premium)",
      frontImage: "bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-800",
      backImage: "bg-gradient-to-tr from-blue-950 to-indigo-950",
      specialOptions: ["چیپست ریدر ۱۲۵KHz تعبیه‌شده", "بافت شنی رویه لمینتی ضد اثرانگشت", "چاپ دورو دیجیتال فول‌رنگ"],
      accentColor: "blue",
      textColor: "text-blue-100",
      cardNumber: "عضو شماره: ۱۰۸۲-۹۳",
      holderName: "احسان آریان‌پور"
    },
    {
      id: "samsung_warranty",
      title: "کارت طلایی گارانتی محصولات صوتی تصویری سامسونگ",
      category: "luxury",
      description: "بر روی شیت نقره‌ای متالایز مات کوبیده شده به همراه پنل اسکرچ امنیتی پوشاننده شماره سریال دستگاه جهت اصالت قطعات و ثبت در ربات پیامکی سامسونگ سرویس.",
      thickness: "۵۰۰ مایکرو (شیک و انعطاف‌پذیر)",
      finish: "مات متالیک کوبیده شده",
      frontImage: "bg-gradient-to-tr from-slate-700 via-indigo-950 to-slate-900",
      backImage: "bg-gradient-to-tr from-slate-900 to-zinc-900",
      specialOptions: ["رمز اسکرچ ضد دید نقره‌ای پوشاننده", "شماره سریال متوالی هجده رقمی", "روکش کتان مخملی ضد خش"],
      accentColor: "slate",
      textColor: "text-slate-100",
      cardNumber: "سریال مانیتور: SN-7901BX4820",
      holderName: "مرکز گارانتی مادام‌العمر"
    },
    {
      id: "hyper_gift",
      title: "کارت هدیه خرید نقدی اعتباری هایپراستار",
      category: "membership",
      description: "کارتهای هدیه جذاب با طرح نوروز با بارگذاری مبالغ اعتباری متفاوت (از ۵۰۰ هزار تومان تا ۵ میلیون تومان) با نوار مگنت در بخش پشتی کارت جهت ریدر پوز پی‌اس فروشگاهی.",
      thickness: "۷۶۰ مایکرو استاندارد عابربانک",
      finish: "براق چند لایه لمینت گرم",
      frontImage: "bg-gradient-to-tr from-rose-600 via-pink-500 to-indigo-900",
      backImage: "bg-gradient-to-tr from-slate-900 to-pink-950",
      specialOptions: ["بارکد فعال‌سازی صندوق‌داری", "نوار مگنت پرداخت الکترونیک", "بسته‌بندی مقوایی هدیه فانتزی"],
      accentColor: "rose",
      textColor: "text-rose-100",
      cardNumber: "مبلغ هدیه: ۱,۰۰۰,۰۰۰ تومان",
      holderName: "دارنده محترم هدیه هایپراستار"
    }
  ];

  const filteredSamples = selectedCategory === "all"
    ? samples
    : samples.filter(s => s.category === selectedCategory);

  return (
    <div className="py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold">
            <Rotate3d className="w-3.5 h-3.5" />
            <span>گالری تولیدات ما</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            نمونه‌کارهای متنوع چاپی رایانس کارت
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            برای درک بهتر جزئیات بافت، ضخامت، جنس شیت خام، و نوع تراشبندی کارت‌های PVC چاپی ما، نمونه‌های برجسته پیشین را مطالعه کنید. جهت چرخش کارت‌ها بر روی هر کدام نگه دارید.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-blue-900 text-white font-bold shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Samples Interactive CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSamples.map((sample) => {
            const isCardFlipped = !!flippedCards[sample.id];
            return (
              <div
                key={sample.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Spinning 3D Animated Card Frame container */}
                <div className="space-y-5">
                  <div className="perspective-1000 w-full aspect-[1.586/1] rounded-2xl relative cursor-pointer mb-2">
                    
                    {/* Card actual body */}
                    <div 
                      onClick={() => setFlippedCards(prev => ({ ...prev, [sample.id]: !prev[sample.id] }))}
                      className="relative w-full h-full rounded-2xl transition-all duration-700 preserve-3d shadow-md"
                      style={{ transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                    >
                      
                      {/* Front side of sample card */}
                      <div 
                        className={`absolute inset-0 rounded-2xl p-5 ${sample.frontImage} text-white flex flex-col justify-between backface-hidden overflow-hidden`}
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                      >
                        {/* Shiny micro hologram spot */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                        
                        <div className="flex justify-between items-start">
                          <div className="text-right">
                            <p className="text-[9px] opacity-75 tracking-wider font-semibold">PREMIUM MATERIAL</p>
                            <h4 className="font-extrabold text-xs sm:text-sm">{sample.title.split(" ")[2] || "رایانس کارت"}</h4>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {/* Tap/Click to Flip icon indicator */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFlippedCards(prev => ({ ...prev, [sample.id]: !prev[sample.id] }));
                              }}
                              className="bg-white/10 hover:bg-white/20 p-1.5 rounded-lg text-white transition-all cursor-pointer border border-white/10"
                              title="چرخش سه بعدی"
                            >
                              <Rotate3d className="w-3.5 h-3.5" />
                            </button>

                            {/* Metallic Smart-card chip design */}
                            {sample.category === "smart" && (
                              <div className="w-8 h-6 bg-gradient-to-tr from-yellow-300 to-amber-400 rounded border border-amber-500/50 flex flex-col justify-between p-0.5 opacity-90 shadow-inner shrink-0">
                                <div className="w-full h-[1px] bg-amber-800/30" />
                                <div className="w-full h-[1px] bg-amber-800/30" />
                              </div>
                            )}
                            {sample.category === "luxury" && (
                              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-200 via-rose-300 to-teal-200 opacity-80 animate-pulse" />
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="font-mono text-xs sm:text-sm tracking-widest text-slate-100 text-right opacity-90">
                            {sample.cardNumber}
                          </p>
                          <div className="flex justify-between items-end text-[10px] opacity-80 gap-2">
                            <div className="text-right">
                              <p className="font-semibold text-[8px] opacity-60">تاریخ سفارش</p>
                              <p className="font-medium font-sans truncate max-w-[120px]">{sample.holderName}</p>
                            </div>
                            <span className="bg-white/20 px-2 py-0.5 rounded text-[8px] font-bold">Standard Size</span>
                          </div>
                        </div>
                      </div>

                      {/* Back side of sample card */}
                      <div 
                        className={`absolute inset-0 rounded-2xl ${sample.backImage} text-white backface-hidden overflow-hidden p-5 flex flex-col justify-between`}
                        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                      >
                        {/* Black Magnetic Band */}
                        <div className="absolute top-4 left-0 right-0 h-8 bg-black/90 shadow-inner" />
                        
                        {/* Signature block */}
                        <div className="mt-11 flex items-center gap-2">
                          <div className="flex-1 h-6 bg-slate-100 flex items-center justify-end px-2 text-[10px] text-slate-500 font-mono italic font-bold rounded" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #eee, #eee 5px, #f5f5f5 5px, #f5f5f5 10px)' }}>
                            <span>Sign Code</span>
                          </div>
                          <div className="w-8 h-6 bg-slate-800 rounded flex items-center justify-center font-mono text-[9px] font-bold border border-slate-700">
                            ۴۸۱
                          </div>
                        </div>

                        <div className="flex justify-between items-end text-[9px] opacity-75">
                          <div className="text-right font-sans">
                            <p>تولید شده با پرس مغزی و ورقه آستری مرغوب PVC</p>
                            <p className="font-mono text-[7px] text-slate-400">CR80 FORMAT • RAYANS CARD</p>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFlippedCards(prev => ({ ...prev, [sample.id]: !prev[sample.id] }));
                            }}
                            className="w-5 h-5 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center text-[7px] font-bold transition-all cursor-pointer"
                          >
                            R
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Info summary */}
                  <div className="space-y-3 text-right">
                    <span className={`inline-block text-[10px] bg-${sample.accentColor}-50 text-slate-500 font-bold px-2 py-1 rounded-lg border border-slate-100`}>
                      ضخامت: {sample.thickness}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug hover:text-blue-600 transition-colors">
                      {sample.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {sample.description}
                    </p>
                  </div>
                </div>


              {/* Action details */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => setSelectedSample(sample)}
                  className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>مشاهده جزئیات چاپ</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedCardTypeForOrder(sample.category === "luxury" ? "metalized" : sample.category === "smart" ? "smart_rfid" : "classic_business");
                    setActiveTab("order");
                  }}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold px-4 py-2.5 rounded-lg transition-all"
                >
                  سفارش این طرح
                </button>
              </div>
            </div>
          );
        })}
        </div>

        {/* Modal detail overlay */}
        {selectedSample && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-right shadow-2xl relative border border-slate-100" onClick={(e) => e.stopPropagation()}>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedSample(null)}
                className="absolute top-4 left-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Header */}
              <div className="space-y-2 mb-6 ml-10">
                <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg font-bold">
                  مشخصات فنی نمونه تولیدی {selectedSample.id.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {selectedSample.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start border-t border-slate-100 pt-6">
                
                {/* Visual Card Front/Back preview representation */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 block">نمای رویه کارت در گالری:</span>
                  <div className={`w-full aspect-[1.586/1] rounded-2xl p-5 ${selectedSample.frontImage} text-white flex flex-col justify-between shadow-md`}>
                    <span className="text-[10px] tracking-wider font-bold">FRONT SIDE</span>
                    <p className="font-mono text-center text-sm tracking-widest">{selectedSample.cardNumber}</p>
                    <p className="text-xs font-medium">{selectedSample.holderName}</p>
                  </div>

                  <span className="text-xs font-bold text-slate-400 block pt-2">نمای پشت کارت در گالری:</span>
                  <div className={`w-full aspect-[1.586/1] rounded-2xl ${selectedSample.backImage} text-white p-5 flex flex-col overflow-hidden shadow-md relative`}>
                    <div className="absolute top-4 left-0 right-0 h-6 bg-black" />
                    <span className="text-[10px] tracking-wider font-bold mt-8">BACK SIDE</span>
                    <p className="text-[8px] font-mono text-slate-300">ISO 7811 STRIPE CODING SYSTEM</p>
                  </div>
                </div>

                {/* Technical stats panel */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400">توضیحات و کاربرد اصلی:</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5">{selectedSample.description}</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-700">شناسنامه فنی چاپ</h4>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">جنس شیت خام:</span>
                        <strong className="text-slate-800 font-sans">پی‌وی‌سی اورجینال کره</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ضخامت نهایی:</span>
                        <strong className="text-slate-800 font-sans">{selectedSample.thickness}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">نوع پوشش لایه رویی:</span>
                        <strong className="text-slate-800 font-sans">{selectedSample.finish}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">رزولوشن خروجی چاپ:</span>
                        <strong className="text-slate-800 font-mono">300 DPI - RGB/CMYK</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 mb-2">امکانات اختصاصی سفارشی افزوده شده:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSample.specialOptions?.map((item, id) => (
                        <div key={id} className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1 rounded-lg font-semibold">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCardTypeForOrder(selectedSample.category === "luxury" ? "metalized" : selectedSample.category === "smart" ? "smart_rfid" : "classic_business");
                        setSelectedSample(null);
                        setActiveTab("order");
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors shadow-md text-center"
                    >
                      شروع طراحی و ثبت سفارش تلفیقی
                    </button>
                    <button
                      onClick={() => setSelectedSample(null)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-3 px-6 rounded-xl transition-colors text-center"
                    >
                      بستن راهنما
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

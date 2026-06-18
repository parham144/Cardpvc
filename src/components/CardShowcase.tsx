import { useState } from "react";
import { CardType } from "../types";
import { Info, Cpu, Sparkles, Shield, CreditCard, ChevronLeft, Check, Layers } from "lucide-react";

interface CardShowcaseProps {
  setActiveTab: (tab: string) => void;
  setSelectedCardTypeForOrder: (id: string) => void;
}

export default function CardShowcase({ setActiveTab, setSelectedCardTypeForOrder }: CardShowcaseProps) {
  const [selectedThickness, setSelectedThickness] = useState<number>(760);

  const cardTypes: CardType[] = [
    {
      id: "smart_rfid",
      title: "کارت هوشمند هوایی و RFID",
      englishTitle: "Contactless Smart RFID Cards",
      description: "کارت‌های مجهز به تراشه‌های Mifare 1K، EM4100 یا فرکانس‌های ۱۲۵KHz و ۱۳.۵۶MHz برای قفل هتل‌ها، ورود و خروج شرکت‌ها، دستگاه‌های حضوروغیاب و شهربازی‌ها.",
      basePricePerCard: 4500,
      suggestedThicknesses: ["۷۶۰ مایکرو", "۸۰۰+ مایکرو"],
      features: ["دارای حافظه رایت اطلاعات", "فرکانس رید و رایت متنوع", "دارای آنتن القایی مسی باکیفیت", "کیفیت بسیار بالا در چاپ مستمر دیجیتال"],
      recommendedMinQty: 100,
    },
    {
      id: "metalized",
      title: "کارت متالایز لوکس (طلایی / نقره‌ای)",
      englishTitle: "Luxury Metallized Gold & Silver",
      description: "کارتی درخشان با روکش اکلیل‌دار متال و افکت‌های چشمنواز مخصوص کارت‌های VIP، هدایای اعتباری گران‌قیمت، دندانپزشکی‌ها، مزون‌ها و باشگاه‌های درجه‌یک مشتریان.",
      basePricePerCard: 5200,
      suggestedThicknesses: ["۵۰۰ مایکرو", "۷۶۰ مایکرو"],
      features: ["جلوه اکلیلی لوکس و با پرستیژ کلاسی", "امکان چاپ تک‌رنگ و چندرنگ تفکیکی", "مقاومت در برابر فرسایش شیمیایی پوست", "پوشش سلفون متالایزر صیقلی"],
      recommendedMinQty: 50,
    },
    {
      id: "magnetic",
      title: "کارت مغناطیسی مگنت‌دار",
      englishTitle: "Magnetic Stripe HICO/LOCO",
      description: "کارت‌های پی‌وی‌سی مجهز به نوار مشکی رنگ مغناطیسی عابربانکی با دانسیته بالا (HiCo) جهت رمزگذاری اطلاعات و استفاده در سیستم دسترسی بانکی، تخفیف، و کلیدهای هتلی.",
      basePricePerCard: 3900,
      suggestedThicknesses: ["۷۶۰ مایکرو"],
      features: ["سازگار با استانداردهای بانکی ISO 7811", "قابلیت انکد کارت با دستگاه مگ‌رایتر", "عرض استاندارد نوار مگنت ۱۲.۷ میلی‌متری", "مقاوم در برابر مخدوش شدن مغناطیسی"],
      recommendedMinQty: 100,
    },
    {
      id: "personnel",
      title: "کارت پرسنلی و شناسایی",
      englishTitle: "Personnel Identification Cards",
      description: "برای شرکت‌ها، ادارات و سازمان‌ها با قابلیت چاپ اطلاعات متغیر شامل عکس پرسنل، نام و نام خانوادگی، سمت شغلی، کدهای استخدامی و کدهای هویتی منحصربه‌فرد برای کنترل تردد.",
      basePricePerCard: 2600,
      suggestedThicknesses: ["۵۰۰ مایکرو", "۷۶۰ مایکرو"],
      features: ["چاپ اختصاصی عکس با کیفیتی نزدیک به عکس آتلیه", "قابلیت پانچ دایره یا بیضی برای بند آویز", "سازگار با انواع جاکارتی‌های هولدر شفاف", "امکان لایه‌کوبی هولوگرام ضد جعل"],
      recommendedMinQty: 10,
    },
    {
      id: "scratch_gift",
      title: "کارت هدیه و گارانتی با رمز اسکرچ",
      englishTitle: "Scratch-off Warranty & Gift Cards",
      description: "دارای پنل‌های مخفی امنیتی نقره‌ای رنگ جهت استفاده امنیتی. کدهای قرعه‌کشی، فعالسازی نرم‌افزار، رمز عبور یا تخفیف پنهان که با ناخن یا سکه تراشیده می‌شوند.",
      basePricePerCard: 3100,
      suggestedThicknesses: ["۳۰۰ مایکرو", "۵۰۰ مایکرو", "۷۶۰ مایکرو"],
      features: ["پوشش اسکرچ صد درصد تیره و کدر بدون سایه", "امکان استفاده از پنل امضا (Signature)", "بارکدگذاری متوالی و منحصربه‌فرد تحت کارت", "مناسب برای کارت‌های تضمین اصالت کالا"],
      recommendedMinQty: 100,
    },
    {
      id: "classic_business",
      title: "کارت پی‌وی‌سی ساده (لمینت کلاسیک)",
      englishTitle: "Classic PVC Business Cards",
      description: "کارت‌های ساده چاپی چندمنظوره با ماندگاری بالا نسبت به کارت‌های کاغذی و لمینت کاغذی معمولی. کاملاً ضدآب با روکش سلفن مات، براق یا شنی جهت کارت ویزیت استارتاپ‌ها.",
      basePricePerCard: 1900,
      suggestedThicknesses: ["۳۰۰ مایکرو", "۵۰۰ مایکرو", "۷۶۰ مایکرو"],
      features: ["ضد‌آب صد درصد، ضد چین و چروک و خمیدگی", "طیف رنگی زنده با پوشش محافظ مستحکم", "مناسب برای مصارف شرکتی عمومی با ماندگاری مادام‌العمر", "صرفه‌جویی بسیار زیاد در مقادیر عمده"],
      recommendedMinQty: 100,
    },
  ];

  const thicknessDetails = {
    300: {
      flexibility: "بسیار بالا (کاملاً انعطاف‌پذیر)",
      feel: "شبیه به ورقه‌های بازی گلاسه یا طلق‌های نرم مقاوم. ضخامت بسیار معقول، سبک و کم‌جا در کیف پول.",
      compare: "ضخیم‌تر و باکیفیت‌تر از ۳ لایه کاغذ گلاسه لمینت شده.",
      idealFor: "کارت‌های ویزیت تک، بلیط‌های فست‌فودی اعتباری و کارت تبلیغاتی عمومی.",
      bendingScore: 90,
    },
    500: {
      flexibility: "متوسط (نیمه انعطاف‌پذیر)",
      feel: "تعادل عالی بین انعطاف و استحکام. حالت خم شدن آرامی دارد ولی مچاله و شکسته نمی‌شود.",
      compare: "شبیه به ورقه ضخیم تلقی پوشه‌های اداری مرغوب.",
      idealFor: "کارت‌های تخفیف باشگاه مشتریان، معرفی استارتاپ‌ها، کارت گارانتی دستگاه‌ها.",
      bendingScore: 50,
    },
    760: {
      flexibility: "سخت و مستحکم (بدون انعطاف‌پذیری راحت)",
      feel: "استاندارد جهانی کارت مالی و اعتباری عابربانک (استاندارد ISO CR-80). لبه‌های دایره‌ای دوربری شده بسیار تمیز.",
      compare: "دقیقاً مشابه و هم‌ضخامت عابربانک‌های عضو شبکه شتاب.",
      idealFor: "کارت‌های پرسنلی دایمی، کارت‌های هوشمند مگنت‌دار و RFID، کارت شناسایی تردد هوشمند.",
      bendingScore: 10,
    },
  };

  const currentThickness = thicknessDetails[selectedThickness as keyof typeof thicknessDetails];

  const handleOrderRedirect = (cardTypeId: string) => {
    setSelectedCardTypeForOrder(cardTypeId);
    setActiveTab("order");
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>راهنمای فنی فرآیندهای چاپ ما</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            تکنولوژی تخصصی و انواع کارت پی‌وی‌سی
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            ما کارت‌های شما را به صورت تک و تیراژ بالا، با روکش لمینتی جوهر افشان مستقیم و پرس‌های مغزی صنعتی بر روی باکیفیت‌ترین شیت‌های خام پی‌وی‌سی چاپ می‌کنیم.
          </p>
        </div>

        {/* Card Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {cardTypes.map((card) => (
            <div
              key={card.id}
              className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between text-right"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-lg group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                    {card.id === "smart_rfid" ? (
                      <Cpu className="w-6 h-6 text-indigo-700 group-hover:text-white" />
                    ) : card.id === "metalized" ? (
                      <Sparkles className="w-6 h-6 text-amber-600 group-hover:text-white" />
                    ) : card.id === "magnetic" ? (
                      <CreditCard className="w-6 h-6 text-blue-800 group-hover:text-white" />
                    ) : (
                      <Shield className="w-6 h-6 text-slate-700 group-hover:text-white" />
                    )}
                  </div>
                  <div className="text-left font-mono">
                    <span className="text-xs text-slate-400 block font-medium">{card.englishTitle}</span>
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg font-bold">
                      شروع از: {card.basePricePerCard.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-900 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-normal text-slate-500 leading-relaxed min-h-[64px]">
                    {card.description}
                  </p>
                </div>

                {/* Badges list */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {card.suggestedThicknesses.map((th, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-600 text-[10px] px-2.5 py-1 rounded-lg font-semibold"
                    >
                      {th}
                    </span>
                  ))}
                  <span className="bg-blue-50 text-blue-600 text-[10px] px-2.5 py-1 rounded-lg font-semibold">
                    حداقل تیراژ: {card.recommendedMinQty} عدد
                  </span>
                </div>

                {/* Highlighted bullets */}
                <ul className="border-t border-slate-100 pt-4 space-y-2">
                  {card.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => handleOrderRedirect(card.id)}
                  className="flex-1 bg-blue-900 hover:bg-blue-850 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-1"
                >
                  <span>ثبت سفارش و برآورد قیمت</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Card Thickness Interactive Module CARD */}
        <div className="bg-slate-900 border border-slate-850 text-white rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          
          {/* Subtle light spill */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-blue-950/40 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
            
            {/* Right: Controller Panel Farsi */}
            <div className="space-y-6 text-right">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3.5 py-1 rounded-md text-xs font-bold border border-blue-500/20">
                  <Layers className="w-3.5 h-3.5" />
                  <span>ابزار راهنمای فیزیکی ضخامت</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  کدام ضخامت PVC مناسب کسب‌وکار شماست؟
                </h3>
                <p className="text-xs text-slate-400 max-w-lg leading-relaxed font-sans">
                  تولید کارت پی‌وی‌سی در ابعاد فیزیکی مختلف انجام می‌شود. با کشیدن ضامن زیر، سختی و حس لمس فیزیکی هر ضخامت کارت را مقایسه کنید تا بر اساس نقشه فنی دقیق سفارش دهید.
                </p>
              </div>

              {/* Slider Controls */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                  <span>سخت (۷۶۰ میکرون - استاندارد خودپرداز)</span>
                  <span>نرم (۳۰۰ میکرون - انعطاف‌پذیر)</span>
                </div>
                <div className="relative group">
                  <input
                    type="range"
                    min="300"
                    max="760"
                    step="1"
                    value={selectedThickness}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val < 400) setSelectedThickness(300);
                      else if (val >= 400 && val < 630) setSelectedThickness(500);
                      else setSelectedThickness(760);
                    }}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {/* Visual markers */}
                  <div className="flex justify-between px-1 text-[11px] font-mono text-slate-400 mt-2">
                    <span onClick={() => setSelectedThickness(300)} className={`cursor-pointer font-bold ${selectedThickness === 300 ? 'text-blue-400 scale-105 font-sans' : 'hover:text-white'}`}>۳۰۰ میکرون (نرم)</span>
                    <span onClick={() => setSelectedThickness(500)} className={`cursor-pointer font-bold ${selectedThickness === 500 ? 'text-blue-400 scale-105 font-sans' : 'hover:text-white'}`}>۵۰۰ میکرون (متوسط)</span>
                    <span onClick={() => setSelectedThickness(760)} className={`cursor-pointer font-bold ${selectedThickness === 760 ? 'text-blue-400 scale-105 font-sans' : 'hover:text-white'}`}>۷۶۰ میکرون (سخت)</span>
                  </div>
                </div>

                {/* Description details of selected thickness */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block pb-0.5">انعطاف‌پذیری کارت:</span>
                      <strong className="text-white text-[13px]">{currentThickness.flexibility}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block pb-0.5">ضخامت اسمی:</span>
                      <strong className="text-blue-400 text-sm font-mono">{selectedThickness} Microns</strong>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    <span className="text-slate-400 text-[11px] block">حس لمس فیزیکی و مقاومت:</span>
                    <p className="text-slate-200 text-xs leading-relaxed mt-1">{currentThickness.feel}</p>
                  </div>
                  <div className="text-[11px] text-slate-400 border-t border-white/5 pt-1.5 flex gap-2.5">
                    <span className="text-blue-400 font-semibold shrink-0">بهتر از:</span>
                    <span>{currentThickness.compare}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left: Dynamic 3D Physical Preview Render of the card thickness */}
            <div className="flex flex-col items-center justify-center bg-slate-950/40 rounded-xl p-6 border border-white/5 aspect-square max-w-sm mx-auto w-full relative">
              <span className="absolute top-4 left-4 bg-white/5 border border-white/15 px-2.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                Interactive Rendering
              </span>

              {/* Side/Perspective Angle representation of Card Thickness */}
              <div className="relative w-full flex flex-col items-center justify-center gap-4 py-8">
                
                {/* Simulated Stack Height of card relative to standard stack */}
                <div className="relative w-56 h-36 bg-gradient-to-tr from-slate-800 to-slate-700 rounded-xl shadow-lg border border-white/10 flex items-center justify-center overflow-hidden">
                  {/* Real-time thickness indicator sidebar */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-blue-900 transition-all duration-500 ease-out flex items-center justify-center text-[10px] font-bold"
                    style={{ 
                      height: selectedThickness === 300 ? '25%' : selectedThickness === 500 ? '55%' : '95%' 
                    }}
                  >
                    <span className="bg-white text-blue-900 rounded font-mono px-1 py-0.5 scale-90">
                      {selectedThickness} µm
                    </span>
                  </div>
                  
                  {/* Isometric layers illustration lines representing plastic density */}
                  <div className="w-full h-[1.5px] bg-white/20 absolute top-1/4" />
                  <div className="w-full h-[1.5px] bg-white/20 absolute top-2/4" />
                  <div className="w-full h-[1.5px] bg-white/20 absolute top-3/4" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5))] pointer-events-none" />
                </div>

                {/* Stiffness Bending Curve Line simulation using CSS */}
                <div className="w-full max-w-[200px] mt-2 text-right">
                  <span className="text-[10px] text-slate-400 block mb-1">زاویه نهایی تغییر شکل ناشی از فشار:</span>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-l from-emerald-500 to-teal-400 transition-all duration-500" 
                      style={{ width: `${currentThickness.bendingScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                    <span>ثابت و بدون تغییر شکل</span>
                    <span>کاملا تاشو</span>
                  </div>
                </div>

                <div className="text-center font-mono text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-xl mt-3">
                  <span>ابعاد استاندارد: CR80 ISO</span>
                  <br />
                  <span className="text-[10px] text-slate-400 font-sans">۸۵.۶۰ میلی‌متر × ۵۳.۹۸ میلی‌متر</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

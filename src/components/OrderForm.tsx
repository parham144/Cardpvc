import React, { useState, useEffect, useRef, FormEvent } from "react";
import { OrderItem } from "../types";
import { Upload, CheckCircle2, AlertCircle, ShoppingBag, ShieldCheck, Mail, Phone, User, Landmark, MapPin, Layers, Sparkles, Printer, Cpu, Code } from "lucide-react";

interface OrderFormProps {
  selectedCardTypeForOrder: string;
  setSelectedCardTypeForOrder: (id: string) => void;
  onOrderSubmitted: () => void;
  setActiveTab: (tab: string) => void;
}

export default function OrderForm({
  selectedCardTypeForOrder,
  setSelectedCardTypeForOrder,
  onOrderSubmitted,
  setActiveTab,
}: OrderFormProps) {
  // Config state
  const [cardType, setCardType] = useState<string>(selectedCardTypeForOrder || "classic_business");
  const [thickness, setThickness] = useState<string>("760");
  const [printingMethod, setPrintingMethod] = useState<string>("color_double");
  const [finishType, setFinishType] = useState<string>("glossy");
  const [rfidChipType, setRfidChipType] = useState<string>("none");
  const [quantity, setQuantity] = useState<number>(300);

  // Extras
  const [hasMagneticStripe, setHasMagneticStripe] = useState<boolean>(false);
  const [hasSignaturePanel, setHasSignaturePanel] = useState<boolean>(false);
  const [hasScratchOff, setHasScratchOff] = useState<boolean>(false);
  const [hasVariableData, setHasVariableData] = useState<boolean>(false);

  // Design assistance
  const [designServiceOption, setDesignServiceOption] = useState<string>("upload"); // "upload" | "need_designer"
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; previewUrl?: string } | null>(null);
  const [validationChecks, setValidationChecks] = useState<{ label: string; passed: boolean }[]>([]);

  // Customer details
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");

  // Error messages
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Sync prop changes
  useEffect(() => {
    if (selectedCardTypeForOrder) {
      setCardType(selectedCardTypeForOrder);
      // Auto toggle smart defaults based on type
      if (selectedCardTypeForOrder === "smart_rfid") {
        setRfidChipType("mifare_1k");
        setThickness("760");
      } else if (selectedCardTypeForOrder === "metalized") {
        setFinishType("glossy");
        setThickness("760");
      } else if (selectedCardTypeForOrder === "magnetic") {
        setHasMagneticStripe(true);
        setThickness("760");
      } else {
        setRfidChipType("none");
      }
    }
  }, [selectedCardTypeForOrder]);

  // Pricing configuration multipliers
  const pricingConfig = {
    // Base card prices
    cardTypes: {
      classic_business: { name: "پی‌وی‌سی ساده کلاسیک", price: 1800 },
      smart_rfid: { name: "هوشمند RFID و فرکانسی", price: 4500 },
      metalized: { name: "متالایز لوکس (طلایی/نقره‌ای)", price: 5200 },
      personnel: { name: "پرسنلی شناسایی ویژه", price: 2500 },
      magnetic: { name: "مغناطیسی عابربانکی", price: 3800 },
      scratch_gift: { name: "کارت هدیه با رمز اسکرچ", price: 2900 },
    },
    // Thickness multipliers (added to base price per card)
    thickness: {
      "300": 0,
      "500": 250,
      "760": 500,
    },
    // Printing modifiers (added to base price per card)
    printing: {
      single_color: 300,
      color_single: 600,
      color_double: 1000,
      metallic: 1500,
    },
    // Finish modifiers
    finish: {
      glossy: 0,
      matte: 200,
      sand: 350,
      frosted: 400,
    },
    // RFID Chips
    rfid: {
      none: 0,
      mifare_1k: 1200,
      mifare_4k: 2000,
      em125: 800,
      ntag: 1800,
    },
    // Addons
    addons: {
      magneticStripe: 600,
      signaturePanel: 300,
      scratchOff: 450,
      variableData: 400,
    },
    designService: 150000, // Fixed fee in Tomans if requested
  };

  // Perform dynamic calculation
  const getSingleCardPrice = () => {
    const base = pricingConfig.cardTypes[cardType as keyof typeof pricingConfig.cardTypes]?.price || 1800;
    const thPrice = pricingConfig.thickness[thickness as keyof typeof pricingConfig.thickness] || 500;
    const prPrice = pricingConfig.printing[printingMethod as keyof typeof pricingConfig.printing] || 1000;
    const fnPrice = pricingConfig.finish[finishType as keyof typeof pricingConfig.finish] || 0;
    const chipPrice = cardType === "smart_rfid" ? (pricingConfig.rfid[rfidChipType as keyof typeof pricingConfig.rfid] || 0) : 0;

    let extras = 0;
    if (hasMagneticStripe) extras += pricingConfig.addons.magneticStripe;
    if (hasSignaturePanel) extras += pricingConfig.addons.signaturePanel;
    if (hasScratchOff) extras += pricingConfig.addons.scratchOff;
    if (hasVariableData) extras += pricingConfig.addons.variableData;

    return base + thPrice + prPrice + fnPrice + chipPrice + extras;
  };

  const rawSinglePrice = getSingleCardPrice();
  const rawTotalPrice = rawSinglePrice * quantity;

  // Bulk discount steps
  let discountPercentage = 0;
  if (quantity >= 200 && quantity < 500) discountPercentage = 5;
  else if (quantity >= 500 && quantity < 1000) discountPercentage = 10;
  else if (quantity >= 1000 && quantity < 5000) discountPercentage = 15;
  else if (quantity >= 5000) discountPercentage = 20;

  const discountAmount = Math.round(rawTotalPrice * (discountPercentage / 100));
  const discountedSubtotal = rawTotalPrice - discountAmount;

  const designFee = (designServiceOption === "need_designer" && quantity < 1000) ? pricingConfig.designService : 0;
  const vatAmount = Math.round((discountedSubtotal + designFee) * 0.09); // 9% tax
  const finalPrice = discountedSubtotal + designFee + vatAmount;

  // File Upload Simulator
  const triggerSimulatedUpload = () => {
    setIsUploading(true);
    setUploadStatus('idle');
    setValidationChecks([]);

    setTimeout(() => {
      // Create detailed CMYK checking items
      const steps = [
        { label: "ارزیابی اندازه ابعاد فایل شیت (۸۶.۰ × ۵۴.۰ میلی‌متر)", passed: true },
        { label: "اعتبارسنجی رزولوشن خروجی چاپ (بالای ۳۰۰ DPI)", passed: true },
        { label: "بررسی فرمت گاموت رنگی تصاویر (فضای رنگی CMYK مخصوص چاپ)", passed: true },
        { label: "اعتبارسنجی خط برش طرح و حاشیه امن ۲+ میلی‌متر سنتر کار", passed: true },
      ];

      setUploadedFile({
        name: `pvc-layout-design-${Math.floor(Math.random() * 10000)}.pdf`,
        size: "۴.۸ مگابایت",
        previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60" // beautiful abstract vector
      });
      setValidationChecks(steps);
      setIsUploading(false);
      setUploadStatus('success');
    }, 2500);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setValidationChecks([]);
  };

  // Submit flow
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!fullName.trim()) errors.fullName = "نام و نام خانوادگی خود را وارد کنید.";
    if (!phone.trim()) {
      errors.phone = "شماره تلفن همراه را وارد کنید.";
    } else if (!/^09\d{9}$/.test(phone.trim())) {
      errors.phone = "شماره موبایل وارد شده معتبر نیست (نمونه: 09123456789).";
    }
    if (!address.trim()) errors.address = "آدرس پستی دقیق جهت ارسال کارت‌ها الزامی است.";
    if (designServiceOption === "upload" && !uploadedFile) {
      errors.upload = "لطفاً ابتدا فایل طرح خود را آپلود کرده و اجازه دهید تست سلامت پاس شود.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // scroll to bottom where errors are or just hold
      const el = document.getElementById("checkout_scroll_target");
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setFormErrors({});

    // Create tracking code and order model
    const trackingNo = `RC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderItem = {
      id: `ORD-${Date.now()}`,
      cardTypeId: cardType,
      cardTitle: pricingConfig.cardTypes[cardType as keyof typeof pricingConfig.cardTypes]?.name || "سازگار PVC",
      thickness: `${thickness} مایکرو`,
      printingMethod: printingMethod === "color_double" ? "چاپ رنگی دورو" : printingMethod === "color_single" ? "چاپ رنگی یک‌رو" : printingMethod === "single_color" ? "چاپ تک‌رنگ سابلیمیشن" : "چاپ متالایز موضعی",
      finishType: finishType === "glossy" ? "روکش لمینت براق" : finishType === "matte" ? "روکش مات مخملی" : finishType === "sand" ? "بافت شنی خشن" : "پوشش سلفن نیمه‌شفاف",
      quantity: quantity,
      rfidChipType: cardType === "smart_rfid" ? rfidChipType : undefined,
      hasMagneticStripe,
      hasSignaturePanel,
      hasScratchOff,
      hasVariableData,
      designFile: uploadedFile || undefined,
      customerInfo: {
        fullName,
        phone,
        email,
        companyName,
        address,
        postalCode,
      },
      totalPrice: finalPrice,
      orderDate: new Date().toLocaleDateString("fa-IR"),
      status: 'pending_review',
      trackingCode: trackingNo
    };

    // Store order in localStorage
    const existingStr = localStorage.getItem("pvc_orders");
    const existing: OrderItem[] = existingStr ? JSON.parse(existingStr) : [];
    existing.unshift(newOrder); // Add to beginning of records
    localStorage.setItem("pvc_orders", JSON.stringify(existing));

    onOrderSubmitted();
    setActiveTab("history");
  };

  return (
    <div className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900">محاسبه آنلاین قیمت و ثبت سفارش</h2>
          <p className="text-sm text-slate-500">
            بر اساس مشخصات فنی مد نظر خود نظیر ضخامت رویه، تیراژ، و تراشه، قیمت دقیق فاکتور را به صورت آنی دریافت کنید و سفارش خود را فوراً ثبت نمایید.
          </p>
        </div>

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Panel: Configurations Options (Cols 7) */}
          <form onSubmit={handleCheckout} className="lg:col-span-7 bg-white shadow-md rounded-[2rem] p-6 sm:p-8 space-y-8 border border-slate-100 text-right">
            
            {/* Step 1: Card Base Type */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">۱. انتخاب نوع بستر شیت پی‌وی‌سی</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(pricingConfig.cardTypes).map(([id, item]) => {
                  const isSel = cardType === id;
                  return (
                    <button
                      type="button"
                      key={id}
                      onClick={() => {
                        setCardType(id);
                        setSelectedCardTypeForOrder(id);
                      }}
                      className={`p-4 rounded-2xl text-right border transition-all duration-300 flex flex-col justify-between gap-3 ${
                        isSel
                          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`text-[12.5px] font-bold ${isSel ? 'text-blue-900' : 'text-slate-800'}`}>{item.name}</span>
                      <span className="text-[11px] font-bold font-mono text-emerald-600 select-none">
                        پایه: {item.price.toLocaleString("fa-IR")} ت
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thickness and Printing Method (Two column on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Thickness Selection */}
              <div className="space-y-3">
                <span className="text-sm font-bold text-slate-800 block">ضخامت کارت PVC:</span>
                <select
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="300">۳۰۰ مایکرو (فوق نازک / بسیار نرم)</option>
                  <option value="500">۵۰۰ مایکرو (ضخامت متوسط نیمه‌انعطاف‌پذیر)</option>
                  <option value="760">۷۶۰ مایکرو (بانکی عابربانکی سخت - استاندارد)</option>
                </select>
                <p className="text-[10px] text-slate-400">۷۶۰ مایکرو محبوب‌ترین و استانداردترین ضخامت برای کارت‌های سفت است.</p>
              </div>

              {/* Printing Method */}
              <div className="space-y-3">
                <span className="text-sm font-bold text-slate-800 block">متد و نوع فرآیند چاپ:</span>
                <select
                  value={printingMethod}
                  onChange={(e) => setPrintingMethod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="color_double">چاپ جوهر مستقیم تمام‌رنگی دورو (+۱۰۰۰ ت)</option>
                  <option value="color_single">چاپ جوهر مستقیم تمام‌رنگی تک‌رو (+۶۰۰ ت)</option>
                  <option value="single_color">چاپ تک رنگ مشکی حرارتی دو طرفه (+۳۰۰ ت)</option>
                  <option value="metallic">چاپ رنگ‌های متالایز نقره/طلا موضعی (+۱۵۰۰ ت)</option>
                </select>
                <p className="text-[10px] text-slate-400">چاپ رنگی دورو لمینت گرم به همراه رزولوشن ۳۰۰DPI بهترین پایداری رنگ را دارد.</p>
              </div>

            </div>

            {/* If SMART RFID selected, show Chip selector */}
            {cardType === "smart_rfid" && (
              <div className="space-y-3 bg-indigo-50/50 border border-indigo-100 p-5 rounded-2xl animate-fade-in">
                <div className="flex items-center gap-1.5 text-indigo-900">
                  <Cpu className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-extrabold">انتخاب تراشه غیرتماسی RFID:</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <label className={`block p-3 rounded-xl border text-right cursor-pointer shadow-sm ${rfidChipType === 'mifare_1k' ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/10' : 'bg-white hover:bg-slate-50'}`}>
                    <input type="radio" name="rfid" value="mifare_1k" checked={rfidChipType === 'mifare_1k'} onChange={() => setRfidChipType('mifare_1k')} className="hidden" />
                    <span className="text-xs font-bold block text-slate-900">Mifare 1K (۱۳.۵۶MHz)</span>
                    <span className="text-[10px] text-slate-500 block mt-1">بیشترین هماهنگی با کارت حضوروغیاب و گیت</span>
                  </label>
                  <label className={`block p-3 rounded-xl border text-right cursor-pointer shadow-sm ${rfidChipType === 'em125' ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/10' : 'bg-white hover:bg-slate-50'}`}>
                    <input type="radio" name="rfid" value="em125" checked={rfidChipType === 'em125'} onChange={() => setRfidChipType('em125')} className="hidden" />
                    <span className="text-xs font-bold block text-slate-900">EM4100 (۱۲۵KHz Read-Only)</span>
                    <span className="text-[10px] text-slate-500 block mt-1">بلیط‌های شهربازی، قفل هوشمند کمد استخر</span>
                  </label>
                  <label className={`block p-3 rounded-xl border text-right cursor-pointer shadow-sm ${rfidChipType === 'ntag' ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/10' : 'bg-white hover:bg-slate-50'}`}>
                    <input type="radio" name="rfid" value="ntag" checked={rfidChipType === 'ntag'} onChange={() => setRfidChipType('ntag')} className="hidden" />
                    <span className="text-xs font-bold block text-slate-900">NTAG Standard NFC Chip</span>
                    <span className="text-[10px] text-slate-500 block mt-1">سازگان تام با موبایل، پیوند لینک شبکه‌های اجتماعی</span>
                  </label>
                  <label className={`block p-3 rounded-xl border text-right cursor-pointer shadow-sm ${rfidChipType === 'mifare_4k' ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/10' : 'bg-white hover:bg-slate-50'}`}>
                    <input type="radio" name="rfid" value="mifare_4k" checked={rfidChipType === 'mifare_4k'} onChange={() => setRfidChipType('mifare_4k')} className="hidden" />
                    <span className="text-xs font-bold block text-slate-900">Mifare 4K حافظه بالا</span>
                    <span className="text-[10px] text-slate-500 block mt-1">جهت پروژه‌های چندمنظوره رمزگذاری امنیتی</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Finishing and Materials */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 pt-2">
                <div className="bg-amber-50 text-amber-600 p-2 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">۲. نوع لمینیشن محافظ رویه کارت</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "glossy", label: "براق شیشه‌ای", desc: "شفاف، آینه‌ای دورو" },
                  { id: "matte", label: "مات مخملی", desc: "نرم، لوکس، بی اثرانگشت" },
                  { id: "sand", label: "بافت ماسه‌ای (شنی)", desc: "خشن، ضد خش دایمی" },
                  { id: "frosted", label: "نیمه‌شفاف مات", desc: "ظاهر مات ترنسپرنت" },
                ].map((finish) => {
                  const isSel = finishType === finish.id;
                  return (
                    <button
                      type="button"
                      key={finish.id}
                      onClick={() => setFinishType(finish.id)}
                      className={`p-3 rounded-xl text-center border transition-all duration-200 flex flex-col gap-1.5 items-center justify-center ${
                        isSel
                          ? "border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/10 text-amber-900 font-bold"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <span className="text-xs tracking-tight">{finish.label}</span>
                      <span className="text-[9px] text-slate-400 font-normal">{finish.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-on Extra Features checklist */}
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-800 block">امکانات اختصاصی افزوده برای کارت‌ها:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Magnet stipe */}
                <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${hasMagneticStripe ? 'bg-blue-50/30 border-blue-400 font-semibold' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                  <input
                    type="checkbox"
                    checked={hasMagneticStripe}
                    onChange={(e) => setHasMagneticStripe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-right">
                    <span className="text-xs text-slate-800 block">تعبیه نوار مغناطیسی عابربانک (+۶۰۰ ت)</span>
                    <span className="text-[10px] text-slate-400 font-normal">مناسب برای کلید اتاق هتل و ثبت در پوزهای مگنت‌خوان</span>
                  </div>
                </label>

                {/* Signature Panel */}
                <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${hasSignaturePanel ? 'bg-blue-50/30 border-blue-400 font-semibold' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                  <input
                    type="checkbox"
                    checked={hasSignaturePanel}
                    onChange={(e) => setHasSignaturePanel(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-right">
                    <span className="text-xs text-slate-800 block">پنل کاغذی محل امضا مشتری (+۳۰۰ ت)</span>
                    <span className="text-[10px] text-slate-400 font-normal">امکان نوشتن دستی اطلاعات نظیر تاریخ با خودکار ابری</span>
                  </div>
                </label>

                {/* Scratch element */}
                <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${hasScratchOff ? 'bg-blue-50/30 border-blue-400 font-semibold' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                  <input
                    type="checkbox"
                    checked={hasScratchOff}
                    onChange={(e) => setHasScratchOff(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-right">
                    <span className="text-xs text-slate-800 block">پوشش اسکرچ امنیتی نقره‌ای (+۴۵۰ ت)</span>
                    <span className="text-[10px] text-slate-400 font-normal">جهت مخفی قالبهای گارانتی، پسوردها و کدهای قرعه‌کشی</span>
                  </div>
                </label>

                {/* Variable code */}
                <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${hasVariableData ? 'bg-blue-50/30 border-blue-400 font-semibold' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                  <input
                    type="checkbox"
                    checked={hasVariableData}
                    onChange={(e) => setHasVariableData(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-right">
                    <span className="text-xs text-slate-800 block">چاپ دیتابیس متغیر / بارکد منحصربه‌فرد (+۴۰۰ ت)</span>
                    <span className="text-[10px] text-slate-400 font-normal">چاپ شماره سریال‌های متوالی، بارکدهای متغیر یا نام پرسنل</span>
                  </div>
                </label>

              </div>
            </div>

            {/* Step 4: Layout and Design File Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 pt-2">
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
                  <Printer className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">۳. ارسال طرح لایه‌باز گرافیکی</h3>
              </div>

              {/* Design Selector Toggle */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                <button
                  type="button"
                  onClick={() => setDesignServiceOption("upload")}
                  className={`text-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                    designServiceOption === "upload"
                      ? "bg-white text-slate-900 shadow-md"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  طرح آماده با فرمت استاندارد دارم
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDesignServiceOption("need_designer");
                    resetUpload();
                  }}
                  className={`text-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                    designServiceOption === "need_designer"
                      ? "bg-white text-slate-900 shadow-md"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  طرح ندارم (سفارش طراحی اختصاصی)
                </button>
              </div>

              {/* Upload Panel if "upload" chose */}
              {designServiceOption === "upload" ? (
                <div className="space-y-4">
                  {uploadedFile ? (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 animate-fade-in text-right">
                      <div className="flex items-center gap-3">
                        {uploadedFile.previewUrl ? (
                          <img src={uploadedFile.previewUrl} referrerPolicy="no-referrer" alt="design preview" className="w-12 h-12 object-cover rounded-xl border border-slate-200" />
                        ) : (
                          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                            <Upload className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <span className="text-xs font-bold text-slate-900 block truncate max-w-[200px]">{uploadedFile.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{uploadedFile.size} • تست سلامت رنگ: پاس شده ✅</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={resetUpload}
                        className="text-[11px] text-rose-600 hover:text-rose-800 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 transition-colors shrink-0"
                      >
                        حذف و تغییر طرح
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={triggerSimulatedUpload}
                      className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
                        isUploading
                          ? "border-amber-400 bg-amber-50/20"
                          : "border-slate-300 hover:border-blue-500 hover:bg-slate-50/50"
                      }`}
                    >
                      {isUploading ? (
                        <div className="space-y-3 flex flex-col items-center">
                          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          <p className="text-xs font-bold text-slate-800 animate-pulse">در حال تجزیه و تحلیل هندسه طرح، رزولوشن DPI و گاموت رنگی...</p>
                        </div>
                      ) : (
                        <div className="space-y-2 flex flex-col items-center">
                          <div className="bg-slate-100 p-3.5 rounded-2xl text-slate-500">
                            <Upload className="w-6 h-6 text-slate-600" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-blue-600">جهت آپلود، فایل طرح را بکشید یا اینجا کلیک کنید</span>
                            <p className="text-[10px] text-slate-400 mt-1">فرمت‌های مجاز: PSD, PDF, CDR, TIFF, PNG (ابعاد سنتریک ۸۶×۵۴ با رزولوشن ۳۰۰DPI)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {formErrors.upload && (
                    <p className="text-xs text-rose-600 font-bold flex gap-1 items-center bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{formErrors.upload}</span>
                    </p>
                  )}

                  {/* Healthy specs validator metrics */}
                  {validationChecks.length > 0 && (
                    <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/15 text-right space-y-2.5 animate-fade-in">
                      <span className="text-[11px] font-bold text-emerald-900 block border-b border-emerald-500/10 pb-1.5">ارزیابی تضمین چاپ استاندارد برای طرح پیوست:</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
                        {validationChecks.map((v, i) => (
                          <li key={i} className="flex gap-1.5 items-center text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{v.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl text-right text-xs text-blue-900 leading-relaxed space-y-2">
                  <p className="font-extrabold flex gap-1.5 items-center">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>سفارش خدمات طراحی اختصاصی با رایانس کارت</span>
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    گروه طراحان مستقر در چاپخانه ما بر اساس لوگو و مشخصات هویتی سازمان شما، دو طرح خلاقانه (رو و پشت کارت) طراحی و برای شما ارسال می‌کنند.
                    {quantity >= 1000 ? (
                      <strong className="text-emerald-700 block mt-1 font-sans">🎉 به دلیل سفارش بالای ۱۰۰۰ عدد کارت، خدمات طراحی لایه‌باز برای شما ۱۰۰٪ رایگان انجام می‌شود!</strong>
                    ) : (
                      <strong className="text-slate-700 block mt-1 font-sans">هزینه ثابت طراحی: ۱۵۰,۰۰۰ تومان (اضافه شده به جمع کل)</strong>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Step 5: Customer Shipping details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 pt-2">
                <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">۴. اطلاعات خریدار و تحویل‌گیرنده</h3>
              </div>

              {/* Grid block info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* FullName */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex gap-1"><User className="w-3 h-3 text-slate-400 mt-0.5" /> نام و نام خانوادگی خریدار (الزامی): </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: پوریا محتاج فر"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                  {formErrors.fullName && <p className="text-[10px] text-rose-500 font-bold">{formErrors.fullName}</p>}
                </div>

                {/* Mobile phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex gap-1"><Phone className="w-3 h-3 text-slate-400 mt-0.5" /> شماره همراه سوپروایزر ثبت (الزامی): </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="نمونه: ۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-semibold font-mono text-left"
                  />
                  {formErrors.phone && <p className="text-[10px] text-rose-500 font-bold">{formErrors.phone}</p>}
                </div>

                {/* Email address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex gap-1"><Mail className="w-3 h-3 text-slate-400 mt-0.5" /> آدرس ایمیل جهت ارسال فاکتور رسمی: </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-semibold font-mono text-left"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex gap-1"><Landmark className="w-3 h-3 text-slate-400 mt-0.5" /> نام شرکت یا موسسه ثبت (اختیاری): </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="مثال: شرکت پتروشیمی زاگرس"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                  />
                </div>

              </div>

              {/* Postal address & code */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex gap-1"><MapPin className="w-3 h-3 text-slate-400 mt-0.5" /> آدرس دقیق محل تحویل سفارش چاپ (الزامی): </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک، واحد، کد طبقه جهت ارسال فوری با پیک چاپخانه"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-2xl px-3.5 py-2.5 text-xs font-semibold resize-none"
                  />
                  {formErrors.address && <p className="text-[10px] text-rose-500 font-bold">{formErrors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">کد پستی ده رقمی: </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="۴۸۲۰۱-۹۳۶۴۱"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-semibold font-mono text-left"
                    />
                  </div>
                  <div className="flex items-end text-slate-400 text-[10px] leading-relaxed pb-3">
                    ✔ حمل کلیه محصولات رایانس کارت برای استان همجوار با بیمه سلامت کالا صورت می‌گیرد.
                  </div>
                </div>
              </div>
            </div>

            <div id="checkout_scroll_target" />
          </form>

          {/* Left Panel: Real-time Pricing Invoice Calculator (Cols 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real-time configuration summary & Invoice breakdown */}
            <div className="bg-slate-900 text-white rounded-[2.2rem] p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden text-right">
              
              {/* Decorative faint hologram overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6 relative">
                
                {/* Header */}
                <div className="pb-4 border-b border-slate-800 flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-white text-base">پیش‌فاکتور محاسباتی آنی</h3>
                    <p className="text-[10px] text-slate-400 mt-1">برآورد سیستم مکانیزه بر اساس جدول نرخ مصوب صنف</p>
                  </div>
                  <ShoppingBag className="w-5 h-5 text-blue-500 shrink-0" />
                </div>

                {/* Main parameters review */}
                <div className="space-y-3.5">
                  
                  {/* Quantity Slider config */}
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span>تیراژ نهایی (تعداد کارت):</span>
                      <span className="font-mono text-blue-400 font-bold text-sm bg-blue-500/10 px-2.5 py-0.5 rounded-full">{quantity} عدد</span>
                    </div>
                    <div>
                      <input
                        type="range"
                        min="50"
                        max="5000"
                        step="50"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>۵۰ عدد</span>
                        <span>۲۵۰ عدد</span>
                        <span>۱۰۰۰ عدد</span>
                        <span>۵۰۰۰+ عدد</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary grid block */}
                  <div className="space-y-2.5 text-xs pt-1">
                    <div className="flex justify-between text-slate-400">
                      <span>گزینه نوع بدنه کارت:</span>
                      <span className="text-white font-medium">
                        {pricingConfig.cardTypes[cardType as keyof typeof pricingConfig.cardTypes]?.name || ""}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>ضخامت ساخت نهایی:</span>
                      <span className="text-white font-medium">{thickness} مایکرو</span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>متد چاپ انتخابی:</span>
                      <span className="text-white font-medium">
                        {printingMethod === "color_double" ? "تمام‌رنگی دورو" : printingMethod === "color_single" ? "تمام‌رنگی یک‌رو" : printingMethod === "single_color" ? "مشکی دوطرفه" : "نقره کتان موضعی"}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>بافت روکش لایه رویی:</span>
                      <span className="text-white font-medium">
                        {finishType === "glossy" ? "براق جلا" : finishType === "matte" ? "مات ساتن" : finishType === "sand" ? "شنی زبر" : "شبه ترنسپرنت"}
                      </span>
                    </div>

                    {cardType === "smart_rfid" && rfidChipType !== "none" && (
                      <div className="flex justify-between text-slate-400">
                        <span>تراشه رادیو فرکانسی RFID:</span>
                        <span className="text-indigo-400 font-bold font-mono">
                          {rfidChipType === 'mifare_1k' ? 'Mifare 1K' : rfidChipType === 'em125' ? 'EM125KHz' : rfidChipType === 'ntag' ? 'NFC NTAG' : 'Mifare 4K'}
                        </span>
                      </div>
                    )}

                    {/* Extras listing row if activated */}
                    {(hasMagneticStripe || hasSignaturePanel || hasScratchOff || hasVariableData) && (
                      <div className="border-t border-white/5 pt-2 flex flex-col gap-1.5 text-slate-400 text-[11px]">
                        <span className="text-white font-semibold">خدمات لایه‌کوبی فرعی فعال:</span>
                        <div className="flex flex-wrap gap-1">
                          {hasMagneticStripe && <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[9.5px]">نوار مگنت</span>}
                          {hasSignaturePanel && <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[9.5px]">پنل امضا</span>}
                          {hasScratchOff && <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[9.5px]">رمز اسکرچ</span>}
                          {hasVariableData && <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[9.5px]">بارکد متغیر</span>}
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* Computed Price Lines Invoice */}
                <div className="border-t border-slate-800 pt-5 space-y-3.5 text-right">
                  
                  {/* Single unit item rate */}
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>تعرفه تمام‌شده هر تک کارت:</span>
                    <span className="text-[13px] font-bold text-white font-mono">{rawSinglePrice.toLocaleString("fa-IR")} تومان</span>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>جمع کل مواد خام سبد خرید:</span>
                    <span className="text-[13px] font-bold text-white font-mono">{rawTotalPrice.toLocaleString("fa-IR")} تومان</span>
                  </div>

                  {/* Bulk discount value if triggered */}
                  {discountPercentage > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                      <span>تخفیف همکاری متناسب با تیراژ ({discountPercentage}%):</span>
                      <span className="font-mono">-{discountAmount.toLocaleString("fa-IR")} تومان</span>
                    </div>
                  )}

                  {/* Design fee line */}
                  {designFee > 0 && (
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>تعرفه خدمات آتلیه طراحی رایانس:</span>
                      <span className="text-white font-mono">{designFee.toLocaleString("fa-IR")} تومان</span>
                    </div>
                  )}

                  {/* Value Add Tax (VAT 9%) */}
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>مالیات بر ارزش افزوده و عوارض (۹٪):</span>
                    <span className="text-white font-mono">{vatAmount.toLocaleString("fa-IR")} تومان</span>
                  </div>

                  {/* Final pay value */}
                  <div className="border-t border-slate-800 pt-4 flex justify-between items-center bg-blue-600/-5 rounded-2xl p-3 border border-dashed border-blue-500/20">
                    <div>
                      <span className="text-[10px] text-slate-300 block">جمع نهایی صدور فاکتور قابل تسویه:</span>
                      <span className="text-xs text-emerald-400 font-semibold">همراه با ضمانت مرجوعی کالا</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-blue-400 font-mono">
                      {finalPrice.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>

                </div>

                {/* Submit Trigger in Invoice Block */}
                <div className="pt-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all text-center text-sm"
                  >
                    ثبت نهایی و ثبت سفارش آنلاین
                  </button>
                  <p className="text-[10.5px] text-center text-slate-400 mt-3 leading-relaxed">
                    با کلیک روی دکمه فوق، سفارش لایه‌باز شما فوراً ثبث شده و به بخش بازبینی فنی اپراتورهای چاپخانه ارسال می‌گردد.
                  </p>
                </div>

              </div>

            </div>

            {/* Quality Standard Badges box */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 text-right space-y-4 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm flex gap-2 items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>فرآیند تضمین کیفیت رایانس کارت</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span><strong>امکان چاپ نمونه آزمایشی:</strong> قبل از شروع اجرای سفارش اصلی، یک عدد پی‌وی‌سی پیش‌نمونه به صورت رایگان چاپ و عکس آن از طریق ایمیل یا شبکه‌های اجتماعی برای شما ارسال می‌شود.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span><strong>کالیبراسیون تخصصی سنسورها:</strong> دستگاه‌های صنعتی تئوری کالیبراسیون دوره‌ای بر اساس پروفایل های رنگی اختصاصی را دارا می‌باشند؛ بنابراین رنگ نهایی کارت با طرح ارسالی شما بالای ۹۵٪ یکسان خواهد بود.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

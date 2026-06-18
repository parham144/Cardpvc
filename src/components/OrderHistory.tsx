import { useState, useEffect } from "react";
import { OrderItem } from "../types";
import { History, ClipboardList, CheckCircle2, Search, RotateCcw, ShoppingBag, Truck, Calendar, CreditCard, ChevronLeft, Download, X, Eye, FileText, Smartphone } from "lucide-react";

interface OrderHistoryProps {
  onOrderChanged: () => void;
  setActiveTab: (tab: string) => void;
}

export default function OrderHistory({ onOrderChanged, setActiveTab }: OrderHistoryProps) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedInvoice, setSelectedInvoice] = useState<OrderItem | null>(null);

  const fetchOrders = () => {
    const existingStr = localStorage.getItem("pvc_orders");
    const existing: OrderItem[] = existingStr ? JSON.parse(existingStr) : [];
    setOrders(existing);
  };

  useEffect(() => {
    fetchOrders();
    // Add event listener for local storage changes from parent
    window.addEventListener("storage", fetchOrders);
    return () => window.removeEventListener("storage", fetchOrders);
  }, []);

  const handleSimulatePayment = (orderId: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        // Awaiting payment -> Awaiting design check/printing
        const nextStatus = o.status === "pending_review" ? "awaiting_payment" :
                           o.status === "awaiting_payment" ? "printing" :
                           o.status === "printing" ? "shipped" : "delivered";
        return { ...o, status: nextStatus };
      }
      return o;
    });

    localStorage.setItem("pvc_orders", JSON.stringify(updated));
    setOrders(updated);
    onOrderChanged();
  };

  const handleClearHistory = () => {
    if (window.confirm("تایید می‌کنید کل تاریخچه سفارشات محلی شما پاک شود؟")) {
      localStorage.removeItem("pvc_orders");
      setOrders([]);
      onOrderChanged();
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.cardTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status map helpers
  const getStatusLabelAndColor = (status: OrderItem["status"]) => {
    switch (status) {
      case "pending_review":
        return { label: "در حال بررسی فنی فایل لایه‌باز", color: "text-amber-600 bg-amber-50 border-amber-100", step: 1 };
      case "awaiting_payment":
        return { label: "منتظر پرداخت فاکتور مراجع", color: "text-blue-600 bg-blue-50 border-blue-100", step: 2 };
      case "printing":
        return { label: "در صف چاپخانه دیجیتال", color: "text-indigo-600 bg-indigo-50 border-indigo-100", step: 3 };
      case "shipped":
        return { label: "بارگیری شده در پیک ارسال", color: "text-purple-600 bg-purple-50 border-purple-100", step: 4 };
      case "delivered":
        return { label: "سفارش با موفقیت تحویل شد", color: "text-emerald-600 bg-emerald-50 border-emerald-100", step: 5 };
    }
  };

  return (
    <div className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 text-right">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <History className="w-7 h-7 text-blue-600 shrink-0" />
              <span>پورتال رهگیری و تاریخچه سفارشات</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1.5">
              وضعیت پرونده‌های لایه‌باز ارسالی، زمانبندی چاپ دیجیتال و ارسال محلی کالا را به صورت ۲۴ ساعته رصد کنید.
            </p>
          </div>
          
          {orders.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold bg-rose-50 hover:bg-rose-100 border border-rose-100 px-4 py-2.5 rounded-xl transition-all"
            >
              پاک کردن تاریخچه محلی
            </button>
          )}
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto space-y-6 flex flex-col items-center">
            <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
              <ClipboardList className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-slate-900">سفارشی هنوز پیدا نشد!</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                هیچ سفارشی به ثبت نرسیده است. شما می‌توانید با استفاده از بخش محاسبه آنلاین قیمت، مشخصات کارت مورد نیاز خود را تعیین کرده و سفارش خود را در چند ثانیه ثبت کنید.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("order")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-md cursor-pointer transition-all"
            >
              ثبت اولین سفارش پی‌وی‌سی
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Search Filter input */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 text-right">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="کد رهگیری (مثلاً RC-...). نام خریدار یا مدل کارت را جستجو کنید..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-semibold focus:outline-none bg-transparent"
              />
            </div>

            {/* Orders list */}
            <div className="space-y-6">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-500 text-xs border">
                  متاسفانه موردی مطابق با جستجوی شما پیدا نشد.
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const statusInfo = getStatusLabelAndColor(order.status);
                  return (
                    <div
                      key={order.id}
                      className="bg-white border border-slate-100 rounded-[2.2rem] p-6 sm:p-8 shadow-sm text-right space-y-6 relative hover:shadow-md transition-all duration-300"
                    >
                      {/* Top Header Card */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm sm:text-base text-slate-900">{order.cardTitle}</span>
                            <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-mono">{order.id}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 block font-sans">ثبت شده در تاریخ: {order.orderDate}</span>
                        </div>

                        {/* Action status */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs px-3.5 py-1.5 rounded-xl border font-bold ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                          <span className="font-mono text-xs text-blue-600 bg-blue-100/50 border border-blue-100 font-extrabold px-3.5 py-1.5 rounded-xl">
                            کد رهگیری: {order.trackingCode}
                          </span>
                        </div>
                      </div>

                      {/* Technical specifications review details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[11px]">ضخامت پایه:</span>
                          <span className="text-slate-800 font-bold block mt-0.5">{order.thickness}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">پوشش لمینیشن:</span>
                          <span className="text-slate-800 font-bold block mt-0.5">{order.finishType}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">تیراژ چاپی:</span>
                          <span className="text-slate-800 font-bold block mt-0.5 font-mono">{order.quantity} عدد</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">مبلغ کل پرداخت:</span>
                          <span className="text-emerald-600 font-bold block mt-0.5 font-mono">{order.totalPrice.toLocaleString("fa-IR")} تومان</span>
                        </div>
                      </div>

                      {/* Tracking Live Interactive Timeline */}
                      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-6">
                        
                        {/* Timeline graphic rendering */}
                        <span className="text-xs font-bold text-slate-500 block mb-3 border-b border-slate-200/80 pb-2">خط پیشرفت تولید فیزیکی سفارش:</span>
                        
                        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 md:px-4">
                          
                          {/* Horizontal Connector Line in Desktop */}
                          <div className="absolute left-6 right-6 top-[22px] h-[3px] bg-slate-200 hidden md:block" />
                          {/* Completed glow indicator connector */}
                          <div 
                            className="absolute right-6 top-[22px] h-[3px] bg-blue-600 hidden md:block transition-all duration-500 rounded" 
                            style={{ 
                              left: statusInfo.step === 1 ? '75%' : statusInfo.step === 2 ? '55%' : statusInfo.step === 3 ? '35%' : statusInfo.step === 4 ? '15%' : '6%' 
                            }}
                          />

                          {/* Steps loop */}
                          {[
                            { stepNo: 1, label: "ثبت اولیه", icon: ShoppingBag, desc: "آپلود و بررسی اولیه" },
                            { stepNo: 2, label: "بازبینی لایه‌باز", icon: FileText, desc: "بررسی CMYK و فلیم" },
                            { stepNo: 3, label: "صف چاپخانه", icon: History, desc: "تزریق شیت و روکش لمینیر" },
                            { stepNo: 4, label: "ارسال مرسوله", icon: Truck, desc: "تحویل با پیک تخصصی" },
                            { stepNo: 5, label: "تحویل نهایی", icon: CheckCircle2, desc: "بررسی رضایت‌مندی" },
                          ].map((step) => {
                            const isCompl = statusInfo.step >= step.stepNo;
                            const isCurr = statusInfo.step === step.stepNo;
                            const S_Icon = step.icon;

                            return (
                              <div key={step.stepNo} className="relative flex items-center md:flex-col gap-3 md:gap-2 text-right md:text-center z-10 flex-1 w-full md:w-auto">
                                <div
                                  className={`w-11 h-11 flex items-center justify-center rounded-2xl border-2 transition-all shrink-0 ${
                                    isCompl
                                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                                      : "bg-white border-slate-200 text-slate-400"
                                  } ${isCurr ? "ring-4 ring-blue-500/15 scale-110" : ""}`}
                                >
                                  <S_Icon className="w-5 h-5 shrink-0" />
                                </div>
                                <div className="space-y-0.5">
                                  <span className={`text-[12.5px] font-bold block ${isCompl ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
                                  <span className="text-[10px] text-slate-400 block md:max-w-[110px] md:mx-auto">{step.desc}</span>
                                </div>
                              </div>
                            );
                          })}

                        </div>
                      </div>

                      {/* Control panel for simulating processes */}
                      <div className="pt-2 flex flex-wrap gap-2.5 items-center justify-between">
                        
                        {/* Simulation instructions */}
                        <div className="flex gap-2 items-center bg-blue-50/50 text-blue-900 text-[10.5px] px-3 py-2 rounded-xl border border-blue-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                          <span>جهت مشاهده تغییرات فرآیند تولید شیت هم‌اکنون از ابزار شبیه‌ساز سفارش استفاده نمایید.</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => setSelectedInvoice(order)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                          >
                            <FileText className="w-4 h-4 text-slate-500" />
                            <span>مشاهده تصویر رسمی فاکتور</span>
                          </button>
                          
                          {order.status !== "delivered" && (
                            <button
                              onClick={() => handleSimulatePayment(order.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:shadow"
                            >
                              <RotateCcw className="w-4 h-4 text-blue-200 shrink-0" />
                              <span>وضعیت بعدی تولید (شبیه‌ساز)</span>
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* Invoice styled Overlay Detail Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 text-right shadow-2xl relative border border-slate-100" onClick={(e) => e.stopPropagation()}>
              
              {/* Close */}
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-4 left-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Invoice Layout Farsi */}
              <div className="border border-slate-200 rounded-2xl p-5 space-y-6 mt-4 relative">
                
                {/* Official seal banner */}
                <div className="absolute top-4 left-4 bg-emerald-50 text-emerald-800 text-[10px] px-2.5 py-1 rounded border border-emerald-200 font-bold select-none">
                  رئیس حسابداری: تایید شده
                </div>

                {/* Print Shop Logo Brand */}
                <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-extrabold text-blue-700">فاکتور فروش کالا و خدمات چاپخانه</h3>
                    <p className="text-[10px] text-slate-400 mt-1">واحد مالی رایانس کارت (ثبت رسمی تعاونی چاپ تهران)</p>
                  </div>
                  <div className="text-left text-[11px] font-mono text-slate-500 space-y-0.5 leading-snug">
                    <p>تاریخ فاکتور: {selectedInvoice.orderDate}</p>
                    <p>شناسه: {selectedInvoice.id}</p>
                    <p>کد پیگیری: {selectedInvoice.trackingCode}</p>
                  </div>
                </div>

                {/* Delivery data table */}
                <div className="bg-slate-50 rounded-xl p-3.5 text-xs grid grid-cols-2 gap-3 border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[10.5px]">خریدار:</span>
                    <strong className="text-slate-800 font-sans block mt-0.5">{selectedInvoice.customerInfo.fullName}</strong>
                  </div>
                  {selectedInvoice.customerInfo.companyName && (
                    <div>
                      <span className="text-slate-400 text-[10.5px]">کد موسسه:</span>
                      <strong className="text-slate-800 font-sans block mt-0.5">{selectedInvoice.customerInfo.companyName}</strong>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 text-[10.5px]">شماره تماس:</span>
                    <strong className="text-slate-800 font-mono block mt-0.5 text-left">{selectedInvoice.customerInfo.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10.5px]">آدرس ارسال:</span>
                    <strong className="text-slate-800 font-sans block mt-0.5 truncate max-w-[180px]" title={selectedInvoice.customerInfo.address}>{selectedInvoice.customerInfo.address}</strong>
                  </div>
                </div>

                {/* Details Table */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-700 text-xs block">شرح اقلام سفارش چاپی مکتوب:</span>
                  
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-right border-collapse text-[11.5px]">
                      <thead>
                        <tr className="bg-slate-100/80 border-b border-slate-200 font-bold text-slate-700">
                          <th className="py-2 px-3">موضوع فاکتور</th>
                          <th className="py-2 px-3 text-center">تیراژ</th>
                          <th className="py-2 px-3 text-left">هزینه نهایی</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 px-3">
                            <span className="font-bold text-slate-900 block">{selectedInvoice.cardTitle}</span>
                            <span className="text-[10px] text-slate-400 font-sans block mt-0.5">ضخامت {selectedInvoice.thickness} • روکش {selectedInvoice.finishType}</span>
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold">{selectedInvoice.quantity} کارت</td>
                          <td className="py-3 px-3 text-left font-mono font-bold text-slate-800">{selectedInvoice.totalPrice.toLocaleString("fa-IR")} تومان</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Final prices listing, VAT included */}
                <div className="space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-500 text-left flex flex-col items-end">
                  <div className="w-64 space-y-1.5 text-right text-[11px]">
                    <div className="flex justify-between">
                      <span>جمع اقلام لمینتی:</span>
                      <strong className="text-slate-800 font-mono">{(selectedInvoice.totalPrice - Math.round(selectedInvoice.totalPrice * 0.082)).toLocaleString("fa-IR")} تومان</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>عوارض و مالیات ارزش افزوده (۹٪):</span>
                      <strong className="text-slate-800 font-mono">{Math.round(selectedInvoice.totalPrice * 0.082).toLocaleString("fa-IR")} تومان</strong>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-slate-900 text-xs font-extrabold font-sans">
                      <span>مبلغ کل فاکتور تسویه:</span>
                      <strong className="text-blue-700 font-mono">{selectedInvoice.totalPrice.toLocaleString("fa-IR")} تومان</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => {
                    alert("تصویر پیش‌فاکتور با موفقیت در فولدر دانلود سیستم شما در قالب سند امن بارگذاری شد.");
                    setSelectedInvoice(null);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-blue-200" />
                  <span>دانلود سند حسابداری رسمی (PDF)</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  بستن پیش‌نویس
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

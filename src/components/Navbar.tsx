import { useState, useEffect } from "react";
import { CreditCard, Menu, X, History, Layers, ClipboardList, Briefcase, HelpCircle } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  orderCount: number;
}

export default function Navbar({ activeTab, setActiveTab, orderCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "خانه", icon: Layers },
    { id: "showcase", label: "انواع کارت PVC", icon: CreditCard },
    { id: "portfolio", label: "گالری نمونه‌کارها", icon: Briefcase },
    { id: "order", label: "سفارش آنلاین", icon: ClipboardList },
    { id: "history", label: "رهگیری سفارشات", icon: History, badge: orderCount > 0 ? orderCount : undefined },
    { id: "faq", label: "سوالات متداول", icon: HelpCircle },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-900/10">
              <CreditCard className="w-5.5 h-5.5" />
            </div>
            <div className="text-right">
              <span className="font-extrabold text-lg tracking-tight text-slate-800 block">
                رایانِـس کارت
              </span>
              <p className="text-[10px] text-slate-500 font-medium leading-none">سفارش و چاپ تخصصی انواع کارت PVC</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-900 bg-blue-50/70 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-900" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold animate-bounce shadow-md">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setActiveTab("order")}
              className="bg-blue-900 hover:bg-blue-850 text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200"
            >
              ثبت سفارش آنلاین
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-xl transition-all duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-900 bg-blue-50 text-right font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-900" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="bg-rose-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                      {item.badge} عدد
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-4 px-4">
              <button
                onClick={() => {
                  setActiveTab("order");
                  setIsOpen(false);
                }}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white text-center py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all duration-200"
              >
                ثبت سفارش آنلاین
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CardShowcase from "./components/CardShowcase";
import Portfolio from "./components/Portfolio";
import OrderForm from "./components/OrderForm";
import OrderHistory from "./components/OrderHistory";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [selectedCardTypeForOrder, setSelectedCardTypeForOrder] = useState<string>("classic_business");
  const [orderCount, setOrderCount] = useState<number>(0);

  // Sync order counts from local storage
  const syncOrderCount = () => {
    try {
      const ordersStr = localStorage.getItem("pvc_orders");
      if (ordersStr) {
        const parsed = JSON.parse(ordersStr);
        setOrderCount(Array.isArray(parsed) ? parsed.length : 0);
      } else {
        setOrderCount(0);
      }
    } catch (e) {
      console.error("Error reading localStorage order count", e);
    }
  };

  useEffect(() => {
    syncOrderCount();
    // Watch for custom events
    const handleStorageChange = () => syncOrderCount();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleOrderSubmitted = () => {
    syncOrderCount();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <div className="space-y-4">
            <Hero setActiveTab={setActiveTab} />
            <CardShowcase
              setActiveTab={setActiveTab}
              setSelectedCardTypeForOrder={setSelectedCardTypeForOrder}
            />
            <FAQ />
          </div>
        );
      case "showcase":
        return (
          <div className="pt-20">
            <CardShowcase
              setActiveTab={setActiveTab}
              setSelectedCardTypeForOrder={setSelectedCardTypeForOrder}
            />
          </div>
        );
      case "portfolio":
        return (
          <div className="pt-20">
            <Portfolio
              setActiveTab={setActiveTab}
              setSelectedCardTypeForOrder={setSelectedCardTypeForOrder}
            />
          </div>
        );
      case "order":
        return (
          <div className="pt-20">
            <OrderForm
              selectedCardTypeForOrder={selectedCardTypeForOrder}
              setSelectedCardTypeForOrder={setSelectedCardTypeForOrder}
              onOrderSubmitted={handleOrderSubmitted}
              setActiveTab={setActiveTab}
            />
          </div>
        );
      case "history":
        return (
          <div className="pt-20">
            <OrderHistory
              onOrderChanged={syncOrderCount}
              setActiveTab={setActiveTab}
            />
          </div>
        );
      case "faq":
        return (
          <div className="pt-20">
            <FAQ />
          </div>
        );
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans select-none antialiased text-[#1e293b] bg-[#f8fafc]">
      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab === "hero" ? "hero" : activeTab}
        setActiveTab={setActiveTab}
        orderCount={orderCount}
      />

      {/* Main Dynamic Workspace Content */}
      <main className="flex-1 transition-all duration-300">
        {renderContent()}
      </main>

      {/* Footer Navigation */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

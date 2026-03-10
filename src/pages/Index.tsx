import { useState, useEffect, useCallback } from "react";
import { X, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import LeadForm1 from "@/components/landing/LeadForm1";
import PricingSection from "@/components/landing/PricingSection";
import AuditForm from "@/components/landing/AuditForm";
import GuaranteeSection from "@/components/landing/GuaranteeSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import FAQSection from "@/components/landing/FAQSection";
import InefficiencySection from "@/components/landing/InefficiencySection";
import Footer from "@/components/landing/Footer";

import FloatingWidgets from "@/components/landing/FloatingWidgets";

const WEBHOOK_URL = "https://hook.eu1.make.com/nz434sx17u2q5mxet3ofqg8y7pzxm1ht";

const Index = () => {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [clickFormOpen, setClickFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+]/g, "");
    if (!value.startsWith("+380")) {
      value = "+380" + value.replace(/^\+?3?8?0?/, "");
    }
    setPhone(value.slice(0, 13));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\+380\d{9}$/.test(phone)) {
      (window as any).__pushDL?.("form_error", { form_id: "form_global", field: "phone" });
      setPhoneError("Введіть коректний номер: +380XXXXXXXXX");
      return;
    }
    setPhoneError("");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "click_capture" }),
      });
    } catch (err) {
      console.error("Webhook error:", err);
    }
    (window as any).__pushDL?.("form_submit_success", { form_id: "form_global", name, phone });
    setName("");
    setPhone("+380");
    setClickFormOpen(false);
    navigate("/thank-you");
  };

  const handlePageClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("select") ||
      target.closest("form") ||
      target.closest("[role='dialog']") ||
      target.closest("[data-no-click-capture]") ||
      target.closest(".fixed")
    ) {
      return;
    }
    const pricingSection = document.getElementById("pricing");
    if (pricingSection && pricingSection.contains(target)) {
      return;
    }
    // Exclude lead-form-1 section
    const leadForm = document.getElementById("lead-form-1");
    if (leadForm && leadForm.contains(target)) {
      return;
    }
    (window as any).__pushDL?.("form_open", { source: "page_click_capture", form_id: "form_global" });
    setClickFormOpen(true);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handlePageClick);
    return () => document.removeEventListener("click", handlePageClick);
  }, [handlePageClick]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LeadForm1 />
        <GuaranteeSection />
        <PricingSection onOpenCallback={() => setIsCallbackOpen(true)} />
        <AuditForm />
        <InefficiencySection />
        <WorkflowSection onOpenCallback={() => setIsCallbackOpen(true)} />
        <FAQSection />
        <Footer />
      </main>

      <FloatingWidgets isOpen={isCallbackOpen} onOpenChange={setIsCallbackOpen} />

      {clickFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm" onClick={() => setClickFormOpen(false)}>
          <div className="relative bg-background rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-border" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setClickFormOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">Залиште ваші контакти</h3>
              <p className="text-sm text-muted-foreground">Менеджер зв'яжеться з вами найближчим часом</p>
            </div>
            <form id="form_global"  onPointerDownCapture={() => (window as any).__pushFormStartOnce?.("form_global")} onSubmit={handleSubmit} className="space-y-4">
              <Input id="input_name_global" placeholder="Ваше ім'я" value={name} onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_global"); (window as any).__pushDL?.("form_field_start", { form_id: "form_global", field: "name" }); }} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
              <Input id="input_phone_global" placeholder="+380XXXXXXXXX" value={phone} onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_global"); (window as any).__pushDL?.("form_field_start", { form_id: "form_global", field: "phone" }); }} onChange={formatPhone} className="h-12 rounded-xl" />
              {phoneError && <p className="text-destructive text-sm">{phoneError}</p>}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 rounded-xl transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Відправити
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
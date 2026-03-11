import { useState } from "react";
import { Phone, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/image_2026-03-06_18-30-36 1.png";

const WEBHOOK_URL = "https://hook.eu1.make.com/nz434sx17u2q5mxet3ofqg8y7pzxm1ht";

const Header = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);
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
      (window as any).__pushDL?.("form_error", { form_id: "form_header_callback", field: "phone" });
      setPhoneError("Введіть коректний номер: +380XXXXXXXXX");
      return;
    }
    setPhoneError("");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "header_callback" }),
      });
    } catch (e) {
      console.error("Webhook error:", e);
    }
    (window as any).__pushDL?.("form_submit_success", { form_id: "form_header_callback", name, phone });
    setName("");
    setPhone("+380");
    setCallbackOpen(false);
    navigate("/thank-you");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border tg-header">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Meta Monster" className="h-10 md:h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg md:text-xl text-foreground tracking-tighter leading-tight">META MONSTER</span>
              <span className="text-xs md:text-sm text-muted-foreground">Агенція Meta таргета</span>
            </div>
          </div>

          <Button
            id="cta_header_callback"
            size="sm"
            className="bg-[#b11e1e] hover:bg-[#9b1a1a] text-white font-semibold text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl whitespace-nowrap"
            onClick={() => { const w = window as any; w.dataLayer = w.dataLayer || []; w.dataLayer.push({ event: "form_open", source: "header_callback", form_id: "form_header_callback" }); setCallbackOpen(true); }}
          >
            <Phone className="w-4 h-4 mr-1.5" />
            Передзвоніть мені
          </Button>
        </div>
      </header>

      {callbackOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm" onClick={() => setCallbackOpen(false)}>
          <div className="relative bg-background rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-border" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setCallbackOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">Залиште ваші контакти</h3>
              <p className="text-sm text-muted-foreground">Менеджер зв'яжеться з вами найближчим часом</p>
            </div>
            <form id="form_header_callback" onPointerDownCapture={() => (window as any).__pushFormStartOnce?.("form_header_callback")} onSubmit={handleSubmit} className="space-y-4">
              <Input id="input_name_header_callback" placeholder="Ваше ім'я" value={name} onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_header_callback"); (window as any).__pushDL?.("form_field_start", { form_id: "form_header_callback", field: "name" }); }} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
              <Input id="input_phone_header_callback" placeholder="+380XXXXXXXXX" value={phone} onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_header_callback"); (window as any).__pushDL?.("form_field_start", { form_id: "form_header_callback", field: "phone" }); }} onChange={formatPhone} className="h-12 rounded-xl" />
              {phoneError && <p className="text-destructive text-sm">{phoneError}</p>}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 rounded-xl transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Зателефонуйте мені
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
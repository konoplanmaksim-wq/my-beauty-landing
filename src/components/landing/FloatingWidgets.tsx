import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, X, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WEBHOOK_URL = "https://hook.eu1.make.com/nz434sx17u2q5mxet3ofqg8y7pzxm1ht";

const FloatingWidgets = ({ isOpen, onOpenChange }: { isOpen?: boolean; onOpenChange?: (open: boolean) => void }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isCallbackOpen = isOpen !== undefined ? isOpen : internalOpen;
  const setIsCallbackOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380");
  const [phoneError, setPhoneError] = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+]/g, "");
    if (!value.startsWith("+380")) {
      value = "+380" + value.replace(/^\+?3?8?0?/, "");
    }
    setPhone(value.slice(0, 13));
  };

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\+380\d{9}$/.test(phone)) {
      (window as any).__pushDL?.("form_error", { form_id: "form_callback_widget", field: "phone" });
      setPhoneError("Введіть коректний номер: +380XXXXXXXXX");
      return;
    }
    setPhoneError("");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "callback_widget" }),
      });
    } catch (e) {
      console.error("Webhook error:", e);
    }
    (window as any).__pushDL?.("form_submit_success", { form_id: "form_callback_widget", name, phone });
    setName("");
    setPhone("+380");
    setIsCallbackOpen(false);
    navigate("/thank-you");
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40">
        <button
          ref={btnRef}
          id="btn_callback_widget"
          onClick={() => { (window as any).__pushDL?.("form_open", { source: "callback_widget", form_id: "form_callback_widget" }); setIsCallbackOpen(true); }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(177,30,30,0.5)] transition-all duration-300 hover:scale-110 overflow-visible bg-[#b11e1e] text-white"
        >
          <span
            className="absolute inset-0 rounded-full border-2 border-[#b11e1e] opacity-75 animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <span
            className="absolute inset-0 rounded-full border-2 border-[#b11e1e] opacity-50 animate-ping"
            style={{ animationDelay: "0.6s", animationDuration: "2s" }}
          />
          <span
            className="absolute inset-0 rounded-full border-2 border-[#b11e1e] opacity-25 animate-ping"
            style={{ animationDelay: "1.2s", animationDuration: "2s" }}
          />
          <Phone className="w-7 h-7 relative z-10" />
        </button>
      </div>

      {isCallbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-background rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-border animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsCallbackOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                Залиште ваші контакти
              </h3>
              <p className="text-sm text-muted-foreground">
                Менеджер зв'яжеться з вами найближчим часом
              </p>
            </div>

            <form id="form_callback_widget" onPointerDownCapture={() => (window as any).__pushFormStartOnce?.("form_callback_widget")} onSubmit={handleCallback} className="space-y-4">
              <Input id="input_name_callback" placeholder="Ваше ім'я" value={name} onPointerDownCapture={() => { (window as any).__pushFormStartOnce?.("form_callback_widget"); (window as any).__pushDL?.("form_field_start", { form_id: "form_callback_widget", field: "name" }); }} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
              <Input id="input_phone_callback" placeholder="+380XXXXXXXXX" value={phone} onPointerDownCapture={() => { (window as any).__pushFormStartOnce?.("form_callback_widget"); (window as any).__pushDL?.("form_field_start", { form_id: "form_callback_widget", field: "phone" }); }} onChange={formatPhone} className="h-12 rounded-xl" />
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

export default FloatingWidgets;
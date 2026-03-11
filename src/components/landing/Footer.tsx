import { useState } from "react";
import { Mail, MapPin, Phone, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/image_2026-03-06_18-30-36 1.png";

const WEBHOOK_URL = "https://hook.eu1.make.com/nz434sx17u2q5mxet3ofqg8y7pzxm1ht";

const Footer = () => {
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

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\+380\d{9}$/.test(phone)) {
      setPhoneError("Введіть коректний номер: +380XXXXXXXXX");
      return;
    }
    setPhoneError("");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "footer_callback" }),
      });
    } catch (e) {
      console.error("Webhook error:", e);
    }
    (window as any).__pushDL?.("form_submit_success", { form_id: "form_footer_callback", name, phone });
    setName("");
    setPhone("+380");
    setCallbackOpen(false);
    navigate("/thank-you");
  };

  return (
    <>
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Meta Monster" className="h-10 w-auto object-contain brightness-0 invert" />
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">META MONSTER</span>
                <p className="text-white/60 text-xs leading-none mt-1">Агенція Meta таргета</p>
              </div>
            </div>
            <Button
              onClick={() => setCallbackOpen(true)}
              className="bg-[#b11e1e] hover:bg-[#9b1a1a] text-white font-semibold rounded-xl h-11 px-6 transition-all duration-300"
            >
              Зателефонуйте мені
            </Button>
          </div>

          <div className="border-t border-background/20 mb-8" />

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-background/70 text-sm">
                Таргетована реклама для б'юті салонів з гарантією результату.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Контакти</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:hello@targetgroup.ua" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                    <Mail className="w-4 h-4" />
                    hello@targetgroup.ua
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-2 text-background/70">
                    <MapPin className="w-4 h-4" />
                    Київ, Україна
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center">
            <p className="text-sm text-background/50">
              © 2024 META MONSTER. Усі права захищені.
            </p>
          </div>
        </div>
      </footer>

      {callbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm" onClick={() => setCallbackOpen(false)}>
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
            <form id="form_footer_callback" onPointerDownCapture={() => (window as any).__pushFormStartOnce?.("form_footer_callback")} onSubmit={handleCallback} className="space-y-4">
              <Input placeholder="Ваше ім'я" value={name} onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_footer_callback"); (window as any).__pushDL?.("form_field_start", { form_id: "form_footer_callback", field: "name" }); }} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
              <Input placeholder="+380XXXXXXXXX" value={phone} onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_footer_callback"); (window as any).__pushDL?.("form_field_start", { form_id: "form_footer_callback", field: "phone" }); }} onChange={formatPhone} className="h-12 rounded-xl" />
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

export default Footer;

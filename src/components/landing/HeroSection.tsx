import { useState } from "react";
import { X, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const WEBHOOK_URL = "https://hook.eu1.make.com/nz434sx17u2q5mxet3ofqg8y7pzxm1ht";

const chartData = [
  { month: "Лют", leads: 5 },
  { month: "Бер", leads: 12 },
  { month: "Кві", leads: 22 },
  { month: "Тра", leads: 35 },
  { month: "Чер", leads: 45 },
];

const stats = [
  { value: "-30%", label: "Зниження CPL" },
  { value: "CPC -40%", label: "Вартість кліку" },
];

const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380");
  const [phoneError, setPhoneError] = useState("");
  const { toast } = useToast();
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
      (window as any).__pushDL?.("form_error", { form_id: "form_hero", field: "phone" });
      setPhoneError("Введіть коректний номер: +380XXXXXXXXX");
      return;
    }
    setPhoneError("");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "hero_form" }),
      });
    } catch (e) {
      console.error("Webhook error:", e);
    }
    toast({ title: "Заявку отримано!", description: "Ми зв'яжемось з вами найближчим часом" });
    (window as any).__pushDL?.("form_submit_success", { form_id: "form_hero", name, phone });
    setModalOpen(false);
    setName("");
    setPhone("+380");
    navigate("/thank-you");
    if (/Telegram/i.test(navigator.userAgent)) { window.location.assign("/thank-you"); }
  };

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight uppercase">
                  Таргетована
                  <br />
                  реклама
                  <br />
                  <span className="text-primary">для б'юті послуг</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Робимо cтабільний потік нових записів, для власників б'юті салонів{" "}
                з гарантією результату: якщо{" "}
                <span className="font-bold text-foreground">не виконуємо план по лідах — повертаємо гроші</span>{" "}
                .
              </p>

              <div className="flex justify-center lg:justify-start">
                <Button
                  id="cta_order_top"
                  onClick={() => { (window as any).__pushDL?.("form_open", { source: "hero_cta", form_id: "form_hero" }); setModalOpen(true); }}
                  className="h-12 md:h-16 px-8 md:px-12 text-base md:text-lg font-extrabold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Запустити рекламу
                </Button>
              </div>
            </div>

            {/* Chart card */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground">Гарантуємо ріст лідів</h3>
                <p className="text-sm text-muted-foreground">За 2 місяці</p>
              </div>

              <div className="h-48 md:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                        fontSize: 13,
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                      formatter={(value: number) => `+${value}%`}
                    />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-md" />
          <div className="relative bg-background rounded-2xl p-8 w-full max-w-md shadow-2xl border border-border z-10" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Залиште ваші контакти
              </h3>
              <p className="text-sm text-muted-foreground">
                Менеджер зв'яжеться з вами найближчим часом
              </p>
            </div>

            <form id="form_hero" onPointerDownCapture={() => (window as any).__pushFormStartOnce?.("form_hero")} onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="input_name_hero"
                placeholder="Ваше ім'я"
                value={name}
                onPointerDownCapture={() => { (window as any).__pushFormStartOnce?.("form_hero"); (window as any).__pushDL?.("form_field_start", { form_id: "form_hero", field: "name" }); }}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border-input h-12 rounded-xl"
              />
              <Input
                id="input_phone_hero"
                placeholder="+380XXXXXXXXX"
                value={phone}
                onPointerDownCapture={() => { (window as any).__pushFormStartOnce?.("form_hero"); (window as any).__pushDL?.("form_field_start", { form_id: "form_hero", field: "phone" }); }}
                onChange={formatPhone}
                className="bg-background border-input h-12 rounded-xl"
              />
              {phoneError && <p className="text-destructive text-sm">{phoneError}</p>}

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 gap-2"
              >
                <Send className="w-4 h-4" />
                Відправити
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
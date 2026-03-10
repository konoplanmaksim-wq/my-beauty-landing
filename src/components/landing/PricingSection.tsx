import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import iconCrown from "@/assets/icon-crown-3d.png";
import iconBolt from "@/assets/icon-bolt-3d.png";
import iconStar from "@/assets/icon-star-3d.png";

interface PricingPlan {
  name: string;
  icon: string;
  features: string[];
  highlighted?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Standard",
    icon: iconStar,
    features: [
      "Для старту та тестів",
      "Повний технічний аудит і налаштування.",
      "3–5 тестових аудиторій для пошуку найдешевшого ліда.",
      "6–8 креативних варіацій (статичні банери/відео).",
      "Рекламних кампаній: 1–2 шт. (конкретний продукт або послуга).",
      "Базовий звіт за результатами тестування.",
    ],
  },
  {
    name: "Pro",
    icon: iconCrown,
    features: [
      "Для системних продажів",
      "Усе з пакету «Стандарт» +",
      "Підключення Pixel + Conversions API (для точного відстеження подій).",
      "Налаштування Google Analytics 4 & GTM (повний контроль воронки).",
      "Рекламних кампаній: до 3–4 шт.",
      "Ретаргетингові послідовності (повернення тих, хто не купив).",
      "Bi-weekly креативні оновлення (оновлення банерів кожні 2 тижні).",
      "Щотижнева оптимізація показників та бюджету.",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    icon: iconBolt,
    features: [
      "Для масштабування",
      "Усе з пакету «Про» +",
      "Глибока сегментація LAL (Look-alike) аудиторій за даними покупців.",
      "Розширена креативна ротація (постійний пошук нових зв’язок).",
      "Кастомна атрибуція (аналіз повного шляху клієнта до покупки).",
      "Робота з бюджетами від $1500+ без втрати окупності.",
      "Пріоритетна підтримка та щоденний моніторинг кампаній.",
    ],
  },
];

interface PricingSectionProps {
  onOpenCallback?: () => void;
}

const PricingSection = ({ onOpenCallback }: PricingSectionProps) => {
  return (
    <>
      <section id="pricing" className="py-16 md:py-24" data-no-click-capture>
        <div className="container mx-auto px-4">
          <div className="text-center mb-32 md:mb-40">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 uppercase">
              Оберіть свій тарифний план
            </h2>
            {/* removed subtitle by request */}
          </div>

          <div className="grid md:grid-cols-3 gap-y-20 gap-x-6 lg:gap-8 items-end">
            {plans.map((plan) => (
              <div
                key={plan.name}
                role="button"
                tabIndex={0}
                onClick={() => { (window as any).__pushDL?.("form_open", { source: "pricing_card", plan: plan.name, form_id: "form_global" }); onOpenCallback?.(); }}
                className={`relative rounded-2xl p-6 lg:p-8 md:pt-48 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  plan.highlighted
                    ? "pt-16 bg-primary text-primary-foreground shadow-2xl ring-4 ring-primary/20 md:-mt-6 md:pb-10"
                    : "pt-24 bg-card border border-border shadow-lg"
                }`}
              >
                <div className="flex flex-col items-center mb-6">
                  <div className="w-28 h-28 md:w-32 md:h-32 absolute -top-12 md:-top-24 left-1/2 -translate-x-1/2 pointer-events-none z-10">
                    <img src={plan.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-center">{plan.name}</h3>
                </div>

                <ul className="space-y-2 mb-8">
                  {plan.features.map((feature, index) => {
                    const boldSet = new Set([
                      "Для старту та тестів",
                      "Повний технічний аудит і налаштування.",
                      "Для системних продажів",
                      "Усе з пакету «Стандарт» +",
                      "Для масштабування",
                      "Усе з пакету «Про» +",
                    ]);
                    const isBold = boldSet.has(feature);
                    return (
                      <li key={index} className={`flex items-start gap-3 ${isBold ? "mt-1" : ""}`}>
                        {!isBold && (
                          <Check
                            className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`}
                          />
                        )}
                        <span
                          className={`text-sm ${plan.highlighted ? "text-primary-foreground/90" : "text-foreground"} ${
                            isBold ? "font-extrabold" : ""
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <Button
                  id={`btn_pricing_${plan.name.toLowerCase()}`}
                  onClick={() => { (window as any).__pushDL?.("pricing_cta_click", { plan: plan.name }); onOpenCallback?.(); }}
                  className={`w-full h-12 font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-background hover:bg-background/90 text-foreground"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  Отримати консультацію
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingSection;

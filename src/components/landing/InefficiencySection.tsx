import { TrendingDown, EyeOff, LayoutTemplate, Activity } from "lucide-react";

const problems = [
  {
    icon: EyeOff,
    title: "Зламаний трекінг після iOS 14+",
    description: "Ви не бачите реальну картину конверсій і приймаєте рішення наосліп",
  },
  {
    icon: TrendingDown,
    title: "Втома креативів",
    description: "Одні й ті самі оголошення місяцями, СРМ росте, СТР падає",
  },
  {
    icon: LayoutTemplate,
    title: "Неправильна структура кампаній",
    description: "Холодна аудиторія отримує офери для теплих клієнтів — гроші йдуть у нікуди",
  },
  {
    icon: Activity,
    title: "Відсутність системи тестування",
    description: "Здогадки замість даних — не знаєте, що саме працює, а що ні",
  },
];

const InefficiencySection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-secondary/30">
      {/* Background Dots Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground uppercase max-w-4xl mx-auto">
            Найчастіші причини неєфективності реклами
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {problems.map((item, index) => (
            <div 
              key={index} 
              className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border transition-transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center h-full"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <item.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InefficiencySection;

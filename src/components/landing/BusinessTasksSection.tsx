import iconTrend from "@/assets/icon-trend-3d.png";
import iconGear from "@/assets/icon-gear-3d.png";
import iconChart from "@/assets/icon-chart-3d.png";

const tasks = [
  {
    icon: iconTrend,
    title: "Ріст продажів\nта прибутку",
    description:
      "Потік якісних заявок: Приведемо нових клієнтів уже через 2 дні після запуску таргетованої реклами. Смотивуємо користувачів на повторні покупки.",
  },
  {
    icon: iconGear,
    title: "Оптимізація",
    description:
      "Запобігаємо зливу рекламних бюджетів, підбираємо майданчики та час показів. Щодня моніторимо та виключаємо неефективні покази.",
  },
  {
    icon: iconChart,
    title: "Аналітика та масштабування",
    description:
      "Проводимо аналіз конкурентів та ЦА, формуємо кілька аудиторій та стратегій, постійно тестуємо гіпотези.",
  },
];

const BusinessTasksSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-foreground overflow-hidden rounded-3xl md:rounded-none mx-0" data-no-click-capture>
      {/* Decorative dotted semicircles */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] opacity-30 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-dashed"
            style={{
              width: `${(i + 1) * 80}px`,
              height: `${(i + 1) * 80}px`,
              top: `calc(50% - ${((i + 1) * 80) / 2}px)`,
              left: `calc(50% - ${((i + 1) * 80) / 2}px)`,
              borderColor: `hsla(0, 72%, 42%, ${0.6 - i * 0.1})`,
            }}
          />
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] opacity-30 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-dashed"
            style={{
              width: `${(i + 1) * 80}px`,
              height: `${(i + 1) * 80}px`,
              top: `calc(50% - ${((i + 1) * 80) / 2}px)`,
              left: `calc(50% - ${((i + 1) * 80) / 2}px)`,
              borderColor: `hsla(0, 72%, 42%, ${0.6 - i * 0.1})`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-background mb-12 max-w-lg uppercase">
          Бізнес-завдання,
          <br />
          які вирішуємо ми
        </h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {tasks.map((task) => (
            <div
              key={task.title}
              className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-background/10 hover:bg-background/15 transition-colors"
            >
              <div className="w-14 h-14 mb-5">
                <img src={task.icon} alt="" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-background mb-3 whitespace-pre-line">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-background/70 leading-relaxed">
                  {task.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessTasksSection;

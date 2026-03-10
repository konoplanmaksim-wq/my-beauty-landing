import iconShield from "@/assets/icon-shield-3d.png";

const GuaranteeSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative max-w-3xl mx-auto bg-card rounded-2xl p-6 lg:p-8 pt-24 md:pt-48 border-2 border-primary/30 shadow-xl text-center mt-20 md:mt-24">
          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 md:w-32 md:h-32 absolute -top-12 md:-top-24 left-1/2 -translate-x-1/2 pointer-events-none z-10">
              <img src={iconShield} alt="" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground uppercase">
              Гарантія результату
            </h2>
          </div>

          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            Якщо не зробимо план по лідах — <span className="font-bold text-foreground">повертаємо 80% грошей</span>.
          </p>
          <p className="text-lg md:text-xl text-foreground mt-2 font-semibold">
            Клієнт заробляє — ми заробляємо.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;

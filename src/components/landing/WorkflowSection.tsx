import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface WorkflowSectionProps {
  onOpenCallback?: () => void;
}

const WorkflowSection = ({ onOpenCallback }: WorkflowSectionProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 uppercase">
              Послідовність
              <br />
              роботи над проєктом
            </h2>
          </div>

          <div className="bg-card rounded-2xl p-6 md:p-12 shadow-lg border border-border overflow-hidden">
            <div className="flex flex-col gap-12 md:gap-16">
              
              {/* Step 1: Top Bracket */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                
                <div className="flex gap-1 md:gap-3 items-end">
                  {/* Group 0: Mon (Outside Bracket) */}
                  <div className="flex flex-col justify-end pb-[2px]">
                     <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all bg-slate-300 text-slate-700 shadow-md font-bold">
                        Пн
                     </div>
                  </div>

                  {/* Group 1: Tue-Thu + Label + Top Bracket */}
                  <div className="flex flex-col items-center">
                    {/* Label */}
                    <p className="text-sm md:text-base text-muted-foreground mb-1 text-center whitespace-nowrap">
                      Формуємо цілі та KPI
                    </p>
                    
                    {/* Top Bracket with Nose */}
                    <div className="w-full h-2 mb-1 relative">
                      {/* Left Curve */}
                      <div className="absolute bottom-0 left-0 w-[calc(50%-6px)] h-full border-t-2 border-l-2 border-destructive rounded-tl-lg" />
                      {/* Right Curve */}
                      <div className="absolute bottom-0 right-0 w-[calc(50%-6px)] h-full border-t-2 border-r-2 border-destructive rounded-tr-lg" />
                      {/* Nose */}
                      <svg 
                        className="absolute bottom-[calc(100%-2px)] left-1/2 -translate-x-1/2 text-destructive" 
                        width="12" 
                        height="6" 
                        viewBox="0 0 12 6" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ bottom: 'calc(100% - 2px)', marginBottom: '-2px' }} 
                      >
                         <path d="M1 6L6 1L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* Days Tue-Thu */}
                    <div className="flex gap-2 md:gap-3">
                      {["Вт", "Ср", "Чт"].map((day, idx) => (
                        <div
                          key={idx}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all border-2 border-dashed border-slate-300 text-muted-foreground"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Group 2: Fri */}
                  <div className="flex flex-col justify-end pb-[2px]">
                     <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all bg-slate-700 text-white shadow-lg">
                        Пт
                     </div>
                  </div>
                </div>

                {/* Right Text */}
                <div className="w-full md:w-auto text-left md:text-left md:mt-10">
                  <p className="text-base md:text-lg">
                    <span className="font-bold text-foreground md:block md:mb-1">Старт проєкту </span>
                    <span className="text-sm text-muted-foreground md:block">
                      Аналіз конкурентів та продукту, формуємо стратегію
                    </span>
                  </p>
                </div>
              </div>

              {/* Step 2: Bottom Bracket */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                
                <div className="flex gap-1 md:gap-3 items-start">
                  {/* Group 1: Mon-Thu + Label + Bottom Bracket */}
                  <div className="flex flex-col items-center">
                    
                    {/* Days Mon-Thu */}
                    <div className="flex gap-2 md:gap-3">
                      {["Пн", "Вт", "Ср", "Чт"].map((day, idx) => (
                        <div
                          key={idx}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all border-2 border-dashed border-slate-300 text-muted-foreground"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Bottom Bracket with Nose */}
                    <div className="w-full h-2 mt-1 relative">
                      {/* Left Curve */}
                      <div className="absolute top-0 left-0 w-[calc(50%-6px)] h-full border-b-2 border-l-2 border-destructive rounded-bl-lg" />
                      {/* Right Curve */}
                      <div className="absolute top-0 right-0 w-[calc(50%-6px)] h-full border-b-2 border-r-2 border-destructive rounded-br-lg" />
                      {/* Nose */}
                      <svg 
                        className="absolute top-[calc(100%-2px)] left-1/2 -translate-x-1/2 text-destructive" 
                        width="12" 
                        height="6" 
                        viewBox="0 0 12 6" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ top: 'calc(100% - 2px)', marginTop: '-2px' }}
                      >
                         <path d="M1 0L6 5L11 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* Label */}
                    <p className="text-sm md:text-base text-muted-foreground mt-1 text-center whitespace-nowrap">
                      Погодження візуалу та контенту
                    </p>

                  </div>

                  {/* Group 2: Fri */}
                  <div>
                     <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all bg-primary text-primary-foreground shadow-lg">
                        Пт
                     </div>
                  </div>
                </div>

                {/* Right Text */}
                <div className="w-full md:w-auto text-left md:text-left">
                  <p className="text-base md:text-lg">
                    <span className="font-bold text-foreground md:block md:mb-1">Запуск </span>
                    <span className="text-sm text-muted-foreground md:block">
                      Отримання перших показників
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex justify-center w-full mt-4">
                <Button 
                  id="cta_order_workflow"
                  onClick={() => { (window as any).__pushDL?.("form_open", { source: "workflow_cta", form_id: "form_global" }); onOpenCallback?.(); }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg h-14 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Запустити проект
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;

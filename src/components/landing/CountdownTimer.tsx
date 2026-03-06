import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 25, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Встановлюємо дату закінчення акції (25 днів від зараз)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 25);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = endDate.getTime() - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-primary text-primary-foreground rounded-lg w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
        <span className="text-2xl md:text-3xl font-bold">{value.toString().padStart(2, "0")}</span>
      </div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );

  return (
    <div className="bg-card rounded-2xl p-4 md:p-6 shadow-lg border border-border">
      <p className="text-center text-sm text-muted-foreground mb-3">
        До кінця акції залишилось:
      </p>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <TimeBlock value={timeLeft.days} label="днів" />
        <span className="text-2xl text-primary font-bold">:</span>
        <TimeBlock value={timeLeft.hours} label="годин" />
        <span className="text-2xl text-primary font-bold">:</span>
        <TimeBlock value={timeLeft.minutes} label="хвилин" />
        <span className="text-2xl text-primary font-bold hidden sm:block">:</span>
        <div className="hidden sm:block">
          <TimeBlock value={timeLeft.seconds} label="секунд" />
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

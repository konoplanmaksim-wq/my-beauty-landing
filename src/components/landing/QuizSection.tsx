import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calculator, ArrowRight, ArrowLeft, CheckCircle, Users, Target, TrendingUp } from "lucide-react";

interface QuizStep {
  id: number;
  question: string;
  options: { label: string; value: string; multiplier: number }[];
}

const quizSteps: QuizStep[] = [
  {
    id: 1,
    question: "Скільки нових клієнтів ви хочете отримувати щомісяця?",
    options: [
      { label: "10-20 клієнтів", value: "10-20", multiplier: 1 },
      { label: "20-50 клієнтів", value: "20-50", multiplier: 1.5 },
      { label: "50-100 клієнтів", value: "50-100", multiplier: 2 },
      { label: "Більше 100 клієнтів", value: "100+", multiplier: 2.5 },
    ],
  },
  {
    id: 2,
    question: "Який ваш основний напрямок?",
    options: [
      { label: "Косметологія обличчя", value: "face", multiplier: 1 },
      { label: "Лазерна епіляція", value: "laser", multiplier: 1.2 },
      { label: "Ін'єкційна косметологія", value: "injection", multiplier: 1.4 },
      { label: "Комплексні послуги", value: "complex", multiplier: 1.3 },
    ],
  },
  {
    id: 3,
    question: "Чи пробували ви запускати рекламу раніше?",
    options: [
      { label: "Ні, ніколи", value: "never", multiplier: 1.2 },
      { label: "Так, але без результату", value: "no-result", multiplier: 1.1 },
      { label: "Так, з невеликим результатом", value: "small-result", multiplier: 1 },
      { label: "Так, успішно", value: "success", multiplier: 0.9 },
    ],
  },
];

interface QuizResult {
  costPerClient: number;
  monthlyBudget: number;
  expectedClients: number;
  roi: number;
}

const QuizSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { value: string; multiplier: number }>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "" });
  const [showContactForm, setShowContactForm] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (option: { value: string; multiplier: number }) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep]: option,
    }));
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateResult = () => {
    const baseClientCost = 8; // Базова вартість залучення клієнта в USD
    const multiplier = Object.values(answers).reduce((acc, curr) => acc * curr.multiplier, 1);
    
    const costPerClient = Math.round(baseClientCost * multiplier);
    const clientsOption = answers[0]?.value || "10-20";
    let expectedClients = 15;
    
    if (clientsOption === "20-50") expectedClients = 35;
    else if (clientsOption === "50-100") expectedClients = 75;
    else if (clientsOption === "100+") expectedClients = 120;
    
    const monthlyBudget = costPerClient * expectedClients;
    const averageCheck = 50; // Середній чек в USD
    const roi = Math.round(((averageCheck * expectedClients - monthlyBudget) / monthlyBudget) * 100);

    setResult({
      costPerClient,
      monthlyBudget,
      expectedClients,
      roi,
    });
    setShowResult(true);
  };

  const handleContactSubmit = () => {
    if (!contactInfo.name || !contactInfo.phone) {
      toast({
        title: "Заповніть всі поля",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Дякуємо!",
      description: "Ми зв'яжемось з вами найближчим часом",
    });
    setShowContactForm(false);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <section id="quiz" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-background rounded-2xl p-6 md:p-10 shadow-xl border border-border">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Ваш індивідуальний розрахунок готовий!
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Вартість залучення клієнта</p>
                  <p className="text-3xl font-bold text-foreground">${result.costPerClient}</p>
                </div>
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Очікувана кількість клієнтів</p>
                  <p className="text-3xl font-bold text-foreground">{result.expectedClients}/міс</p>
                </div>
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <Calculator className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Рекомендований бюджет</p>
                  <p className="text-3xl font-bold text-foreground">${result.monthlyBudget}/міс</p>
                </div>
                <div className="bg-accent/10 rounded-xl p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Очікуваний ROI</p>
                  <p className="text-3xl font-bold text-accent">{result.roi}%</p>
                </div>
              </div>

              {!showContactForm ? (
                <div className="space-y-4">
                  <Button
                    onClick={() => setShowContactForm(true)}
                    className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  >
                    Отримати детальний план
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="w-full"
                  >
                    Пройти квіз ще раз
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    placeholder="Ваше ім'я"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, name: e.target.value }))}
                    className="h-12"
                  />
                  <Input
                    placeholder="Ваш телефон"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    className="h-12"
                  />
                  <Button
                    onClick={handleContactSubmit}
                    className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  >
                    Надіслати
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentQuestion = quizSteps[currentStep];

  return (
    <section id="quiz" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Розрахуйте вартість залучення клієнта
            </h2>
            <p className="text-lg text-muted-foreground">
              Дайте відповідь на 3 питання та отримайте індивідуальний розрахунок
            </p>
          </div>

          <div className="bg-background rounded-2xl p-6 md:p-10 shadow-xl border border-border">
            {/* Прогрес */}
            <div className="flex items-center justify-between mb-8">
              {quizSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                      index <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < quizSteps.length - 1 && (
                    <div
                      className={`w-12 md:w-24 h-1 mx-2 rounded transition-colors ${
                        index < currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Питання */}
            <h3 className="text-xl font-serif font-bold text-foreground mb-6 text-center">
              {currentQuestion.question}
            </h3>

            {/* Варіанти */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    answers[currentStep]?.value === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="font-medium text-foreground">{option.label}</span>
                </button>
              ))}
            </div>

            {/* Навігація */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentStep]}
                className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {currentStep === quizSteps.length - 1 ? "Отримати результат" : "Далі"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;

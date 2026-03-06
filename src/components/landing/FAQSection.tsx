import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Чи створюєте ви креативи?",
    answer: "Так. Ми створюємо рекламні креативи на замовлення. Статичні банери — $15 за 1 банер. Відеокреативи / монтаж відео з ваших матеріалів — $40 за ролик.",
  },
  {
    question: "Який мінімальний бюджет?",
    answer: "$ 800/міс. Нижче — недостатньо для нормальних результатів.",
  },
  {
    question: "Чи потрібен сайт для запуску таргетованої реклами?",
    answer: "Ні, сайт не є обов'язковим. Рекламу можна налаштувати так, щоб користувачі переходили у ваш профіль в Instagram, писали у Direct, Messenger або залишали заявки через вбудовані лід-форми.",
  },
  {
    question: "Через який час я побачу результати?",
    answer: "Перші результати у вигляді охоплень та переходів з'являються одразу після запуску та проходження модерації. Однак для стабільних результатів та оптимізації рекламних кампаній зазвичай потрібно від 2 тижнів до 1 місяця.",
  },
  {
    question: "Чому краще замовити таргет у агентства, а не налаштовувати самому?",
    answer: "Професійні таргетологи знають тонкощі роботи алгоритмів, вміють обходити блокування, створюють креативи, що «чіпляють», і постійно аналізують дані, щоб знизити вартість заявки. Це дозволяє уникнути «зливу» бюджету.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase">
              Часті питання
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border border-border px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

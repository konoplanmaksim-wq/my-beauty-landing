import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WEBHOOK_URL = "https://hook.eu1.make.com/nz434sx17u2q5mxet3ofqg8y7pzxm1ht";

const formSchema = z.object({
  comment: z.string().min(1, "Опишіть ваш проєкт").max(500),
  phone: z
    .string()
    .regex(/^\+380\d{9}$/, "Введіть коректний номер: +380XXXXXXXXX"),
});

type FormData = z.infer<typeof formSchema>;

const LeadForm1 = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "+380" },
  });

  const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+]/g, "");
    if (!value.startsWith("+380")) {
      value = "+380" + value.replace(/^\+?3?8?0?/, "");
    }
    value = value.slice(0, 13);
    e.target.value = value;
    setValue("phone", value);
  };

  const onSubmit = async (data: FormData) => {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "lead_form" }),
      });
    } catch (e) {
      console.error("Webhook error:", e);
    }
    (window as any).__pushDL?.("form_submit_success", { form_id: "form_lead", phone: data.phone });
    navigate("/thank-you");
  };

  const onInvalid = (errors: any) => {
    const fields = Object.keys(errors || {});
    (window as any).__pushDL?.("form_error", { form_id: "form_lead", fields });
  };

  return (
    <section id="lead-form-1" className="relative py-16 md:py-20 bg-foreground overflow-hidden rounded-3xl md:rounded-none mx-0" data-no-click-capture>
      {/* Decorative dotted semicircles */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] opacity-25 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-dashed"
            style={{
              width: `${(i + 1) * 70}px`,
              height: `${(i + 1) * 70}px`,
              top: `calc(50% - ${((i + 1) * 70) / 2}px)`,
              left: `calc(50% - ${((i + 1) * 70) / 2}px)`,
              borderColor: `hsla(0, 72%, 42%, ${0.5 - i * 0.1})`,
            }}
          />
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] opacity-25 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-dashed"
            style={{
              width: `${(i + 1) * 70}px`,
              height: `${(i + 1) * 70}px`,
              top: `calc(50% - ${((i + 1) * 70) / 2}px)`,
              left: `calc(50% - ${((i + 1) * 70) / 2}px)`,
              borderColor: `hsla(0, 72%, 42%, ${0.5 - i * 0.1})`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-background mb-2 text-center uppercase tracking-wide">
          Розкажіть про свій проєкт
        </h2>
        <p className="text-background/70 text-center mb-8 text-lg">
          і ми запропонуємо найефективнішу рекламну стратегію
        </p>

        <form id="form_lead" onPointerDownCapture={() => (window as any).__pushFormStartOnce?.("form_lead")} onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-background mb-1.5 text-left">
              Опишіть ваш проєкт
            </label>
            <Textarea
              id="input_comment_lead"
              placeholder="Росквжіть, про ваш бізнес, який бюджет, цілі..."
              {...register("comment")}
              onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_lead"); (window as any).__pushDL?.("form_field_start", { form_id: "form_lead", field: "comment" }); }}
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 min-х-[100px] rounded-xl"
            />
            {errors.comment && (
              <p className="text-background/80 text-sm mt-1">{errors.comment.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-background mb-1.5 text-left">
              Номер телефону
            </label>
            <Input
              id="input_phone_lead"
              placeholder="+380XXXXXXXXX"
              {...register("phone")}
              onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_lead"); (window as any).__pushDL?.("form_field_start", { form_id: "form_lead", field: "phone" }); }}
              onChange={formatPhone}
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12 rounded-xl"
            />
            {errors.phone && (
              <p className="text-background/80 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-background hover:bg-background/90 text-foreground font-semibold text-base rounded-xl transition-all duration-300"
          >
            {isSubmitting ? "Відправляємо..." : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Відправити
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LeadForm1;

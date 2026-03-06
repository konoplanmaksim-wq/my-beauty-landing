import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WEBHOOK_URL = "https://hook.eu1.make.com/nz434sx17u2q5mxet3ofqg8y7pzxm1ht";

const formSchema = z.object({
  name: z.string().min(2, "Ім'я має містити мінімум 2 символи").max(50),
  phone: z.string().regex(/^\+380\d{9}$/, "Введіть коректний номер: +380XXXXXXXXX"),
  link: z.string().min(1, "Введіть посилання").max(200),
});

type FormData = z.infer<typeof formSchema>;

const AuditForm = () => {
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
        body: JSON.stringify({ ...data, source: "audit_form" }),
      });
    } catch (e) {
      console.error("Webhook error:", e);
    }
    (window as any).__pushDL?.("form_submit_success", { form_id: "form_audit", name: data.name, phone: data.phone });
    navigate("/thank-you");
  };

  const onInvalid = (errors: any) => {
    const fields = Object.keys(errors || {});
    (window as any).__pushDL?.("form_error", { form_id: "form_audit", fields });
  };

  return (
    <section className="relative py-16 md:py-20 bg-foreground overflow-hidden rounded-3xl md:rounded-none mx-0" data-no-click-capture>
      {/* Decorative dotted semicircles */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[350px] h-[350px] opacity-25 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-dashed"
            style={{
              width: `${(i + 1) * 70}px`,
              height: `${(i + 1) * 70}px`,
              top: `calc(50% - ${((i + 1) * 70) / 2}px)`,
              left: `calc(50% - ${((i + 1) * 70) / 2}px)`,
              borderColor: `hsla(0, 72%, 42%, ${0.5 - i * 0.08})`,
            }}
          />
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[350px] h-[350px] opacity-25 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-dashed"
            style={{
              width: `${(i + 1) * 70}px`,
              height: `${(i + 1) * 70}px`,
              top: `calc(50% - ${((i + 1) * 70) / 2}px)`,
              left: `calc(50% - ${((i + 1) * 70) / 2}px)`,
              borderColor: `hsla(0, 72%, 42%, ${0.5 - i * 0.08})`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-background mb-4 uppercase">
            Вкладаєте гроші в рекламу, але у вас немає продажів?
          </h2>
          <p className="text-lg text-background/70">
            Проведемо <span className="font-bold text-background">БЕЗКОШТОВНИЙ</span> аудит рекламного акаунта та виявимо проблеми на всіх етапах воронки
          </p>
        </div>

        <form id="form_audit" onPointerDownCapture={() => (window as any).__pushFormStartOnce?.("form_audit")} onSubmit={handleSubmit(onSubmit, onInvalid)} className="grid sm:grid-cols-3 gap-4">
          <div>
            <Input
              id="input_name_audit"
              placeholder="Ім'я"
              {...register("name")}
              onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_audit"); (window as any).__pushDL?.("form_field_start", { form_id: "form_audit", field: "name" }); }}
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12 rounded-xl"
            />
            {errors.name && <p className="text-background/80 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Input
              id="input_phone_audit"
              placeholder="+380XXXXXXXXX"
              {...register("phone")}
              onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_audit"); (window as any).__pushDL?.("form_field_start", { form_id: "form_audit", field: "phone" }); }}
              onChange={formatPhone}
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12 rounded-xl"
            />
            {errors.phone && <p className="text-background/80 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <Input
              id="input_link_audit"
              placeholder="Посилання на сайт або інстаграм"
              {...register("link")}
              onPointerDown={() => { (window as any).__pushFormStartOnce?.("form_audit"); (window as any).__pushDL?.("form_field_start", { form_id: "form_audit", field: "link" }); }}
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12 rounded-xl"
            />
            {errors.link && <p className="text-background/80 text-sm mt-1">{errors.link.message}</p>}
          </div>

          <div className="sm:col-span-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-background hover:bg-background/90 text-foreground font-semibold text-base rounded-xl transition-all duration-300"
            >
              {isSubmitting ? "Відправляємо..." : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Отримати аудит реклами
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuditForm;

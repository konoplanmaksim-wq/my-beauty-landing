import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
          Дякуємо
          <br />
          за вашу заявку!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Ми зв'яжемось з вами найближчим часом
        </p>
        <Button
          onClick={() => navigate("/")}
          className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl"
        >
          На головну
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;

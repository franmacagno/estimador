import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, Download, Users, Home, ArrowRight } from "lucide-react";
import CostCalculator from "@/components/CostCalculator";

const Index = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleStartCalculating = () => {
    setShowCalculator(true);
    setTimeout(() => {
      calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          <span className="font-heading text-lg font-bold text-foreground">BuildCost</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-24 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 mb-8">
          <Calculator className="h-4 w-4 text-accent-foreground" />
          <span className="text-sm font-medium text-accent-foreground">Free estimate in 2 minutes</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Calculate the cost of building your house
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-10">
          Configure your house in 2 minutes and get an estimated construction cost.
        </p>

        <Button size="lg" className="text-base px-8 py-6 gap-2" onClick={handleStartCalculating}>
          Start calculating
          <ArrowRight className="h-4 w-4" />
        </Button>
      </section>

      {/* Calculator */}
      {showCalculator && (
        <div ref={calculatorRef}>
          <CostCalculator />
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-12 text-sm text-muted-foreground">
        © 2026 BuildCost. This is an estimation tool for reference purposes only.
      </footer>
    </div>
  );
};

export default Index;

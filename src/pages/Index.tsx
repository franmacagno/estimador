import { useState, useRef } from "react";
import { Calculator, Home, Building2, Ruler, Star } from "lucide-react";
import CostCalculator, { type CalculatorResult } from "@/components/CostCalculator";
import ResultBlock from "@/components/ResultBlock";
import LeadForm from "@/components/LeadForm";

const Index = () => {
  const [calcResult, setCalcResult] = useState<CalculatorResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleResult = (result: CalculatorResult) => {
    setCalcResult(result);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          <span className="font-heading text-lg font-bold text-foreground">costodecasa.com</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1">
          <Calculator className="h-3.5 w-3.5 text-accent-foreground" />
          <span className="text-xs font-medium text-accent-foreground">Estimación gratuita</span>
        </div>
      </nav>

      {/* Hero + Calculator */}
      <section className="max-w-6xl mx-auto px-6 pt-8 pb-10">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left: Hero text */}
          <div className="flex-1 flex flex-col justify-between pt-4 lg:pt-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-5 font-heading">
                ¿Cuánto cuesta construir tu casa?
              </h1>
              <p className="text-base text-muted-foreground max-w-md mb-8">Calculalo en 30 segundos. Configurá tu proyecto y obtené un costo estimado de construcción.

              </p>

              {/* Mini feature list */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Ruler className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Configurá los m²</p>
                    <p className="text-xs text-muted-foreground">Tamaño y características de tu casa</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Elegí el tipo de obra</p>
                    <p className="text-xs text-muted-foreground">Tradicional o Steel Frame</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Obtené tu presupuesto</p>
                    <p className="text-xs text-muted-foreground">Estimación al instante</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative house */}
            <div className="hidden lg:block mt-auto">
              <div className="w-36 h-36 relative ml-8">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-6" />
                <div className="absolute inset-2 bg-primary/15 rounded-2xl -rotate-3" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="70" height="70" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm">
                    <rect x="20" y="45" width="60" height="40" rx="4" className="fill-primary/20 stroke-primary" strokeWidth="2" />
                    <polygon points="50,15 85,45 15,45" className="fill-primary/15 stroke-primary" strokeWidth="2" strokeLinejoin="round" />
                    <rect x="40" y="60" width="16" height="25" rx="2" className="fill-primary/30 stroke-primary" strokeWidth="1.5" />
                    <rect x="25" y="55" width="10" height="10" rx="1" className="fill-accent stroke-primary" strokeWidth="1.5" />
                    <rect x="62" y="55" width="10" height="10" rx="1" className="fill-accent stroke-primary" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Calculator form */}
          <div className="w-full lg:w-[460px] flex-shrink-0">
            <CostCalculator onResult={handleResult} />
          </div>
        </div>
      </section>

      {/* Results section - full width below hero */}
      {calcResult &&
      <section ref={resultRef} className="max-w-6xl mx-auto px-6 pb-10">
          {calcResult.type === "single" && calcResult.single &&
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-card-foreground mb-5 text-center font-heading">
                Proyecto estimado para tu casa
              </h3>
              <ResultBlock
            result={calcResult.single}
            modoCalculo={calcResult.modoCalculo}
            budget={calcResult.budget}
            inputM2={calcResult.sqm} />
          
            </div>
        }

          {calcResult.type === "compare" && calcResult.compare &&
        <div>
              <h3 className="text-lg font-bold text-card-foreground mb-5 text-center font-heading">
                Comparación de proyectos
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <ResultBlock
                result={calcResult.compare.steel_frame}
                modoCalculo={calcResult.modoCalculo}
                budget={calcResult.budget}
                inputM2={calcResult.sqm}
                label="Steel Frame" />
              
                </div>
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <ResultBlock
                result={calcResult.compare.tradicional}
                modoCalculo={calcResult.modoCalculo}
                budget={calcResult.budget}
                inputM2={calcResult.sqm}
                label="Tradicional" />
              
                </div>
              </div>
            </div>
        }
          {/* Lead capture form */}
          <div className="mt-6">
            <LeadForm calcResult={calcResult} />
          </div>
        </section>
      }

      {/* Why estimate section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        
























        
      </section>

      {/* Footer */}
      <footer className="text-center py-12 text-sm text-muted-foreground">
        © 2026 BuildCost. Esta es una herramienta de estimación con fines de referencia.
      </footer>
    </div>);

};

export default Index;
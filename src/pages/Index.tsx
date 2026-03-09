import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight, Home, Building2, Ruler, Star } from "lucide-react";
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
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 mb-8">
          <Calculator className="h-4 w-4 text-accent-foreground" />
          <span className="text-sm font-medium text-accent-foreground">Estimación gratuita en 2 minutos</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Calculá el costo de construir tu casa
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-10">
          Configurá tu casa en 2 minutos y obtené un costo estimado de construcción.
        </p>

        <Button size="lg" className="text-base px-8 py-6 gap-2" onClick={handleStartCalculating}>
          Comenzar a calcular
          <ArrowRight className="h-4 w-4" />
        </Button>
      </section>

      {/* Feature cards */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Ruler className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-card-foreground mb-2">Configurá los m²</h3>
            <p className="text-sm text-muted-foreground">Indicá el tamaño y las características de tu futura casa.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-card-foreground mb-2">Elegí el tipo de obra</h3>
            <p className="text-sm text-muted-foreground">Tradicional o Steel Frame, con distintos niveles de terminación.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-card-foreground mb-2">Obtené tu presupuesto</h3>
            <p className="text-sm text-muted-foreground">Recibí una estimación al instante y compará opciones.</p>
          </div>
        </div>
      </section>

      {/* Decorative illustration section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-accent/50 border border-border rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground font-heading mb-3">¿Por qué estimar antes de construir?</h2>
            <p className="text-muted-foreground mb-4">
              Conocer el costo aproximado te permite planificar mejor, comparar presupuestos de profesionales y tomar decisiones informadas antes de comenzar tu obra.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" /> Planificá tu inversión con anticipación</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" /> Compará opciones de construcción</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" /> Evitá sorpresas en el presupuesto</li>
            </ul>
          </div>
          {/* Abstract house illustration with CSS shapes */}
          <div className="flex-shrink-0 w-48 h-48 relative">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-6" />
            <div className="absolute inset-2 bg-primary/15 rounded-2xl -rotate-3" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm">
                <rect x="20" y="45" width="60" height="40" rx="4" className="fill-primary/20 stroke-primary" strokeWidth="2"/>
                <polygon points="50,15 85,45 15,45" className="fill-primary/15 stroke-primary" strokeWidth="2" strokeLinejoin="round"/>
                <rect x="40" y="60" width="16" height="25" rx="2" className="fill-primary/30 stroke-primary" strokeWidth="1.5"/>
                <rect x="25" y="55" width="10" height="10" rx="1" className="fill-accent stroke-primary" strokeWidth="1.5"/>
                <rect x="62" y="55" width="10" height="10" rx="1" className="fill-accent stroke-primary" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      {showCalculator && (
        <div ref={calculatorRef}>
          <CostCalculator />
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-12 text-sm text-muted-foreground">
        © 2026 BuildCost. Esta es una herramienta de estimación con fines de referencia.
      </footer>
    </div>
  );
};

export default Index;

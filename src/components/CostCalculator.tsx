import { useState, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Loader2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwMxEByxNJ5NyQ_AjxqBmFu28ZceVcJGshqxXNmvu1luFqwOzngDNuoDMaz04tFPP4kjg/exec";

interface ApiResult {
  costo_total: number;
  m2_posibles: number;
  tiempo_obra: number;
  estado_proyecto: "VIABLE" | "NO_VIABLE";
  resumen_proyecto: string;
  faltante_m2: number;
  presupuesto_faltante: number;
}

interface Props {
  onResult?: () => void;
  resultRef?: RefObject<HTMLDivElement>;
}

const CostCalculator = ({ onResult, resultRef }: Props) => {
  const [modoCalculo, setModoCalculo] = useState("");
  const [sqm, setSqm] = useState("");
  const [budget, setBudget] = useState("");
  const [finishing, setFinishing] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [personas, setPersonas] = useState("");
  const [garage, setGarage] = useState("");

  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCalculate = async () => {
    if (!modoCalculo) return;

    const body: Record<string, string | number> = {
      modo_calculo: modoCalculo,
      personas: parseInt(personas) || 1,
      cochera: parseInt(garage) || 0,
      paquete_terminacion:
        finishing === "basic" ? "basico" : finishing === "premium" ? "premium" : "estandar",
    };

    if (modoCalculo === "m2") {
      const area = parseFloat(sqm);
      if (!area || area <= 0) return;
      body.m2 = area;
    } else {
      const totalBudget = parseFloat(budget);
      if (!totalBudget || totalBudget <= 0) return;
      body.presupuesto = totalBudget;
    }

    setLoading(true);
    setError(false);
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("API error");
      const data: ApiResult = await res.json();
      setResult(data);
      onResult?.();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatUSD = (n: number) => "USD " + n.toLocaleString("es-AR");

  return (
    <div>
      {/* Form */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h2 className="text-xl font-bold text-card-foreground mb-5 text-center font-heading">
          Configurá tu casa
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Modo de cálculo</Label>
              <Select value={modoCalculo} onValueChange={setModoCalculo}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m2">Por metros cuadrados</SelectItem>
                  <SelectItem value="presupuesto">Por presupuesto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {modoCalculo === "presupuesto" ? (
              <div>
                <Label htmlFor="budget" className="text-xs">Presupuesto ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Ej: 90000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="mt-1 h-9 text-sm"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="sqm" className="text-xs">Metros cuadrados</Label>
                <Input
                  id="sqm"
                  type="number"
                  placeholder="Ej: 120"
                  value={sqm}
                  onChange={(e) => setSqm(e.target.value)}
                  className="mt-1 h-9 text-sm"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Personas</Label>
              <Select value={personas} onValueChange={setPersonas}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Nivel de terminación</Label>
              <Select value={finishing} onValueChange={setFinishing}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="standard">Estándar</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Cocina</Label>
              <Select value={kitchen} onValueChange={setKitchen}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sin-isla">Sin isla</SelectItem>
                  <SelectItem value="con-isla">Con isla</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Cochera</Label>
              <Select value={garage} onValueChange={setGarage}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Sin cochera</SelectItem>
                  <SelectItem value="1">1 auto</SelectItem>
                  <SelectItem value="2">2 autos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="w-full py-5 text-sm mt-1"
            onClick={handleCalculate}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Calculando proyecto...
              </span>
            ) : (
              "Ver proyecto estimado"
            )}
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-5 mt-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-semibold text-destructive">
              No pudimos calcular el proyecto. Intentá nuevamente.
            </p>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div ref={resultRef} className="bg-card rounded-2xl border border-border p-6 shadow-sm mt-5">
          <h3 className="text-lg font-bold text-card-foreground mb-5 text-center font-heading">
            Proyecto estimado para tu casa
          </h3>

          {result.estado_proyecto === "VIABLE" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Costo estimado</p>
                  <p className="text-lg font-bold text-foreground">{formatUSD(result.costo_total)}</p>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Superficie estimada</p>
                  <p className="text-lg font-bold text-foreground">{result.m2_posibles} m²</p>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Tiempo estimado</p>
                  <div className="flex items-center justify-center gap-1.5">
                    <Clock className="h-4 w-4 text-foreground" />
                    <p className="text-lg font-bold text-foreground">{result.tiempo_obra} meses</p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/50 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-accent-foreground leading-relaxed">
                  {result.resumen_proyecto}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Superficie posible</p>
                <p className="text-lg font-bold text-foreground">{result.m2_posibles} m²</p>
              </div>

              <div className="bg-accent/50 rounded-xl p-4 flex items-start gap-3">
                <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <div className="text-sm text-accent-foreground leading-relaxed space-y-2">
                  <p>Con tu presupuesto actual podés construir aproximadamente {result.m2_posibles} m².</p>
                  <p>{result.resumen_proyecto}</p>
                  <p className="font-semibold">
                    Te faltan aproximadamente {formatUSD(result.presupuesto_faltante)} para alcanzar el proyecto recomendado.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CostCalculator;

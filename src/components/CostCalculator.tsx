import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertTriangle } from "lucide-react";
import type { ApiResult, CompareApiResult } from "@/components/ResultBlock";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxMy-q3gc9vkjhJmjxPJxP2olVA5BY6x1aKIiHpI92sZwx4n5uK8vqtT1NTiZZv7xykoQ/exec";

const fetchApi = async (body: Record<string, string | number>): Promise<ApiResult | CompareApiResult> => {
  console.log("API payload", body);
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("API error");
  const json = await res.json();
  console.log("API response", json);
  return json;
};

export interface CalculatorResult {
  type: "single" | "compare";
  single?: ApiResult;
  compare?: { steel_frame: ApiResult; tradicional: ApiResult };
  modoCalculo: "m2" | "presupuesto";
  budget: string;
  sqm: string;
}

interface Props {
  onResult?: (result: CalculatorResult) => void;
}

const CostCalculator = ({ onResult }: Props) => {
  const [modoCalculo, setModoCalculo] = useState<"m2" | "presupuesto">("m2");
  const [sqm, setSqm] = useState("");
  const [budget, setBudget] = useState("");
  const [finishing, setFinishing] = useState<"basic" | "standard" | "premium">("standard");
  const [personas, setPersonas] = useState("default");
  const [garage, setGarage] = useState("1");
  const [tipoConstructivo, setTipoConstructivo] = useState<"steel_frame" | "tradicional" | "comparar">("steel_frame");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const mapFinishingToApi = (value: "basic" | "standard" | "premium") => {
    if (value === "basic") return "basico";
    if (value === "standard") return "estandar";
    return "premium";
  };

  const handleCalculate = async () => {
    const personasNumber = personas === "default" ? 2 : Number(personas || 2);
    const garageNumber = Number(garage || 0);
    const finishingApi = mapFinishingToApi(finishing);

    const baseBody: Record<string, string | number> = {
      modo_calculo: modoCalculo,
      personas: personasNumber,
      cochera: garageNumber,
      paquete_terminacion: finishingApi,
      tipo_constructivo: tipoConstructivo,
    };

    if (modoCalculo === "m2") {
      const area = Number(sqm);
      if (!area || area <= 0) return;
      baseBody.m2 = area;
    } else {
      const totalBudget = Number(budget);
      if (!totalBudget || totalBudget <= 0) return;
      baseBody.presupuesto = totalBudget;
    }

    setLoading(true);
    setError(false);

    try {
      const response = await fetchApi(baseBody);

      if (
        tipoConstructivo === "comparar" &&
        "tipo_resultado" in response &&
        response.tipo_resultado === "comparacion"
      ) {
        onResult?.({
          type: "compare",
          compare: { steel_frame: response.steel_frame, tradicional: response.tradicional },
          modoCalculo,
          budget,
          sqm,
        });
      } else {
        onResult?.({
          type: "single",
          single: response as ApiResult,
          modoCalculo,
          budget,
          sqm,
        });
      }
    } catch (err) {
      console.error("Calculator error", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <h2 className="text-xl font-bold text-card-foreground mb-5 text-center font-heading">Configurá tu casa</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Modo de cálculo</Label>
            <Select value={modoCalculo} onValueChange={(value) => setModoCalculo(value as "m2" | "presupuesto")}>
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
              <Input id="budget" type="number" placeholder="Ej: 90000" value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1 h-9 text-sm" />
            </div>
          ) : (
            <div>
              <Label htmlFor="sqm" className="text-xs">Metros cuadrados</Label>
              <Input id="sqm" type="number" placeholder="Ej: 120" value={sqm} onChange={(e) => setSqm(e.target.value)} className="mt-1 h-9 text-sm" />
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
                <SelectItem value="default">No especificar</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Nivel de terminación</Label>
            <Select value={finishing} onValueChange={(value) => setFinishing(value as "basic" | "standard" | "premium")}>
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

          <div>
            <Label className="text-xs">Tipo de construcción</Label>
            <Select value={tipoConstructivo} onValueChange={(value) => setTipoConstructivo(value as "steel_frame" | "tradicional" | "comparar")}>
              <SelectTrigger className="mt-1 h-9 text-sm">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="steel_frame">Steel Frame</SelectItem>
                <SelectItem value="tradicional">Tradicional</SelectItem>
                <SelectItem value="comparar">Comparar ambos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full py-5 text-sm mt-1" onClick={handleCalculate} disabled={loading}>
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

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-5 mt-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-semibold text-destructive">No pudimos calcular el proyecto. Intentá nuevamente.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;

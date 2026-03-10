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
import { Download, Users, Clock } from "lucide-react";

interface Result {
  sqm: number;
  pricePerSqm: number;
  total: number;
  months: number;
}

interface Props {
  onResult?: () => void;
  resultRef?: RefObject<HTMLDivElement>;
}

const CostCalculator = ({ onResult, resultRef }: Props) => {
  const [location, setLocation] = useState("");
  const [sqm, setSqm] = useState("");
  const [constructionType, setConstructionType] = useState("");
  const [finishing, setFinishing] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [garage, setGarage] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const area = parseFloat(sqm);
    if (!area || area <= 0) return;

    let price = 750;
    if (constructionType === "steel") price = 700;
    if (finishing === "premium") price *= 1.2;
    if (finishing === "basic") price *= 0.9;

    // Time estimation (months)
    // Base: ~1 month per 15m². Steel frame is ~30% faster.
    let months = Math.ceil(area / 15);
    if (constructionType === "steel") months = Math.ceil(months * 0.7);
    if (finishing === "premium") months = Math.ceil(months * 1.2);
    months = Math.max(4, months); // minimum 4 months

    setResult({
      sqm: area,
      pricePerSqm: Math.round(price),
      total: Math.round(area * price),
      months,
    });
    onResult?.();
  };

  const formatCurrency = (n: number) =>
    "$" + n.toLocaleString("es-AR");

  return (
    <div>
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h2 className="text-xl font-bold text-card-foreground mb-5 text-center font-heading">
          Configurá tu casa
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location" className="text-xs">Ubicación</Label>
              <Input
                id="location"
                placeholder="Ej: Buenos Aires"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 h-9 text-sm"
              />
            </div>
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
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Tipo de construcción</Label>
              <Select value={constructionType} onValueChange={setConstructionType}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traditional">Tradicional</SelectItem>
                  <SelectItem value="steel">Steel Frame</SelectItem>
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
              <Label className="text-xs">Dormitorios</Label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Baños</Label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
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
                  <SelectItem value="3">3+ autos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full py-5 text-sm mt-1" onClick={handleCalculate}>
            Ver costo estimado
          </Button>
        </div>
      </div>

      {result && (
        <div ref={resultRef} className="bg-card rounded-2xl border border-border p-6 shadow-sm mt-5 text-center">
          <h3 className="text-lg font-bold text-card-foreground mb-5 font-heading">
            Costo estimado de construcción
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-muted rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Tamaño</p>
              <p className="text-lg font-bold text-foreground">{result.sqm} m²</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Precio por m²</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(result.pricePerSqm)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-accent rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Costo total</p>
              <p className="text-lg font-bold text-accent-foreground">{formatCurrency(result.total)}</p>
            </div>
            <div className="bg-accent rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Tiempo estimado</p>
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="h-4 w-4 text-accent-foreground" />
                <p className="text-lg font-bold text-accent-foreground">{result.months} meses</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2 text-sm">
              <Users className="h-4 w-4" />
              Comparar arquitectos
            </Button>
            <Button variant="outline" className="flex-1 gap-2 text-sm">
              <Download className="h-4 w-4" />
              Descargar estimación
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;

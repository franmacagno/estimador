import { useState } from "react";
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
import { Download, Users } from "lucide-react";

interface Result {
  sqm: number;
  pricePerSqm: number;
  total: number;
}

const CostCalculator = () => {
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

    setResult({
      sqm: area,
      pricePerSqm: Math.round(price),
      total: Math.round(area * price),
    });
  };

  const formatCurrency = (n: number) =>
    "$" + n.toLocaleString("es-AR");

  return (
    <section className="px-6 pb-20 max-w-xl mx-auto">
      <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center font-heading">
          Configurá tu casa
        </h2>

        <div className="space-y-5">
          <div>
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              placeholder="Ej: Buenos Aires, Argentina"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="sqm">Metros cuadrados</Label>
            <Input
              id="sqm"
              type="number"
              placeholder="Ej: 120"
              value={sqm}
              onChange={(e) => setSqm(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Tipo de construcción</Label>
            <Select value={constructionType} onValueChange={setConstructionType}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="traditional">Tradicional</SelectItem>
                <SelectItem value="steel">Steel Frame</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Nivel de terminación</Label>
            <Select value={finishing} onValueChange={setFinishing}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Seleccionar terminación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Básico</SelectItem>
                <SelectItem value="standard">Estándar</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Cantidad de dormitorios</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Seleccionar dormitorios" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full py-6 text-base mt-2" onClick={handleCalculate}>
            Calcular costo
          </Button>
        </div>
      </div>

      {result && (
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm mt-6 text-center">
          <h3 className="text-xl font-bold text-card-foreground mb-6 font-heading">
            Costo estimado de construcción
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-muted rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Tamaño</p>
              <p className="text-xl font-bold text-foreground">{result.sqm} m²</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Precio por m²</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.pricePerSqm)}</p>
            </div>
            <div className="bg-accent rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Costo total</p>
              <p className="text-xl font-bold text-accent-foreground">{formatCurrency(result.total)}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2">
              <Users className="h-4 w-4" />
              Comparar arquitectos
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Descargar estimación
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CostCalculator;

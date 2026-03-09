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
    "$" + n.toLocaleString("en-US");

  return (
    <section className="px-6 pb-20 max-w-xl mx-auto">
      <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center font-heading">
          Configure your house
        </h2>

        <div className="space-y-5">
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g. Buenos Aires, Argentina"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="sqm">Square meters</Label>
            <Input
              id="sqm"
              type="number"
              placeholder="e.g. 120"
              value={sqm}
              onChange={(e) => setSqm(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Construction type</Label>
            <Select value={constructionType} onValueChange={setConstructionType}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="traditional">Traditional</SelectItem>
                <SelectItem value="steel">Steel Frame</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Finishing level</Label>
            <Select value={finishing} onValueChange={setFinishing}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select finishing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Number of bedrooms</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select bedrooms" />
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
            Calculate cost
          </Button>
        </div>
      </div>

      {result && (
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm mt-6 text-center">
          <h3 className="text-xl font-bold text-card-foreground mb-6 font-heading">
            Estimated construction cost
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-muted rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">House size</p>
              <p className="text-xl font-bold text-foreground">{result.sqm} m²</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Price per m²</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(result.pricePerSqm)}</p>
            </div>
            <div className="bg-accent rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Total cost</p>
              <p className="text-xl font-bold text-accent-foreground">{formatCurrency(result.total)}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2">
              <Users className="h-4 w-4" />
              Compare architects
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Download estimate
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CostCalculator;

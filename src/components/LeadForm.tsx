import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import type { CalculatorResult } from "@/components/CostCalculator";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxMy-q3gc9vkjhJmjxPJxP2olVA5BY6x1aKIiHpI92sZwx4n5uK8vqtT1NTiZZv7xykoQ/exec";

interface LeadFormProps {
  calcResult: CalculatorResult;
}

const LeadForm = ({ calcResult }: LeadFormProps) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !telefono.trim()) return;

    setLoading(true);
    setError(false);

    try {
      const resultType = calcResult.type === "compare" ? "comparacion" : "simple";

      const payload = {
        action: "save_lead",
        nombre: nombre.trim() || "",
        email: email.trim() || "",
        telefono: telefono.trim() || "",
        ciudad: ciudad.trim() || "",
        mensaje: mensaje.trim() || "",
        modo_calculo: calcResult.modoCalculo || "",
        m2: calcResult.sqm || "",
        presupuesto: calcResult.budget || "",
        tipo_obra: calcResult.tipoConstructivo || "",
        categoria: calcResult.finishing || "",
        resultado_tipo: resultType,
        costo_estimado: resultType === "simple" ? (calcResult.single?.costo_total || "") : "",
        tiempo_estimado: resultType === "simple" ? (calcResult.single?.tiempo_obra || "") : "",
        costo_steel_frame: resultType === "comparacion" ? (calcResult.compare?.steel_frame?.costo_total || "") : "",
        tiempo_steel_frame: resultType === "comparacion" ? (calcResult.compare?.steel_frame?.tiempo_obra || "") : "",
        costo_tradicional: resultType === "comparacion" ? (calcResult.compare?.tradicional?.costo_total || "") : "",
        tiempo_tradicional: resultType === "comparacion" ? (calcResult.compare?.tradicional?.tiempo_obra || "") : "",
        fuente: "landing",
        estado: "nuevo",
      };

      console.log("Calculator result", calcResult);
      console.log("Lead payload", payload);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      console.log("Status de respuesta:", res.status);
      const responseText = await res.text();
      console.log("Texto de respuesta:", responseText);
      const data = JSON.parse(responseText);

      if (!data.success) throw new Error("Webhook returned failure");

      setSuccess(true);
      setNombre("");
      setEmail("");
      setTelefono("");
      setCiudad("");
      setMensaje("");
    } catch (err) {
      console.error("Lead submit error", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 shadow-sm text-center">
        <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
        <p className="text-base font-semibold text-card-foreground mb-2">
          Gracias. Recibimos tus datos.
        </p>
        <p className="text-sm text-muted-foreground">
          Un arquitecto puede contactarte pronto para revisar tu caso.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <h3 className="text-lg font-bold text-card-foreground mb-5 text-center font-heading">
        Recibí este cálculo + asesoramiento de un arquitecto
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <Label htmlFor="lead-nombre" className="text-xs">Nombre *</Label>
            <Input
              id="lead-nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 h-9 text-sm"
              required
              maxLength={100}
            />
          </div>
          <div>
            <Label htmlFor="lead-email" className="text-xs">Email *</Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-9 text-sm"
              required
              maxLength={255}
            />
          </div>
          <div>
            <Label htmlFor="lead-telefono" className="text-xs">Teléfono *</Label>
            <Input
              id="lead-telefono"
              type="tel"
              placeholder="Ej: 11 2345-6789"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="mt-1 h-9 text-sm"
              required
              maxLength={30}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="lead-ciudad" className="text-xs">Ciudad (opcional)</Label>
          <Input
            id="lead-ciudad"
            placeholder="Ej: Buenos Aires"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="mt-1 h-9 text-sm"
            maxLength={100}
          />
        </div>

        <div>
          <Label htmlFor="lead-mensaje" className="text-xs">Mensaje (opcional)</Label>
          <Textarea
            id="lead-mensaje"
            placeholder="Contanos algo sobre tu proyecto (si ya tenés terreno, ubicación, dudas, etc.)"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="mt-1 text-sm min-h-[80px]"
            maxLength={1000}
          />
        </div>

        <Button type="submit" className="w-full py-5 text-sm" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando...
            </span>
          ) : (
            "Enviar"
          )}
        </Button>
      </form>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-5 mt-5 text-center">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-semibold text-destructive">
              Ocurrió un error al enviar tus datos. Intentá nuevamente.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadForm;

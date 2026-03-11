import { Clock, CheckCircle, XCircle } from "lucide-react";

export interface ApiResult {
  costo_total?: number;
  m2_posibles?: number;
  m2_totales?: number;
  tiempo_obra?: number;
  estado_proyecto?: "VIABLE" | "NO_VIABLE";
  resumen_proyecto?: string;
  faltante_m2?: number;
  presupuesto_faltante?: number;
}

export interface CompareApiResult {
  tipo_resultado: "comparacion";
  steel_frame: ApiResult;
  tradicional: ApiResult;
}

const formatUSD = (n: number) => "USD " + n.toLocaleString("es-AR");

interface ResultBlockProps {
  result: ApiResult;
  modoCalculo: "m2" | "presupuesto";
  budget: string;
  inputM2?: string;
  label?: string;
}

const ResultBlock = ({ result, modoCalculo, budget, inputM2, label }: ResultBlockProps) => {
  const inputM2Number = inputM2 ? Number(inputM2) : 0;

  const surfaceValue =
    modoCalculo === "m2"
      ? result.m2_totales && result.m2_totales > 0
        ? result.m2_totales
        : inputM2Number
      : result.m2_posibles && result.m2_posibles > 0
        ? result.m2_posibles
        : 0;

  const surfaceLabel = modoCalculo === "m2" ? "Superficie total" : "Superficie posible";
  const tiempoObra = result.tiempo_obra ?? 0;
  const costoTotal = result.costo_total ?? 0;
  const resumenProyecto = result.resumen_proyecto ?? "";
  const estadoProyecto = result.estado_proyecto ?? "VIABLE";

  if (modoCalculo === "m2") {
    return (
      <div className="space-y-4">
        {label && <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{label}</h4>}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Costo estimado</p>
            <p className="text-lg font-bold text-foreground">{formatUSD(costoTotal)}</p>
          </div>
          <div className="bg-muted rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{surfaceLabel}</p>
            <p className="text-lg font-bold text-foreground">{surfaceValue} m²</p>
          </div>
          <div className="bg-muted rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Tiempo estimado</p>
            <div className="flex items-center justify-center gap-1.5">
              <Clock className="h-4 w-4 text-foreground" />
              <p className="text-lg font-bold text-foreground">{tiempoObra} meses</p>
            </div>
          </div>
        </div>
        <div className="bg-accent/50 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-accent-foreground leading-relaxed">{resumenProyecto}</p>
        </div>
      </div>
    );
  }

  const isViable = estadoProyecto === "VIABLE";

  return (
    <div className="space-y-4">
      {label && <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{label}</h4>}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-muted rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">{surfaceLabel}</p>
          <p className="text-lg font-bold text-foreground">{surfaceValue} m²</p>
        </div>
        <div className="bg-muted rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Presupuesto ingresado</p>
          <p className="text-lg font-bold text-foreground">{formatUSD(Number(budget) || 0)}</p>
        </div>
        <div className="bg-muted rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Tiempo estimado</p>
          <div className="flex items-center justify-center gap-1.5">
            <Clock className="h-4 w-4 text-foreground" />
            <p className="text-lg font-bold text-foreground">{tiempoObra} meses</p>
          </div>
        </div>
      </div>
      {isViable ? (
        <div className="bg-accent/50 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-accent-foreground leading-relaxed">{resumenProyecto}</p>
        </div>
      ) : (
        <div className="bg-accent/50 rounded-xl p-4 flex items-start gap-3">
          <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
          <div className="text-sm text-accent-foreground leading-relaxed space-y-2">
            <p>{resumenProyecto}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultBlock;

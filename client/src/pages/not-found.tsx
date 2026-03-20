import { Card } from "@/components/ui-components";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="flex mb-4 gap-2">
          <AlertCircle className="h-8 w-8 text-rose-500" />
          <h1 className="text-2xl font-bold text-foreground">404 Página no encontrada</h1>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          ¿Olvidaste agregar la página al enrutador?
        </p>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const mockForklifts = [
  {
    id: 1,
    model: "Toyota 8FBE25",
    serialNumber: "TOY-2021-001",
    status: "Disponível",
    hours: 2450,
    lastMaintenance: "2024-01-10",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    model: "Hyster H50FT",
    serialNumber: "HYS-2020-015",
    status: "Em uso",
    hours: 3200,
    lastMaintenance: "2024-01-08",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    model: "Crown FC 5200",
    serialNumber: "CRW-2022-008",
    status: "Manutenção",
    hours: 1800,
    lastMaintenance: "2024-01-15",
    image: "/placeholder.svg"
  }
];

export default function OperatorForklifts() {
  const [selectedForklift, setSelectedForklift] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível":
        return "bg-green-500";
      case "Em uso":
        return "bg-blue-500";
      case "Manutenção":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Disponível":
        return <CheckCircle className="h-4 w-4" />;
      case "Em uso":
        return <Clock className="h-4 w-4" />;
      case "Manutenção":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Truck className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="operator" />
      
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Empilhadeiras Disponíveis</h1>
          <p className="text-muted-foreground">
            Visualize as empilhadeiras disponíveis para operação
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockForklifts.map((forklift) => (
            <Card key={forklift.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{forklift.model}</CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={`${getStatusColor(forklift.status)} text-white flex items-center gap-1`}
                  >
                    {getStatusIcon(forklift.status)}
                    {forklift.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Truck className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Série:</strong> {forklift.serialNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Horímetro:</strong> {forklift.hours.toLocaleString()} horas
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Última Manutenção:</strong> {new Date(forklift.lastMaintenance).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  {forklift.status === "Disponível" && (
                    <Button 
                      className="w-full"
                      onClick={() => setSelectedForklift(forklift.id)}
                    >
                      Selecionar para Operação
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedForklift && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Empilhadeira Selecionada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Você selecionou a empilhadeira {mockForklifts.find(f => f.id === selectedForklift)?.model}.
                  Deseja iniciar a operação?
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedForklift(null)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={() => {
                      setSelectedForklift(null);
                      // Aqui seria redirecionado para o check-list
                    }}
                    className="flex-1"
                  >
                    Iniciar Operação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
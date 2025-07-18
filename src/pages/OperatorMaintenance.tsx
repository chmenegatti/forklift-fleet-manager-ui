import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Clock, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockMaintenanceHistory = [
  {
    id: 1,
    forklift: "Toyota 8FBE25",
    type: "Preventiva",
    date: "2024-01-15",
    status: "Concluída",
    description: "Troca de óleo e filtros"
  },
  {
    id: 2,
    forklift: "Hyster H50FT",
    type: "Corretiva",
    date: "2024-01-20",
    status: "Agendada",
    description: "Reparo no sistema hidráulico"
  }
];

const forklifts = [
  { id: 1, model: "Toyota 8FBE25", serialNumber: "TOY-2021-001" },
  { id: 2, model: "Hyster H50FT", serialNumber: "HYS-2020-015" },
  { id: 3, model: "Crown FC 5200", serialNumber: "CRW-2022-008" }
];

export default function OperatorMaintenance() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const { toast } = useToast();

  const handleReportDefect = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Defeito reportado",
      description: "O defeito foi reportado com sucesso para a equipe de manutenção.",
    });
    setShowReportForm(false);
  };

  const handleScheduleMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Manutenção agendada",
      description: "A manutenção foi agendada com sucesso.",
    });
    setShowScheduleForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluída":
        return "bg-green-500";
      case "Agendada":
        return "bg-blue-500";
      case "Em andamento":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="operator" />
      
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Manutenção</h1>
          <p className="text-muted-foreground">
            Reporte defeitos e agende manutenções das empilhadeiras
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => setShowReportForm(true)}
                className="w-full justify-start"
                variant="outline"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Reportar Defeito
              </Button>
              <Button 
                onClick={() => setShowScheduleForm(true)}
                className="w-full justify-start"
                variant="outline"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Manutenção
              </Button>
            </CardContent>
          </Card>

          {/* Histórico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Histórico Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMaintenanceHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.forklift}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(item.status)} text-white`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal - Reportar Defeito */}
        {showReportForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Reportar Defeito</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReportDefect} className="space-y-4">
                  <div>
                    <Label htmlFor="forklift">Empilhadeira</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a empilhadeira" />
                      </SelectTrigger>
                      <SelectContent>
                        {forklifts.map((forklift) => (
                          <SelectItem key={forklift.id} value={forklift.id.toString()}>
                            {forklift.model} - {forklift.serialNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="critica">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição do Defeito</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva o defeito encontrado..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setShowReportForm(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1">
                      Reportar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal - Agendar Manutenção */}
        {showScheduleForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Agendar Manutenção</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleScheduleMaintenance} className="space-y-4">
                  <div>
                    <Label htmlFor="forklift">Empilhadeira</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a empilhadeira" />
                      </SelectTrigger>
                      <SelectContent>
                        {forklifts.map((forklift) => (
                          <SelectItem key={forklift.id} value={forklift.id.toString()}>
                            {forklift.model} - {forklift.serialNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="maintenance-type">Tipo de Manutenção</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preventiva">Preventiva</SelectItem>
                        <SelectItem value="corretiva">Corretiva</SelectItem>
                        <SelectItem value="preditiva">Preditiva</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date">Data Desejada</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reason">Motivo/Observações</Label>
                    <Textarea
                      id="reason"
                      placeholder="Descreva o motivo da manutenção..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setShowScheduleForm(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1">
                      Agendar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Truck,
  Wrench,
  FileCheck
} from "lucide-react";

interface Forklift {
  id: string;
  model: string;
  serialNumber: string;
  status: "disponível" | "em uso" | "manutenção";
  currentHours: number;
}

interface ChecklistItem {
  id: string;
  description: string;
  category: "segurança" | "operacional" | "mecânico";
  checked: boolean;
  observation?: string;
}

const mockForklifts: Forklift[] = [
  { id: "1", model: "Toyota 8FBE20", serialNumber: "TY001", status: "disponível", currentHours: 2450 },
  { id: "2", model: "Hyster H2.5FT", serialNumber: "HY002", status: "disponível", currentHours: 1890 },
  { id: "3", model: "Crown FC 5200", serialNumber: "CR003", status: "em uso", currentHours: 3200 },
];

const checklistItems: ChecklistItem[] = [
  { id: "1", description: "Verificar nível de óleo hidráulico", category: "mecânico", checked: false },
  { id: "2", description: "Testar freios", category: "segurança", checked: false },
  { id: "3", description: "Verificar pneus e pressão", category: "segurança", checked: false },
  { id: "4", description: "Testar buzina", category: "segurança", checked: false },
  { id: "5", description: "Verificar funcionamento das luzes", category: "segurança", checked: false },
  { id: "6", description: "Testar movimento dos garfos", category: "operacional", checked: false },
  { id: "7", description: "Verificar nível de combustível/bateria", category: "operacional", checked: false },
  { id: "8", description: "Testar direção", category: "operacional", checked: false },
  { id: "9", description: "Verificar vazamentos", category: "mecânico", checked: false },
  { id: "10", description: "Limpar retrovisores", category: "segurança", checked: false },
];

export default function OperatorDashboard() {
  const [selectedForklift, setSelectedForklift] = useState<string>("");
  const [currentSection, setCurrentSection] = useState<"select" | "checklist" | "defect" | "maintenance">("select");
  const [checklist, setChecklist] = useState<ChecklistItem[]>(checklistItems);
  const [startHours, setStartHours] = useState<string>("");
  const [endHours, setEndHours] = useState<string>("");
  const [defectDescription, setDefectDescription] = useState<string>("");
  const [maintenanceReason, setMaintenanceReason] = useState<string>("");
  const [maintenanceDate, setMaintenanceDate] = useState<string>("");
  const { toast } = useToast();

  const selectedForkliftData = mockForklifts.find(f => f.id === selectedForklift);

  const handleChecklistChange = (itemId: string, checked: boolean) => {
    setChecklist(prev => prev.map(item => 
      item.id === itemId ? { ...item, checked } : item
    ));
  };

  const handleObservationChange = (itemId: string, observation: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === itemId ? { ...item, observation } : item
    ));
  };

  const handleSubmitChecklist = () => {
    if (!startHours || !endHours) {
      toast({
        title: "Erro",
        description: "Informe as horas de início e fim",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Check-list enviado",
      description: "Check-list registrado com sucesso",
    });
    
    // Reset form
    setChecklist(checklistItems);
    setStartHours("");
    setEndHours("");
    setCurrentSection("select");
  };

  const handleSubmitDefect = () => {
    if (!defectDescription.trim()) {
      toast({
        title: "Erro",
        description: "Descreva o defeito ou ponto de atenção",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Defeito reportado",
      description: "Relatório enviado para a equipe de manutenção",
    });
    
    setDefectDescription("");
    setCurrentSection("select");
  };

  const handleSubmitMaintenance = () => {
    if (!maintenanceReason.trim() || !maintenanceDate) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Manutenção agendada",
      description: "Solicitação enviada para aprovação",
    });
    
    setMaintenanceReason("");
    setMaintenanceDate("");
    setCurrentSection("select");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "segurança": return "🛡️";
      case "operacional": return "⚙️";
      case "mecânico": return "🔧";
      default: return "📝";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "segurança": return "bg-red-100 text-red-800";
      case "operacional": return "bg-blue-100 text-blue-800";
      case "mecânico": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (currentSection === "select") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar userType="operator" />
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard do Operador</h1>
            <p className="text-muted-foreground">Selecione uma empilhadeira para começar</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Selecionar Empilhadeira
              </CardTitle>
              <CardDescription>
                Escolha a empilhadeira que você irá operar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="forklift-select">Empilhadeira</Label>
                <Select value={selectedForklift} onValueChange={setSelectedForklift}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma empilhadeira" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockForklifts.filter(f => f.status === "disponível").map((forklift) => (
                      <SelectItem key={forklift.id} value={forklift.id}>
                        {forklift.model} - {forklift.serialNumber} ({forklift.currentHours}h)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedForkliftData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Button 
                    onClick={() => setCurrentSection("checklist")}
                    className="h-24 flex flex-col gap-2"
                  >
                    <FileCheck className="h-6 w-6" />
                    <span>Check-list</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentSection("defect")}
                    className="h-24 flex flex-col gap-2"
                  >
                    <AlertTriangle className="h-6 w-6" />
                    <span>Reportar Defeito</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentSection("maintenance")}
                    className="h-24 flex flex-col gap-2"
                  >
                    <Calendar className="h-6 w-6" />
                    <span>Agendar Manutenção</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentSection === "checklist") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar userType="operator" />
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setCurrentSection("select")} className="mb-4">
              ← Voltar
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">Check-list de Inspeção</h1>
            <p className="text-muted-foreground">
              {selectedForkliftData?.model} - {selectedForkliftData?.serialNumber}
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horário de Operação
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-hours">Horas no Início</Label>
                  <Input
                    id="start-hours"
                    type="number"
                    placeholder="Ex: 2450"
                    value={startHours}
                    onChange={(e) => setStartHours(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end-hours">Horas no Final</Label>
                  <Input
                    id="end-hours"
                    type="number"
                    placeholder="Ex: 2458"
                    value={endHours}
                    onChange={(e) => setEndHours(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Itens de Verificação</CardTitle>
                <CardDescription>
                  Marque cada item verificado e adicione observações se necessário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checklist.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={(checked) => 
                            handleChecklistChange(item.id, checked as boolean)
                          }
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <label 
                              htmlFor={item.id} 
                              className="text-sm font-medium cursor-pointer"
                            >
                              {getCategoryIcon(item.category)} {item.description}
                            </label>
                            <Badge variant="secondary" className={getCategoryColor(item.category)}>
                              {item.category}
                            </Badge>
                          </div>
                          <Textarea
                            placeholder="Observações (opcional)"
                            className="mt-2"
                            value={item.observation || ""}
                            onChange={(e) => handleObservationChange(item.id, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setCurrentSection("select")}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmitChecklist}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Finalizar Check-list
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === "defect") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar userType="operator" />
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setCurrentSection("select")} className="mb-4">
              ← Voltar
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">Reportar Defeito</h1>
            <p className="text-muted-foreground">
              {selectedForkliftData?.model} - {selectedForkliftData?.serialNumber}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Descrição do Problema
              </CardTitle>
              <CardDescription>
                Descreva detalhadamente o defeito ou ponto de atenção identificado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="defect-description">Descrição do Defeito *</Label>
                <Textarea
                  id="defect-description"
                  placeholder="Descreva o problema identificado, quando ocorreu e em que situação..."
                  className="min-h-32"
                  value={defectDescription}
                  onChange={(e) => setDefectDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setCurrentSection("select")}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmitDefect}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Enviar Relatório
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentSection === "maintenance") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar userType="operator" />
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setCurrentSection("select")} className="mb-4">
              ← Voltar
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">Agendar Manutenção</h1>
            <p className="text-muted-foreground">
              {selectedForkliftData?.model} - {selectedForkliftData?.serialNumber}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Solicitação de Manutenção
              </CardTitle>
              <CardDescription>
                Preencha os dados para solicitar uma manutenção
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maintenance-reason">Motivo da Manutenção *</Label>
                <Textarea
                  id="maintenance-reason"
                  placeholder="Descreva o motivo da solicitação de manutenção..."
                  value={maintenanceReason}
                  onChange={(e) => setMaintenanceReason(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="maintenance-date">Data Sugerida *</Label>
                <Input
                  id="maintenance-date"
                  type="date"
                  value={maintenanceDate}
                  onChange={(e) => setMaintenanceDate(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setCurrentSection("select")}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmitMaintenance}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Solicitar Manutenção
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
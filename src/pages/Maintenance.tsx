import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Filter,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar as CalendarIcon,
  User,
  Wrench
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const maintenanceRecords = [
  {
    id: "MANT-001",
    forkliftId: "EMP-001",
    forkliftModel: "Toyota 8FBN25",
    type: "Manutenção Preventiva",
    description: "Troca de óleo e filtros, verificação de sistemas",
    scheduledDate: "2024-01-20",
    completedDate: null,
    status: "agendada",
    priority: "media",
    technician: "João Silva",
    estimatedHours: 4,
    cost: 350.00
  },
  {
    id: "MANT-002",
    forkliftId: "EMP-007",
    forkliftModel: "Hyster H3.0FT",
    type: "Troca de Óleo",
    description: "Substituição completa do óleo hidráulico",
    scheduledDate: "2024-01-18",
    completedDate: "2024-01-18",
    status: "concluida",
    priority: "baixa",
    technician: "Maria Santos",
    estimatedHours: 2,
    cost: 180.50
  },
  {
    id: "MANT-003",
    forkliftId: "EMP-012",
    forkliftModel: "Crown FC5252",
    type: "Reparo no Sistema Hidráulico",
    description: "Vazamento identificado na bomba hidráulica",
    scheduledDate: "2024-01-19",
    completedDate: null,
    status: "em-andamento",
    priority: "alta",
    technician: "Pedro Lima",
    estimatedHours: 6,
    cost: 850.00
  },
  {
    id: "MANT-004",
    forkliftId: "EMP-018",
    forkliftModel: "Yale GDP25VX",
    type: "Inspeção de Segurança",
    description: "Inspeção trimestral obrigatória",
    scheduledDate: "2024-01-22",
    completedDate: null,
    status: "agendada",
    priority: "alta",
    technician: "Ana Costa",
    estimatedHours: 3,
    cost: 200.00
  },
  {
    id: "MANT-005",
    forkliftId: "EMP-003",
    forkliftModel: "Crown FC5252",
    type: "Substituição de Pneus",
    description: "Troca dos pneus dianteiros por desgaste",
    scheduledDate: "2024-01-15",
    completedDate: "2024-01-15",
    status: "concluida",
    priority: "media",
    technician: "Carlos Ferreira",
    estimatedHours: 3,
    cost: 420.00
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "concluida":
      return "default";
    case "em-andamento":
      return "secondary";
    case "agendada":
      return "outline";
    default:
      return "secondary";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "alta":
      return "destructive";
    case "media":
      return "secondary";
    case "baixa":
      return "outline";
    default:
      return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "concluida":
      return CheckCircle;
    case "em-andamento":
      return Clock;
    case "agendada":
      return CalendarIcon;
    default:
      return Clock;
  }
};

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();

  const filteredMaintenance = maintenanceRecords.filter(record => {
    const matchesSearch = 
      record.forkliftModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.technician.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleScheduleMaintenance = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Manutenção agendada com sucesso!",
      description: "A manutenção foi adicionada ao cronograma.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="admin" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Manutenção</h1>
            <p className="text-muted-foreground">
              Agende e acompanhe as manutenções da frota
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Agendar Manutenção
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Agendar Nova Manutenção</DialogTitle>
                <DialogDescription>
                  Preencha os dados para agendar uma nova manutenção.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="forklift">Empilhadeira</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a empilhadeira" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp-001">EMP-001 - Toyota 8FBN25</SelectItem>
                        <SelectItem value="emp-002">EMP-002 - Hyster H3.0FT</SelectItem>
                        <SelectItem value="emp-003">EMP-003 - Crown FC5252</SelectItem>
                        <SelectItem value="emp-004">EMP-004 - Yale GDP25VX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Manutenção</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preventiva">Manutenção Preventiva</SelectItem>
                        <SelectItem value="corretiva">Manutenção Corretiva</SelectItem>
                        <SelectItem value="inspecao">Inspeção de Segurança</SelectItem>
                        <SelectItem value="troca-oleo">Troca de Óleo</SelectItem>
                        <SelectItem value="reparo">Reparo Específico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Data Agendada</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="technician">Técnico Responsável</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o técnico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joao">João Silva</SelectItem>
                        <SelectItem value="maria">Maria Santos</SelectItem>
                        <SelectItem value="pedro">Pedro Lima</SelectItem>
                        <SelectItem value="ana">Ana Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select defaultValue="media">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Horas Estimadas</Label>
                    <Input id="hours" type="number" placeholder="4" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Custo Estimado (R$)</Label>
                    <Input id="cost" type="number" placeholder="350.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva os serviços a serem realizados..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleScheduleMaintenance}>
                  Agendar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Manutenções</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">40% do total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">20% do total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">40% do total</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por empilhadeira, tipo ou técnico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="agendada">Agendada</SelectItem>
                  <SelectItem value="em-andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5" />
              <span>Registro de Manutenções</span>
            </CardTitle>
            <CardDescription>
              Histórico completo de manutenções programadas e realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empilhadeira</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data Agendada</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Custo</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaintenance.map((record) => {
                  const StatusIcon = getStatusIcon(record.status);
                  return (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.forkliftModel}</div>
                          <div className="text-sm text-muted-foreground">{record.forkliftId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.type}</div>
                          <div className="text-sm text-muted-foreground">{record.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{record.scheduledDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {record.status === "concluida"
                            ? "Concluída"
                            : record.status === "em-andamento"
                            ? "Em Andamento"
                            : "Agendada"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(record.priority)}>
                          {record.priority === "alta"
                            ? "Alta"
                            : record.priority === "media"
                            ? "Média"
                            : "Baixa"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{record.technician}</span>
                        </div>
                      </TableCell>
                      <TableCell>R$ {record.cost.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                          {record.status === "em-andamento" && (
                            <Button size="sm">
                              Finalizar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
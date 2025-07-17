import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter,
  Edit,
  Eye,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const forklifts = [
  {
    id: "EMP-001",
    model: "Toyota 8FBN25",
    year: 2022,
    serialNumber: "TY001234567",
    status: "operacional",
    operator: "João Silva",
    location: "Setor A - Doca 1",
    nextMaintenance: "2024-02-15"
  },
  {
    id: "EMP-002",
    model: "Hyster H3.0FT",
    year: 2021,
    serialNumber: "HY987654321",
    status: "manutencao",
    operator: "-",
    location: "Oficina",
    nextMaintenance: "2024-01-25"
  },
  {
    id: "EMP-003",
    model: "Crown FC5252",
    year: 2023,
    serialNumber: "CR555888999",
    status: "disponivel",
    operator: "-",
    location: "Setor B - Estoque",
    nextMaintenance: "2024-03-10"
  },
  {
    id: "EMP-004",
    model: "Yale GDP25VX",
    year: 2020,
    serialNumber: "YL147258369",
    status: "operacional",
    operator: "Maria Santos",
    location: "Setor C - Expedição",
    nextMaintenance: "2024-02-28"
  },
  {
    id: "EMP-005",
    model: "Caterpillar DP25N",
    year: 2022,
    serialNumber: "CT369741852",
    status: "alerta",
    operator: "Pedro Lima",
    location: "Setor A - Doca 3",
    nextMaintenance: "2024-01-30"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "operacional":
      return "success";
    case "disponivel":
      return "secondary";
    case "manutencao":
      return "warning";
    case "alerta":
      return "destructive";
    default:
      return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "operacional":
      return CheckCircle;
    case "disponivel":
      return CheckCircle;
    case "manutencao":
      return Settings;
    case "alerta":
      return AlertTriangle;
    default:
      return XCircle;
  }
};

export default function Forklifts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredForklifts = forklifts.filter(forklift => {
    const matchesSearch = 
      forklift.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forklift.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forklift.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || forklift.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddForklift = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Empilhadeira cadastrada com sucesso!",
      description: "A nova empilhadeira foi adicionada à frota.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="admin" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Empilhadeiras</h1>
            <p className="text-muted-foreground">
              Gerencie sua frota de empilhadeiras
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Empilhadeira
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Empilhadeira</DialogTitle>
                <DialogDescription>
                  Preencha os dados da nova empilhadeira para adicionar à frota.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input id="model" placeholder="Ex: Toyota 8FBN25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Ano</Label>
                  <Input id="year" type="number" placeholder="2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serial">Número de Série</Label>
                  <Input id="serial" placeholder="Ex: TY001234567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status Inicial</Label>
                  <Select defaultValue="disponivel">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponivel">Disponível</SelectItem>
                      <SelectItem value="operacional">Operacional</SelectItem>
                      <SelectItem value="manutencao">Em Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Foto (opcional)</Label>
                  <Input id="photo" type="file" accept="image/*" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddForklift}>
                  Cadastrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por modelo, ID ou número de série..."
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
                  <SelectItem value="operacional">Operacional</SelectItem>
                  <SelectItem value="disponivel">Disponível</SelectItem>
                  <SelectItem value="manutencao">Em Manutenção</SelectItem>
                  <SelectItem value="alerta">Alerta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Forklifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForklifts.map((forklift) => {
            const StatusIcon = getStatusIcon(forklift.status);
            return (
              <Card key={forklift.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{forklift.model}</CardTitle>
                    <Badge variant={getStatusColor(forklift.status) as any}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {forklift.status === "operacional"
                        ? "Operacional"
                        : forklift.status === "disponivel"
                        ? "Disponível"
                        : forklift.status === "manutencao"
                        ? "Manutenção"
                        : "Alerta"}
                    </Badge>
                  </div>
                  <CardDescription>
                    ID: {forklift.id} • Ano: {forklift.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Série:</span> {forklift.serialNumber}
                    </div>
                    <div>
                      <span className="font-medium">Operador:</span> {forklift.operator}
                    </div>
                    <div>
                      <span className="font-medium">Localização:</span> {forklift.location}
                    </div>
                    <div>
                      <span className="font-medium">Próxima Manutenção:</span> {forklift.nextMaintenance}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredForklifts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Nenhuma empilhadeira encontrada com os filtros aplicados.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}>
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
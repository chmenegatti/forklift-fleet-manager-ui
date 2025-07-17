import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Edit,
  Eye,
  UserCheck,
  Clock,
  Truck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const operators = [
  {
    id: "OP-001",
    name: "João Silva",
    cpf: "123.456.789-00",
    phone: "(11) 99999-1234",
    email: "joao.silva@empresa.com",
    status: "ativo",
    currentForklift: "EMP-001 - Toyota 8FBN25",
    totalHours: 1240,
    startTime: "08:00",
    endTime: "17:00"
  },
  {
    id: "OP-002",
    name: "Maria Santos",
    cpf: "987.654.321-00",
    phone: "(11) 99999-5678",
    email: "maria.santos@empresa.com",
    status: "ativo",
    currentForklift: "EMP-004 - Yale GDP25VX",
    totalHours: 980,
    startTime: "14:00",
    endTime: "22:00"
  },
  {
    id: "OP-003",
    name: "Pedro Lima",
    cpf: "456.789.123-00",
    phone: "(11) 99999-9012",
    email: "pedro.lima@empresa.com",
    status: "ativo",
    currentForklift: "EMP-005 - Caterpillar DP25N",
    totalHours: 1560,
    startTime: "06:00",
    endTime: "14:00"
  },
  {
    id: "OP-004",
    name: "Ana Costa",
    cpf: "789.123.456-00",
    phone: "(11) 99999-3456",
    email: "ana.costa@empresa.com",
    status: "inativo",
    currentForklift: "-",
    totalHours: 720,
    startTime: "-",
    endTime: "-"
  },
  {
    id: "OP-005",
    name: "Carlos Ferreira",
    cpf: "321.654.987-00",
    phone: "(11) 99999-7890",
    email: "carlos.ferreira@empresa.com",
    status: "ativo",
    currentForklift: "-",
    totalHours: 2100,
    startTime: "22:00",
    endTime: "06:00"
  }
];

export default function Operators() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredOperators = operators.filter(operator =>
    operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    operator.cpf.includes(searchTerm) ||
    operator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOperator = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Operador cadastrado com sucesso!",
      description: "O novo operador foi adicionado ao sistema.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="admin" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Operadores</h1>
            <p className="text-muted-foreground">
              Gerencie os operadores de empilhadeiras
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Operador
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Operador</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo operador de empilhadeira.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Ex: João Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(11) 99999-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="operador@empresa.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certification">Certificação CNH</Label>
                  <Input id="certification" placeholder="Número da CNH" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hire-date">Data de Contratação</Label>
                    <Input id="hire-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shift">Turno</Label>
                    <Input id="shift" placeholder="Ex: Matutino" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddOperator}>
                  Cadastrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Operadores</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">4 ativos, 1 inativo</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Operação</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Operando agora</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas Totais (Mês)</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6,600</div>
              <p className="text-xs text-muted-foreground">Todos os operadores</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Aguardando alocação</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome, CPF ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Operators Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Operadores</CardTitle>
            <CardDescription>
              Gerencie informações e alocação dos operadores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Empilhadeira Atual</TableHead>
                  <TableHead>Horas Totais</TableHead>
                  <TableHead>Turno Atual</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOperators.map((operator) => (
                  <TableRow key={operator.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{operator.name}</div>
                        <div className="text-sm text-muted-foreground">{operator.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{operator.cpf}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{operator.phone}</div>
                        <div className="text-xs text-muted-foreground">{operator.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={operator.status === "ativo" ? "default" : "secondary"}>
                        {operator.status === "ativo" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {operator.currentForklift === "-" ? (
                          <span className="text-muted-foreground">Não alocado</span>
                        ) : (
                          operator.currentForklift
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{operator.totalHours}h</TableCell>
                    <TableCell>
                      {operator.startTime !== "-" ? (
                        <div className="text-sm">
                          {operator.startTime} - {operator.endTime}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
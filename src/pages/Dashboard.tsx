import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Users, 
  Settings, 
  AlertTriangle, 
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  BarChart3
} from "lucide-react";

const stats = [
  {
    title: "Total de Empilhadeiras",
    value: "24",
    icon: Truck,
    description: "19 ativas, 5 em manutenção",
    color: "primary"
  },
  {
    title: "Operadores Ativos",
    value: "18",
    icon: Users,
    description: "12 operando agora",
    color: "success"
  },
  {
    title: "Manutenções Pendentes",
    value: "7",
    icon: Settings,
    description: "3 urgentes, 4 programadas",
    color: "warning"
  },
  {
    title: "Alertas de Segurança",
    value: "2",
    icon: AlertTriangle,
    description: "Requer atenção imediata",
    color: "destructive"
  }
];

const recentMaintenance = [
  {
    id: "EMP-001",
    name: "Toyota 8FBN25",
    type: "Manutenção Preventiva",
    date: "2024-01-20",
    status: "agendada",
    technician: "João Silva"
  },
  {
    id: "EMP-007",
    name: "Hyster H3.0FT",
    type: "Troca de Óleo",
    date: "2024-01-18",
    status: "concluida",
    technician: "Maria Santos"
  },
  {
    id: "EMP-012",
    name: "Crown FC5252",
    type: "Reparo no Sistema Hidráulico",
    date: "2024-01-19",
    status: "em-andamento",
    technician: "Pedro Lima"
  },
  {
    id: "EMP-018",
    name: "Yale GDP25VX",
    type: "Inspeção de Segurança",
    date: "2024-01-22",
    status: "agendada",
    technician: "Ana Costa"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "concluida":
      return "success";
    case "em-andamento":
      return "warning";
    case "agendada":
      return "secondary";
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
      return Calendar;
    default:
      return Clock;
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="admin" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral da sua frota de empilhadeiras
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Fleet Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Status da Frota</span>
              </CardTitle>
              <CardDescription>
                Distribuição atual das empilhadeiras
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Operacionais</span>
                  <span className="text-sm text-muted-foreground">19/24 (79%)</span>
                </div>
                <Progress value={79} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Em Manutenção</span>
                  <span className="text-sm text-muted-foreground">5/24 (21%)</span>
                </div>
                <Progress value={21} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Disponíveis</span>
                  <span className="text-sm text-muted-foreground">7/19 (37%)</span>
                </div>
                <Progress value={37} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Acesso direto às funcionalidades principais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Empilhadeira
              </Button>
              <Button className="w-full justify-start" variant="secondary" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Operador
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Agendar Manutenção
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Manutenções Recentes</span>
            </CardTitle>
            <CardDescription>
              Últimas atividades de manutenção programadas e realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMaintenance.map((maintenance) => {
                const StatusIcon = getStatusIcon(maintenance.status);
                return (
                  <div
                    key={maintenance.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{maintenance.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {maintenance.type}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{maintenance.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {maintenance.technician}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(maintenance.status) as any}>
                        {maintenance.status === "concluida"
                          ? "Concluída"
                          : maintenance.status === "em-andamento"
                          ? "Em Andamento"
                          : "Agendada"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
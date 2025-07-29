import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getDashboardData } from "@/lib/api";
import { Truck, Users, Settings, Plus, BarChart3, CheckCircle, Clock, Calendar } from "lucide-react";

// ...existing code...

type DashboardData = {
  totalEmpilhadeiras: number;
  totalManutencoes: number;
  manutencoesPendentes: number;
  manutencoesConcluidas: number;
  totalChecklists: number;
  checklistsAprovados: number;
  checklistsReprovados: number;
  totalOperadores: number;
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/");
      return;
    }
    getDashboardData(token)
      .then(setData)
      .catch(() => {
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div className="p-8">Carregando...</div>;
  if (!data) return <div className="p-8">Erro ao carregar dados do dashboard.</div>;

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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empilhadeiras</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalEmpilhadeiras}</div>
              <p className="text-xs text-muted-foreground">Total de empilhadeiras cadastradas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Operadores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalOperadores}</div>
              <p className="text-xs text-muted-foreground">Total de operadores</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Manutenções</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalManutencoes}</div>
              <p className="text-xs text-muted-foreground">Total de manutenções</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checklists</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalChecklists}</div>
              <p className="text-xs text-muted-foreground">Total de checklists</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Gráfico unificado de Manutenções e Checklists */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Status Geral</span>
              </CardTitle>
              <CardDescription>
                Distribuição de manutenções e checklists
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Manutenções Pendentes</span>
                  <span className="text-sm text-muted-foreground">{data.manutencoesPendentes}/{data.totalManutencoes} ({((data.manutencoesPendentes / data.totalManutencoes) * 100).toFixed(0)}%)</span>
                </div>
                <Progress value={data.totalManutencoes ? (data.manutencoesPendentes / data.totalManutencoes) * 100 : 0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Manutenções Concluídas</span>
                  <span className="text-sm text-muted-foreground">{data.manutencoesConcluidas}/{data.totalManutencoes} ({((data.manutencoesConcluidas / data.totalManutencoes) * 100).toFixed(0)}%)</span>
                </div>
                <Progress value={data.totalManutencoes ? (data.manutencoesConcluidas / data.totalManutencoes) * 100 : 0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Checklists Aprovados</span>
                  <span className="text-sm text-muted-foreground">{data.checklistsAprovados}/{data.totalChecklists} ({((data.checklistsAprovados / data.totalChecklists) * 100).toFixed(0)}%)</span>
                </div>
                <Progress value={data.totalChecklists ? (data.checklistsAprovados / data.totalChecklists) * 100 : 0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Checklists Reprovados</span>
                  <span className="text-sm text-muted-foreground">{data.checklistsReprovados}/{data.totalChecklists} ({((data.checklistsReprovados / data.totalChecklists) * 100).toFixed(0)}%)</span>
                </div>
                <Progress value={data.totalChecklists ? (data.checklistsReprovados / data.totalChecklists) * 100 : 0} className="h-2" />
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
      </main>
    </div>
  );
}
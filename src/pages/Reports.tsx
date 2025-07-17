import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  BarChart3,
  Calendar,
  Truck,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const reportCategories = [
  {
    title: "Relatório de Frota",
    description: "Status geral e utilização da frota de empilhadeiras",
    icon: Truck,
    data: {
      totalForklifts: 24,
      operational: 19,
      maintenance: 5,
      utilizationRate: "85%"
    },
    lastGenerated: "2024-01-19"
  },
  {
    title: "Relatório de Operadores",
    description: "Produtividade e horas trabalhadas por operadores",
    icon: Users,
    data: {
      totalOperators: 18,
      activeNow: 12,
      totalHours: 6600,
      avgHoursPerOperator: "367h"
    },
    lastGenerated: "2024-01-19"
  },
  {
    title: "Relatório de Manutenção",
    description: "Custos, prazos e histórico de manutenções",
    icon: BarChart3,
    data: {
      totalMaintenances: 15,
      completed: 8,
      pending: 7,
      totalCost: "R$ 4.850,00"
    },
    lastGenerated: "2024-01-18"
  },
  {
    title: "Relatório Financeiro",
    description: "Custos operacionais e retorno sobre investimento",
    icon: DollarSign,
    data: {
      operationalCost: "R$ 12.400,00",
      maintenanceCost: "R$ 4.850,00",
      roi: "+15%",
      savings: "R$ 2.300,00"
    },
    lastGenerated: "2024-01-17"
  }
];

const quickStats = [
  {
    title: "Uptime da Frota",
    value: "92%",
    change: "+3%",
    trend: "up",
    icon: TrendingUp
  },
  {
    title: "Custo por Hora",
    value: "R$ 18,50",
    change: "-2%",
    trend: "down",
    icon: TrendingDown
  },
  {
    title: "Manutenções no Prazo",
    value: "89%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp
  },
  {
    title: "Eficiência Operacional",
    value: "87%",
    change: "+1%",
    trend: "up",
    icon: TrendingUp
  }
];

const recentReports = [
  {
    name: "Relatório Mensal - Janeiro 2024",
    type: "Completo",
    generatedDate: "2024-01-19",
    size: "2.3 MB",
    format: "PDF"
  },
  {
    name: "Análise de Produtividade - Semana 3",
    type: "Operadores",
    generatedDate: "2024-01-18",
    size: "1.1 MB",
    format: "Excel"
  },
  {
    name: "Custos de Manutenção - Q4 2023",
    type: "Financeiro",
    generatedDate: "2024-01-15",
    size: "890 KB",
    format: "PDF"
  },
  {
    name: "Status da Frota - Janeiro",
    type: "Frota",
    generatedDate: "2024-01-12",
    size: "1.8 MB",
    format: "Excel"
  }
];

export default function Reports() {
  const { toast } = useToast();

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Gerando relatório...",
      description: `O relatório de ${reportType} está sendo processado.`,
    });
    
    // Simular geração de relatório
    setTimeout(() => {
      toast({
        title: "Relatório gerado com sucesso!",
        description: "O download será iniciado automaticamente.",
      });
    }, 2000);
  };

  const handleDownloadReport = (reportName: string) => {
    toast({
      title: "Iniciando download...",
      description: `Baixando ${reportName}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="admin" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Relatórios</h1>
          <p className="text-muted-foreground">
            Gere e visualize relatórios detalhados da operação
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Report Categories */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Gerar Novos Relatórios</span>
              </CardTitle>
              <CardDescription>
                Selecione o tipo de relatório para gerar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.title}
                      className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{category.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        {Object.entries(category.data).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <div className="font-medium">{value}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Último: {category.lastGenerated}
                        </span>
                        <div className="flex space-x-2">
                          <Select defaultValue="pdf">
                            <SelectTrigger className="w-20 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="csv">CSV</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button 
                            size="sm" 
                            onClick={() => handleGenerateReport(category.title)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Gerar
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Report Builder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Relatório Personalizado</span>
            </CardTitle>
            <CardDescription>
              Configure um relatório customizado com os dados que você precisa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Período</label>
                <Select defaultValue="month">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Última Semana</SelectItem>
                    <SelectItem value="month">Último Mês</SelectItem>
                    <SelectItem value="quarter">Último Trimestre</SelectItem>
                    <SelectItem value="year">Último Ano</SelectItem>
                    <SelectItem value="custom">Período Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Dados</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Dados</SelectItem>
                    <SelectItem value="fleet">Apenas Frota</SelectItem>
                    <SelectItem value="operators">Apenas Operadores</SelectItem>
                    <SelectItem value="maintenance">Apenas Manutenção</SelectItem>
                    <SelectItem value="financial">Apenas Financeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Formato</label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full" onClick={() => handleGenerateReport("Personalizado")}>
                  <Download className="h-4 w-4 mr-2" />
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Relatórios Recentes</span>
            </CardTitle>
            <CardDescription>
              Acesse relatórios gerados anteriormente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Tipo: {report.type}</span>
                        <span>•</span>
                        <span>Gerado em: {report.generatedDate}</span>
                        <span>•</span>
                        <span>Tamanho: {report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{report.format}</Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadReport(report.name)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
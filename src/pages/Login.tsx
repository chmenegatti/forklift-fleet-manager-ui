import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import forkliftHero from "@/assets/forklift-hero.jpg";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (userType: "admin" | "operator") => {
    setIsLoading(true);
    
    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo ao ForkLift Manager`,
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Hero image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={forkliftHero}
          alt="Empilhadeira em warehouse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Truck className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">ForkLift Manager</h1>
              <p className="text-xl">
                Gestão completa da sua frota de empilhadeiras
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:hidden mb-8">
            <div className="bg-primary p-3 rounded-lg inline-block mb-4">
              <Truck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">ForkLift Manager</h1>
            <p className="text-muted-foreground">
              Gestão da sua frota de empilhadeiras
            </p>
          </div>

          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Administrador</span>
              </TabsTrigger>
              <TabsTrigger value="operator" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Operador</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Login Administrador</CardTitle>
                  <CardDescription>
                    Acesso completo ao sistema de gestão
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">E-mail</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@empresa.com"
                      defaultValue="admin@empresa.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Senha</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      defaultValue="123456"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleLogin("admin")}
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar como Admin"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operator">
              <Card>
                <CardHeader>
                  <CardTitle>Login Operador</CardTitle>
                  <CardDescription>
                    Acesso para operadores de empilhadeiras
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="operator-email">E-mail</Label>
                    <Input
                      id="operator-email"
                      type="email"
                      placeholder="operador@empresa.com"
                      defaultValue="operador@empresa.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operator-password">Senha</Label>
                    <Input
                      id="operator-password"
                      type="password"
                      placeholder="••••••••"
                      defaultValue="123456"
                    />
                  </div>
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => handleLogin("operator")}
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar como Operador"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button variant="link" className="text-sm">
              Esqueci minha senha
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>Dados de teste:</p>
            <p>Admin: admin@empresa.com / 123456</p>
            <p>Operador: operador@empresa.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
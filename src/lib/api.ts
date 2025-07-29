// Função para buscar dados do dashboard
export async function getDashboardData(token: string) {
  const res = await fetch("http://localhost:3000/api/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Não autorizado ou erro ao buscar dados");
  return res.json();
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function loginAdmin(email: string, password: string): Promise<string | null> {
  try {
    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    // Supondo que o token venha como { token: '...' }
    return data.token || null;
  } catch (error) {
    return null;
  }
}

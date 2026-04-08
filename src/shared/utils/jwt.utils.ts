import { CommerceType } from "@/modules/commerce/enums/commerce-type.enum";

export interface JwtPayload {
  sub?: string;
  role?: string;
  clientId?: string;
  commerceId?: string;
  commerceType?: CommerceType;
  iat?: number;
  exp?: number;
}

export const decodeJwtPayload = (token: string): JwtPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    // Convertir base64url a base64 estándar
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const decoded = atob(base64 + padding);

    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;

  // exp está en segundos, Date.now() en milisegundos
  return Date.now() >= payload.exp * 1000;
};

/**
 * Estilo para botón primario (verde)
 * Usado para acciones principales como confirmar, guardar, etc.
 */
export const primaryButtonSx = {
  borderRadius: 2,
  px: 3,
  py: 1,
  textTransform: "none" as const,
  fontWeight: 600,
  bgcolor: "#77A787",
  fontSize: { xs: 14, sm: 15 },
  boxShadow: "none",
  "&:hover": {
    bgcolor: "#6B9677",
    boxShadow: "0 2px 8px rgba(119,167,135,0.3)",
  },
  "&:disabled": {
    bgcolor: "#E0E0E0",
    color: "#9E9E9E",
  },
};

/**
 * Estilo para botón secundario (gris)
 * Usado para acciones secundarias como cancelar, volver, etc.
 */
export const secondaryButtonSx = {
  borderRadius: 2,
  px: 3,
  py: 1,
  textTransform: "none" as const,
  fontWeight: 600,
  color: "#757575",
  fontSize: { xs: 14, sm: 15 },
  "&:hover": {
    bgcolor: "#F5F5F5",
  },
};

/**
 * Estilo para botón de peligro (rojo)
 * Usado para acciones destructivas como eliminar
 */
export const dangerButtonSx = {
  borderRadius: 2,
  px: 3,
  py: 1,
  textTransform: "none" as const,
  fontWeight: 600,
  bgcolor: "#EF5350",
  fontSize: { xs: 14, sm: 15 },
  boxShadow: "none",
  "&:hover": {
    bgcolor: "#E53935",
    boxShadow: "0 2px 8px rgba(239,83,80,0.3)",
  },
  "&:disabled": {
    bgcolor: "#E0E0E0",
    color: "#9E9E9E",
  },
};

/**
 * Estilo para botón de texto/link
 * Usado para acciones menos prominentes
 */
export const textButtonSx = {
  textTransform: "none" as const,
  fontWeight: 600,
  fontSize: { xs: 14, sm: 15 },
  color: "#77A787",
  "&:hover": {
    bgcolor: "rgba(119, 167, 135, 0.08)",
  },
};

import { Box } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
}

// Componente para secciones del perfil (información básica, preferencias, etc.)
export default function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: 3,
        p: 2.5,
        mb: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <CustomTitle
        text={title}
        color="#2D2D2D"
        variant="subtitle1"
        align="left"
      />
      {children}
    </Box>
  );
}

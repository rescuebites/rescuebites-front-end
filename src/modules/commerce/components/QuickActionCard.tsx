import { ReactNode } from "react";
import { Box } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
interface Props {
  title: string;
  icon: ReactNode;
  color: string;
  onClick?: () => void;
}

export default function QuickActionCard({
  title,
  icon,
  color,
  onClick,
}: Props) {
  return (
    <Box
      onClick={onClick}
      sx={{
        flex: 1,
        bgcolor: color,
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        color: "white",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s",
        "&:hover": onClick
          ? {
              transform: "scale(1.05)",
            }
          : {},
      }}
    >
      <Box>{icon}</Box>

      <CustomTitle text={title} variant="h6" color="white" align="center" />
    </Box>
  );
}

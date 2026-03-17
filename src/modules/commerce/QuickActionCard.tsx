import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  color: string;
}

export default function QuickActionCard({ title, icon, color }: Props) {
  return (
    <Box
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
      }}
    >
      <Box sx={{ fontSize: 28 }}>{icon}</Box>

      <Typography
        fontSize={13}
        fontWeight={600}
        textAlign="center"
        sx={{ lineHeight: 1.2 }}
      >
        {title}
      </Typography>
    </Box>
  );
}
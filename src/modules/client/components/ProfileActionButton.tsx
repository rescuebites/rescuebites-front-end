import { Box, Typography } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { ReactNode } from "react";

interface ProfileActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  iconBgColor?: string;
  iconColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  showBorder?: boolean;
}

export default function ProfileActionButton({
  icon,
  label,
  onClick,
  iconBgColor = "#F5F5F5",
  iconColor = "#6B7280",
  textColor = "#2D2D2D",
  hoverBgColor = "#FAFAFA",
  showBorder = true,
}: ProfileActionButtonProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2.5,
        cursor: "pointer",
        borderBottom: showBorder ? "1px solid #F0F0F0" : "none",
        "&:hover": {
          bgcolor: hoverBgColor,
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: iconBgColor,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ color: iconColor, fontSize: 20, display: "flex" }}>
            {icon}
          </Box>
        </Box>
        <CustomTitle
          text={label}
          color={textColor}
          variant="subtitle2"
          align="left"
        />
      </Box>
      <Typography sx={{ fontSize: 20, color: "#9CA3AF" }}>›</Typography>
    </Box>
  );
}

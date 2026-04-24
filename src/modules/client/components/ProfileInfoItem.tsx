import { Box } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { ReactNode } from "react";

interface ProfileInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  iconBgColor?: string;
  iconColor?: string;
}

export default function ProfileInfoItem({
  icon,
  label,
  value,
  iconBgColor = "#EAF6E7",
  iconColor = "#5A9A6E",
}: ProfileInfoItemProps) {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Box
        sx={{
          width: 56,
          height: 56,
          bgcolor: iconBgColor,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ color: iconColor, fontSize: 28, display: "flex" }}>
          {icon}
        </Box>
      </Box>
      <Box>
        <CustomTitle
          text={label}
          color="#9CA3AF"
          variant="body2"
          align="left"
          fontWeight={500}
          fontSize={{ xs: 15, sm: 17 }}
        />
        <CustomTitle
          text={value}
          color="#2D2D2D"
          variant="body2"
          align="left"
          fontSize={{ xs: 18, sm: 20 }}
        />
      </Box>
    </Box>
  );
}

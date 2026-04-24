import { Chip } from "@mui/material";
import { CommerceType } from "@/modules/commerce/enums/commerce-type.enum";
import { CommerceTypeDisplayName } from "@/shared/utils/commerce-mapping";
import { COMMERCE_TYPE_STYLES } from "@/shared/config/commerce-styles";

interface CommerceTypeChipProps {
  commerceType: CommerceType;
  size?: "small" | "medium";
}

export default function CommerceTypeChip({
  commerceType,
  size = "medium",
}: CommerceTypeChipProps) {
  const displayName = CommerceTypeDisplayName[commerceType];
  const styles = COMMERCE_TYPE_STYLES[displayName] ?? {
    bg: "#E5E7EB",
    color: "#374151",
    icon: null,
  };

  return (
    <Chip
      label={displayName}
      icon={styles.icon ? <span style={{ display: "flex", alignItems: "center", color: styles.color }}>{styles.icon}</span> : undefined}
      size={size}
      sx={{
        bgcolor: styles.bg,
        color: styles.color,
        fontWeight: 600,
        fontSize: size === "small" ? 13 : 15,
        px: { xs: 1, sm: 1.25 },
        py: { xs: 0.4, sm: 0.5 },
        borderRadius: 2,
        "& .MuiChip-icon": { color: styles.color },
      }}
    />
  );
}

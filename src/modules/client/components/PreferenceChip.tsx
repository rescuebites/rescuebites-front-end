import { Chip, Box } from "@mui/material";
import { PreferenceType } from "../enums/preference-type.enum";
import { PreferenceConfigMap, PreferenceTypeDisplayName } from "../utils/preference-mapping";

interface PreferenceChipProps {
  preference: PreferenceType;
  size?: "small" | "medium";
}

export default function PreferenceChip({ preference, size = "medium" }: PreferenceChipProps) {
  const config = PreferenceConfigMap[preference];
  const Icon = config.icon;

  return (
    <Chip
      icon={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: config.textColor,
            ml: 0.5,
          }}
        >
          <Icon size={20} />
        </Box>
      }
      label={PreferenceTypeDisplayName[preference]}
      size={size}
      sx={{
        bgcolor: config.bgColor,
        color: config.textColor,
        fontWeight: 600,
        fontSize: size === "small" ? 13 : 15,
        height: size === "small" ? 32 : 40,
        borderRadius: 2,
        "& .MuiChip-icon": {
          ml: 1,
        },
      }}
    />
  );
}

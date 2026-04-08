import { Paper, Stack, Avatar, Box, Chip } from "@mui/material";
import { MdLocationOn } from "react-icons/md";
import {
  CommerceTypeDisplayName,
  CommerceTypeDisplay,
} from "@/shared/utils/commerce-mapping";
import { COMMERCE_TYPE_STYLES } from "@/shared/config/commerce-styles";
import { CommerceType } from "@/modules/commerce/enums/commerce-type.enum";
import CustomTitle from "./CustomTitle";

interface CommerceInfoCardProps {
  commerceName: string;
  commerceAddress: string;
  commerceLocality?: string;
  commerceType?: string;
  commerceImages?: Array<{ url: string }>;
  onClick?: () => void;
}

const CommerceInfoCard: React.FC<CommerceInfoCardProps> = ({
  commerceName,
  commerceAddress,
  commerceLocality,
  commerceType,
  commerceImages,
  onClick,
}) => {
  // Obtener los estilos del tipo de comercio
  const displayName = commerceType
    ? CommerceTypeDisplayName[commerceType as CommerceType] || commerceType
    : null;
  const commerceStyle = displayName
    ? COMMERCE_TYPE_STYLES[displayName as CommerceTypeDisplay]
    : null;

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        bgcolor: "white",
        p: { xs: 2, sm: 2.5 },
        borderRadius: { xs: 3, sm: 4 },
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        ...(onClick && {
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            transform: "translateY(-2px)",
          },
        }),
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Avatar del comercio */}
        <Avatar
          src={commerceImages?.[0]?.url}
          alt={commerceName}
          sx={{
            width: { xs: 90, sm: 100 },
            height: { xs: 90, sm: 100 },
            bgcolor: "#77A787",
            fontSize: 20,
            fontWeight: 700,
            borderRadius: 2,
          }}
        >
          {!commerceImages?.[0]?.url && commerceName.charAt(0).toUpperCase()}
        </Avatar>

        {/* Información del comercio */}
        <Box flex={1}>
          <CustomTitle
            variant="subtitle1"
            align="left"
            text={commerceName}
            color="#2D2D2D"
          />

          {/* Dirección */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ mb: commerceType ? 1 : 0 }}
          >
            <MdLocationOn size={16} color="#9CA3AF" />

            <CustomTitle
              variant="subtitle2"
              align="left"
              text={`${commerceAddress}${commerceLocality ? `, ${commerceLocality}` : ""}`}
              color="#9CA3AF"
            />
          </Stack>

          {/* Chip del tipo de comercio */}
          {commerceType && commerceStyle && displayName && (
            <Chip
              icon={commerceStyle.icon as any}
              label={displayName}
              size="small"
              sx={{
                backgroundColor: commerceStyle.bg,
                color: commerceStyle.color,
                fontWeight: 600,
                fontSize: 11,
                height: 22,
                "& .MuiChip-label": {
                  px: 1.5,
                },
                "& .MuiChip-icon": {
                  color: commerceStyle.color,
                  ml: 1,
                  mr: -0.5,
                },
              }}
            />
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default CommerceInfoCard;

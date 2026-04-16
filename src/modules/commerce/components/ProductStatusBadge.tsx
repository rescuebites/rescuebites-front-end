import { Box, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

type Variant = "expire" | "stock";

interface Props {
  text: string;
  variant: Variant;
}

export default function ProductStatusBadge({ text, variant }: Props) {
  const isExpire = variant === "expire";

  const styles = isExpire
    ? {
        bg: "#FEE2E2",
        color: "#DC2626",
      }
    : {
        bg: "#FFE9DF",
        color: "#F97316",
      };

  return (
    <Box
      sx={{
        bgcolor: styles.bg,
        borderRadius: 3,
        px: 1.2,
        py: 0.4,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        {isExpire ? (
          <AccessTimeIcon sx={{ fontSize: 14, color: styles.color }} />
        ) : (
          <Inventory2OutlinedIcon sx={{ fontSize: 14, color: styles.color }} />
        )}

        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: styles.color,
          }}
        >
          {text}
        </Typography>
      </Stack>
    </Box>
  );
}

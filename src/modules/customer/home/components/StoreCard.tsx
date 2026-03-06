import { Box, Stack, Typography } from "@mui/material";
import { CommercePublicResponse } from "../interfaces/responses";
import { useNavigate } from "react-router-dom";

interface StoreCardProps {
  commerce: CommercePublicResponse;
  onClick?: () => void;
}

export function StoreCard({ commerce, onClick }: StoreCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(`/customer/stores/${commerce.commerceId}`);
  };

  return (
    <Stack
      onClick={handleClick}
      sx={{
        minWidth: { xs: 140, sm: 160 },
        bgcolor: "#FFFFFF",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        flexShrink: 0,
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: { xs: 120, sm: 140 },
          backgroundImage: `url(${commerce.images[0]?.url || "/placeholder.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Stack spacing={0} sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Typography
          sx={{
            color: "#2D2D2D",
            fontWeight: 600,
            fontSize: { xs: 14, sm: 15 },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          {commerce.name}
        </Typography>
      </Stack>
    </Stack>
  );
}
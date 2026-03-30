import { Box, Paper, Stack, Typography, Avatar, Divider } from "@mui/material";
import { MdStorefront } from "react-icons/md";
import { ImageResponse } from "@/shared/interfaces/image-response.interface";

interface ProductDetailCommerceProps {
  commerceName: string;
  commerceOpeningHours: string;
  commerceImages?: ImageResponse[];
  onCommerceClick: () => void;
}

export const ProductDetailCommerce = ({
  commerceName,
  commerceOpeningHours,
  commerceImages,
  onCommerceClick,
}: ProductDetailCommerceProps) => {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#F5F5F5",
          p: 2,
          borderRadius: 3,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={commerceImages?.[0]?.url}
            alt={commerceName}
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#77A787",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {!commerceImages?.[0]?.url && commerceName.charAt(0).toUpperCase()}
          </Avatar>

          <Box flex={1}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#2D2D2D",
                fontSize: 17,
                mb: 0.5,
              }}
            >
              {commerceName}
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#2D2D2D",
                fontSize: 15,
                mb: 0.7,
              }}
            >
              {commerceOpeningHours}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <MdStorefront size={14} color="#666666" />
              <Typography
                onClick={onCommerceClick}
                sx={{
                  color: "#666666",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Ver comercio
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <Divider sx={{ my: 1 }} />
    </>
  );
};

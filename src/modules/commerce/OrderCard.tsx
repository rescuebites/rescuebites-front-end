import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

interface Props {
  name: string;
  price: number;
  date: string;
  status: string;
  image: string;
  orderId: number;
}

export default function OrderCard({
  name,
  price,
  date,
  status,
  image,
  orderId,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "#F6F6F6",
      }}
    >
      <Avatar src={image} sx={{ width: 52, height: 52 }} />

      <Box flex={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={700}>{name}</Typography>

          <Typography fontSize={13} color="text.secondary">
            #{orderId}
          </Typography>
        </Stack>

        <Typography fontSize={14} color="text.secondary">
          Costo Total: ${price}
        </Typography>

        <Typography fontSize={13} color="text.secondary">
          Fecha: {date}
        </Typography>

        <Box
          sx={{
            mt: 0.5,
            display: "inline-block",
            px: 1.5,
            py: 0.3,
            borderRadius: 5,
            bgcolor: "#D8F3DC",
            fontSize: 12,
            fontWeight: 600,
            color: "#2D6A4F",
          }}
        >
          ● {status}
        </Box>
      </Box>
    </Paper>
  );
}
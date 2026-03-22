import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Cargando..." }: LoadingStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      gap={2}
    >
      <CircularProgress sx={{ color: "#5A9A6E" }} />
      {message && <Typography color="text.secondary">{message}</Typography>}
    </Box>
  );
}

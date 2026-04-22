import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";

const REDIRECT_DELAY_MS = 3500;

interface OrderSuccessPageProps {
  orderId: string;
}

export default function OrderSuccessPage({ orderId }: OrderSuccessPageProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / REDIRECT_DELAY_MS) * 100, 100));
    }, 50);

    const timeout = setTimeout(() => {
      navigate(`/orders/${orderId}`, { replace: true });
    }, REDIRECT_DELAY_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, orderId]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f7f5",
        px: 3,
        gap: 2,
      }}
    >
      <Box
        component="img"
        src="/orderSuccess.png"
        alt="Pedido confirmado"
        sx={{
          width: { xs: 200, sm: 240, md: 280 },
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      <CustomTitle
        text="¡Tu pedido fue realizado con éxito!"
        variant="h5"
        align="center"
        color="#2d2d2d"
        fontWeight={700}
      />

      <CustomTitle
        text="Te redirigiremos al detalle de tu pedido en unos segundos..."
        variant="body1"
        align="center"
        color="#6d6d6d"
        fontWeight={400}
      />

      <Box sx={{ width: { xs: "80%", sm: "60%", md: "40%" }, mt: 1 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#77A787",
              borderRadius: 3,
            },
          }}
        />
      </Box>
    </Box>
  );
}

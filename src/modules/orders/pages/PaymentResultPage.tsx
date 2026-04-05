import { Box, Typography, Container } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSearchParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useEffect } from "react";
import { httpClient } from "@/shared/lib/httpClient";
=======
>>>>>>> f2ff24d (feat: add PaymentResultPage and integrate payment result routes)
import CustomButton from "@/shared/components/CustomButton";
import BackButton from "@/shared/components/ui/BackButton";

type PaymentResultType = "success" | "failure" | "pending";

interface Props {
  type: PaymentResultType;
}

const config: Record<
  PaymentResultType,
  { icon: React.ReactElement; title: string; message: string; color: string }
> = {
  success: {
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "#477e5c" }} />,
    title: "¡Pago exitoso!",
<<<<<<< HEAD
    message:
      "Tu pago fue procesado correctamente. Pronto recibirás la confirmación de tu pedido.",
=======
    message: "Tu pago fue procesado correctamente. Pronto recibirás la confirmación de tu pedido.",
>>>>>>> f2ff24d (feat: add PaymentResultPage and integrate payment result routes)
    color: "#477e5c",
  },
  failure: {
    icon: <ErrorOutlineIcon sx={{ fontSize: 80, color: "#D32F2F" }} />,
    title: "Pago fallido",
<<<<<<< HEAD
    message:
      "No pudimos procesar tu pago. Por favor, intentá nuevamente o elegí otro método de pago.",
=======
    message: "No pudimos procesar tu pago. Por favor, intentá nuevamente o elegí otro método de pago.",
>>>>>>> f2ff24d (feat: add PaymentResultPage and integrate payment result routes)
    color: "#D32F2F",
  },
  pending: {
    icon: <AccessTimeIcon sx={{ fontSize: 80, color: "#ED6C02" }} />,
    title: "Pago pendiente",
    message: "Tu pago está siendo procesado. Te avisaremos cuando se confirme.",
    color: "#ED6C02",
  },
};

export default function PaymentResultPage({ type }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderId");
  const { icon, title, message, color } = config[type];

<<<<<<< HEAD
  useEffect(() => {
    // Si aterrizamos en la página de éxito con orderId, avisar al backend
    // para que confirme la orden (fallback cuando el webhook no llegó).
    if (type === "success" && orderId) {
      httpClient
        .post(`/api/v1/payments/orders/${orderId}/confirm`)
        .catch((err) => {
          // No bloquear la UI por errores de confirmación; loguear para debugging.
          // eslint-disable-next-line no-console
          console.error("confirm order failed:", err);
        });
    }
  }, [type, orderId]);

  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        minHeight: "100vh",
        py: { xs: 0.2, sm: 0.4 },
        px: { xs: 2, sm: 5, md: 6 },
      }}
    >
=======
  return (
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh", py: { xs: 0.2, sm: 0.4 }, px: { xs: 2, sm: 5, md: 6 } }}>
>>>>>>> f2ff24d (feat: add PaymentResultPage and integrate payment result routes)
      <Box sx={{ pt: 1, mb: 3 }}>
        <BackButton onClick={() => navigate("/")} />
      </Box>

      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            pt: { xs: 4, sm: 8 },
            gap: 2,
          }}
        >
          {icon}

          <Typography
            variant="h4"
<<<<<<< HEAD
            sx={{
              fontWeight: 700,
              color,
              fontSize: { xs: 24, sm: 30, md: 34 },
            }}
=======
            sx={{ fontWeight: 700, color, fontSize: { xs: 24, sm: 30, md: 34 } }}
>>>>>>> f2ff24d (feat: add PaymentResultPage and integrate payment result routes)
          >
            {title}
          </Typography>

          <Typography
<<<<<<< HEAD
            sx={{
              color: "#6B7280",
              fontSize: { xs: 15, sm: 17 },
              maxWidth: 420,
            }}
=======
            sx={{ color: "#6B7280", fontSize: { xs: 15, sm: 17 }, maxWidth: 420 }}
>>>>>>> f2ff24d (feat: add PaymentResultPage and integrate payment result routes)
          >
            {message}
          </Typography>

          {orderId && (
            <CustomButton
              text="Ver mi pedido"
              onClick={() => navigate(`/orders/${orderId}`)}
<<<<<<< HEAD
              sx={{ mt: 3, px: 5, borderRadius: 3, backgroundColor: "#477e5c" }}
=======
              backgroundColor="#477e5c"
              sx={{ mt: 3, px: 5, borderRadius: 3 }}
>>>>>>> f2ff24d (feat: add PaymentResultPage and integrate payment result routes)
            />
          )}

          <CustomButton
            text="Volver al inicio"
            onClick={() => navigate("/")}
<<<<<<< HEAD
            sx={{ mt: 1, px: 5, borderRadius: 3, backgroundColor: "#9E9E9E" }}
=======
            backgroundColor="#9E9E9E"
            sx={{ mt: 1, px: 5, borderRadius: 3 }}
>>>>>>> f2ff24d (feat: add PaymentResultPage and integrate payment result routes)
          />
        </Box>
      </Container>
    </Box>
  );
}

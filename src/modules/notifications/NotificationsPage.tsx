import { Box, Typography, Paper } from "@mui/material";
import { useNotifications } from "../navbar/contexts/NotificationContext";
import BackButton from "@/shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELED"
  | "EXPIRED";

export const getLabel = (type: string) => {
  switch (type) {
    case "COMPLETED":
      return "Completado";
    case "READY":
      return "Listo para retirar";
    case "CONFIRMED":
      return "Nuevo Pedido";
    case "PENDING":
      return "Pendiente";
    case "PREPARING":
      return "En preparación";
    case "CANCELED":
      return "Cancelado";
    case "EXPIRED":
      return "Producto vencido";
    default:
      return type;
  }
};

const getStyles = (type: string) => {
  switch (type) {
    case "COMPLETED":
      return { color: "#4CAF50", icon: "✅" };

    case "READY":
      return { color: "#4CAF50", icon: "🏪" };

    case "CONFIRMED":
      return { color: "#4CAF50", icon: "🧾" };

    case "PENDING":
      return { color: "#4CAF50", icon: "🧾" };

    case "PREPARING":
      return { color: "#FF9800", icon: "⏱️" };

    case "EXPIRED":
      return { color: "#FF9800", icon: "⚠️" };

    case "CANCELED":
      return { color: "#F44336", icon: "❌" };

    default:
      return { color: "#757575", icon: "ℹ️" };
  }
};
export default function NotificationsPage() {
  const { notifications } = useNotifications();
  const navigate = useNavigate();

  const isEmpty = !notifications || notifications.length === 0;

  const getRole = () => {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;

    return JSON.parse(raw)?.state?.authResponse?.role;
  };

  const goBack = () => {
    const role = getRole();

    if (role == "CLIENT") {
      navigate("/", { replace: true });
    }
    if (role == "COMMERCE") {
      navigate("/commerce", { replace: true });
    }
  };

  const goOrders = (registerId: string) => {
    const role = getRole();

    if (role == "CLIENT") {
      navigate(`/orders/${registerId}`);
    }
    if (role == "COMMERCE") {
      navigate(`/commerce/orders/${registerId}`);
    }
  };

  return (
    <Box p={2} bgcolor="#F5F5F5" minHeight="100vh">
      <BackButton
        sx={{ position: "absolute", left: 14, top: 14 }}
        onClick={() => goBack()}
      />

      <Typography variant="h6" mb={2}>
        Recent Updates
      </Typography>

      {/* ================= EMPTY STATE ================= */}
      {isEmpty && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={10}
          textAlign="center"
        >
          <Typography fontSize={48} mb={1}>
            🔔
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            No notifications yet
          </Typography>

          <Typography variant="body2" color="text.secondary">
            When you receive updates about your orders, they will appear here.
          </Typography>
        </Box>
      )}

      {/* ================= LIST ================= */}
      {!isEmpty &&
        notifications.map((n) => {
          console.log("CORA", n);
          const styles = getStyles(n.type);

          return (
            <Paper
              key={n.id} // 👈 mejor que index
              onClick={() => goOrders(n.registerId)}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 3,
                display: "flex",
                gap: 2,
                opacity: n.isRead ? 0.6 : 1, // 👈 visual para leídas
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: `${styles.color}22`,
                  color: styles.color,
                }}
              >
                {styles.icon}
              </Box>

              <Box flex={1}>
                <Typography fontWeight={600} color={styles.color}>
                  {getLabel(n.type)}
                </Typography>

                <Typography variant="body2">Orden #{n.eventId}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {n.message}
                </Typography>

                {n.type === "CONFIRMED" && (
                  <Typography variant="body2" color="text.secondary">
                    Notas de pedido: {n.notes}
                  </Typography>
                )}
              </Box>
            </Paper>
          );
        })}
    </Box>
  );
}

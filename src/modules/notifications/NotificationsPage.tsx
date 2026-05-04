import { Box, Card, CardContent } from "@mui/material";
import { useNotifications } from "../navbar/contexts/NotificationContext";
import BackButton from "@/shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";
import CustomTitle from "@/shared/components/CustomTitle";
import EmptyState from "@/shared/components/EmptyState";

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
    <Box sx={{ px: 2.5, pt: 3, maxWidth: 700, mx: "auto" }}>
      <Box sx={{ position: "relative", mb: 3 }}>
        <BackButton sx={{ position: "absolute", left: { xs: 6, sm: 8 } }} />

        <Box display="flex" flexDirection="column" alignItems="center">
          <CustomTitle
            text="Notificaciones"
            variant="h5"
            align="center"
            color="#2d2d2d"
            fontWeight={700}
          />

          <CustomTitle
            text="Actualizaciones recientes sobre pedidos y comercio"
            variant="body2"
            align="center"
            color="#6d6d6d"
            fontWeight={400}
            sx={{ mt: -1 }}
          />
        </Box>
      </Box>

      {isEmpty && <EmptyState message="No hay notificaciones por el momento" />}

      {!isEmpty && (
        <Box display="flex" flexDirection="column" gap={2}>
          {notifications.map((n: any) => {
            const styles = getStyles(n.type);

            return (
              <Card
                key={n.id}
                onClick={() => goOrders(n.registerId)}
                sx={{
                  borderRadius: 3,
                  cursor: "pointer",
                  opacity: n.isRead ? 0.6 : 1,
                  width: "100%",
                  "&:hover": { boxShadow: 3 },
                }}
                variant="outlined"
              >
                <CardContent sx={{ p: 2, display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 44, sm: 52 },
                      height: { xs: 44, sm: 52 },
                      borderRadius: 2,
                      bgcolor: `${styles.color}22`,
                      color: styles.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CustomTitle
                      text={styles.icon}
                      variant="body1"
                      fontSize={{ xs: 18, sm: 20 }}
                      align="center"
                      color={styles.color}
                      fontWeight={400}
                    />
                  </Box>

                  <Box flex={1}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <CustomTitle
                        text={getLabel(n.type)}
                        variant="subtitle1"
                        color="#2d2d2d"
                        fontWeight={600}
                        align="left"
                      />

                      {n.createdAt && (
                        <CustomTitle
                          text={new Date(n.createdAt).toLocaleString()}
                          variant="body2"
                          color="#9e9e9e"
                          fontWeight={400}
                          fontSize="0.8rem"
                          align="right"
                        />
                      )}
                    </Box>

                    <CustomTitle
                      text={n.message}
                      variant="body2"
                      color="#6d6d6d"
                      fontWeight={400}
                      align="left"
                    />

                    {n.type === "CONFIRMED" && n.notes && (
                      <Box mt={1}>
                        <CustomTitle
                          text={`Notas de pedido: ${n.notes}`}
                          variant="body2"
                          color="#6d6d6d"
                          fontWeight={400}
                          align="left"
                        />
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

import { Box, Typography, Paper } from "@mui/material";
import { useNotifications } from "../navbar/contexts/NotificationContext";
import BackButton from "@/shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";

const getStyles = (type: string) => {
  switch (type) {
    case "Confirmed":
      return { color: "#4CAF50", icon: "💬" };
    case "Cancelled":
      return { color: "#F44336", icon: "❌" };
    case "Expired":
      return { color: "#FF9800", icon: "⚠️" };
    default:
      return { color: "#757575", icon: "ℹ️" };
  }
};

export default function NotificationsPage() {
  const { notifications } = useNotifications();
  const navigate = useNavigate();

  const isEmpty = !notifications || notifications.length === 0;

  return (
    <Box p={2} bgcolor="#F5F5F5" minHeight="100vh">
      <BackButton
        sx={{ position: "absolute", left: 14, top: 14 }}
        onClick={() => navigate("/commerce", { replace: true })}
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
            When you receive updates about your orders,
            they will appear here.
          </Typography>
        </Box>
      )}

      {/* ================= LIST ================= */}
      {!isEmpty &&
        notifications.map((n) => {
          const styles = getStyles(n.type);

          return (
            <Paper
              key={n.id} // 👈 mejor que index
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
                  {n.type}
                </Typography>

                <Typography variant="body2">
                  Order #{n.orderId}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {n.message}
                </Typography>
              </Box>
            </Paper>
          );
        })}
    </Box>
  );
}
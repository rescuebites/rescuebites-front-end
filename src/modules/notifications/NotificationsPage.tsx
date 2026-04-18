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

  return (
    <Box p={2} bgcolor="#F5F5F5" minHeight="100vh">
      <BackButton
        sx={{ position: "absolute", left: 14, top: 14 }}
        onClick={() => navigate("/commerce", { replace: true })}
      />
      <Typography variant="h6" mb={2}>
        Recent Updates
      </Typography>

      {notifications.map((n, index) => {
        const styles = getStyles(n.type);

        return (
          <Paper
            key={index}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
              display: "flex",
              gap: 2,
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

              <Typography variant="body2">Order #{n.orderId}</Typography>

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

import { Paper, Box, IconButton, Badge } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { navbarIcons } from "../config/navbarItems";
import type { NavbarRoutes } from "../types";

interface NavbarUIProps {
  routes: NavbarRoutes;
  cartCount?: number;
  notificationCount?: number;
  onOpenNotifications?: () => void;
}

export default function NavbarUI({
  routes,
  cartCount = 0,
  notificationCount = 0,
  onOpenNotifications,
}: NavbarUIProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (route: string) => {
    if (route === location.pathname) return true;
    if (route !== "/" && location.pathname.startsWith(route)) return true;
    return false;
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    document
      .getElementById("main-scroll")
      ?.scrollTo({ top: 0, behavior: "instant" });
  };

  const hasCart = !!routes.cart;
  const hasProducts = !!routes.products;
  const hasMainAction = hasCart || hasProducts;
  const gridColumns = hasMainAction ? "1fr 1fr auto 1fr 1fr" : "repeat(4, 1fr)";

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: "#FFFFFF",
        borderTop: "1px solid #F0F0F0",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: gridColumns,
          alignItems: "center",
          gap: { xs: 2, sm: 4, md: 8, lg: 12, xl: 16 },
          height: { xs: 70, sm: 80, md: 90 },
          maxWidth: {
            xs: "100%",
            sm: "700px",
            md: "1000px",
            lg: "1800px",
            xl: "2200px",
          },
          mx: "auto",
          px: { xs: 3, sm: 4, md: 8, lg: 12, xl: 16 },
          position: "relative",
        }}
      >
        {/* Home */}
        <IconButton
          onClick={() => handleNavigation(routes.home)}
          sx={{
            color: isActive(routes.home) ? "#77A787" : "#757575",
            transition: "color 0.2s",
            width: { xs: 48, md: 56, lg: 64 },
            height: { xs: 48, md: 56, lg: 64 },
            justifySelf: "center",
            "&:hover": {
              bgcolor: "rgba(119, 167, 135, 0.08)",
            },
          }}
        >
          {navbarIcons.home}
        </IconButton>

        {/* Products (commerce) or Orders (client) */}
        <IconButton
          onClick={() => handleNavigation(routes.products || routes.orders)}
          sx={{
            color: isActive(routes.products || routes.orders)
              ? "#77A787"
              : "#757575",
            transition: "color 0.2s",
            width: { xs: 48, md: 56, lg: 64 },
            height: { xs: 48, md: 56, lg: 64 },
            justifySelf: "center",
            "&:hover": {
              bgcolor: "rgba(119, 167, 135, 0.08)",
            },
          }}
        >
          {routes.products ? navbarIcons.products : navbarIcons.orders}
        </IconButton>

        {/* Cart (client) or Orders (commerce) - Central elevated button */}
        {hasMainAction && (
          <Box sx={{ position: "relative", justifySelf: "center" }}>
            <IconButton
              onClick={() => handleNavigation(routes.cart || routes.orders)}
              sx={{
                width: { xs: 64, md: 76, lg: 88 },
                height: { xs: 64, md: 76, lg: 88 },
                bgcolor: isActive(routes.cart || routes.orders)
                  ? "#3E6A53"
                  : "#77A787",
                color: "#FFFFFF",
                border: "4px solid #FFFFFF",
                boxShadow: "0 4px 12px rgba(119, 167, 135, 0.4)",
                position: "relative",
                top: { xs: -32, md: -38, lg: -44 },
                "&:hover": {
                  bgcolor: "#6B9A7B",
                  boxShadow: "0 6px 16px rgba(119, 167, 135, 0.5)",
                },
                transition: "all 0.2s",
              }}
            >
              <Badge
                badgeContent={hasCart ? cartCount : 0}
                sx={{
                  "& .MuiBadge-badge": {
                    top: { xs: -13, md: -15, lg: -20 },
                    right: { xs: -3, md: -5, lg: -6 },
                    fontSize: { xs: 11, md: 13, lg: 14 },
                    fontWeight: 700,
                    minWidth: { xs: 20, md: 24, lg: 26 },
                    height: { xs: 20, md: 24, lg: 26 },
                    bgcolor: "#a1a879",
                    color: "#fff",
                  },
                }}
              >
                {hasCart ? navbarIcons.cart : navbarIcons.commerceOrders}
              </Badge>
            </IconButton>
          </Box>
        )}

        {/* Notifications */}
        {/* Notifications */}
        <IconButton
          onClick={() => {
            onOpenNotifications?.(); // 👈 ejecuta lógica (mark as read)
            handleNavigation(routes.notifications);
          }}
          sx={{
            color: isActive(routes.notifications) ? "#77A787" : "#757575",
            transition: "color 0.2s",
            width: { xs: 48, md: 56, lg: 64 },
            height: { xs: 48, md: 56, lg: 64 },
            justifySelf: "center",
            "&:hover": {
              bgcolor: "rgba(119, 167, 135, 0.08)",
            },
          }}
        >
          <Badge
            badgeContent={notificationCount}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: { xs: 10, md: 12, lg: 13 },
                fontWeight: 700,
                minWidth: { xs: 18, md: 22, lg: 24 },
                height: { xs: 18, md: 22, lg: 24 },
              },
            }}
          >
            {navbarIcons.notifications}
          </Badge>
        </IconButton>

        {/* Profile */}
        <IconButton
          onClick={() => handleNavigation(routes.profile)}
          sx={{
            color: isActive(routes.profile) ? "#77A787" : "#757575",
            transition: "color 0.2s",
            width: { xs: 48, md: 56, lg: 64 },
            height: { xs: 48, md: 56, lg: 64 },
            justifySelf: "center",
            "&:hover": {
              bgcolor: "rgba(119, 167, 135, 0.08)",
            },
          }}
        >
          {navbarIcons.profile}
        </IconButton>
      </Box>
    </Paper>
  );
}

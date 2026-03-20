import { Grid, Stack, Paper, Box } from "@mui/material";
import { Logo } from "@/shared/components/ui/Logo";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: "	#77A787",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: 10,
        pb: 5,
      }}
    >
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Box
          sx={{
            position: "absolute",
            top: -40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <Logo width={90} height={90} />
        </Box>

        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: 4,
            width: "100%",
            maxWidth: 400,
            pt: 10,
          }}
        >
          <Stack spacing={2}>
            <Outlet />
          </Stack>
        </Paper>
      </Box>
    </Grid>
  );
}

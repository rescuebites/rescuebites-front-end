import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, Box, Stack } from "@mui/material";

interface FooterProps {
  resetPasswordMessage: string;
  resetPasswordHref: string;
  registerMessage: string;
  linkHrefCommerce: string;
  linkTextCommerce: string;
  linkHrefClient: string;
  linkTextClient: string;
}

export function Footer({
  resetPasswordMessage,
  resetPasswordHref,
  registerMessage,
  linkHrefCommerce,
  linkTextCommerce,
  linkHrefClient,
  linkTextClient,
}: FooterProps) {
  return (
    <Box
      component="footer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Stack spacing={1} gap={1} sx={{ mt: 2 }}>
        <Link
          component={RouterLink}
          to={resetPasswordHref}
          underline="hover"
          color="#77A787"
          sx={{ fontSize: 14, textAlign: "center" }}
        >
          {resetPasswordMessage}
        </Link>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: 14, textAlign: "center" }}
        >
          {registerMessage}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          gap={1}
          sx={{ fontSize: 15, textAlign: "center" }}
        >
          <Link
            component={RouterLink}
            to={linkHrefCommerce}
            color="#77A787"
            underline="hover"
          >
            {linkTextCommerce}
          </Link>

          <Link
            component={RouterLink}
            to={linkHrefClient}
            underline="hover"
            color="#77A787"
            sx={{ fontSize: 15, textAlign: "center" }}
          >
            {linkTextClient}
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

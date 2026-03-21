import { Box, Stack } from "@mui/material";
import OrderCard from "./OrderCard";

export default function OrdersSection() {
  return (
    <Box mt={3}>
      <Stack spacing={2}>
        <OrderCard
          name="Laura Perez"
          price={125}
          date="20/01/26"
          status="In Preparation"
          image="https://randomuser.me/api/portraits/women/44.jpg"
          orderId={1234}
        />

        <OrderCard
          name="Tomás Ruiz"
          price={70}
          date="20/01/26"
          status="In Preparation"
          image="https://randomuser.me/api/portraits/men/32.jpg"
          orderId={4567}
        />
      </Stack>
    </Box>
  );
}

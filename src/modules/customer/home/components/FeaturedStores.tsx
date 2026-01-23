import { Box, Stack, Typography } from "@mui/material";
import { stores } from "./mockData";
import type { Store } from "../interfaces/types";

export default function FeaturedStores() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        py: 2,
        "::-webkit-scrollbar": { display: "none" },
      }}
    >
      {stores.map((s) => (
        <StoreCard key={s.id} store={s} />
      ))}
    </Box>
  );
}

function StoreCard({ store }: { store: Store }) {
  return (
    <Stack sx={{ minWidth: 160, gap: 1 }}>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "3 / 4",
          borderRadius: 2,
          backgroundImage: `url(${store.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Stack spacing={0.5}>
        <Typography sx={{ color: "#0e1b0e", fontWeight: 500 }}>
          {store.name}
        </Typography>
        <Typography sx={{ color: "#509550", fontSize: 14 }}>
          {store.subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
}

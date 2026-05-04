import { Box, Stack, Typography, Skeleton } from "@mui/material";
import { useAllCommerces, useCommercesByType } from "../hooks/useCommerces";
import { useCommerceTypeStore } from "../hooks/useCommerceTypeStore";
import { useNavigate } from "react-router-dom";
import { StoreCard } from "./StoreCard";

const FEATURED_LIMIT = 10;

export default function FeaturedStores() {
  const selectedCommerceType = useCommerceTypeStore(
    (state) => state.selectedCommerceType,
  );
  const categoryToFetch = selectedCommerceType || "Panadería";

  const {
    data: filteredData,
    isLoading: filteredLoading,
    isFetching: filteredFetching,
  } = useCommercesByType(categoryToFetch);
  const {
    data: allData,
    isLoading: allLoading,
    isFetching: allFetching,
  } = useAllCommerces();

  const isLoading = selectedCommerceType
    ? filteredLoading || filteredFetching
    : allLoading || allFetching;
  const allCommerces = selectedCommerceType
    ? (filteredData?.content ?? [])
    : (allData?.content ?? []);

  const commerces = allCommerces.slice(0, FEATURED_LIMIT);

  const navigate = useNavigate();

  if (isLoading) return <StoresSkeleton />;

  if (commerces.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" sx={{ color: "#2D2D2D" }}>
          {selectedCommerceType
            ? `No hay comercios de tipo "${selectedCommerceType}"`
            : "No hay comercios disponibles"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 2.5 },
          overflowX: "auto",
          py: 1,
          px: 0.5,
          "::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {commerces.map((commerce) => (
          <StoreCard
            key={commerce.commerceId}
            commerce={commerce}
            onClick={() => navigate(`/stores/${commerce.commerceId}`)}
          />
        ))}
      </Box>
    </Box>
  );
}

function StoresSkeleton() {
  return (
    <Box sx={{ display: "flex", gap: 2, py: 2 }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Stack key={i} sx={{ minWidth: 200, gap: 1 }}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: 3,
              height: { xs: 160, sm: 200 },
            }}
            animation="wave"
          />
          <Skeleton width="80%" animation="wave" />
          <Skeleton width="60%" animation="wave" />
        </Stack>
      ))}
    </Box>
  );
}

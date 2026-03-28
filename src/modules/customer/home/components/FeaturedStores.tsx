import { Box, Stack, Typography, Skeleton } from "@mui/material";
import { useAllCommerces, useCommercesByType } from "../hooks/useCommerces";
import { useFilterStore } from "../hooks/useFilterStoresAndProducts";
import { useNavigate } from "react-router-dom";
import { StoreCard } from "./StoreCard";

const FEATURED_LIMIT = 10;

export default function FeaturedStores() {
  const navigate = useNavigate();
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const categoryToFetch = selectedCategory || "Panadería";

  const { data: filteredData, isLoading: filteredLoading } = useCommercesByType(categoryToFetch);
  const { data: allData, isLoading: allLoading } = useAllCommerces();

  const isLoading = selectedCategory ? filteredLoading : allLoading;
  const allCommerces = selectedCategory
    ? (filteredData?.content ?? [])
    : (allData?.content ?? []);

  const commerces = allCommerces.slice(0, FEATURED_LIMIT);

  if (isLoading) return <StoresSkeleton />;

  if (commerces.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" sx={{ color: "#2D2D2D" }}>
          {selectedCategory
            ? `No hay comercios de tipo "${selectedCategory}"`
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
        <Stack key={i} sx={{ minWidth: 160, gap: 1 }}>
          <Skeleton variant="rectangular" sx={{ width: "100%", aspectRatio: "3/4", borderRadius: 2 }} animation="wave" />
          <Skeleton width="80%" animation="wave" />
          <Skeleton width="60%" animation="wave" />
        </Stack>
      ))}
    </Box>
  );
}
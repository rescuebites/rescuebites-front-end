import { Box, Typography, Skeleton, Stack} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAllCommerces, useCommercesByType } from "../hooks/useCommerces";
import { useCommerceTypeStore } from "../hooks/useCommerceTypeStore";
import { StoreCard } from "../components/StoreCard";
import CategoryChips from "../components/CommerceTypeChips";
import BackButton from "@/shared/components/ui/BackButton";

export default function AllStoresPage() {
  const navigate = useNavigate();

  const selectedCommerceType = useCommerceTypeStore((state) => state.selectedCommerceType);
  const categoryToFetch = selectedCommerceType || "Panadería";

  const { data: filteredData, isLoading: filteredLoading } = useCommercesByType(categoryToFetch);
  const { data: allData, isLoading: allLoading } = useAllCommerces();

  const isLoading = selectedCommerceType ? filteredLoading : allLoading;
  const commerces = selectedCommerceType
    ? (filteredData?.content ?? [])
    : (allData?.content ?? []);

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, py: 3, maxWidth: 1800, mx: "auto" }}>
        <Box sx={{ pt: { xs: 0.5, sm: 1, md: 1 }, mb:3 }}>
            <BackButton onClick={() => navigate('/', { replace: true })}/>
        </Box>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#2D2D2D", mb: 3 }}>
        Todos los comercios
      </Typography>

      {/* Categorías */}
      <Box sx={{ mb: 5 }}>
        <CategoryChips />
      </Box>

      {/* Grid de comercios */}
      {isLoading ? (
        <GridSkeleton />
      ) : commerces.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "#2D2D2D" }}>
            {selectedCommerceType
              ? `No hay comercios de tipo "${selectedCommerceType}"`
              : "No hay comercios disponibles"}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(6, 1fr)",
            },
            gap: { xs: 2, sm: 2.5, md:3 },
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
      )}
    </Box>
  );
}

function GridSkeleton() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <Stack key={i} sx={{ gap: 1 }}>
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", aspectRatio: "3/4", borderRadius: 2 }}
            animation="wave"
          />
          <Skeleton width="80%" animation="wave" />
        </Stack>
      ))}
    </Box>
  );
}
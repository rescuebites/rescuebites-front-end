import {
  Box,
  Typography,
  Skeleton,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useInfiniteAllCommerces,
  useInfiniteCommercesByType,
} from "../hooks/useCommerces";
import { useCommerceTypeStore } from "../hooks/useCommerceTypeStore";
import { StoreCard } from "../components/StoreCard";
import CommerceTypeChips from "../components/CommerceTypeChips";
import SearchBar from "@/modules/filterPanel/components/SearchBar";
import { useSearch } from "@/modules/filterPanel/hooks/useSearch";
import CustomTitle from "@/shared/components/CustomTitle";

export default function AllStoresPage() {
  const navigate = useNavigate();

  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    clearSearch,
    confirmSearch,
  } = useSearch();

  const handleSearch = (q?: string) => {
    const term = (q ?? query).trim();
    if (!term) return;
    confirmSearch(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const selectedCommerceType = useCommerceTypeStore(
    (state) => state.selectedCommerceType,
  );

  const {
    data: allData,
    isLoading: allLoading,
    hasNextPage: allHasNext,
    fetchNextPage: allFetchNext,
    isFetchingNextPage: allFetchingNext,
  } = useInfiniteAllCommerces(20);

  const {
    data: filteredData,
    isLoading: filteredLoading,
    hasNextPage: filteredHasNext,
    fetchNextPage: filteredFetchNext,
    isFetchingNextPage: filteredFetchingNext,
  } = useInfiniteCommercesByType(selectedCommerceType, 20);

  // Scroll al tope cuando cambia el tipo de comercio seleccionado
  useEffect(() => {
    document
      .getElementById("main-scroll")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCommerceType]);

  const isFiltered = !!selectedCommerceType;
  const isLoading = isFiltered ? filteredLoading : allLoading;
  const commerces = isFiltered
    ? (filteredData?.pages.flatMap((p) => p.content) ?? [])
    : (allData?.pages.flatMap((p) => p.content) ?? []);
  const hasNextPage = isFiltered ? filteredHasNext : allHasNext;
  const fetchNextPage = isFiltered ? filteredFetchNext : allFetchNext;
  const isFetchingNextPage = isFiltered
    ? filteredFetchingNext
    : allFetchingNext;

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: 3,
        maxWidth: 1800,
        mx: "auto",
        overflowX: "hidden",
      }}
    >
      {/* Buscador */}
      <Box sx={{ pt: { xs: 0.5, sm: 1, md: 1 }, mb: 3 }}>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          onClear={clearSearch}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          onHideSuggestions={() => setShowSuggestions(false)}
          onShowSuggestions={() => setShowSuggestions(true)}
          onBack={() => navigate("/", { replace: true })}
        />
      </Box>

      {/* Header */}
      <CustomTitle
        text="Todos los comercios"
        color="#2D2D2D"
        variant="h5"
        align="left"
      />

      {/* Tipos de comercio */}
      <Box sx={{ mb: 5 }}>
        <CommerceTypeChips />
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
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(5, 1fr)",
                xl: "repeat(6, 1fr)",
              },
              gap: { xs: 2, sm: 2.5, md: 3 },
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

          {/* Cargar más */}
          {hasNextPage && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="outlined"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                sx={{
                  borderRadius: 8,
                  borderColor: "#77A787",
                  color: "#77A787",
                  px: 4,
                  "&:hover": {
                    borderColor: "#3E6A53",
                    color: "#3E6A53",
                    bgcolor: "transparent",
                  },
                }}
              >
                {isFetchingNextPage ? (
                  <CircularProgress size={20} sx={{ color: "#77A787" }} />
                ) : (
                  "Cargar más"
                )}
              </Button>
            </Box>
          )}
        </>
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
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(6, 1fr)",
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

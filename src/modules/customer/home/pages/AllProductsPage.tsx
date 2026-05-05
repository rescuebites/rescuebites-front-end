import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useState } from "react";
import { useInfiniteProductsByCommerceType } from "../hooks/useProducts";
import { useCommerceTypeStore } from "../hooks/useCommerceTypeStore";
import { useFilterStore } from "@/modules/filterPanel/hooks/useFilterStore";
import ProductDetailDialog from "../components/ProductDetailDialog";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../../catalog/components/ProductCard";
import SearchBar from "@/modules/filterPanel/components/SearchBar";
import { useSearch } from "@/modules/filterPanel/hooks/useSearch";
import FilterDrawer from "@/modules/filterPanel/components/FilterDrawer";
import CustomTitle from "@/shared/components/CustomTitle";
import CommerceTypeChips from "../components/CommerceTypeChips";

export default function AllProductsPage() {
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    clearSearch,
    confirmSearch,
  } = useSearch();

  const handleSearchChange = (value: string) => {
    setQuery(value);
  };

  const handleSearch = (q?: string) => {
    const term = (q ?? query).trim();
    if (!term) return;
    confirmSearch(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const selectedCommerceType = useCommerceTypeStore(
    (state) => state.selectedCommerceType,
  );
  const categories = useFilterStore((state) => state.categories);
  const {
    data: products,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteProductsByCommerceType(selectedCommerceType);

  const navigate = useNavigate();

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, mx: "auto", mb: 3 }}>
      {/* Buscador de productos */}
      <Box sx={{ pt: { xs: 3.5, sm: 4, md: 3.5 }, mb: 3 }}>
        <SearchBar
          query={query}
          onQueryChange={handleSearchChange}
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
        text="Productos disponibles"
        color="#2D2D2D"
        variant="h5"
        align="left"
      />

      {/* Categorías */}
      <Box sx={{ mb: 5 }}>
        <CommerceTypeChips />
      </Box>

      {/* Contenido */}
      {isLoading || (isFetching && !isFetchingNextPage) ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={10}>
          <CircularProgress sx={{ color: "#77A787" }} />
        </Box>
      ) : !products || products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "#2D2D2D" }}>
            {selectedCommerceType || categories.length > 0
              ? "No hay productos disponibles para los filtros seleccionados"
              : "No hay productos disponibles"}
          </Typography>
          {(selectedCommerceType || categories.length > 0) && (
            <Typography variant="body2" sx={{ color: "#9E9E9E", mt: 1 }}>
              Probá con otros filtros o limpiá la selección
            </Typography>
          )}
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, sm: 2.5, md: 3 },
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(5, 1fr)",
                xl: "repeat(6, 1fr)",
              },
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                onClick={() => setSelectedProductId(product.productId)}
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

      <ProductDetailDialog
        open={selectedProductId !== null}
        onClose={() => setSelectedProductId(null)}
        productId={selectedProductId}
      />

      <FilterDrawer />
    </Box>
  );
}

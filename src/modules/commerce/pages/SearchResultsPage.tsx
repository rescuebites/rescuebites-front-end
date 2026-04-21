import { Box, Typography, Stack, CircularProgress, Alert, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "@/modules/filterPanel/components/SearchBar";
import SearchResultCard from "../components/SearchResultCard";
import { useCommerceSearch } from "@/modules/filterPanel/hooks/useCommerceSearch";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import BackButton from "@/shared/components/ui/BackButton";
import { SearchX } from "lucide-react";
import ProductDetailDialog from "@/modules/customer/home/components/ProductDetailDialog";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const commerceId = useAuthStore((state) => state.commerceId);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const {
    query, setQuery,
    suggestions, showSuggestions, setShowSuggestions,
    products, isLoading, hasMore, totalProducts, error,
    loadMore, clearSearch, confirmSearch,
  } = useCommerceSearch(commerceId);

  useEffect(() => {
    const q = searchParams.get("q");
    if (!q) return;
    confirmSearch(q);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const isEmpty = !isLoading && products.length === 0 && !!query && !error;

  return (
    <Box sx={{ px: 2.5, pb: 12, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ pt: 0.5, mb: 2 }}>
        <BackButton />
      </Box>

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={confirmSearch}
        onClear={clearSearch}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onHideSuggestions={() => setShowSuggestions(false)}
        onShowSuggestions={() => setShowSuggestions(true)}
        showFilterButton={false}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {!isEmpty && !error && query && (
        <Typography sx={{ mt: 3, mb: 2, fontWeight: 700, fontSize: 20 }}>
          {isLoading ? "Buscando..." : `${totalProducts} resultado${totalProducts !== 1 ? "s" : ""} para "${query}"`}
        </Typography>
      )}

      {isLoading && products.length === 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress sx={{ color: "#77A787" }} />
        </Box>
      )}

      {isEmpty && (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 10, gap: 2 }}>
          <SearchX size={60} color="#2d2d2d" />
          <Typography fontWeight={700} fontSize={20} color="#2D2D2D">Sin resultados</Typography>
          <Typography color="#9E9E9E" textAlign="center" maxWidth={280}>
            No encontramos productos para <strong>"{query}"</strong>.
          </Typography>
        </Box>
      )}

      <Stack spacing={2} mt={1}>
        {products.map((product) => (
          <SearchResultCard
            key={product.productId}
            product={product}
            onClick={() => setSelectedProductId(product.productId)}
          />
        ))}
      </Stack>

      <ProductDetailDialog
        open={selectedProductId !== null}
        onClose={() => setSelectedProductId(null)}
        productId={selectedProductId}
        mode="edit"
        onEdit={() => {
          if (selectedProductId) {
            navigate(`/commerce/products/${selectedProductId}/edit-product`);
          }
        }}
      />

      {hasMore && !isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="outlined"
            onClick={loadMore}
            sx={{
              borderColor: "#77A787", color: "#77A787", borderRadius: 3, px: 4, fontWeight: 600,
              "&:hover": { bgcolor: "#F0F7F2", borderColor: "#5a8f6a" },
            }}
          >
            Cargar más
          </Button>
        </Box>
      )}
    </Box>
  );
}

import { Box, Typography, Skeleton, Stack} from "@mui/material";
import { useState } from "react";
import { useProductsByCommerceType } from "../hooks/useProducts";
import { useFilterStore } from "../hooks/useFilterStoresAndProducts";
import CategoryChips from "../components/CategoryChips";
import ProductDetailDialog from "../components/ProductDetailDialog";
import BackButton from "@/shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";
import { useFilters } from "@/modules/customer/home/hooks/useFilters";
import { ProductCard } from "../../../catalog/components/ProductCard";
import SearchBar from "@/modules/catalog/components/SearchBar";
import { useSearch } from "@/modules/catalog/hooks/useSearch";

export default function AllProductsPage() {
  const { applyFilters, hasActiveFilters } = useFilters();
  
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
      setQuery(value); // esto ya dispara las suggestions internamente
      if (hasActiveFilters) {
        applyFilters({ searchQuery: value });
      }
    };
  
    const handleSearch = (q?: string) => {
    const term = (q ?? query).trim();
    console.log("navegando con term:", term);
    if (!term) return;
    confirmSearch(term);
    navigate(`/customer/search?q=${encodeURIComponent(term)}`);
  };
  

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const { data: products, isLoading } = useProductsByCommerceType(selectedCategory, 100); // trae más productos que en home

  const navigate= useNavigate();

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md:8 },  mx: "auto" }}>
      {/* Botón volver para atras */}
      <Box sx={{ pt: { xs: 0.5, sm: 1, md: 1 }, mb:3 }}>
        <BackButton onClick={() => navigate('/customer', { replace: true })}/>
      </Box>
      {/* Buscador de productos */}
      <Stack spacing={{ xs: 3, sm: 4 }} sx={{mb:5}} >
          <SearchBar
            query={query}              
            onQueryChange={handleSearchChange}  
            onSearch={handleSearch}
            onClear={clearSearch}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            onHideSuggestions={() => setShowSuggestions(false)}
          />
        </Stack>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#2D2D2D", mb: 3 }}>
        Todos los productos
      </Typography>

      {/* Categorías */}
      <Box sx={{ mb: 5 }}>
        <CategoryChips />
      </Box>

      {/* Contenido */}
      {isLoading ? (
        <Skeleton />
      ) : !products || products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "#2D2D2D" }}>
            {selectedCategory
              ? `No hay productos en la categoría "${selectedCategory}"`
              : "No hay productos disponibles"}
          </Typography>
        </Box>
      ) : (
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
      )}

      <ProductDetailDialog
        open={selectedProductId !== null}
        onClose={() => setSelectedProductId(null)}
        productId={selectedProductId}
      />
    </Box>
  );
}
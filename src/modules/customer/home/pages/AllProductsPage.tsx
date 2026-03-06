import { Box, Typography, Skeleton} from "@mui/material";
import { useState } from "react";
import { useProductsByCategory } from "../hooks/useProducts";
import { useFilterStore } from "../hooks/useFilterStoresAndProducts";
import CategoryChips from "../components/CategoryChips";
import ProductDetailDialog from "../components/ProductDetailDialog";
import BackButton from "@/shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";
import { useFilters } from "@/modules/customer/home/hooks/useFilters";
import { ProductCard } from "../components/ProductCard";
import SearchBar from "@/shared/components/layout/SearchBar";

export default function AllProductsPage() {
  const { applyFilters, hasActiveFilters } = useFilters();
    const handleSearchChange = (value: string) => {
      console.log("Buscando:", value);
      if (hasActiveFilters) {
        applyFilters({ searchQuery: value });
      }
    };

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const { data: products, isLoading } = useProductsByCategory(selectedCategory, 100); // trae más productos que en home

  const navigate= useNavigate();

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md:8 }, py: 3,  mx: "auto" }}>
      {/* Botón volver para atras */}
      <Box sx={{ pt: { xs: 0.5, sm: 1, md: 1 }, mb:3 }}>
        <BackButton onClick={() => navigate('/home', { replace: true })}/>
      </Box>
      {/* Buscador de productos */}
      <Box sx={{mb:3}}>
        <SearchBar onSearchChange={handleSearchChange} />
      </Box>
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


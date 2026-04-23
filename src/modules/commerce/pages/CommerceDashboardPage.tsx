import { Box } from "@mui/material";
import SearchBar from "@/modules/filterPanel/components/SearchBar";
import ProductsSection from "../components/ProductsSection";
import OrdersSection from "../components/OrdersSection";
import QuickActions from "../components/QuickActions";
import CollapsibleSection from "../components/CollapsibleSection";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import {
  useCommerceOrders,
  useCommerceProductsByStock,
} from "../hooks/useCommerceData";
import LoadingState from "@/shared/components/LoadingState";
import CustomTitle from "@/shared/components/CustomTitle";
import { useCommerceSearch } from "@/modules/filterPanel/hooks/useCommerceSearch";
import { useNavigate } from "react-router-dom";

export default function CommerceDashboardPage() {
  const commerceId = useAuthStore((state) => state.commerceId);
  const navigate = useNavigate();
  const { data: ordersData, isLoading: ordersLoading } =
    useCommerceOrders(commerceId);
  const { data: productsData, isLoading: productsLoading } =
    useCommerceProductsByStock(commerceId);

  const {
    query, setQuery,
    suggestions, showSuggestions, setShowSuggestions,
    clearSearch,
  } = useCommerceSearch(commerceId);

  const handleSearch = (q?: string) => {
    const searchQuery = (q ?? query).trim();
    if (!searchQuery) return;
    navigate(`search?q=${encodeURIComponent(searchQuery)}`);
  };

  if (!commerceId) {
    return (
      <CustomTitle
        text="No se encontró información del comercio. Por favor, inicia sesión como
          comercio."
        variant="h6"
        align="center"
        color="error"
      />
    );
  }

  return (
    <>
      <Box
        sx={{
          px: 2.5,
          pt: 1,
          pb: 1,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={handleSearch}
            onClear={clearSearch}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            onHideSuggestions={() => setShowSuggestions(false)}
            onShowSuggestions={() => setShowSuggestions(true)}
            showFilterButton={false}
          />

        <QuickActions />
      </Box>
      <Box
        sx={{
          px: 2.5,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <CollapsibleSection title="Pedidos">
          {ordersLoading ? (
            <LoadingState />
          ) : (
            <OrdersSection orders={(ordersData?.content || []).slice(0, 5)} />
          )}
        </CollapsibleSection>

        <CollapsibleSection title="Productos">
          {productsLoading ? (
            <LoadingState />
          ) : (
            <ProductsSection products={(productsData?.content || []).slice(0, 8)} />
          )}
        </CollapsibleSection>
      </Box>
    </>
  );
}

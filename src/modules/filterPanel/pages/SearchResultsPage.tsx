import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Skeleton,
  Avatar,
  Paper,
  Stack,
} from "@mui/material";
import { useSearch } from "../hooks/useSearch";
import SearchBar from "../components/SearchBar";
import { ProductCard } from "../../catalog/components/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "@/shared/components/ui/BackButton";
import type { SearchCommerceResponse } from "../interfaces/responses/search-response.interface";
import { SearchX, Store } from "lucide-react";




//-------------------------------------------------------------------------------------
const GRID_SX = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
  gap: 2,
};

function ProductCardSkeleton() {
  return (
    <Box sx={{ borderRadius: 3, overflow: "hidden", bgcolor: "#FFF", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: "1/1" }} />
      <Box sx={{ p: 2 }}>
        <Skeleton width="80%" height={28} sx={{ mb: 1 }} />
        <Skeleton width="50%" height={24} sx={{ mb: 0.5 }} />
        <Skeleton width="40%" height={20} />
      </Box>
    </Box>
  );
}

function CommerceCard({ commerce, onClick }: { commerce: SearchCommerceResponse; onClick: () => void }) {
  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        bgcolor: "#FFF",
        border: "1px solid #F0F0F0",
        borderRadius: 3,
        p: 2,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.1)", borderColor: "#77A787" },
        transition: "all 0.2s",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={commerce.images?.[0]?.url}
          alt={commerce.name}
          sx={{ width: 52, height: 52, bgcolor: "#77A787", fontWeight: 700, fontSize: 20 }}
        >
          {!commerce.images?.[0]?.url && commerce.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box flex={1} minWidth={0}>
          <Typography fontWeight={700} fontSize={16} color="#2D2D2D" noWrap>
            {commerce.name}
          </Typography>
          <Typography fontSize={13} color="#9E9E9E" noWrap>
            {commerce.address}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center" mt={0.5}>
            <Store size={13} color="#77A787" />
            <Typography fontSize={12} color="#77A787" fontWeight={600}>
              {commerce.commerceType}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 2 }}>
      <Typography fontWeight={700} fontSize={18} color="#2D2D2D">{title}</Typography>
      <Typography fontSize={13} color="#9E9E9E">
        {count} resultado{count !== 1 ? "s" : ""}
      </Typography>
    </Box>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 10, gap: 2 }}>
      {/* <Typography fontSize={52}>🔍</Typography> */}
      <SearchX size={60} color="#2d2d2d" />
      <Typography fontWeight={700} fontSize={20} color="#2D2D2D">Sin resultados</Typography>
      <Typography color="#9E9E9E" textAlign="center" maxWidth={280}>
        No encontramos nada para <strong>"{query}"</strong>.
      </Typography>
    </Box>
  );
}

function LoadMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{
          borderColor: "#77A787", color: "#77A787", borderRadius: 3, px: 4, fontWeight: 600,
          "&:hover": { bgcolor: "#F0F7F2", borderColor: "#5a8f6a" },
        }}
      >
        Cargar más
      </Button>
    </Box>
  );
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    query, setQuery,
    suggestions, showSuggestions, setShowSuggestions,
    commerces, products,
    isLoading, isLoadingMore,
    hasMoreCommerces, hasMoreProducts,
    totalCommerces, totalProducts,
    error,
    loadMoreCommerces, loadMoreProducts,
    clearSearch, confirmSearch,
  } = useSearch();

  useEffect(() => {
    const q = searchParams.get("q");
    if (!q) return;
    setQuery(q);
    confirmSearch(q);
  }, [searchParams]);

  const hasResults = commerces.length > 0 || products.length > 0;
  const isEmpty = !isLoading && !hasResults && !!query && !error;

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, pt: 0.5, pb: 10, maxWidth: 1600, mx: "auto" }}>
      <Box sx={{ pt: { xs: 0.5, sm: 1 }, mb: 3 }}>
        <BackButton />
      </Box>

      <Box sx={{ mb: 3 }}>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={confirmSearch}
          onClear={clearSearch}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          onHideSuggestions={() => setShowSuggestions(false)}
          onShowSuggestions={() => setShowSuggestions(true)}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

      {/* Skeletons */}
      {isLoading && <Box sx={GRID_SX}>{[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}</Box>}

      {/* Comercios */}
      {!isLoading && commerces.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <SectionHeader title="Comercios" count={totalCommerces} />
          <Stack spacing={2}>
            {commerces.map((c) => (
              <CommerceCard
                key={c.commerceId}
                commerce={c}
                onClick={() => navigate(`/customer/stores/${c.commerceId}`)}
              />
            ))}
          </Stack>
          {isLoadingMore ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress size={28} sx={{ color: "#77A787" }} />
            </Box>
          ) : hasMoreCommerces && <LoadMoreButton onClick={loadMoreCommerces} />}
        </Box>
      )}

      {/* Productos */}
      {!isLoading && products.length > 0 && (
        <Box>
          <SectionHeader title="Productos" count={totalProducts} />
          <Box sx={GRID_SX}>
            {products.map((p) => (
              <ProductCard
                key={p.productId}
                product={p as any}
                onClick={() => navigate(`/customer/stores/${p.commerceId}`)}
              />
            ))}
          </Box>
          {isLoadingMore ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress size={28} sx={{ color: "#77A787" }} />
            </Box>
          ) : hasMoreProducts && <LoadMoreButton onClick={loadMoreProducts} />}
        </Box>
      )}

      {isEmpty && <EmptyState query={query} />}
    </Box>
  );
}
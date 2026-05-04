import { type ReactNode } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import SearchBar from "../../../filterPanel/components/SearchBar";
import CommerceTypeChips from "../components/CommerceTypeChips";
import FeaturedStores from "../components/FeaturedStores";
import TopDeals from "../components/TopDeals";
import FilterDrawer from "../../../filterPanel/components/FilterDrawer";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/modules/filterPanel/hooks/useSearch";
import CustomTitle from "@/shared/components/CustomTitle";
import { useFilters } from "../../../filterPanel/hooks/useFilters";

export default function HomePage() {
  useFilters();

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
  };

  const handleSearch = (q?: string) => {
    const term = (q ?? query).trim();
    console.log("navegando con term:", term);
    if (!term) return;
    confirmSearch(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const navigate = useNavigate();

  const handleGoToAllStores = () => {
    navigate("/allStores");
  };

  const handleGoToAllDeals = () => {
    navigate("/allProducts");
  };

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh" }}>
      {/* Sección de búsqueda y categorías */}
      <Container
        maxWidth={false}
        sx={{
          pt: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          maxWidth: "1600px",
          mx: "auto",
        }}
      >
        <Stack spacing={{ xs: 3, sm: 4 }}>
          <SearchBar
            query={query}
            onQueryChange={handleSearchChange}
            onSearch={handleSearch}
            onClear={clearSearch}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            onHideSuggestions={() => setShowSuggestions(false)}
            onShowSuggestions={() => setShowSuggestions(true)}
          />
          <Box>
            <CustomTitle
              text="Tipos de comercio"
              variant="h5"
              color="#2D2D2D"
              align="left"
            />
            <Box sx={{ mt: { xs: 0.5, sm: 1 } }}>
              <CommerceTypeChips />
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* Sección de locales destacados */}
      <Container
        maxWidth={false}
        sx={{
          mt: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3 },
          maxWidth: "1600px",
          mx: "auto",
        }}
      >
        <Stack spacing={3}>
          <SectionHeader
            secondary="Ver todo"
            onSecondaryClick={handleGoToAllStores}
          >
            <CustomTitle text="Locales" variant="h5" color="#2D2D2D" />
          </SectionHeader>
          <FeaturedStores />
        </Stack>
      </Container>

      {/* Sección de productos destacados */}
      <Container
        maxWidth={false}
        sx={{
          mt: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3 },
          maxWidth: "1600px",
          mx: "auto",
        }}
      >
        <Stack spacing={3}>
          <SectionHeader
            secondary="Ver todo"
            onSecondaryClick={handleGoToAllDeals}
          >
            <CustomTitle
              text="Mejores ofertas en productos"
              variant="h5"
              color="#2D2D2D"
            />
          </SectionHeader>
          <TopDeals />
        </Stack>
      </Container>

      {/* Drawer de filtros */}
      <FilterDrawer />
    </Box>
  );
}

type SectionHeaderProps = {
  children: ReactNode;
  secondary?: string;
  onSecondaryClick?: () => void;
};

function SectionHeader({
  children,
  secondary,
  onSecondaryClick,
}: SectionHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      {/* Utilizo customTitle */}
      {children}
      {/* Utilizo secondary para texto con propiedades extra */}
      {secondary && (
        <Typography
          component="button"
          onClick={onSecondaryClick}
          variant="subtitle1"
          sx={{
            color: "#757575",
            fontWeight: "bold",
            background: "none",
            border: "none",
            "&:hover": { color: "#77A787" },
          }}
        >
          {secondary} <span>→</span>
        </Typography>
      )}
    </Stack>
  );
}

import { Box, Container, Stack, Typography } from "@mui/material";
import SearchBar from "../../../filterPanel/components/SearchBar";
import CategoryChips from "../components/CategoryChips";
import FeaturedStores from "../components/FeaturedStores";
import TopDeals from "../components/TopDeals";
import FilterDrawer from "../components/FilterDrawer";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/modules/filterPanel/hooks/useSearch"


export default function HomePage() {
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
  navigate(`/customer/search?q=${encodeURIComponent(term)}`);
};

  const navigate = useNavigate();

  const handleGoToAllStores = () => {
    navigate("/customer/allStores");
  };

  const handleGoToAllDeals = () => {
    navigate("/customer/allProducts");
  };

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: '100vh', pb: { xs: 8, md: 10 } }}>

      {/* Sección de búsqueda y categorías */}
      <Container
        maxWidth={false}
        sx={{
          //mt: { xs: 4, md: 6 },
          pt: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          maxWidth: '1600px',
          mx: 'auto',
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
          <CategoryChips />
        </Stack>
      </Container>

      {/* Sección de locales destacados */}
      <Container
        maxWidth={false}
        sx={{ 
          mt: { xs: 4, md: 6 },
          pt: { xs: 3, md: 4 }, 
          px: { xs: 2, sm: 3 },
          maxWidth: '1600px',
          mx: 'auto',
        }}
      >
        <Stack spacing={3}>
          <SectionTitle primary="Locales" secondary="Ver todo" onSecondaryClick={handleGoToAllStores} />
          <FeaturedStores />
        </Stack>
      </Container>

      {/* Sección de productos destacados */}
      <Container
        maxWidth={false}
        sx={{ 
          mt: { xs: 4, md: 6 },
          pt: { xs: 3, md: 4 }, 
          px: { xs: 2, sm: 3 },
          maxWidth: '1600px',
          mx: 'auto',
        }}
      >
        <Stack spacing={3}>
          <SectionTitle primary="Mejores ofertas en productos" secondary="Ver todo" onSecondaryClick={handleGoToAllDeals} />
          <TopDeals />
        </Stack>
      </Container>

      {/* Drawer de filtros */}
      <FilterDrawer />
    </Box>
  );
}

type SectionTitleProps = {
  primary: string;
  secondary?: string;
  onSecondaryClick?: () => void;
};


function SectionTitle({
  primary,
  secondary,
  onSecondaryClick,
}: SectionTitleProps) {

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography
        component="h1"
        sx={{
          color: '#2D2D2D',
          fontSize: { xs: 18, sm: 20, md: 22 },
          fontWeight: 700,
          m: 0,
        }}
      >
        {primary}
      </Typography>
      {secondary && (
        <Typography
            component="button"
            onClick={onSecondaryClick}
            sx={{
              color: '#757575',
              fontSize: { xs: 13, sm: 14 },
              fontWeight: 600,
              m: 0,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              '&:hover': {
                color: '#77A787',
              },
            }}
          >
            {secondary} <span>→</span>
        </Typography>

      )}
    </Stack>
  );
}
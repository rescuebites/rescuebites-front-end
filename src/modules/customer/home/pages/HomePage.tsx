import { Box, Container, Stack, Typography } from "@mui/material";
import SearchBar from "../../../../shared/components/layout/SearchBar";
import CategoryChips from "../components/CategoryChips";
import FeaturedStores from "../components/FeaturedStores";
import TopDeals from "../components/TopDeals";
import FilterDrawer from "../components/FilterDrawer";
import { useNavigate } from "react-router-dom";
import { useFilters } from "@/modules/customer/home/hooks/useFilters";



export default function HomePage() {
  const { applyFilters, hasActiveFilters } = useFilters();
  const handleSearchChange = (value: string) => {
    console.log("Buscando:", value);
    if (hasActiveFilters) {
      applyFilters({ searchQuery: value });
    }
  };

  const navigate = useNavigate();

  const handleGoToAllStores = () => {
    navigate("/home/allStores");
  };

  const handleGoToAllDeals = () => {
    navigate("/home/allProducts");
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
          <SearchBar onSearchChange={handleSearchChange} />
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
          <SectionTitle primary="Productos destacados" secondary="Ver todo" onSecondaryClick={handleGoToAllDeals} />
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
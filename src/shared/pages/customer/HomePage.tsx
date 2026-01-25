import { Box, Container, Stack, Typography } from "@mui/material";
import Header from "../../../shared/components/layout/Header";
import SearchBar from "../../components/layout/SearchBar";
import CategoryChips from "../../../modules/customer/home/components/CategoryChips";
import FeaturedStores from "../../../modules/customer/home/components/FeaturedStores";
import TopDeals from "../../../modules/customer/home/components/TopDeals";
import { useNavigate } from "react-router-dom";



export default function HomePage() {
  const handleSearchChange = (value: string) => {
    console.log("Buscando:", value);
  };

  const navigate = useNavigate();

  const handleGoToAllStores = () => {
    navigate("/home/stores");
  };

  const handleGoToAllDeals = () => {
    navigate("/home/allProducts");
  };

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: '100vh', pb: { xs: 8, md: 10 } }}>
      <Header />

      {/* Sección de búsqueda y categorías */}
      <Container
        maxWidth={false}
        sx={{
          pt: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          maxWidth: '1600px',
          mx: 'auto',
        }}
      >
        <Stack spacing={{ xs: 2, sm: 3 }}>
          <SearchBar onSearchChange={handleSearchChange} />
          <CategoryChips />
        </Stack>
      </Container>

      {/* Sección de locales destacados */}
      <Container
        maxWidth={false}
        sx={{ 
          pt: { xs: 3, md: 4 }, 
          px: { xs: 2, sm: 3 },
          maxWidth: '1600px',
          mx: 'auto',
        }}
      >
        <Stack spacing={2}>
          <SectionTitle primary="Locales" secondary="Ver todo" onSecondaryClick={handleGoToAllStores} />
          <FeaturedStores />
        </Stack>
      </Container>

      {/* Sección de productos destacados */}
      <Container
        maxWidth={false}
        sx={{ 
          pt: { xs: 3, md: 4 }, 
          px: { xs: 2, sm: 3 },
          maxWidth: '1600px',
          mx: 'auto',
        }}
      >
        <Stack spacing={2}>
          <SectionTitle primary="Productos destacados" secondary="Ver todo" onSecondaryClick={handleGoToAllDeals} />
          <TopDeals />
        </Stack>
      </Container>
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
        component="h2"
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
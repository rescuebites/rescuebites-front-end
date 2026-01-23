import { Box, Container, Stack } from "@mui/material";
import Header from "./Header";
import SearchBar from "./SearchBar";
import CategoryChips from "./CategoryChips";
import FeaturedStores from "./FeaturedStores";
import TopDeals from "./TopDeals";

export default function HomePage() {
  const handleSearchChange =(value:string) => {
    console.log("Buscando:", value);
  }
  return (
    <Box sx={{ bgcolor: "#fffff8", pb: { xs: 8, md: 10 } }}>
      <Header />

      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 2 },
          mt: { xs: 1, sm: 2 },
        }}
      >
        <Stack spacing={{ xs: 1, sm: 2 }}>
          <SearchBar onSearchChange={handleSearchChange} />
          <CategoryChips />
        </Stack>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 2, md: 3 }, mt: { xs: 3, md: 4 } }}
      >
        <Stack spacing={2}>
          <SectionTitle primary="Locales destacados" secondary="Ver todo" />
          <FeaturedStores />
        </Stack>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 2, md: 3 }, mt: { xs: 3, md: 4 } }}
      >
        <Stack spacing={2}>
          <SectionTitle primary="Productos destacados" secondary="Ver todo" />
          <TopDeals />
        </Stack>
      </Container>
    </Box>
  );
}

function SectionTitle({
  primary,
  secondary,
}: {
  primary: string;
  secondary?: string;
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
    >
      <Box
        component="h2"
        sx={{
          color: "#0e1b0e",
          fontSize: { xs: 18, sm: 22 },
          fontWeight: 700,
          m: 0,
        }}
      >
        {primary}
      </Box>
      {secondary && (
        <Box
          component="h3"
          sx={{
            color: "#0e1b0e",
            fontSize: { xs: 16, sm: 18 },
            fontWeight: 700,
            m: 0,
          }}
        >
          {secondary}
        </Box>
      )}
    </Stack>
  );
}

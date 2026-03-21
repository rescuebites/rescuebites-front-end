import { Box, Typography, Stack } from "@mui/material";
import SearchBar from "@/shared/components/layout/SearchBar";
import SearchResultCard from "./SearchResultCard";

export default function SearchResultsPage() {
  const mockData = [
    {
      id: 1,
      name: "Pasta Salad",
      price: 15,
      originalPrice: 30,
      discount: 50,
      expiresIn: "2 days",
      stock: 1,
      image: "/salad1.jpg",
    },
    {
      id: 2,
      name: "Cesar Salad",
      price: 16.5,
      originalPrice: 30,
      discount: 45,
      expiresIn: "1 days",
      stock: 2,
      image: "/salad2.jpg",
    },
    {
      id: 3,
      name: "Waldorf Salad",
      price: 20,
      originalPrice: 50,
      discount: 40,
      expiresIn: "4 days",
      stock: 4,
      image: "/salad3.jpg",
    },
  ];

  return (
    <Box sx={{ px: 2.5, pb: 12 }}>
      <SearchBar onSearchChange={() => {}} />

      <Typography
        sx={{
          mt: 3,
          mb: 2,
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        Search Results
      </Typography>

      <Stack spacing={2}>
        {mockData.map((item) => (
          <SearchResultCard key={item.id} product={item} />
        ))}
      </Stack>
    </Box>
  );
}

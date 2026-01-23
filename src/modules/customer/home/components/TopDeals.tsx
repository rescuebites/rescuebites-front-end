import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { deals } from "./mockData";
import type { Deal } from "./../interfaces/types";
import ProductDetailDialog from "./ProductDetailDialog";

export default function TopDeals() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Ordenar por descuento
  const sortedDeals = [...deals].sort((a, b) => b.discount - a.discount);

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  const handleCloseDialog = () => {
    setSelectedDeal(null);
  };

  return (
    <>
      <Box
        sx={{
          pt: 1,
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {sortedDeals.map((d: Deal) => (
          <DealCard key={d.id} deal={d} onClick={() => handleDealClick(d)} />
        ))}
      </Box>

      <ProductDetailDialog
        open={selectedDeal !== null}
        onClose={handleCloseDialog}
        deal={selectedDeal}
      />
    </>
  );
}

function DealCard({ deal, onClick }: { deal: Deal; onClick: () => void }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Imagen y burbuja descuento */}
      <Box
        sx={{
          position: "relative",
          aspectRatio: "3 / 4",
          backgroundImage: `url(${deal.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {deal.discount && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              px: 2,
              py: 1,
              borderRadius: "50px",
              bgcolor: "rgba(253, 251, 246, 0.8)",
              fontSize: 16,
              fontWeight: 700,
              color: "#0e1b0e",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            -{deal.discount}%
          </Box>
        )}
      </Box>

      {/* Nombre y precio */}
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "#0e1b0e",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: 48,
          }}
        >
          {deal.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#509550", fontWeight: 500 }}>
          ${deal.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

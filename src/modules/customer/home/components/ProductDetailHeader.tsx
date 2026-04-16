import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { ProductChips } from "@/shared/components/layout/ProductChips";

interface ProductDetailHeaderProps {
  images: string[];
  discountPercentage: number;
}

export const ProductDetailHeader = ({
  images,
  discountPercentage,
}: ProductDetailHeaderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const validImages = [...new Set(images.filter(Boolean))].slice(0, 5);
  const hasMultiple = validImages.length > 1;
  const currentImage = validImages[currentIndex] || "/placeholder.jpg";

  const goTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, validImages.length - 1)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) goTo(currentIndex + 1);
    else if (diff < -50) goTo(currentIndex - 1);
    setTouchStartX(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 300, sm: 400 },
        borderRadius: "0 0 24px 24px",
        overflow: "hidden",
        userSelect: "none",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Imagen actual con hover zoom */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          "&:hover img": {
            transform: "scale(1.12)",
          },
        }}
      >
        <Box
          component="img"
          src={currentImage}
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Box>

      <ProductChips
        discountPercentage={discountPercentage}
        discountAsImageBadge
        showExpiration={false}
        showStock={false}
        showCondition={false}
      />

      {/* Flechas de navegación */}
      {hasMultiple && (
        <>
          <IconButton
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            size="small"
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.85)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              "&.Mui-disabled": { opacity: 0.35 },
            }}
          >
            <MdChevronLeft size={20} />
          </IconButton>
          <IconButton
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === validImages.length - 1}
            size="small"
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.85)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              "&.Mui-disabled": { opacity: 0.35 },
            }}
          >
            <MdChevronRight size={20} />
          </IconButton>
        </>
      )}

      {/* Dots indicadores */}
      {hasMultiple && (
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 0.75,
          }}
        >
          {validImages.map((_, i) => (
            <Box
              key={i}
              onClick={() => goTo(i)}
              sx={{
                width: i === currentIndex ? 18 : 7,
                height: 7,
                borderRadius: "4px",
                bgcolor: i === currentIndex ? "#fff" : "rgba(255,255,255,0.55)",
                transition: "all 0.25s ease",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

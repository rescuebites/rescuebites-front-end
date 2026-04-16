import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { ImageResponse } from "@/shared/interfaces/image-response.interface";

interface ImageCarouselModalProps {
  open: boolean;
  images: ImageResponse[];
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageCarouselModal({
  open,
  images,
  initialIndex = 0,
  onClose,
}: ImageCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#000",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#fff",
          bgcolor: "rgba(0,0,0,0.5)",
          zIndex: 10,
          "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ position: "relative", width: "100%", height: 340 }}>
          <Box
            component="img"
            src={images[currentIndex]?.url}
            alt={`Imagen ${currentIndex + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  bgcolor: "rgba(0,0,0,0.5)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  bgcolor: "rgba(0,0,0,0.5)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <ChevronRightIcon />
              </IconButton>

              {/* Dot indicators */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                }}
              >
                {images.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    sx={{
                      width: idx === currentIndex ? 20 : 8,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: idx === currentIndex ? "#fff" : "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

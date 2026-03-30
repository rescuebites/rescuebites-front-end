import React, { useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface QuantityControlProps {
  stock: number;
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  stock,
  initialQuantity = 1,
  onQuantityChange,
}) => {
  const [quantity, setQuantityState] = useState(initialQuantity);
  const [inputValue, setInputValue] = useState<string>(String(initialQuantity));
  const [isEditing, setIsEditing] = useState(false);

  const setQuantity = (value: number) => {
    const clamped = Math.min(Math.max(value, 1), stock);
    setQuantityState(clamped);
    setInputValue(String(clamped));
    onQuantityChange?.(clamped);
  };

  const handleBlur = () => {
    setIsEditing(false);
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= stock) {
      setQuantity(parsed);
    } else if (!isNaN(parsed) && parsed > stock) {
      setQuantity(stock);
    } else {
      setInputValue(String(quantity));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
    if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue(String(quantity));
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <IconButton
        size="small"
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity <= 1}
        sx={{
          width: 26, height: 26,
          bgcolor: "#F3F4F6",
          "&:hover": { bgcolor: "#E5E7EB" },
          "&:disabled": { opacity: 0.4 },
        }}
      >
        <RemoveIcon sx={{ fontSize: 14 }} />
      </IconButton>

      <Box
        component="input"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsEditing(true);
          setInputValue(e.target.value);
        }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
          setIsEditing(true);
          e.target.select();
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
        sx={{
          width: 36, height: 26, textAlign: "center",
          fontWeight: 700, fontSize: "0.875rem", fontFamily: "inherit",
          color: "#111827",
          border: isEditing ? "1.5px solid #166534" : "1.5px solid #E5E7EB",
          borderRadius: "6px", outline: "none",
          bgcolor: isEditing ? "#F0FDF4" : "white",
          transition: "border 0.15s, background 0.15s",
          cursor: "text",
        }}
      />

      <IconButton
        size="small"
        onClick={() => setQuantity(quantity + 1)}
        disabled={quantity >= stock}
        sx={{
          width: 26, height: 26,
          bgcolor: "#166534", color: "white",
          "&:hover": { bgcolor: "#15803D" },
          "&:disabled": { opacity: 0.4 },
        }}
      >
        <AddIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Stack>
  );
};
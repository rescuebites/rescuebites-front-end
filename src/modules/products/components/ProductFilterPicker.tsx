import { useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { FilterBottomSheet } from "@/modules/products/components/FilterBottomSheet";
import { CommerceTypeEnum } from "@/shared/enums/commerce-type.enum";
import {
  ProductCategory,
  ProductCategoryDisplayName,
} from "@/modules/products/enums/product-category.enum";
import {
  ProductCondition,
  ProductConditionDisplayName,
} from "@/modules/products/enums/product-condition.enum";
import {
  PreferenceType,
  PreferenceTypeDisplayName,
} from "@/modules/client/enums/preference-type.enum";
import { chipSx } from "@/shared/styles/chipSx";

interface ProductFilterPickerProps {
  commerceType: CommerceTypeEnum;
  categoryValue: ProductCategory | "";
  conditionsValue: ProductCondition[];
  preferencesValue: PreferenceType[];
  categoryError?: string;
  conditionsError?: string;
  onApply: (values: {
    category: string;
    conditions: string[];
    preferences: string[];
  }) => void;
}

export const ProductFilterPicker = ({
  commerceType,
  categoryValue,
  conditionsValue,
  preferencesValue,
  categoryError,
  conditionsError,
  onApply,
}: ProductFilterPickerProps) => {
  const [open, setOpen] = useState(false);

  const activeFilterCount =
    conditionsValue.length +
    preferencesValue.length +
    (categoryValue ? 1 : 0);

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1.5px solid",
          borderColor:
            categoryError || conditionsError ? "error.main" : "#E0E0E0",
          borderRadius: "12px",
          px: 2,
          py: 1.2,
          mb: 1,
          cursor: "pointer",
          bgcolor: "#fff",
          "&:hover": { borderColor: "#A6C9B0" },
        }}
      >
        <Typography color={activeFilterCount > 0 ? "#333" : "#999"} fontSize={14}>
          {activeFilterCount > 0
            ? `${activeFilterCount} filtro${activeFilterCount > 1 ? "s" : ""} seleccionado${activeFilterCount > 1 ? "s" : ""}`
            : "Seleccione los filtros del producto"}
        </Typography>
        <TuneIcon sx={{ color: "#888", fontSize: 20 }} />
      </Box>

      {activeFilterCount > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
          {categoryValue && (
            <Chip
              label={ProductCategoryDisplayName[categoryValue]}
              size="small"
              sx={chipSx}
            />
          )}
          {conditionsValue.map((c) => (
            <Chip
              key={c}
              label={ProductConditionDisplayName[c as ProductCondition]}
              size="small"
              sx={chipSx}
            />
          ))}
          {preferencesValue.map((p) => (
            <Chip
              key={p}
              label={PreferenceTypeDisplayName[p as PreferenceType]}
              size="small"
              sx={chipSx}
            />
          ))}
        </Box>
      )}

      {(categoryError || conditionsError) && (
        <Typography color="error" fontSize={12} mb={2} ml={0.5}>
          {categoryError ?? conditionsError}
        </Typography>
      )}

      <FilterBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        commerceType={commerceType}
        currentValues={{
          preferences: preferencesValue,
          category: categoryValue ?? "",
          conditions: conditionsValue,
        }}
        onApply={onApply}
      />
    </>
  );
};

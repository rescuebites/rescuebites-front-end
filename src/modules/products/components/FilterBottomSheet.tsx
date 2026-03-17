import { useState } from "react";
import {
  Chip,
  Dialog,
} from "@mui/material";
import { CollapsibleSection } from "@/shared/components/CollapsibleSection";
import { CommerceType } from "@/shared/enums/commerce-type.enum";
import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { ProductCondition} from "@/modules/products/enums/product-condition.enum";
import { PreferenceType } from "@/modules/client/enums/preference-type.enum";
import {
  getAllowedProductCategories,
  getAllowedProductConditions,
} from "@/shared/utils/product.utils";
import CustomButton from "@/shared/components/CustomButton";
import CustomTitle from "@/shared/components/CustomTitle";
import { filterChipSx } from "@/shared/styles/chipSx";
import { ProductConditionDisplayName } from "../utils/condition-mapping";
import { ProductCategoryDisplayName } from "../utils/category-mapping";
import { PreferenceTypeDisplayName } from "@/modules/client/utils/preference-mapping";

interface FilterValues {
  preferences: PreferenceType[];
  category: ProductCategory | "";
  conditions: ProductCondition[];
}

interface FilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  commerceType: CommerceType;
  currentValues: FilterValues;
  onApply: (values: FilterValues) => void;
}

export const FilterBottomSheet = ({
  open,
  onClose,
  commerceType,
  currentValues,
  onApply,
}: FilterBottomSheetProps) => {
  const [localValues, setLocalValues] = useState<FilterValues>(currentValues);

  const allowedCategories = getAllowedProductCategories(commerceType);
  const allowedConditions = getAllowedProductConditions(commerceType);

  const togglePreference = (pref: PreferenceType) => {
    setLocalValues((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }));
  };

  const toggleCategory = (cat: ProductCategory) => {
    setLocalValues((prev) => ({
      ...prev,
      category: prev.category === cat ? "" : cat,
    }));
  };

  const toggleCondition = (cond: ProductCondition) => {
    setLocalValues((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(cond)
        ? prev.conditions.filter((c) => c !== cond)
        : [...prev.conditions, cond],
    }));
  };

  const handleApply = () => {
    onApply(localValues);
    onClose();
  };

  const handleOpen = () => setLocalValues(currentValues);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onTransitionEnter={handleOpen}
      scroll="body"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          px: 2.5,
          pt: 2,
          pb: 3,
          width: "90%",
          maxWidth: "380px",
          maxHeight: "none",
          overflowY: "visible",
          m: 2,
        },
      }}
    >
      <CustomTitle variant="h6" align="left" text="Filtros *"  />

      {/* Preferencias Alimenticias */}
      <CollapsibleSection
        title="Preferencias Alimenticias"
        count={localValues.preferences.length}
        defaultOpen={false}
      >
        {Object.values(PreferenceType).map((pref) => (
          <Chip
            key={pref}
            label={PreferenceTypeDisplayName[pref]}
            onClick={() => togglePreference(pref)}
            sx={filterChipSx(localValues.preferences.includes(pref), { activeColor: "#5A9A6E", activeHoverColor: "#4C7C5A" })}
          />
        ))}
      </CollapsibleSection>

      {/* Tipo de Alimento */}
      <CollapsibleSection
        title="Tipo de Alimento"
        count={localValues.category ? 1 : 0}
        defaultOpen={false}
      >
        {allowedCategories.map((cat) => (
          <Chip
            key={cat}
            label={ProductCategoryDisplayName[cat]}
            onClick={() => toggleCategory(cat)}
            sx={filterChipSx(localValues.category === cat, { activeColor: "#5A9A6E", activeHoverColor: "#4C7C5A" })}
          />
        ))}
      </CollapsibleSection>

      {/* Características */}
      <CollapsibleSection
        title="Características"
        count={localValues.conditions.length}
        defaultOpen={false}
      >
        {allowedConditions.map((cond) => (
          <Chip
            key={cond}
            label={ProductConditionDisplayName[cond]}
            onClick={() => toggleCondition(cond)}
            sx={filterChipSx(localValues.conditions.includes(cond), { activeColor: "#5A9A6E", activeHoverColor: "#4C7C5A" })}
          />
        ))}
      </CollapsibleSection>

      <CustomButton text="Agregar Filtros" fullWidth onClick={handleApply} />
    </Dialog>
  );
};

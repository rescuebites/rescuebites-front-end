import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import {
  createProductSchema,
  CreateProductSchema,
} from "../schemas/createProductSchema";
import CustomTitle from "@/shared/components/CustomTitle";
import { MultiImageUpload } from "@/shared/components/MultiImageUpload";
import { CommerceType } from "@/shared/enums/commerce-type.enum";
import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { ProductCondition } from "@/modules/products/enums/product-condition.enum";
import { PreferenceType } from "@/modules/client/enums/preference-type.enum";
import CustomButton from "@/shared/components/CustomButton";
import { CurrencyTextField } from "@/shared/components/CurrencyTextField";
import { fieldSx } from "@/shared/styles/fieldSx";
import { QuantityInput } from "@/shared/components/QuantityInput";
import DateField from "@/shared/components/DateField";
import { ProductFilterPicker } from "./ProductFilterPicker";

interface CreateProductFormProps {
  commerceType: CommerceType;
  isPending: boolean;
  canCreateProduct: boolean;
  onSubmit: (data: CreateProductSchema) => void;
}

export const CreateProductForm = ({
  commerceType,
  isPending,
  canCreateProduct,
  onSubmit,
}: CreateProductFormProps) => {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    register,
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    mode: "onBlur",
    defaultValues: {
      stock: 1,
      originalPrice: 0,
      discountPercentage: 0,
      name: "",
      description: "",
      category: "" as ProductCategory,
      conditions: [],
      preferences: [],
      expirationDate: "",
      images: [],
    },
  });

  const stockValue = watch("stock");
  const categoryValue = watch("category");
  const conditionsValue = watch("conditions");
  const preferencesValue = watch("preferences");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <CustomTitle variant="body2" align="left" text="Nombre *" color="#333" />
        <TextField
          {...register("name")}
          placeholder="Ingrese nombre del producto"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={fieldSx}
          size="small"
        />

        {/* Descripción */}
        <CustomTitle variant="body2" align="left" text="Descripción" color="#333" />
        <TextField
          {...register("description")}
          placeholder="Ingrese descripción del producto"
          fullWidth
          multiline
          rows={2}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={fieldSx}
          size="small"
        />

        {/* Precio + Descuento */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <CustomTitle variant="body2" align="left" text="Precio Original ($) *" color="#333" />
            <CurrencyTextField
              name="originalPrice"
              control={control}
              error={!!errors.originalPrice}
              helperText={errors.originalPrice?.message}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CustomTitle variant="body2" align="left" text="% Descuento *" color="#333" />
            <TextField
              {...register("discountPercentage")}
              placeholder="0"
              type="number"
              fullWidth
              error={!!errors.discountPercentage}
              helperText={errors.discountPercentage?.message}
              size="small"
              sx={fieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography color="#999" fontSize={14}>%</Typography>
                  </InputAdornment>
                ),
                inputProps: { min: 0, max: 100 },
              }}
            />
          </Box>
        </Box>

        <CustomTitle variant="body2" align="left" text="Fecha de vencimiento *" color="#333" />

        {/* Fecha de vencimiento */}
        <DateField
          control={control}
          name="expirationDate"
          error={errors.expirationDate?.message}
          minDate={new Date().toISOString().split("T")[0]}
          size="small"
          sx={fieldSx}
        />

        <CustomTitle variant="body2" align="left" text="Stock *" color="#333" />

        {/* Stock */}
        <QuantityInput
          value={stockValue}
          onIncrement={() => setValue("stock", stockValue + 1)}
          onDecrement={() => setValue("stock", Math.max(1, stockValue - 1))}
          register={register("stock", { valueAsNumber: true })}
          error={errors.stock}
          min={1}
          buttonSx={{
            width: 40,
            height: 40,
            border: "1.5px solid #E0E0E0",
            borderRadius: "10px",
            color: "#555",
            "&:hover": { borderColor: "#6BA17B", color: "#6BA17B" },
          }}
          textFieldSx={{
            width: 64,
            ...fieldSx,
            mb: 0,
            "& input": { textAlign: "center", fontWeight: 600, fontSize: 16 },
          }}
        />

        <CustomTitle variant="body2" align="left" text="Filtros *" color="#333" />

        {/* Filtros */}
        <ProductFilterPicker
          commerceType={commerceType}
          categoryValue={categoryValue ?? ""}
          conditionsValue={conditionsValue ?? []}
          preferencesValue={preferencesValue ?? []}
          categoryError={errors.category?.message}
          conditionsError={errors.conditions?.message}
          onApply={(values) => {
            setValue("category", values.category as ProductCategory, {
              shouldValidate: true,
            });
            setValue("conditions", values.conditions as ProductCondition[], {
              shouldValidate: true,
            });
            setValue("preferences", values.preferences as PreferenceType[], {
              shouldValidate: true,
            });
          }}
        />

        {/* Imágenes */}
        <CustomTitle variant="body2" align="left" text="Foto/s del Producto *" color="#333" />
        <Box sx={{ mb: errors.images ? 1 : 3 }}>
          <MultiImageUpload
            maxImages={5}
            onChange={(files) =>
              setValue("images", files ?? undefined, { shouldValidate: true })
            }
            error={errors.images ? String(errors.images.message) : undefined}
          />
        </Box>

        <CustomButton
          type="submit"
          text={isPending ? "Registrando..." : "Registrar Producto"}
          fullWidth
          disabled={isPending || !canCreateProduct}
          isLoading={isPending}
          sx={{
            mt: 0,
            py: 1,
            fontSize: "1rem",
            textTransform: "none",
            letterSpacing: "0.2px",
          }}
        />
      </form>
    </>
  );
};

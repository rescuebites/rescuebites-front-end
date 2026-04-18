import { ProductCategory } from "@/modules/products/enums/product-category.enum";
import { PreferenceType } from "@/modules/client/enums/preference-type.enum";
import { getProductCategoryGroups } from "@/shared/utils/product.utils";
import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Stack,
  Typography,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import { CollapsibleSection } from "@/shared/components/CollapsibleSection";
import { filterChipSx } from "@/shared/styles/chipSx";
import { forwardRef } from "react";
import { useFilterStore } from "../hooks/useFilterStore";
import { ProductCategoryDisplayName } from "@/modules/products/utils/category-mapping";
import { PreferenceTypeDisplayName } from "@/modules/client/utils/preference-mapping";


// Transición para el modal (slide desde abajo en mobile)
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FilterDrawer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detecta si es mobile

  const {
    permanentPreferences,
    temporaryPreferences,
    categories,
    isFilterDrawerOpen,
    closeFilterDrawer,
    toggleTemporaryPreference,
    toggleCategory,
    clearTemporaryFilters,
    getActiveFiltersCount,
  } = useFilterStore();

  const activeFiltersCount = getActiveFiltersCount();

  const handleClearAll = () => {
    clearTemporaryFilters();
  };

  const handleApply = () => {
    closeFilterDrawer();
  };

  return (
    <Dialog
      fullScreen={isMobile}
      open={isFilterDrawerOpen}
      onClose={closeFilterDrawer}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          ...(isMobile
            ? {}
            : {
                maxWidth: 600,
                width: "100%",
                maxHeight: "90vh",
                borderRadius: 3,
              }),
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "#FAFAFA",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: isMobile ? "80%" : "auto",
          maxHeight: isMobile ? "70vh" : "90vh",
        }}
      >
        {/* Header Fixed */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 7,
            bgcolor: "#FFF",
            borderBottom: "2px solid #E0E0E0",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              p: isMobile ? 2 : 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: isMobile ? 28 : 28,
                color: "#2D2D2D",
              }}
            >
              Filtros
            </Typography>
            <IconButton
              onClick={closeFilterDrawer}
              size="large"
              sx={{
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                "& .MuiSvgIcon-root": {
                  fontSize: isMobile ? 24 : 32,
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Botón limpiar filtros cuando hay activos */}
          {activeFiltersCount > 0 && (
            <Box sx={{ px: isMobile ? 2 : 3, pb: isMobile ? 2 : 3 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClearAll}
                sx={{
                  color: "#77A787",
                  borderColor: "#77A787",
                  textTransform: "none",
                  fontSize: isMobile ? 14 : 16,
                  fontWeight: 600,
                  py: isMobile ? 1 : 1.5,
                  borderRadius: 2,
                  borderWidth: isMobile ? 1 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(119, 167, 135, 0.08)",
                    borderColor: "#6B9677",
                    borderWidth: isMobile ? 1 : 2,
                  },
                }}
              >
                Limpiar todos los filtros
              </Button>
            </Box>
          )}
        </Box>

        {/* Content Scrollable */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: isMobile ? 2 : 3,
            pt: isMobile ? 2 : 3,
            pb: isMobile ? 2 : 3,
          }}
        >
          <Stack spacing={isMobile ? 2 : 3}>
            {/* Preferencias Alimenticias Permanentes */}
            {permanentPreferences.length > 0 && (
              <Box
                sx={{
                  bgcolor: "#FFF",
                  borderRadius: isMobile ? 2 : 3,
                  p: isMobile ? 2 : 3,
                  border: isMobile ? "1px solid #E0E0E0" : "1px solid #E0E0E0",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={isMobile ? 1 : 1.5}
                  sx={{ mb: isMobile ? 2 : 2 }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: isMobile ? 19 : 18,
                      color: "#2D2D2D",
                      lineHeight: 1,
                    }}
                  >
                    Tus preferencias alimenticias
                  </Typography>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile ? 20 : 24,
                      height: isMobile ? 20 : 24,
                      borderRadius: "50%",
                      bgcolor: "#E8F5E9",
                      border: isMobile
                        ? "3px solid #77A787"
                        : "2px solid #77A787",
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isMobile ? 12 : 13,
                        fontWeight: 700,
                        color: "#77A787",
                      }}
                    >
                      i
                    </Typography>
                  </Box>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#757575",
                    mb: isMobile ? 2 : 2.5,
                    fontSize: isMobile ? 16 : 15,
                    lineHeight: 1.6,
                  }}
                >
                  Configuradas en tu perfil y siempre activas.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: isMobile ? 1 : 1.5,
                  }}
                >
                  {permanentPreferences.map((pref) => (
                    <Chip
                      key={pref}
                      icon={<LockIcon sx={{ fontSize: isMobile ? 16 : 18 }} />}
                      label={PreferenceTypeDisplayName[pref]}
                      sx={{
                        bgcolor: "#E8F5E9",
                        color: "#2D6A4F",
                        fontWeight: 600,
                        fontSize: isMobile ? 14 : 15,
                        border: isMobile
                          ? "3px solid #77A787"
                          : "2px solid #77A787",
                        height: isMobile ? 35 : 40,
                        "& .MuiChip-icon": {
                          color: "#77A787",
                          ml: isMobile ? 1 : 1,
                        },
                        "& .MuiChip-label": {
                          px: isMobile ? 1.5 : 2,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Filtros Adicionales */}
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: isMobile ? 22 : 20,
                  mb: isMobile ? 2 : 3,
                  color: "#2D2D2D",
                }}
              >
                Filtros adicionales
              </Typography>

              {/* Preferencias temporales */}
              <CollapsibleSection
                title="Preferencias alimenticias"
                count={temporaryPreferences.length}
                defaultOpen
                showDivider={false}
                sx={{
                  bgcolor: "#FFF",
                  border: isMobile ? "3px solid #E0E0E0" : "1px solid #E0E0E0",
                  borderRadius: "12px",
                  mb: 2,
                  overflow: "hidden",
                  px: isMobile ? 1.5 : 2,
                }}
                titleSx={{ fontWeight: 600, fontSize: isMobile ? 19 : 16, color: "#2D2D2D" }}
                contentSx={{ gap: isMobile ? 2 : 1.5, pb: 2 }}
                iconSize={isMobile ? 16 : 28}
                badgeSx={{
                  borderRadius: isMobile ? "14px" : "12px",
                  width: "auto",
                  height: "auto",
                  px: isMobile ? 1 : 1.5,
                  py: isMobile ? 1 : 0.5,
                  fontSize: isMobile ? 16 : 13,
                  minWidth: isMobile ? 20 : 24,
                }}
                headerSx={{ minHeight: isMobile ? 35 : 56 }}
              >
                    {(Object.values(PreferenceType) as PreferenceType[]).map((pref) => {
                      const isPermanent = permanentPreferences.includes(pref);
                      const isActive = temporaryPreferences.includes(pref);

                      return (
                        <Chip
                          key={pref}
                          label={PreferenceTypeDisplayName[pref]}
                          onClick={() =>
                            !isPermanent && toggleTemporaryPreference(pref)
                          }
                          disabled={isPermanent}
                          sx={filterChipSx(isActive, { isMobile, isPermanent })}
                        />
                      );
                    })}
              </CollapsibleSection>

              {/* Categorías por grupo */}
              {getProductCategoryGroups().map((group) => {
                const groupCount = group.categories.filter((cat) =>
                  categories.includes(cat)
                ).length;
                return (
                  <CollapsibleSection
                    key={group.key}
                    title={group.title}
                    count={groupCount}
                    defaultOpen={false}
                    showDivider={false}
                    sx={{
                      bgcolor: "#FFF",
                      border: "1px solid #E0E0E0",
                      borderRadius: "12px",
                      mb: isMobile ? 1 : 2,
                      overflow: "hidden",
                      px: isMobile ? 1.5 : 2,
                    }}
                    titleSx={{ fontWeight: 600, fontSize: isMobile ? 19 : 16, color: "#2D2D2D" }}
                    contentSx={{ gap: isMobile ? 1 : 1.5, pb: 2 }}
                    iconSize={isMobile ? 20 : 28}
                    badgeSx={{
                      borderRadius: isMobile ? "10px" : "12px",
                      width: "auto",
                      height: "auto",
                      px: isMobile ? 1 : 1.5,
                      py: isMobile ? 0.7 : 0.5,
                      fontSize: isMobile ? 18 : 13,
                      minWidth: isMobile ? 16 : 24,
                    }}
                    headerSx={{ minHeight: isMobile ? 40 : 56 }}
                  >
                      {group.categories.map((category) => {
                        const isActive = categories.includes(category as ProductCategory);
                        return (
                          <Chip
                            key={category}
                            label={ProductCategoryDisplayName[category as ProductCategory]}
                            onClick={() => toggleCategory(category as ProductCategory)}
                            sx={filterChipSx(isActive, { isMobile })}
                          />
                        );
                      })}
                  </CollapsibleSection>
                );
              })}
            </Box>
          </Stack>
        </Box>

        {/* Footer Fixed con botón */}
        <Box
          sx={{
            position: isMobile ? "fixed" : "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            p: isMobile ? 2 : 3,
            bgcolor: "#FFF",
            borderTop: isMobile ? "3px solid #E0E0E0" : "2px solid #E0E0E0",
            boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
            zIndex: 10,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={handleApply}
            sx={{
              bgcolor: "#77A787",
              color: "#FFF",
              textTransform: "none",
              fontWeight: 700,
              fontSize: isMobile ? 18 : 17,
              py: isMobile ? 2 : 2,
              borderRadius: isMobile ? 2 : 2,
              boxShadow: "0 2px 8px rgba(119, 167, 135, 0.3)",
              "&:hover": {
                bgcolor: "#6B9677",
                boxShadow: "0 4px 12px rgba(119, 167, 135, 0.4)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            {activeFiltersCount > 0
              ? `Mostrar resultados (${activeFiltersCount} filtro${activeFiltersCount > 1 ? "s" : ""})`
              : "Mostrar resultados"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
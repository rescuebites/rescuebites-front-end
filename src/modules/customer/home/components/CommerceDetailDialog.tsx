import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  Avatar,
} from "@mui/material";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";
import {
  LocationOn,
  Schedule,
  Phone,
  Restaurant as RestaurantIcon,
} from "@mui/icons-material";

import { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";
import { useCommerceDetail } from "@/modules/commerce/hooks/useCommerceDetail";
import { useInfiniteProducts } from "../hooks/useProducts";
import BackButton from "../../../../shared/components/ui/BackButton";
import { ProductChips } from "@/shared/components/layout/ProductChips";
import { CommerceTypeChip } from "@/shared/components/layout/ProductChips";
import CustomTitle from "@/shared/components/CustomTitle";
import { useCartStore } from "@/modules/cart/hooks/useCartStore";
import { useEffect, useState } from "react";
import ImageCarouselModal from "@/modules/commerce/components/ImageCarouselModal";
import AddToCartControl from "@/modules/cart/components/AddToCartControl";
import ClosedCommerceAlert from "./ClosedCommerceAlert";
import { isCommerceCurrentlyClosed } from "../utils/commerceStatus";
import BusinessHoursDialog from "./BusinessHoursDialog";
import type { BusinessHoursResponse } from "@/modules/commerce/interfaces/responses/business-hours.response";
import { formatCurrency } from "@/shared/utils/currency.utils";

interface CommerceDetailDialogProps {
  commerceId: string;
}

const CommerceDetailDialog: React.FC<CommerceDetailDialogProps> = ({
  commerceId,
}) => {
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    setShowCarousel(false);
    document
      .getElementById("main-scroll")
      ?.scrollTo({ top: 0, behavior: "instant" });
  }, [commerceId]);
  // Obtener detalles del comercio
  const { data: commerce, isLoading: isLoadingCommerce } =
    useCommerceDetail(commerceId);

  // Obtener productos del comercio específico (paginado)
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts(commerceId);

  //función para probar si funciona el agregado de productos a carrito
  const { fetchCart } = useCartStore();
  useEffect(() => {
    fetchCart();
  }, []);

  const [hoursOpen, setHoursOpen] = useState(false);

  // Loading state
  if (isLoadingCommerce || isLoadingProducts) {
    return (
      <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
        <LoadingState message="Cargando comercio y productos..." />
      </Box>
    );
  }

  // Error state
  if (!commerce) {
    return (
      <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
        <EmptyState message="Error al cargar la información del comercio" />
      </Box>
    );
  }

  // Extraer y aplanar productos de todas las páginas cargadas
  const products = productsData?.pages.flatMap((p) => p.content) ?? [];

  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        minHeight: "100vh",
        pb: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ pt: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3, md: 5 } }}>
        <BackButton />
      </Box>
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 5 },
          maxWidth: { xs: "100%" },
          mx: "auto",
        }}
      >
        {/* Restaurant Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: { xs: 1.5, sm: 3, md: 5 },
            mb: { xs: 3, sm: 3, md: 5 },
          }}
        >
          <ButtonBase
            onClick={() => setShowCarousel(true)}
            aria-label={`Ver imágenes de ${commerce.name}`}
            disabled={!commerce.images || commerce.images.length === 0}
            sx={{
              borderRadius: "50%",
              flexShrink: 0,
              "&:focus-visible": {
                outline: "3px solid #77A787",
                outlineOffset: 3,
              },
            }}
          >
            <Avatar
              src={commerce.images?.[0]?.url || ""}
              sx={{
                width: { xs: 95, sm: 160, md: 200 },
                height: { xs: 95, sm: 160, md: 200 },
                backgroundColor: "#77A787",
                cursor:
                  commerce.images && commerce.images.length > 0
                    ? "pointer"
                    : "default",
              }}
            >
              {!commerce.images?.[0]?.url && (
                <RestaurantIcon sx={{ fontSize: "inherit" }} />
              )}
            </Avatar>
          </ButtonBase>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <CustomTitle
              text={commerce.name}
              color="#2D2D2D"
              variant="h3"
              align="left"
            />

            {commerce.description && (
              <CustomTitle
                text={commerce.description}
                color="#757575"
                variant="h5"
                align="left"
              />
            )}
            {/* Tipos de comercio */}
            {commerce.commerceTypes && commerce.commerceTypes.length > 0 && (
              <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                {commerce.commerceTypes.map((ct: string) => (
                  <CommerceTypeChip key={ct} commerceType={ct} />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {isCommerceCurrentlyClosed(commerce.businessHours ?? []) && (
          <Box sx={{ mb: 3 }}>
            <ClosedCommerceAlert />
          </Box>
        )}

        {/* Contact Information Card */}
        <Card
          sx={{
            mb: { xs: 4 },
            borderRadius: { xs: 8 },
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            p: { xs: 2, sm: 3, md: 3.5 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1, sm: 2, md: 2 },
            }}
          >
            {/* Dirección */}
            {commerce.address && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, md: 2 },
                }}
              >
                <LocationOn
                  sx={{
                    fontSize: { xs: 22, sm: 25, md: 30 },
                    color: "#757575",
                  }}
                />
                <CustomTitle
                  text={commerce.address}
                  color="#757575"
                  variant="h6"
                  align="left"
                />
              </Box>
            )}

            {/* Horario */}
            {commerce.businessHours && commerce.businessHours.length > 0 && (
              <ButtonBase
                onClick={() => setHoursOpen(true)}
                aria-label="Ver horarios del comercio"
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: { xs: 1, md: 2 },
                  borderRadius: 1,
                  "&:hover": { opacity: 0.75 },
                }}
              >
                <Schedule
                  sx={{
                    fontSize: { xs: 22, sm: 25, md: 30 },
                    color: "#757575",
                  }}
                />
                <CustomTitle
                  text="Ver horarios"
                  color="#757575"
                  variant="h6"
                  align="left"
                />
              </ButtonBase>
            )}

            <BusinessHoursDialog
              open={hoursOpen}
              onClose={() => setHoursOpen(false)}
              businessHours={commerce.businessHours ?? []}
              commerceName={commerce.name}
            />

            {/* Teléfono */}
            {commerce.phone && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, md: 2 },
                }}
              >
                <Phone
                  sx={{
                    fontSize: { xs: 22, sm: 25, md: 30 },
                    color: "#757575",
                  }}
                />
                <CustomTitle
                  text={commerce.phone}
                  color="#757575"
                  variant="h6"
                  align="left"
                />
              </Box>
            )}
          </Box>
        </Card>

        {/* Catalog Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 3, sm: 3, md: 5 },
            px: { xs: 0, sm: 0.5 },
          }}
        >
          <CustomTitle
            text="Catálogo"
            color="#2D2D2D"
            variant="h4"
            align="left"
          />
        </Box>

        {/* Menu Items */}
        {!isLoadingProducts && products.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography color="text.secondary" fontSize={{ xs: 18, md: 24 }}>
              Este comercio aún no tiene productos disponibles
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr",
                  md: "repeat(2, 1fr)",
                },
                gap: { xs: 1, sm: 2, md: 3 },
              }}
            >
              {products.map((item: ProductResponse) => (
                <ProductCard
                  key={item.productId}
                  product={item}
                  commerceId={commerceId}
                  commerceName={commerce?.name}
                  businessHours={commerce?.businessHours}
                />
              ))}
            </Box>

            {hasNextPage && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  variant="outlined"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  sx={{
                    borderRadius: 8,
                    borderColor: "#77A787",
                    color: "#77A787",
                    px: 4,
                    "&:hover": {
                      borderColor: "#3E6A53",
                      color: "#3E6A53",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {isFetchingNextPage ? (
                    <CircularProgress size={20} sx={{ color: "#77A787" }} />
                  ) : (
                    "Cargar más"
                  )}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

      <ImageCarouselModal
        open={showCarousel}
        images={commerce.images ?? []}
        onClose={() => setShowCarousel(false)}
      />
    </Box>
  );
};

// Componente separado para las tarjetas de producto
function ProductCard({
  product,
  commerceId,
  commerceName,
  businessHours,
}: {
  product: ProductResponse;
  commerceId: string;
  commerceName?: string;
  businessHours?: BusinessHoursResponse[];
}) {
  return (
    <Card
      sx={{
        borderRadius: { xs: 8, md: 10 },
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        overflow: "visible",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: { md: "translateY(-2px)" },
          boxShadow: { md: "0 4px 12px rgba(0,0,0,0.12)" },
        },
      }}
    >
      <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Box sx={{ display: "flex", gap: { xs: 1, sm: 2, md: 3 } }}>
          {/* Product Image */}
          <Box
            sx={{
              position: "relative",
              width: { xs: 130, sm: 160, md: 200 },
              height: { xs: 130, sm: 160, md: 200 },
              flexShrink: 0,
              overflow: "hidden",
              alignSelf: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 7,
                objectFit: "cover",
                objectPosition: "70%",
              }}
              image={product.productImages?.[0]?.url || "/placeholder.jpg"}
              alt={product.name}
            />
            <ProductChips
              discountPercentage={product.discountPercentage}
              discountAsImageBadge={true}
              showExpiration={false}
              showStock={false}
              showCondition={false}
              showProductCategory={false}
            />
          </Box>

          {/* Product Details */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomTitle
              text={product.name}
              color="#2D2D2D"
              variant="h4"
              align="left"
            />

            {/* Prices */}
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 1.5,
                mb: { xs: 1.5, sm: 1.7, md: 2 },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#77A787",
                }}
              >
                {`$${formatCurrency(product.discountedPrice)}`}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: "line-through",
                    fontStyle: "italic",
                    color: "#999",
                  }}
                >
                  {`$${formatCurrency(product.originalPrice)}`}
                </Typography>
              )}
            </Box>

            {/* Status Chips */}
            <Box
              sx={{
                display: "flex",
                gap: { xs: 1.3, sm: 2, md: 2.5 },
                flexWrap: "wrap",
              }}
            >
              <ProductChips
                expirationDate={product.expirationDate}
                stock={product.stock}
                conditions={product.conditions}
                categoryDisplayName={product.categoryDisplayName}
                showDiscount={false}
              />
            </Box>
          </Box>
          <AddToCartControl
            productId={product.productId}
            productName={product.name}
            unitPrice={product.discountedPrice}
            availableStock={product.stock}
            imageUrl={product.productImages?.[0]?.url}
            commerceId={commerceId}
            commerceName={commerceName}
            businessHours={businessHours}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default CommerceDetailDialog;

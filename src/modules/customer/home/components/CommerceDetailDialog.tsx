import {
  Box,
  Card,
  CardContent,
  CardMedia,
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
import { useProducts } from "../hooks/useProducts";
import BackButton from "../../../../shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";
import { ProductChips } from "@/shared/components/layout/ProductChips";
import { CommerceTypeChip } from "@/shared/components/layout/ProductChips";
import CustomTitle from "@/shared/components/CustomTitle";
import { useCartStore } from "@/modules/cart/hooks/useCartStore";
import { useEffect } from "react";
import AddToCartControl from "@/modules/cart/components/AddToCartControl";
import { formatBusinessHours } from "@/modules/commerce/utils/businessHoursMapper";
import ClosedCommerceAlert from "./ClosedCommerceAlert";
import type { BusinessHoursResponse } from "@/modules/commerce/interfaces/responses/business-hours.response";
import type { DayOfWeek } from "@/modules/commerce/interfaces/requests/business-hours.request";

const JS_DAY_TO_DOW: DayOfWeek[] = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

function isCommerceCurrentlyClosed(businessHours: BusinessHoursResponse[]): boolean {
  const now = new Date();
  const todayDow = JS_DAY_TO_DOW[now.getDay()];
  const entry = businessHours.find((h) => h.dayOfWeek === todayDow);
  if (!entry || entry.closed) return true;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const toMin = (t: string | null) => {
    if (!t) return null;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const morningOpen = toMin(entry.openTime);
  const morningClose = toMin(entry.closeTime);
  const afternoonOpen = toMin(entry.afternoonOpenTime);
  const afternoonClose = toMin(entry.afternoonCloseTime);
  const inMorning = morningOpen !== null && morningClose !== null && currentMinutes >= morningOpen && currentMinutes < morningClose;
  const inAfternoon = afternoonOpen !== null && afternoonClose !== null && currentMinutes >= afternoonOpen && currentMinutes < afternoonClose;
  return !inMorning && !inAfternoon;
}

interface CommerceDetailDialogProps {
  commerceId: string;
}

const CommerceDetailDialog: React.FC<CommerceDetailDialogProps> = ({
  commerceId,
}) => {
  const navigate = useNavigate();

  // Obtener detalles del comercio
  const { data: commerce, isLoading: isLoadingCommerce } =
    useCommerceDetail(commerceId);

  // Obtener productos del comercio específico
  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    commerceId,
    size: 50, // Traer más productos para el catálogo completo
  });

  // Función para ordenar productos
  const getSortedProducts = (products: ProductResponse[]) => {
    const sorted = [...products];
    return sorted;
  };

    //función para probar si funciona el agregado de productos a carrito
  const { fetchCart } = useCartStore();
  useEffect(() => {
    fetchCart();
  }, []);

  // Loading state
  if (isLoadingCommerce || isLoadingProducts) {
    return (
      <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
        <LoadingState message="Cargando comercio y productos..." />
      </Box>
    );
  }

  // Error state
  if (!commerce || !productsData) {
    return (
      <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
        <EmptyState message="Error al cargar la información del comercio" />
      </Box>
    );
  }

  // Extraer productos del PaginatedResponse
  const products = getSortedProducts(productsData.content || []);

  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        minHeight: "100vh",
        pb: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ pt: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3, md: 5 } }}>
        <BackButton  />
      </Box>
      <Box
        sx={{
          pt: { xs: 5, sm: 7, md: 10 },
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
          <Avatar
            src={commerce.images?.[0]?.url || ""}
            sx={{
              width: { xs: 95, sm: 160, md: 200 },
              height: { xs: 95, sm: 160, md: 200 },
              backgroundColor: "#77A787",
              flexShrink: 0,
            }}
          >
            {!commerce.images?.[0]?.url && (
              <RestaurantIcon sx={{ fontSize: "inherit" }} />
            )}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <CustomTitle text={commerce.name} color="#2D2D2D" variant="h3" align="left"/>

            {commerce.description && (
              <CustomTitle text={commerce.description} color="#757575" variant="h5" align="left"/>
              
            )}
            {/* Ícono de tipo de comercio */}
            {commerce.commerceTypes?.[0] && (
              <CommerceTypeChip commerceType={commerce.commerceTypes[0]} />
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
                <CustomTitle text={commerce.address} color="#757575" variant="h6" align="left"/>
              </Box>
            )}

            {/* Horario */}
            {commerce.businessHours && commerce.businessHours.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, md: 2 },
                }}
              >
                <Schedule
                  sx={{
                    fontSize: { xs: 22, sm: 25, md: 30 },
                    color: "#757575",
                  }}
                />
                <CustomTitle text={formatBusinessHours(commerce.businessHours)} color="#757575" variant="body2" align="left"/>
              </Box>
            )}

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
                <CustomTitle text={commerce.phone} color="#757575" variant="h6" align="left"/>
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
          <CustomTitle text="Catálogo" color="#2D2D2D" variant="h4" align="left"/>
        </Box>

        {/* Menu Items */}
        {products.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography color="text.secondary" fontSize={{ xs: 18, md: 24 }}>
              Este comercio aún no tiene productos disponibles
            </Typography>
          </Box>
        ) : (
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
              <ProductCard key={item.productId} product={item} commerceId={commerceId} commerceName={commerce?.name} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Componente separado para las tarjetas de producto
function ProductCard({ product, commerceId, commerceName }: { product: ProductResponse; commerceId: string; commerceName?: string }) {
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
            <CustomTitle text={product.name} color="#2D2D2D" variant="h4" align="left"/>

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
                ${product.discountedPrice.toFixed(2)}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: "line-through",
                    color: "#999",
                  }}
                >
                  ${product.originalPrice.toFixed(2)}
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
        />
        </Box>
      </CardContent>
    </Card>
  );
}

export default CommerceDetailDialog;
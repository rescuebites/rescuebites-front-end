import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  LocationOn,
  Schedule,
  Phone,
  Restaurant as RestaurantIcon,
} from "@mui/icons-material";

import { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";
import { useCommerceDetail } from "../hooks/useCommerces";
import { useProducts } from "../hooks/useProducts";
import BackButton from "../../../../shared/components/ui/BackButton";
import { useNavigate } from "react-router-dom";
import { ProductChips } from "@/shared/components/layout/ProductChips";
import { CommerceTypeChip } from "@/shared/components/layout/ProductChips";

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
    return sorted; // Ya vienen ordenados por más nuevo desde el backend
  };

  // Loading state
  if (isLoadingCommerce || isLoadingProducts) {
    return (
      <Box
        sx={{
          backgroundColor: "#FAFAFA",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#77A787" }} />
      </Box>
    );
  }

  // Error state
  if (!commerce || !productsData) {
    return (
      <Box
        sx={{
          backgroundColor: "#FAFAFA",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">
          Error al cargar la información del comercio
        </Typography>
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
        <BackButton onClick={() => navigate("/customer", { replace: true })} />
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
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 30, sm: 55, md: 65 },
                mb: { xs: 1.5, sm: 1.5, md: 2 },
                lineHeight: 1,
                color: "#2D2D2D",
              }}
            >
              {commerce.name}
            </Typography>

            {commerce.description && (
              <Typography
                variant="body1"
                sx={{
                  color: "#757575",
                  fontSize: { xs: 20, sm: 26, md: 28 },
                  mb: { xs: 1.5, sm: 2, md: 2.5 },
                  lineHeight: 1,
                }}
              >
                {commerce.description}
              </Typography>
            )}
            {/* Ícono de tipo de comercio */}
            {commerce.commerceTypes?.[0] && (
              <CommerceTypeChip commerceType={commerce.commerceTypes[0]} />
            )}
          </Box>
        </Box>

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
                <Typography
                  variant="body2"
                  sx={{
                    color: "#757575",
                    fontSize: { xs: 17, sm: 20, md: 24 },
                  }}
                >
                  {commerce.address}
                  {commerce.locality && `, ${commerce.locality}`}
                </Typography>
              </Box>
            )}

            {/* Horario */}
            {commerce.openingHours && (
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
                <Typography
                  variant="body2"
                  sx={{
                    color: "#757575",
                    fontSize: { xs: 17, sm: 20, md: 24 },
                  }}
                >
                  {commerce.openingHours}
                </Typography>
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
                <Typography
                  variant="body2"
                  sx={{
                    color: "#757575",
                    fontSize: { xs: 17, sm: 20, md: 24 },
                  }}
                >
                  {commerce.phone}
                </Typography>
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
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 24, sm: 30, md: 35 },
              color: "#2D2D2D",
            }}
          >
            Catálogo
          </Typography>
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
              <ProductCard key={item.productId} product={item} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Componente separado para las tarjetas de producto
function ProductCard({ product }: { product: ProductResponse }) {
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
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 26, sm: 30, md: 36 },
                mb: { xs: 1.5, sm: 1.7, md: 2 },
                color: "#2D2D2D",
                lineHeight: 1.3,
              }}
            >
              {product.name}
            </Typography>

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
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 24, sm: 28, md: 34 },
                  color: "#77A787",
                }}
              >
                ${product.discountedPrice.toFixed(2)}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "#999",
                    fontSize: { xs: 18, sm: 22, md: 34, lg: 26 },
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
                condition={product.condition}
                conditionDisplayName={product.conditionDisplayName}
                categoryDisplayName={product.categoryDisplayName}
                showDiscount={false}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CommerceDetailDialog;

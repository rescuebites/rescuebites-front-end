import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { formatCurrency } from "@/shared/utils/currency.utils";

interface OrderItemImage {
  url: string;
}

interface OrderItemCardProps {
  orderItemId: string;
  productId: string;
  productName: string;
  productDescription: string;
  quantity: number;
  subtotal: number;
  originalPrice: number;
  discountPercentage: number;
  images: OrderItemImage[];
  onProductClick: (productId: string) => void;
}

/**
 * Componente que muestra una tarjeta individual de un producto en el pedido
 * Incluye imagen, nombre, descripción, cantidad, precios y descuentos
 */
const OrderItemCard = ({
  orderItemId,
  productId,
  productName,
  productDescription,
  quantity,
  subtotal,
  originalPrice,
  discountPercentage,
  images,
  onProductClick,
}: OrderItemCardProps) => {
  return (
    <Card
      key={orderItemId}
      onClick={() => onProductClick(productId)}
      sx={{
        position: "relative",
        borderRadius: { xs: 4, sm: 5 },
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        overflow: "visible",
        bgcolor: "white",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Badge de descuento en esquina superior derecha */}
      {discountPercentage > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            bgcolor: "#FF8A65",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {Math.round(discountPercentage)}%
          </Typography>
        </Box>
      )}

      <Stack direction="row" spacing={2} sx={{ p: { xs: 2, sm: 2.5 } }}>
        {/* Imagen del producto con badge de cantidad */}
        <Box sx={{ position: "relative", flexShrink: 0 }}>
          <Avatar
            src={images[0]?.url}
            alt={productName}
            variant="rounded"
            sx={{
              width: { xs: 90, sm: 100 },
              height: { xs: 90, sm: 100 },
              borderRadius: 3,
            }}
          />
          {/* Badge de cantidad */}
          <Box
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              width: 28,
              height: 28,
              borderRadius: "50%",
              bgcolor: "#77A787",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {quantity}
            </Typography>
          </Box>
        </Box>

        {/* Info del producto */}
        <Box flex={1} sx={{ minWidth: 0 }}>
          {/* Nombre del producto */}
          <CustomTitle
            variant="subtitle1"
            align="left"
            text={productName}
            color="#2D2D2D"
          />

          {/* Descripción del producto */}
          <CustomTitle
            variant="subtitle1"
            align="left"
            text={productDescription.toLowerCase()}
            color="#9CA3AF"
          />

          {/* Precios */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mt: "auto" }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "#2D2D2D",
                fontSize: { xs: 16, sm: 18 },
              }}
            >
              ${formatCurrency(subtotal)}
            </Typography>
            {discountPercentage > 0 && (
              <Typography
                sx={{
                  textDecoration: "line-through",
                  fontStyle: "italic",
                  color: "#9CA3AF",
                  fontSize: { xs: 13, sm: 14 },
                }}
              >
                ${formatCurrency(quantity * originalPrice)}
              </Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default OrderItemCard;

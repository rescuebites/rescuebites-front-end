import { Card, CardContent, Box, Typography, Stack, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { QuantityControl } from "@/shared/components/layout/QuantityControl";
import { ProductChips } from "@/shared/components/layout/ProductChips";
import CustomTitle from "@/shared/components/CustomTitle";
import type { CartItemResponse } from "../interfaces/responses/cart-response.interface";

interface Props {
  item: CartItemResponse;
  onRemove: (cartItemId: string) => void;
  onQuantityChange: (cartItemId: string, quantity: number) => void;
}

export default function CartProductCard({ item, onRemove, onQuantityChange }: Props) {
  return (
    <Card
      sx={{
        borderRadius: { xs: 4, md: 6 },
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        overflow: "visible",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: { md: "translateY(-2px)" },
          boxShadow: { md: "0 4px 12px rgba(0,0,0,0.12)" },
        },
      }}
    >
      <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Box sx={{ display: "flex", gap: { xs: 1, sm: 2, md: 3 } }}>
          <Box
            component="img"
            src={item.images?.[0]?.url || "/placeholder.jpg"}
            alt={item.productName}
            sx={{
              borderRadius: { xs: 2, md: 4 },
              width: { xs: 90, sm: 105, md: 120 },
              height: { xs: 90, sm: 105, md: 120 },
              flexShrink: 0,
              alignSelf: "center",
              objectFit: "cover",
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <CustomTitle text={item.productName} color="#2d2d2d" variant="h5" align="left" />
              <IconButton
                size="small"
                onClick={() => onRemove(item.cartItemId)}
                sx={{ color: "#9CA3AF", p: 0.5, ml: 0.5 }}
              >
                <DeleteOutlineIcon sx={{ fontSize: { xs: 20, sm: 23, md: 26 } }} />
              </IconButton>
            </Stack>

            <Typography sx={{ color: "#2d2d2d" }}>{item.description}</Typography>

            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, sm: 20, md: 26 }, color: "#77A787" }}>
                ${item.unitPrice.toFixed(2)}
              </Typography>
              <Typography sx={{ textDecoration: "line-through", color: "#999", fontSize: { xs: 16, sm: 18, md: 24 } }}>
                ${item.originalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <ProductChips
                showDiscount={false}
                discountAsImageBadge
                showExpiration={false}
                showStock={true}
                stock={item.availableStock}
                showCondition={false}
              />
              <QuantityControl
                stock={item.availableStock}
                initialQuantity={item.quantity}
                onQuantityChange={(q) => onQuantityChange(item.cartItemId, q)}
              />
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
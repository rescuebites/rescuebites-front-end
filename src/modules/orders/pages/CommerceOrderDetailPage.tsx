import { useState } from "react";
import { Box, Container, Stack, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import BackButton from "@/shared/components/ui/BackButton";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import CustomTitle from "@/shared/components/CustomTitle";
import ProductDetailDialog from "@/modules/customer/home/components/ProductDetailDialog";
import OrderHeader from "@/modules/orders/components/OrderHeader";
import OrderItemCard from "@/modules/orders/components/OrderItemCard";
import OrderPriceBreakdown from "@/modules/orders/components/OrderPriceBreakdown";
import CommerceOrderActionSection from "@/modules/orders/components/CommerceOrderActionSection";
import { useCommerceOrderDetail } from "@/modules/orders/hooks/useCommerceOrderDetail";
import { useOrderPageActions } from "@/modules/orders/hooks/useOrderPageActions";

const CommerceOrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const commerceId = useAuthStore((state) => state.commerceId);

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState<number>(1);

  const { data: order, isLoading, error } = useCommerceOrderDetail(commerceId, orderId);

  const { handleProductClick } = useOrderPageActions();

  const onProductClick = (productId: string) => {
    const orderItem = order?.items.find((item) => item.productId === productId);
    setSelectedProductQuantity(orderItem?.quantity || 1);
    handleProductClick(productId, setSelectedProductId, setProductDialogOpen);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#FAFAFA",
        }}
      >
        <CircularProgress sx={{ color: "#77A787" }} />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Box
        sx={{
          backgroundColor: "#FAFAFA",
          minHeight: "100vh",
          py: { xs: 0.2, sm: 0.4, md: 0.4 },
          px: { xs: 2, sm: 5, md: 6 },
        }}
      >
        <Box sx={{ pt: { xs: 1, sm: 1, md: 1 }, mb: 3 }}>
          <BackButton />
        </Box>
        <Container maxWidth="lg">
          <CustomTitle
            variant="h6"
            align="center"
            text="Error al cargar el pedido. Por favor intenta nuevamente."
            color="#F54927"
          />
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        minHeight: "92vh",
        py: { xs: 0.2, sm: 0.4, md: 0.4 },
        px: { xs: 2, sm: 5, md: 6 },
      }}
    >
      <Box sx={{ pt: { xs: 1, sm: 1, md: 1 }, mb: 3 }}>
        <BackButton />
      </Box>

      <Container maxWidth="lg">
        <OrderHeader
          orderNumber={order.orderNumber}
          status={order.status}
          createdAt={order.createdAt}
        />

        <CustomTitle
          variant="h6"
          align="left"
          text="Productos seleccionados"
          color="#2D2D2D"
        />

        <Stack spacing={2} sx={{ mb: 3 }}>
          {order.items.map((item) => (
            <OrderItemCard
              key={item.orderItemId}
              orderItemId={item.orderItemId}
              productId={item.productId}
              productName={item.productName}
              productDescription={item.productDescription}
              quantity={item.quantity}
              subtotal={item.subtotal}
              originalPrice={item.originalPrice}
              discountPercentage={item.discountPercentage}
              images={item.images}
              onProductClick={onProductClick}
            />
          ))}
        </Stack>

        <CustomTitle
          variant="h6"
          align="left"
          text="Detalle de precios"
          color="#2D2D2D"
        />

        <OrderPriceBreakdown
          subtotal={order.subtotal}
          discountedSubtotal={order.discountedSubtotal}
          serviceFee={order.serviceFee}
          total={order.total}
        />

        {commerceId && (
          <CommerceOrderActionSection
            commerceId={commerceId}
            orderId={order.orderId}
            status={order.status}
            paymentMethod={order.paymentMethod}
          />
        )}

        <ProductDetailDialog
          open={productDialogOpen}
          mode="viewOnly"
          fixedQuantity={selectedProductQuantity}
          onClose={() => setProductDialogOpen(false)}
          productId={selectedProductId}
          hideCommerceInfo
        />
      </Container>
    </Box>
  );
};

export default CommerceOrderDetailPage;

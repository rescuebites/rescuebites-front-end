import { useState } from "react";
import { Box, Container, Stack, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import BackButton from "@/shared/components/ui/BackButton";
import { useOrderDetail } from "@/modules/orders/hooks/useOrderDetail";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { OrderStatus } from "@/modules/orders/enums/order-status.enum";
import CommerceInfoCard from "@/shared/components/CommerceInfoCard";
import { CancelOrderDialog } from "@/modules/orders/components/CancelOrderDialog";
import CustomTitle from "@/shared/components/CustomTitle";
import ProductDetailDialog from "@/modules/customer/home/components/ProductDetailDialog";
import { useOrderPageActions } from "@/modules/orders/hooks/useOrderPageActions";
import { useCancelOrderWithFeedback } from "@/modules/orders/hooks/useCancelOrderWithFeedback";
import OrderHeader from "@/modules/orders/components/OrderHeader";
import OrderItemCard from "@/modules/orders/components/OrderItemCard";
import OrderPriceBreakdown from "@/modules/orders/components/OrderPriceBreakdown";
import OrderPaymentSection from "@/modules/orders/components/OrderPaymentSection";
import OrderCancelledPage from "@/shared/pages/OrderCancelledPage";

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const clientId = useAuthStore((state) => state.clientId);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [selectedProductQuantity, setSelectedProductQuantity] =
    useState<number>(1);

  const { data: order, isLoading, error } = useOrderDetail(clientId, orderId);

  const { handleCommerceClick, handleProductClick } =
    useOrderPageActions();

  const { handleCancelOrder, isCanceling } = useCancelOrderWithFeedback({
    clientId,
    orderId,
  });

  const onCancelOrder = (reason: string) => {
    handleCancelOrder(reason, () => {
      setCancelDialogOpen(false);
      setCancelled(true);
    });
  };

  if (cancelled) {
    return <OrderCancelledPage redirectTo="/" />;
  }

  const onProductClick = (productId: string) => {
    const orderItem = order?.items.find((item) => item.productId === productId);
    setSelectedProductQuantity(orderItem?.quantity || 1);
    handleProductClick(productId, setSelectedProductId, setProductDialogOpen);
  };

  const onCommerceClick = () => {
    if (order?.commerceId) {
      handleCommerceClick(order.commerceId);
    }
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
      {/* Botón volver */}
      <Box sx={{ pt: { xs: 1, sm: 1, md: 1 }, mb: 3 }}>
        <BackButton />
      </Box>

      <Container maxWidth="lg">
        {/* Header con número de orden, estado y progreso */}
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

        {/* Lista de productos del pedido */}
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
          text="Comercio"
          color="#2D2D2D"
        />

        {/* Información del comercio */}
        <Box sx={{ mb: 3 }}>
          <CommerceInfoCard
            commerceName={order.commerceName}
            commerceAddress={order.commerceAddress}
            commerceLocality={order.commerceLocality}
            commerceTypes={order.commerceTypes}
            commerceImages={order.commerceImages}
            onClick={onCommerceClick}
          />
        </Box>

        <CustomTitle
          variant="h6"
          align="left"
          text="Detalle de precios"
          color="#2D2D2D"
        />

        {/* Desglose de precios */}
        <OrderPriceBreakdown
          subtotal={order.subtotal}
          discountedSubtotal={order.discountedSubtotal}
          serviceFee={order.serviceFee}
          total={order.total}
        />

        {/* Método de Pago y Botón Cancelar */}
        {(order.status === OrderStatus.PENDING ||
          order.status === OrderStatus.CONFIRMED) && (
          <OrderPaymentSection
            paymentMethod={order.paymentMethod}
            onCancelClick={() => setCancelDialogOpen(true)}
          />
        )}

        {/* Diálogos */}
        <CancelOrderDialog
          open={cancelDialogOpen}
          onClose={() => setCancelDialogOpen(false)}
          onConfirm={onCancelOrder}
          isLoading={isCanceling}
        />

        <ProductDetailDialog
          open={productDialogOpen}
          mode="viewOnly"
          fixedQuantity={selectedProductQuantity}
          onClose={() => setProductDialogOpen(false)}
          productId={selectedProductId}
        />
      </Container>
    </Box>
  );
};

export default OrderDetailPage;

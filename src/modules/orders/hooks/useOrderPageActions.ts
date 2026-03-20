import { useNavigate } from "react-router-dom";

export const useOrderPageActions = () => {
  const navigate = useNavigate();

  const handleCommerceClick = (commerceId: string) => {
    navigate(`/customer/stores/${commerceId}`);
  };

  const handleProductClick = (
    productId: string,
    setSelectedProductId: (id: string | null) => void,
    setProductDialogOpen: (open: boolean) => void,
  ) => {
    setSelectedProductId(productId);
    setProductDialogOpen(true);
  };

  const handleBackToOrders = () => {
    navigate("/customer/orders");
  };

  return {
    handleCommerceClick,
    handleProductClick,
    handleBackToOrders,
  };
};

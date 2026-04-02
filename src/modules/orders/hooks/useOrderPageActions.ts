import { useNavigate } from "react-router-dom";

export const useOrderPageActions = () => {
  const navigate = useNavigate();

  const handleCommerceClick = (commerceId: string) => {
    navigate(`/stores/${commerceId}`);
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
    navigate("/orders");
  };

  return {
    handleCommerceClick,
    handleProductClick,
    handleBackToOrders,
  };
};

import { create } from "zustand";
import { cartApi } from "../api/cart.api";
import { CartResponse } from "../interfaces/responses/cart-response.interface";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
import { PaymentMethod } from "@/modules/orders/enums/payment-method.enum";

interface CartStore {
  cart: CartResponse | null;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity: number) => Promise<void>;
  updateItem: (cartItemId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  updatePaymentMethod: (method: PaymentMethod) => Promise<void>;
  getQuantity: (productId: string) => number;
  getCartItemId: (productId: string) => string | undefined;
}

const getClientId = () => useAuthStore.getState().clientId;
//const getClientId = () => "295a5546-bc99-4616-8e10-5bb9aabb1269";

export const useCartStore = create<CartStore>()((set, get) => ({
  cart: null,
  loading: false,

  fetchCart: async () => {
    const clientId = getClientId();
    if (!clientId) return;
    set({ loading: true, cart: null });
    try {
      const cart = await cartApi.getCart(clientId);
      set({ cart });
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      set({ cart: null });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (productId, quantity) => {
    const clientId = getClientId();
    if (!clientId) return;
    try {
      const cart = await cartApi.addToCart(clientId, productId, quantity);
      set({ cart });
    } catch (error: any) {
      throw error;
    }
  },

  updateItem: async (cartItemId, quantity) => {
    const clientId = getClientId();
    if (!clientId) return;
    const cart = await cartApi.updateItem(clientId, cartItemId, quantity);
    set({ cart });
  },

  removeItem: async (cartItemId) => {
    const clientId = getClientId();
    if (!clientId) return;
    await cartApi.removeItem(clientId, cartItemId);
    const cart = await cartApi.getCart(clientId);
    set({ cart });
  },

  clearCart: async () => {
    const clientId = getClientId();
    if (!clientId) return;
    await cartApi.clearCart(clientId);
    set({ cart: null });
  },

  updatePaymentMethod: async (method) => {
  const clientId = getClientId();
  if (!clientId) return;
  const cart = await cartApi.updatePaymentMethod(clientId, method);
  set({ cart });
},


  getQuantity: (productId) => {
    const items = Object.values(get().cart?.commerceSummaries ?? {}).flatMap(
      (c) => c.items
    );
    return items.find((i) => i.productId === productId)?.quantity ?? 0;
  },

  getCartItemId: (productId) => {
    const items = Object.values(get().cart?.commerceSummaries ?? {}).flatMap(
      (c) => c.items
    );
    return items.find((i) => i.productId === productId)?.cartItemId;
  },
}));
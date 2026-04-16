import { create } from "zustand";
import { UpdateCommerceRequest } from "../interfaces/requests/update-commerce.interface";

interface PendingCommerceUpdateState {
  commerceId: string | null;
  updateData: Partial<UpdateCommerceRequest>;
  images: File[];
  setUpdateData: (data: Partial<UpdateCommerceRequest>) => void;
  setCommerceId: (id: string) => void;
  setImages: (images: File[]) => void;
  clearPendingUpdate: () => void;
}

export const usePendingCommerceUpdateStore = create<PendingCommerceUpdateState>(
  (set) => ({
    commerceId: null,
    updateData: {},
    images: [],
    setUpdateData: (data) => set({ updateData: data }),
    setCommerceId: (id) => set({ commerceId: id }),
    setImages: (images) => set({ images }),
    clearPendingUpdate: () => set({ commerceId: null, updateData: {}, images: [] }),
  })
);

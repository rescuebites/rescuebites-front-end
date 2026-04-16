import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage } from "../lib/images.api";
import { useSnackbarStore } from "./useSnackbarStore";

interface UseDeleteImageOptions {
  queryKey: (string | undefined)[];
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useDeleteImage = ({
  queryKey,
  onSuccess: additionalOnSuccess,
  onError: additionalOnError,
}: UseDeleteImageOptions) => {
  const queryClient = useQueryClient();
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const { mutate, isPending } = useMutation({
    mutationFn: async (imageId: string) => {
      return deleteImage(imageId);
    },
    onSuccess: () => {
      showMessage("Imagen eliminada exitosamente", "success");
      queryClient.invalidateQueries({ queryKey });
      additionalOnSuccess?.();
    },
    onError: (error: any) => {
      showMessage(
        error?.response?.data?.message ?? "Error al eliminar imagen",
        "error"
      );
      additionalOnError?.(error);
    },
  });

  const handleDeleteImage = async (imageId: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      mutate(imageId, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  return {
    handleDeleteImage,
    isPending,
  };
};

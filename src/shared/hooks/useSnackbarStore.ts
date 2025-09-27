import { create } from "zustand";

type SnackbarState = {
  message: string | null;
  severity: "error" | "success" | "info" | "warning";
  open: boolean;
  showMessage: (message: string, severity?: SnackbarState["severity"]) => void;
  close: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: null,
  severity: "info",
  open: false,
  showMessage: (message, severity = "info") =>
    set({ message, severity, open: true }),
  close: () => set({ open: false }),
}));
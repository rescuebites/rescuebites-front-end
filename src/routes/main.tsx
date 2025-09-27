import { createRoot } from "react-dom/client";
import "../styles.css";
import AppProvider from "@/providers/AppProvider";

createRoot(document.getElementById("root")!).render(<AppProvider />);

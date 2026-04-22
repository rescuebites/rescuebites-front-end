import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Clock } from "lucide-react";

export default function ClosedCommerceAlert() {
  return (
    <Alert
      severity="error"
      variant="outlined"
      icon={<Clock size={35} strokeWidth={2} />}
      sx={{ borderRadius: 3,backgroundColor: "#FDEDED", color: "#B91C1C", borderColor: "#fcc3c3" }}
    >
      <AlertTitle sx={{ fontWeight: 700 }}>Cerrado por ahora</AlertTitle>
      La tienda está cerrada en este momento
    </Alert>
  );
}
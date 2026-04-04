import { useCommerceScheduleForm } from "../hooks/useCommerceScheduleForm";
import CustomTitle from "@/shared/components/CustomTitle";
import { Box, Typography } from "@mui/material";
import StoreBusinessHours from "../components/BusinessHours";
import CustomButton from "@/shared/components/CustomButton";


export default function BusinessHoursPage() {
  const { days, setDays, handleSubmit } = useCommerceScheduleForm();


  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
      <CustomTitle text="Horarios del comercio" />
      <Typography variant="caption" color="#999" sx={{ display: "block", mb: 1.5, fontSize: "15px" }}>
        Completá el primer día abierto. Al hacer click en otro día se replican esos horarios al resto.
      </Typography>

      <StoreBusinessHours days={days} onDaysChange={setDays} />

      <Box sx={{ mt: 3, mb: 2 }}>
        <CustomButton
          text="Registrar Comercio"
          type="button"
          fullWidth
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  );
}
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/shared/components/CustomButton";
import { registerSchema } from "@/modules/auth/schemas/registerSchema";
import { CreateClientParams } from "@/modules/client/interfaces/requests/createClient.interface";
import { useRegister } from "@/modules/auth/hooks/useRegister";
import { usePendingRegistrationStore } from "@/modules/users/hooks/usePendingRegistrationStore";
import { Role } from "@/shared/enums/role.enum";
import { getProfileImageFile } from "@/shared/utils/profileImage";
import CustomTitle from "@/shared/components/CustomTitle";
import BirthDateField from "@/shared/components/BirthDateField";

const dietaryOptions = [
  { label: "Apto celíaco", value: "CELIAC" },
  { label: "Apto vegano", value: "VEGAN" },
  { label: "Apto vegetariano", value: "VEGETARIAN" },
  { label: "Sin gluten", value: "GLUTEN_FREE" },
  { label: "Sin lactosa", value: "LACTOSE_FREE" },
  { label: "Bajo en sodio", value: "LOW_SODIUM" },
];

interface RegisterClientFormProps {
  profilePicture: File | null;
  setProfilePicture: (file: File | null) => void;
}

export default function RegisterClientForm({
  profilePicture,
}: RegisterClientFormProps) {
  const { setClientData } = usePendingRegistrationStore();
  const { mutate: registerUser, isPending } = useRegister();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
      preferences: [] as string[],
    },
  });

  const handleCheckboxChange = (value: string) => {
    const current = getValues("preferences") ?? [];
    const updated = current.includes(value)
      ? current.filter((p) => p !== value)
      : [...current, value];
    setValue("preferences", updated);
  };

  const onSubmit = async (form: any) => {
    const profileFile = profilePicture ?? (await getProfileImageFile());
    const clientRequest: CreateClientParams = {
      createClientRequest: {
        firstName: form.firstName,
        lastName: form.lastName,
        birthDate: form.birthDate,
        address: form.address,
        userId: "",
        preferences: form.preferences,
      },
      profilePicture: profileFile,
    };

    setClientData(clientRequest);
    registerUser({
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      role: Role.CLIENT,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            label="Nombre"
            required
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            label="Apellido"
            required
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...field}
          />
        )}
      />

      <BirthDateField
        control={control}
        name="birthDate"
        error={errors.birthDate?.message}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField label="Dirección" fullWidth margin="normal" {...field} />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            label="Correo electrónico"
            type="email"
            required
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            label="Contraseña"
            type="password"
            required
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            label="Confirmar Contraseña"
            type="password"
            required
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...field}
          />
        )}
      />

      <Box sx={{ mt: 3 }}>
        <CustomTitle
          variant="h6"
          align="left"
          text="Preferencias alimenticias"
        />
        <Grid container spacing={2}>
          {dietaryOptions.map((option) => (
            <Grid size={{ xs: 12, md: 6 }} key={option.value}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={(watch("preferences") ?? []).includes(
                      option.value
                    )}
                    onChange={() => handleCheckboxChange(option.value)}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    sx={{
                      color: "#77A787",
                      "&.Mui-checked": { color: "#77A787" },
                    }}
                  />
                }
                label={option.label}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <CustomButton
        text="REGISTRAR"
        type="submit"
        fullWidth
        isLoading={isPending}
      />
    </Box>
  );
}

import { Typography } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyAccount } from "@/modules/auth/hooks/useVerifyAccount";
import { useCreateClient } from "@/modules/client/hooks/useCreateClient";
import { usePendingRegistrationStore } from "@/modules/users/hooks/usePendingRegistrationStore";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore";
import {
  getProfileImageFile,
  clearProfileImage,
} from "@/shared/utils/profileImage";

export function ActivateAccountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showMessage = useSnackbarStore((state) => state.showMessage);

  const { mutate: verifyAccount, isPending: isVerifying } = useVerifyAccount();
  const { mutate: createClient, isPending: isCreatingClient } =
    useCreateClient();

  const { clientData, clearData } = usePendingRegistrationStore();

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const handleVerify = async () => {
    if (!userId || !token) return;

    verifyAccount(
      { userId, token },
      {
        onSuccess: async () => {
          showMessage("Tu cuenta ha sido verificada correctamente.", "success");

          if (!clientData) {
            navigate("/auth/login", { replace: true });
            return;
          }

          const imageFile = await getProfileImageFile();

          const payload = { ...clientData.createClientRequest, userId };
          createClient({
            createClientRequest: payload,
            profilePicture: imageFile,
          });

          clearData();
          clearProfileImage();
          navigate("/auth/login", { replace: true });
        },
      }
    );
  };

  return (
    <>
      <CustomTitle text="Welcome to RescueBites!" />
      <Typography variant="body1" sx={{ color: "#555", mb: 3 }}>
        Estamos encantados de que te unas a nuestra comunidad. Haz clic en el
        botón de abajo para activar tu cuenta y comenzar a explorar todo lo que
        hemos preparado para ti.
      </Typography>

      <CustomButton
        type="submit"
        text="Activate account"
        onClick={handleVerify}
        disabled={isVerifying || isCreatingClient || !userId || !token}
        isLoading={isVerifying || isCreatingClient}
        fullWidth
      />
    </>
  );
}

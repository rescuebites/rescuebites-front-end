import { Box, Avatar } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useClientProfile } from "../hooks/useClientProfile";
import { useDeleteClient } from "../hooks/useDeleteClient";
import { useNavigate } from "react-router-dom";
import CustomTitle from "@/shared/components/CustomTitle";
import ProfileInfoItem from "../components/ProfileInfoItem";
import ProfileSection from "../components/ProfileSection";
import ProfileActionButton from "../components/ProfileActionButton";
import PreferenceChip from "../components/PreferenceChip";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";
import { useState } from "react";
import { formatDate } from "@/shared/utils/dateFormat";
import BackButton from "@/shared/components/ui/BackButton";

export default function ClientProfilePage() {
  const { clientId, logout } = useAuthStore();
  const { data: client, isLoading } = useClientProfile(clientId);
  const { mutate: deleteClient, isPending: isDeleting } = useDeleteClient();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleDeleteAccount = () => {
    if (clientId) {
      deleteClient(clientId);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!client) {
    return <EmptyState message="No se pudo cargar el perfil" />;
  }

  return (
    <Box
      sx={{
        bgcolor: "#FAFAFA",
      }}
    >
      <Box sx={{ px: 3, pt: 3 }}>
        <Box
          sx={{
            position: "relative",
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: { xs: 8, sm: 16 },
              top: { xs: -8, sm: -12 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <BackButton />
          </Box>

          {/* Imagen de perfil y nombre del cliente */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={client.image?.url}
              sx={{
                width: 140,
                height: 140,
                mb: 2,
                border: "4px solid #FFFFFF",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <CustomTitle
              text={`${client.firstName} ${client.lastName}`}
              color="#2D2D2D"
              variant="h4"
            />
          </Box>
        </Box>

        {/* Sección de Información Personal */}
        <ProfileSection title="Información Personal">
          <ProfileInfoItem
            icon={<CakeIcon />}
            label="Fecha de Nacimiento"
            value={formatDate(client.birthDate)}
          />
          <ProfileInfoItem
            icon={<LocationOnIcon />}
            label="Dirección"
            value={client.address + " - " + client.locality}
          />
          <ProfileInfoItem
            icon={<PhoneIcon />}
            label="Celular"
            value={client.phone}
          />
        </ProfileSection>

        {/* Sección de Usuario */}
        <ProfileSection title="Usuario">
          <ProfileInfoItem
            icon={<EmailIcon />}
            label="Email"
            value={client.user.email}
          />
        </ProfileSection>

        {/* Sección de Preferencias */}
        <ProfileSection title="Preferencias">
          <Box display="flex" flexWrap="wrap" gap={1}>
            {client.preferences.map((preference) => (
              <PreferenceChip key={preference} preference={preference} />
            ))}
          </Box>
        </ProfileSection>

        {/* Sección de Acciones */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <ProfileActionButton
            icon={<EditIcon />}
            label="Modificar perfil"
            onClick={() => navigate("/auth/edit-client-profile")}
          />

          <ProfileActionButton
            icon={<LogoutIcon />}
            label="Cerrar sesión"
            onClick={handleLogout}
          />

          <ProfileActionButton
            icon={<DeleteIcon />}
            label="Eliminar cuenta"
            onClick={() => setShowDeleteModal(true)}
            iconBgColor="#FEE2E2"
            iconColor="#EF4444"
            textColor="#EF4444"
            hoverBgColor="#FEF2F2"
            showBorder={false}
          />
        </Box>
      </Box>

      <ConfirmModal
        open={showDeleteModal}
        title="¿Eliminar cuenta?"
        description="Esta acción es irreversible. Se eliminarán todos tus datos y no podrás recuperar tu cuenta."
        confirmText={isDeleting ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteModal(false)}
        variant="danger"
      />
    </Box>
  );
}

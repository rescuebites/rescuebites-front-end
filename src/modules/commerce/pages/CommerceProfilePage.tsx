import { useState } from "react";
import { Box, Avatar } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import useCommerceDetail from "@/modules/commerce/hooks/useCommerceDetail";
import { useDeleteCommerce } from "@/modules/commerce/hooks/useDeleteCommerce";
import { useNavigate } from "react-router-dom";
import CustomTitle from "@/shared/components/CustomTitle";
import ProfileInfoItem from "@/modules/client/components/ProfileInfoItem";
import ProfileSection from "@/modules/client/components/ProfileSection";
import ProfileActionButton from "@/modules/client/components/ProfileActionButton";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";
import ImageCarouselModal from "@/modules/commerce/components/ImageCarouselModal";
import CommerceTypeChip from "@/modules/commerce/components/CommerceTypeChip";
import { DAY_ORDER } from "@/modules/commerce/utils/constants";
import BusinessHourRow from "@/modules/commerce/components/BusinessHourRow";

export default function CommerceProfilePage() {
  const { commerceId, logout } = useAuthStore();
  const { data: commerce, isLoading } = useCommerceDetail(commerceId);
  const { mutate: deleteCommerce, isPending: isDeleting } = useDeleteCommerce();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleDeleteAccount = () => {
    if (commerceId) {
      deleteCommerce(commerceId);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!commerce) {
    return <EmptyState message="No se pudo cargar el perfil" />;
  }

  const images = commerce.images ?? [];
  const mainImage = images[0]?.url;

  return (
    <Box sx={{ bgcolor: "#FAFAFA", pb: 10 }}>
      <Box sx={{ px: 3, pt: 3 }}>
        {/* Imagen de perfil y nombre del comercio */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={mainImage}
            onClick={() => images.length > 0 && setShowCarousel(true)}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: "4px solid #FFFFFF",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: images.length > 1 ? "pointer" : "default",
            }}
          />
          <CustomTitle text={commerce.name} color="#2D2D2D" variant="h5" />
        </Box>

        {/* Sección de Información */}
        <ProfileSection title="Información">
          <ProfileInfoItem
            icon={<PhoneIcon />}
            label="Teléfono"
            value={commerce.phone}
          />
          <ProfileInfoItem
            icon={<LocationOnIcon />}
            label="Dirección"
            value={commerce.address + " - " + commerce.locality}
          />
          <ProfileInfoItem
            icon={<DescriptionIcon />}
            label="Descripción"
            value={commerce.description || "-"}
          />
          <Box mb={2}>
            <CustomTitle
              text="Tipo de comercio"
              color="#9CA3AF"
              variant="body2"
              align="left"
              fontWeight={500}
              fontSize={12}
            />
            <Box display="flex" flexWrap="wrap" gap={1} mt={0.5}>
              {commerce.commerceTypes.map((type) => (
                <CommerceTypeChip key={type} commerceType={type} />
              ))}
            </Box>
          </Box>
        </ProfileSection>

        {/* Sección de Cuenta */}
        <ProfileSection title="Cuenta">
          <ProfileInfoItem
            icon={<EmailIcon />}
            label="Email"
            value={commerce.email}
          />
        </ProfileSection>

        {/* Sección de Horarios */}
        <ProfileSection title="Horarios">
          {[...commerce.businessHours]
            .sort((a, b) => DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek))
            .map((bh) => (
              <BusinessHourRow key={bh.dayOfWeek} bh={bh} />
            ))}
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
            onClick={() => navigate("/commerce/edit-commerce-profile")}
          />

          <ProfileActionButton
            icon={<LogoutIcon />}
            label="Cerrar sesión"
            onClick={() => setShowLogoutModal(true)}
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

      <ImageCarouselModal
        open={showCarousel}
        images={images}
        onClose={() => setShowCarousel(false)}
      />

      {/* Modal de confirmación de cerrar sesión */}
      <ConfirmModal
        open={showLogoutModal}
        title="¿Cerrar sesión?"
        description="¿Estás seguro de que querés cerrar sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      {/* Modal de confirmación de eliminación */}
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

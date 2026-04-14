import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import NotificationList from '../components/NotificationList';
import { UserRole } from '../interfaces/responses/Notification.response';
import CustomTitle from '@/shared/components/CustomTitle';

interface NotificationsPageProps {
  role: UserRole;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ role }) => {
  const { notifications, unreadCount, loading, error, handleMarkAllRead, handleMarkOneRead } =
    useNotifications(role);

  return (
    <Box
      sx={{
        maxWidth: 1600,
        mx: 'auto',
        px: 2,
        pt: 3,
        pb: 10,
        minHeight: '100vh',
        bgcolor: '#F5F5F5',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CustomTitle text="Actualizaciones" variant="h4" color="#2d2d2d"/>

          {unreadCount > 0 && (
            <Chip
              label={unreadCount}
              size="small"
              sx={{
                bgcolor: '#77a77c',
                color: '#fff',
                fontWeight: 700,
                height: 25,
                fontSize: '14px',
              }}
            />
          )}
        </Box>
        <Button
          variant="text"
          size="small"
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0 || loading}
          sx={{ color: '#77a77c', fontWeight: 600, textTransform: 'none', fontSize: '0.8rem' }}
        >
          Marcar todo como leído
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Role indicator (solo para demo) */}
      {/* <Chip
        label={role === 'CLIENT' ? '👤 Vista Cliente' : '🏪 Vista Comercio'}
        size="small"
        sx={{ mb: 2, bgcolor: '#E3F2FD', color: '#1565C0', fontWeight: 600 }}
      /> */}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Notification List */}
      <NotificationList
        notifications={notifications}
        loading={loading}
        onMarkOneRead={handleMarkOneRead}
      />

      {/* Empty state */}
      {!loading && notifications.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            No tenés notificaciones por el momento.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default NotificationsPage;
import React from 'react';
import { Box, Typography, Avatar, Tooltip } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { NotificationResponse } from '../interfaces/responses/notification.response';
import { getStatusConfig } from '../utils/NotificationConfig';
import { formatTimestamp } from '@/shared/utils/dateFormat';

interface NotificationItemProps {
  notification: NotificationResponse;
  onClick: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const { label, color, bgColor, Icon, defaultMessage } = getStatusConfig(notification.status);

  return (
    <Box
      onClick={() => onClick(notification.id)}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        p: 2,
        borderRadius: 3,
        mb: 1.5,
        bgcolor: notification.read ? '#FAFAFA' : '#FFFFFF',
        border: '1px solid',
        borderColor: notification.read ? '#dddddd' : '#c7c5c5',
        boxShadow: notification.read ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          transform: 'translateY(-1px)',
        },
        position: 'relative',
      }}
    >
      {/* Icon */}
      <Avatar
        sx={{
          bgcolor: bgColor,
          width: 70,
          height: 70,
          flexShrink: 0,
        }}
      >
        <Icon size={30} color={color} />
      </Avatar>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, color, fontSize: '25px' }}
          >
            {label}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, flexShrink: 0 }}>
            {!notification.read && (
              <Tooltip title="Marcar como leído" placement="left">
                <Box
                  onClick={(e) => { e.stopPropagation(); onClick(notification.id); }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.4,
                    px: 1,
                    py: 0.3,
                    borderRadius: '999px',
                    bgcolor: '#F0FAF0',
                    border: '1px solid #C8E6C9',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#C8E6C9' },
                  }}
                >
                  <CheckCircleOutline sx={{ fontSize: 14, color: '#4CAF50' }} />
                  <Typography sx={{ fontSize: '0.7rem', color: '#77a77c', fontWeight: 600, lineHeight: 1 }}>
                    Marcar como leído
                  </Typography>
                </Box>
              </Tooltip>
            )}
            <Typography variant="subtitle2" sx={{ color: '#9E9E9E' }}>
              {formatTimestamp(notification.timestamp)}
            </Typography>
          </Box>
        </Box>

        {(notification.orderId || notification.productName) && (
          <Typography variant="subtitle1" sx={{ color: '#757575', display: 'block' }}>
            {notification.orderId ? `Pedido #${notification.orderId}` : notification.productName}
          </Typography>
        )}

        <Typography
          variant="body2"
          sx={{ color: '#424242', mt: 0.3, fontSize: '18px', lineHeight: 1.4 }}
        >
          {defaultMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationItem;
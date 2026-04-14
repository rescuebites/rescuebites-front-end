import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { NotificationResponse } from '../interfaces/responses/notification.response';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: NotificationResponse[];
  loading: boolean;
  onMarkOneRead: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading,
  onMarkOneRead,
}) => {
  if (loading) {
    return (
      <Box>
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
            <Skeleton variant="circular" width={42} height={42} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="60%" height={16} />
              <Skeleton variant="text" width="90%" height={16} />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={onMarkOneRead}
        />
      ))}
    </Box>
  );
};

export default NotificationList;
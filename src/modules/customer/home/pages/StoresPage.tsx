import { useParams } from 'react-router-dom';
import CommerceDetailDialog from '../components/CommerceDetailDialog';
import { Box, CircularProgress } from '@mui/material';

export default function StoresPage() {
  const { commerceId } = useParams<{ commerceId: string }>();

  if (!commerceId) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#77A787' }} />
      </Box>
    );
  }

  return <CommerceDetailDialog commerceId={commerceId} />;
}
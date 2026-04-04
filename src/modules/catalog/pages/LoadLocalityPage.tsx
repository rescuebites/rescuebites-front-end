import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Autocomplete,
  Box,
} from '@mui/material';
import { MdLocationOn } from 'react-icons/md';
import Header from '@/shared/components/layout/Header';
import { useLocalityStore } from '@/modules/customer/home/hooks/useLocalityStore';
import { localities } from '../constants/localitiesList';

interface LocationCardProps {
  onLocationSubmit: (locality: string) => void;
}


function LocationCard({ onLocationSubmit }: LocationCardProps) {
  const [selectedLocality, setSelectedLocality] = useState<string>('');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (selectedLocality.trim()) {
      onLocationSubmit(selectedLocality);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && selectedLocality.trim()) {
      handleSubmit();
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {/* Header normal */}
        <Box
            sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            overflow: "auto",
            pb: "56px"
            }}
        >
            <Header />
        </Box>

        {/* Fondo con imagen */}
        <Box
            sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/fondo1Localidad.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            zIndex: 0,
            }}
        />

        {/* Overlay semi-transparente del fondo */}
        <Box
            sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(3px)',
            zIndex: 1,
            }}
        />

        {/* Contenedor de la card centrada */}
        <Box
            sx={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            zIndex: 2,
            }}
        >
            <Card
            elevation={0}
            sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                width: '100%',
                maxWidth: 380,
                textAlign: 'center',
                position: 'relative',
                zIndex: 3,
            }}
            >
            {/* Título */}
            <Typography
                variant="h4"
                sx={{
                fontWeight: 700,
                color: '#2D2D2D',
                mb: 1,
                fontSize: { xs: 28, sm: 32, md: 36 },
                }}
            >
                ¡Hola!
            </Typography>

            {/* Subtítulo */}
            <Typography
                sx={{
                color: '#77A787',
                fontSize: { xs: 16, sm: 18, md: 22 },
                mb: 3,
                fontWeight: 500,
                }}
            >
                Ayudanos a encontrar las mejores ofertas para ti
            </Typography>

            {/* Campo de localidad con autocomplete */}
            <Autocomplete
                value={selectedLocality}
                onChange={(_, newValue) => {
                setSelectedLocality(newValue || '');
                }}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
                }}
                options={localities}
                freeSolo
                renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Ingrese su localidad"
                    onKeyPress={handleKeyPress}
                    sx={{
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                        bgcolor: '#F8F9FA',
                        borderRadius: 2,
                        '& fieldset': {
                        borderColor: '#E0E0E0',
                        },
                        '&:hover fieldset': {
                        borderColor: '#77A787',
                        },
                        '&.Mui-focused fieldset': {
                        borderColor: '#77A787',
                        borderWidth: 2,
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        py: 1.5,
                        fontSize: 16,
                    },
                    }}
                    InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                        <InputAdornment position="start">
                        <MdLocationOn size={24} color="#77A787" />
                        </InputAdornment>
                    ),
                    }}
                />
                )}
            />

            {/* Botón */}
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!selectedLocality.trim()}
                sx={{
                bgcolor: '#77A787',
                color: '#FFFFFF',
                py: 1.5,
                px: 4,
                borderRadius: 2,
                fontSize: { xs: 20, sm: 22, md: 24 },
                fontWeight: 600,
                textTransform: 'none',
                width: '100%',
                boxShadow: '0 4px 12px rgba(119, 167, 135, 0.3)',
                '&:hover': {
                    bgcolor: '#6B9A7B',
                    boxShadow: '0 6px 16px rgba(119, 167, 135, 0.4)',
                },
                '&:disabled': {
                    bgcolor: '#E0E0E0',
                    color: '#9E9E9E',
                    boxShadow: 'none',
                },
                transition: 'all 0.2s ease',
                }}
            >
                Ver catálogo
            </Button>
            </Card>
        </Box>
    </Box>
  );
}

export default function LoadLocalityPage() {
  const navigate = useNavigate();
  const { setLocality } = useLocalityStore();

  const handleLocationSubmit = (locality: string) => {
    setLocality(locality);
    navigate('/');
  };

  return <LocationCard onLocationSubmit={handleLocationSubmit} />;
}

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material';
import {
  LocationOn,
  Schedule,
  Phone,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';

import { ProductResponse } from '../interfaces/responses';
import { useCommerceDetail } from '../hooks/useCommerces';
import { useProducts } from '../hooks/useProducts';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

interface CommerceDetailDialogProps {
  commerceId: string;
}

const CommerceDetailDialog: React.FC<CommerceDetailDialogProps> = ({ commerceId }) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Obtener detalles del comercio
  const { data: commerce, isLoading: isLoadingCommerce } = useCommerceDetail(commerceId);
  
  // Obtener productos del comercio específico
  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    commerceId,
    size: 50, // Traer más productos para el catálogo completo
  });

  const handleSortChange = (event: SelectChangeEvent<SortOption>): void => {
    setSortBy(event.target.value as SortOption);
  };

  // Función para ordenar productos
  const getSortedProducts = (products: ProductResponse[]) => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
      case 'price-high':
        return sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
      default:
        return sorted; // Ya vienen ordenados por más nuevo desde el backend
    }
  };

  // Loading state
  if (isLoadingCommerce || isLoadingProducts) {
    return (
      <Box
        sx={{
          backgroundColor: '#FAFAFA',
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

  // Error state
  if (!commerce || !productsData) {
    return (
      <Box
        sx={{
          backgroundColor: '#FAFAFA',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color="error">Error al cargar la información del comercio</Typography>
      </Box>
    );
  }

  // Extraer productos del PaginatedResponse
  const products = getSortedProducts(productsData.content || []);

  return (
    <Box
      sx={{
        backgroundColor: '#FAFAFA',
        minHeight: '100vh',
        pb: { xs: 4, md: 4 },
      }}
    >
      <Box
        sx={{
          pt: { xs: 5, sm: 7, md: 10, lg: 12 },
          px: { xs: 3, sm: 3, md: 5 },
          maxWidth: { xs: '100%', md: '1400px' },
          mx: 'auto',
        }}
      >
        {/* Restaurant Header Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: { xs: 3, sm: 3, md: 5 },
            mb: { xs: 3, sm: 3, md: 10 },
          }}
        >
          <Avatar
            src={commerce.images?.[0]?.url || ''}
            sx={{
              width: { xs: 150, sm: 200, md: 270, lg: 250 },
              height: { xs: 150, sm: 200, md: 270, lg: 250 },
              backgroundColor: '#77A787',
              flexShrink: 0,
              fontSize: { xs: 55, sm: 55, md: 100, lg: 65 },
            }}
          >
            {!commerce.images?.[0]?.url && (
              <RestaurantIcon sx={{ fontSize: 'inherit' }} />
            )}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 34, sm: 60, md: 80, lg: 70 },
                mb: { xs: 1.2, sm: 1.2, md: 3, lg: 3 },
                lineHeight: 1.2,
                color: '#2D2D2D',
              }}
            >
              {commerce.name}
            </Typography>

            {commerce.description && (
              <Typography
                variant="body1"
                sx={{
                  color: '#757575',
                  fontSize: { xs: 22, sm: 26, md: 35, lg: 30 },
                  mb: 4,
                  lineHeight: 1,
                }}
              >
                {commerce.description}
              </Typography>
            )}

            <Chip
              label={commerce.commerceTypes?.[0] || 'Comercio'}
              size="medium"
              icon={<RestaurantIcon sx={{ fontSize: { xs: 22, sm: 22, md: 30, lg: 30 } }} />}
              sx={{
                backgroundColor: '#E8F5E9',
                color: '#77A787',
                fontSize: { xs: 22, sm: 22, md: 36, lg: 30 },
                fontWeight: 600,
                height: { xs: 34, sm: 34, md: 50, lg: 36 },
                px: { xs: 2, md: 2 },
              }}
            />
          </Box>
        </Box>

        {/* Contact Information Card */}
        <Card
          sx={{
            mb: { xs: 5.1, sm: 5.1 },
            borderRadius: { xs: 4, md: 4 },
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            p: { xs: 3, sm: 3, md: 4, lg: 2 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2, sm: 2, md: 2 },
            }}
          >
            {/* Dirección */}
            {commerce.address && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 2 } }}>
                <LocationOn sx={{ fontSize: { xs: 26, sm: 32, md: 40, lg: 35 }, color: '#757575' }} />
                <Typography variant="body2" sx={{ color: '#757575', fontSize: { xs: 18, sm: 26, md: 34, lg: 30 } }}>
                  {commerce.address}
                  {commerce.locality && `, ${commerce.locality}`}
                </Typography>
              </Box>
            )}

            {/* Horario */}
            {commerce.openingHours && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 2 } }}>
                <Schedule sx={{ fontSize: { xs: 26, sm: 32, md: 28, lg: 30 }, color: '#757575' }} />
                <Typography variant="body2" sx={{ color: '#757575', fontSize: { xs: 18, sm: 26, md: 34, lg: 30 } }}>
                  {commerce.openingHours}
                </Typography>
              </Box>
            )}

            {/* Teléfono */}
            {commerce.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 2 } }}>
                <Phone sx={{ fontSize: { xs: 26, sm: 26, md: 28, lg: 30 }, color: '#757575' }} />
                <Typography variant="body2" sx={{ color: '#757575', fontSize: { xs: 18, sm: 26, md: 34, lg: 30 } }}>
                  {commerce.phone}
                </Typography>
              </Box>
            )}
          </Box>
        </Card>

        {/* Catalog Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 3, sm: 3, md: 5 },
            px: { xs: 0, sm: 0.5 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 36, sm: 40, md: 62, lg: 55 },
              color: '#2D2D2D',
            }}
          >
            Catálogo
          </Typography>
          <FormControl size="medium" sx={{ minWidth: { xs: 200, sm: 200, md: 240 } }}>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              sx={{
                fontSize: { xs: 22, sm: 20, md: 25, lg: 25 },
                backgroundColor: 'white',
                borderRadius: 2,
                height: { xs: 50, sm: 50, md: 54 },
                '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #E0E0E0' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#77A787' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#77A787' },
              }}
            >
              <MenuItem value="newest" sx={{ fontSize: { xs: 18, sm: 18, md: 22, lg: 20 } }}>
                Ordenar por: Más nuevo
              </MenuItem>
              <MenuItem value="price-low" sx={{ fontSize: { xs: 18, sm: 18, md: 22, lg: 20 } }}>
                Precio: De menor a mayor
              </MenuItem>
              <MenuItem value="price-high" sx={{ fontSize: { xs: 18, sm: 18, md: 22, lg: 20 } }}>
                Precio: De mayor a menor
              </MenuItem>
              <MenuItem value="name" sx={{ fontSize: { xs: 18, sm: 18, md: 22, lg: 20 } }}>
                Nombre: A-Z
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Menu Items */}
        {products.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography color="text.secondary" fontSize={{ xs: 18, md: 24 }}>
              Este comercio aún no tiene productos disponibles
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr', lg: 'repeat(2, 1fr)' },
              gap: { xs: 3, sm: 3, md: 5 },
            }}
          >
            {products.map((item: ProductResponse) => (
              <ProductCard key={item.productId} product={item} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Componente separado para las tarjetas de producto
function ProductCard({ product }: { product: ProductResponse }) {
  // Calcular días hasta vencimiento
  const getDaysUntilExpiration = (expirationDate: string): number => {
    const exp = new Date(expirationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    exp.setHours(0, 0, 0, 0);
    const ms = exp.getTime() - today.getTime();
    const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  };

  const daysUntilExpiration = product.expirationDate
    ? getDaysUntilExpiration(product.expirationDate)
    : null;

  return (
    <Card
      sx={{
        borderRadius: { xs: 4, md: 10 },
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'visible',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        '&:hover': {
          transform: { md: 'translateY(-2px)' },
          boxShadow: { md: '0 4px 12px rgba(0,0,0,0.12)' },
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 3, md: 3.5 } }}>
        <Box sx={{ display: 'flex', gap: { xs: 3, sm: 3, md: 3.5 } }}>
          {/* Product Image */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: 200, sm: 200, md: 280, lg: 200 },
              height: { xs: 200, sm: 200, md: 300, lg: 200 },
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 5,
                objectFit: 'cover',
                objectPosition: '70%',
              }}
              image={product.images?.[0]?.url || '/placeholder.jpg'}
              alt={product.name}
            />
            {product.discountPercentage > 0 && (
              <Chip
                label={`${Math.round(product.discountPercentage)}%`}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  backgroundColor: '#d9905a',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: 24, sm: 26, md: 36, lg: 30 },
                  height: { xs: 30, sm: 32, md: 40, lg: 32 },
                  minWidth: { xs: 44, sm: 48, md: 48 },
                }}
              />
            )}
          </Box>

          {/* Product Details */}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 28, sm: 35, md: 55, lg: 50 },
                mb: { xs: 2.5, sm: 1.5, md: 1.5 },
                color: '#2D2D2D',
                lineHeight: 1.3,
              }}
            >
              {product.name}
            </Typography>

            {/* Prices */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: { xs: 2.5, sm: 2.5, md: 2.5 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 24, sm: 30, md: 46, lg: 30 },
                  color: '#77A787',
                }}
              >
                ${product.discountedPrice.toFixed(2)}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    color: '#999',
                    fontSize: { xs: 18, sm: 22, md: 34, lg: 26 },
                  }}
                >
                  ${product.originalPrice.toFixed(2)}
                </Typography>
              )}
            </Box>

            {/* Status Chips */}
            <Box sx={{ display: 'flex', gap: { xs: 1.7, sm: 3, md: 3 }, flexWrap: 'wrap' }}>
              {daysUntilExpiration !== null && (
                <Chip
                  label={`Expires in ${daysUntilExpiration} ${daysUntilExpiration === 1 ? 'day' : 'days'}`}
                  size="small"
                  sx={{
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    fontSize: { xs: 22, sm: 24, md: 35, lg: 20 },
                    height: { xs: 32, sm: 32, md: 50, lg: 36 },
                    fontWeight: 600,
                    '& .MuiChip-label': { px: { xs: 2.5, md: 2.5 } },
                  }}
                />
              )}
              <Chip
                label={`${product.stock} Left`}
                size="small"
                sx={{
                  backgroundColor: '#fff3e0',
                  color: '#bc544b',
                  fontSize: { xs: 13, sm: 16, md: 30, lg: 14 },
                  height: { xs: 28, sm: 28, md: 38, lg: 30 },
                  fontWeight: 700,
                  '& .MuiChip-label': { px: { xs: 2.5, md: 2.5 } },
                }}
              />
              {/* Chip de categoría */}
              {product.category && (
                <Chip
                  label={product.category}
                  size="small"
                  sx={{
                    backgroundColor: '#E8F5E9',
                    color: '#77A787',
                    fontSize: { xs: 12, sm: 16, md: 30, lg: 14 },
                    height: { xs: 26, sm: 26, md: 38, lg: 30 },
                    fontWeight: 600,
                    '& .MuiChip-label': { px: { xs: 2.5, md: 2.5 } },
                  }}
                />
              )}
              {/* Chip de condición */}
              {product.condition && (
                <Chip
                  label={product.condition}
                  size="small"
                  sx={{
                    backgroundColor: '#E3F2FD',
                    color: '#1976D2',
                    fontSize: { xs: 12, sm: 16, md: 30, lg: 14 },
                    height: { xs: 26, sm: 26, md: 38, lg: 30 },
                    fontWeight: 600,
                    '& .MuiChip-label': { px: { xs: 2.5, md: 2.5 } },
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CommerceDetailDialog;
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
} from '@mui/material';
import {
  LocationOn,
  Schedule,
  Phone,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';

import {Store, Product} from '../../../customer/home/interfaces/types';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

// Component
const CommerceDetailDialog: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const restaurantInfo: Store = {
    name: 'Brizha Restaurant',
    subtitle: 'Authentic local flavors.',
    location: 'San Luis 1234, Villa María',
    schedule: 'Open 10-13hs & 17-23hs',
    phoneNumber: '351 - 3489526',
  };

  const menuItems: Product[] = [
    {
      productId: '1',
      name: 'Pasta Salad',
      discountedPrice: 13.50,
      originalPrice: 30.00,
      imageUrls: ['https://www.recipetineats.com/uploads/2024/08/Big-easy-pasta-salad_2.jpg'],
      expirationDate: '2',
      stock: 6,
      tags: ['vegano'],
      discountPercentage: 55,
    },
    {
      productId: '2',
      name: 'Origen Café',
      discountedPrice: 25.00,
      originalPrice: 60.00,
      imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL9dqlIDUpgxji2fNmxuKnEShV7YeiW8imQ&s'],
      expirationDate: '2',
      stock: 6,
      tags: ['vegano'],
      discountPercentage: 58,
    },
  ];

  const handleSortChange = (event: SelectChangeEvent<SortOption>): void => {
    setSortBy(event.target.value as SortOption);
  };

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
          pt: { xs: 3, sm: 3, md: 4 },
          px: { xs: 3, sm: 3, md: 4 },
          maxWidth: { xs: '100%', md: '1400px' },
          mx: 'auto',
        }}
      >
        {/* Restaurant Header Card */}
        <Card
          sx={{
            mb: { xs: 5.1, sm: 5.1 },
            borderRadius: { xs: 4, md: 4 },
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            p: { xs: 3, sm: 3, md: 4 },
          }}
        >
          {/* Restaurant Header Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: { xs: 3, sm: 3, md: 3.5 },
              mb: { xs: 3, sm: 3, md: 3.5 },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 200, sm: 130, md: 140, lg: 150 },
                height: { xs: 200, sm: 130, md: 140, lg: 150 },
                backgroundColor: '#77A787',
                flexShrink: 0,
              }}
            >
              <RestaurantIcon sx={{ fontSize: { xs: 50, sm: 50, md: 55, lg: 65 } }} />
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 32, sm: 32, md: 34, lg: 40 },
                  mb: { xs: 1.2, sm: 1.2, md: 1.25 },
                  lineHeight: 1.2,
                  color: '#2D2D2D',
                }}
              >
                {restaurantInfo.name}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#757575',
                  fontSize: { xs: 20, sm: 20, md: 22, lg: 24 },
                  mb: 0.5,
                  lineHeight: 1.4,
                }}
              >
                {restaurantInfo.subtitle}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#757575',
                  fontSize: { xs: 17, sm: 17, md: 18, lg: 20 },
                  mb: { xs: 1.5, sm: 1.5, md: 2, lg: 2.5 },
                  lineHeight: 1.4,
                }}
              >
                {restaurantInfo.subtitle}
              </Typography>

              <Chip
                label="Restaurant"
                size="medium"
                icon={<RestaurantIcon sx={{ fontSize: { xs: 18, sm: 18, md: 20 } }} />}
                sx={{
                  backgroundColor: '#E8F5E9',
                  color: '#77A787',
                  fontSize: { xs: 17, sm: 17, md: 18, lg: 22 },
                  fontWeight: 600,
                  height: { xs: 34, sm: 34, md: 36 },
                  px: { xs: 2, md: 2 },
                }}
              />
            </Box>
          </Box>

          {/* Contact Information */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2, sm: 2, md: 2 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 2 } }}>
              <LocationOn sx={{ fontSize: { xs: 26, sm: 26, md: 28, lg: 30 }, color: '#757575' }} />
              <Typography variant="body2" sx={{ color: '#757575', fontSize: { xs: 18, sm: 18, md: 19, lg: 23 } }}>
                {restaurantInfo.location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 2 } }}>
              <Schedule sx={{ fontSize: { xs: 26, sm: 26, md: 28, lg: 30 }, color: '#757575' }} />
              <Typography variant="body2" sx={{ color: '#757575', fontSize: { xs: 18, sm: 18, md: 19, lg: 23 } }}>
                {restaurantInfo.schedule}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 2 } }}>
              <Phone sx={{ fontSize: { xs: 26, sm: 26, md: 28, lg: 30 }, color: '#757575' }} />
              <Typography variant="body2" sx={{ color: '#757575', fontSize: { xs: 18, sm: 18, md: 19, lg: 23 } }}>
                {restaurantInfo.phoneNumber}
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Catalog Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 3, sm: 3, md: 3.5 },
            px: { xs: 0, sm: 0.5 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 24, sm: 24, md: 26, lg: 30 },
              color: '#2D2D2D',
            }}
          >
            Catálogo
          </Typography>
          <FormControl size="small" sx={{ minWidth: { xs: 200, sm: 200, md: 210 } }}>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              sx={{
                fontSize: { xs: 16, sm: 18, md: 18, lg: 20 },
                backgroundColor: 'white',
                borderRadius: 2,
                height: { xs: 50, sm: 50, md: 54 },
                '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #E0E0E0' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#77A787' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#77A787' },
              }}
            >
              <MenuItem value="Más nuevo" sx={{ fontSize: { xs: 14, sm: 14, md: 15 } }}>Sort by: Newest</MenuItem>
              <MenuItem value="Precio más bajo" sx={{ fontSize: { xs: 14, sm: 14, md: 15 } }}>Price: Low to High</MenuItem>
              <MenuItem value="Precio más alto" sx={{ fontSize: { xs: 14, sm: 14, md: 15 } }}>Price: High to Low</MenuItem>
              <MenuItem value="Nombre A-Z" sx={{ fontSize: { xs: 14, sm: 14, md: 15 } }}>Name: A-Z</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Menu Items */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr', lg: 'repeat(2, 1fr)' },
            gap: { xs: 3, sm: 3, md: 3.5 },
          }}
        >
          {menuItems.map((item: Product) => (
            <Card
              key={item.productId}
              sx={{
                borderRadius: { xs: 4, md: 4 },
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'visible',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: { md: 'translateY(-2px)' },
                  boxShadow: { md: '0 4px 12px rgba(0,0,0,0.12)' },
                },
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 3, md: 3.5 } }}>
                <Box sx={{ display: 'flex', gap: { xs: 3, sm: 3, md: 3.5 } }}>

                  <Box
                    sx={{
                      position: 'relative',
                      width: { xs: 175, sm: 175, md: 175, lg: 200 },
                      height: { xs: 175, sm: 175, md: 175, lg: 200 },
                      flexShrink: 0,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: '100%', height: '100%', borderRadius: 2, objectFit: 'cover' }}
                      image={item.imageUrls[0]}
                      alt={item.name}
                    />
                    <Chip
                      label={`${item.discountPercentage}%`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        left: -10,
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: 24, sm: 24, md: 24, lg: 30 },
                        height: { xs: 30, sm: 30, md: 32 },
                        minWidth: { xs: 46, sm: 46, md: 48 },
                      }}
                    />
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 24, sm: 24, md: 24, lg: 30 },
                        mb: { xs: 2.5, sm: 2.5, md: 2.5 },
                        color: '#2D2D2D',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: { xs: 2.5, sm: 2.5, md: 2.5 } }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, fontSize: { xs: 24, sm: 24, md: 24, lg: 30 }, color: '#77A787' }}
                      >
                        ${item.discountedPrice.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: '#999', fontSize: { xs: 22, sm: 22, md: 22, lg: 26 } }}
                      >
                        ${item.originalPrice.toFixed(2)}
                      </Typography>
                    </Box>

                    {/* Status Chips */}
                    <Box sx={{ display: 'flex', gap: { xs: 1.7, sm: 1.7, md: 1.7 }, flexWrap: 'wrap' }}>
                      <Chip
                        label={`Expires in ${item.expirationDate} days`}
                        size="small"
                        sx={{
                          backgroundColor: '#ffebee',
                          color: '#c62828',
                          fontSize: { xs: 16, sm: 16, md: 16, lg: 20 },
                          height: { xs: 32, sm: 32, md: 32, lg: 36 },
                          fontWeight: 600,
                          '& .MuiChip-label': { px: { xs: 2.5, md: 2.5 } },
                        }}
                      />
                      <Chip
                        label={`${item.stock} Left`}
                        size="small"
                        sx={{
                          backgroundColor: '#fff3e0',
                          color: '#e65100',
                          fontSize: { xs: 13, sm: 13, md: 13, lg: 14 },
                          height: { xs: 28, sm: 28, md: 28 },
                          fontWeight: 600,
                          '& .MuiChip-label': { px: { xs: 2.5, md: 2.5 } },
                        }}
                      />
                      {item.tags?.map((tag: string) => ( //ver acaa ----------------------------------------
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: '#E8F5E9',
                            color: '#77A787',
                            fontSize: { xs: 12, sm: 12, md: 12, lg: 14 },
                            height: { xs: 26, sm: 26, md: 28 },
                            fontWeight: 600,
                            '& .MuiChip-label': { px: { xs: 2.5, md: 2.5 } },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CommerceDetailDialog;
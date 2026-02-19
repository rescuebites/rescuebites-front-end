// src/modules/customer/components/FilterDrawer.tsx

import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slide,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import { forwardRef } from 'react';
import { useFilterStore } from '../useFilterStore';
import {
  PreferenceType,
  PREFERENCE_LABELS,
  CATEGORY_LABELS,
  CATEGORY_GROUPS,
} from '../interfaces/filter.interface';

// Transición para el modal (slide desde abajo en mobile)
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FilterDrawer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detecta si es mobile

  const {
    permanentPreferences,
    temporaryPreferences,
    categories,
    isFilterDrawerOpen,
    closeFilterDrawer,
    toggleTemporaryPreference,
    toggleCategory,
    clearTemporaryFilters,
    getActiveFiltersCount,
  } = useFilterStore();

  const activeFiltersCount = getActiveFiltersCount();

  const handleClearAll = () => {
    clearTemporaryFilters();
  };

  const handleApply = () => {
    closeFilterDrawer();
    // Aquí puedes llamar a la API para filtrar productos
  };

  return (
    <Dialog
      fullScreen={isMobile}
      open={isFilterDrawerOpen}
      onClose={closeFilterDrawer}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          ...(isMobile ? {} : {
            maxWidth: 600,
            width: '100%',
            maxHeight: '90vh',
            borderRadius: 3,
          }),
        },
      }}
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: '#FAFAFA',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: isMobile ? '80%' : 'auto', maxHeight: isMobile ? '70vh' : '90vh' }}>
        {/* Header Fixed */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 7,
            bgcolor: '#FFF',
            borderBottom: '2px solid #E0E0E0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        >
          <Box
            sx={{
              p: isMobile ? 2 : 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography 
              variant="h2"
              sx={{ 
                fontWeight: 700, 
                fontSize: isMobile ? 28 : 28,
                color: '#2D2D2D',
              }}
            >
              Filtros
            </Typography>
            <IconButton 
              onClick={closeFilterDrawer} 
              size="large"
              sx={{
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                '& .MuiSvgIcon-root': {
                  fontSize: isMobile ? 24 : 32,
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Botón limpiar filtros cuando hay activos */}
          {activeFiltersCount > 0 && (
            <Box sx={{ px: isMobile ? 2 : 3, pb: isMobile ? 2 : 3 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClearAll}
                sx={{
                  color: '#77A787',
                  borderColor: '#77A787',
                  textTransform: 'none',
                  fontSize: isMobile ? 14 : 16,
                  fontWeight: 600,
                  py: isMobile ? 1 : 1.5,
                  borderRadius: 2,
                  borderWidth: isMobile ? 1 : 2,
                  '&:hover': {
                    backgroundColor: 'rgba(119, 167, 135, 0.08)',
                    borderColor: '#6B9677',
                    borderWidth: isMobile ? 1 : 2,
                  },
                }}
              >
                Limpiar todos los filtros
              </Button>
            </Box>
          )}
        </Box>

        {/* Content Scrollable */}
        <Box 
          sx={{ 
            flex: 1, 
            overflowY: 'auto',
            px: isMobile ? 2 : 3,
            pt: isMobile ? 2 : 3,
            pb: isMobile ? 2 : 3,
          }}
        >
          <Stack spacing={isMobile ? 2 : 3}>
            {/* Preferencias Alimenticias Permanentes */}
            {permanentPreferences.length > 0 && (
              <Box
                sx={{
                  bgcolor: '#FFF',
                  borderRadius: isMobile ? 2 : 3,
                  p: isMobile ? 2 : 3,
                  border: isMobile ? '1px solid #E0E0E0' : '1px solid #E0E0E0',
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={isMobile ? 1 : 1.5}
                  sx={{ mb: isMobile ? 2 : 2 }}
                >
                  <Typography
                    variant="h4"
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: isMobile ? 19 : 18,
                      color: '#2D2D2D',
                      lineHeight: 1,
                    }}
                  >
                    Tus preferencias alimenticias
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: isMobile ? 20 : 24,
                      height: isMobile ? 20 : 24,
                      borderRadius: '50%',
                      bgcolor: '#E8F5E9',
                      border: isMobile ? '3px solid #77A787' : '2px solid #77A787',
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isMobile ? 12 : 13,
                        fontWeight: 700,
                        color: '#77A787',
                      }}
                    >
                      i
                    </Typography>
                  </Box>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ 
                    color: '#757575', 
                    mb: isMobile ? 2 : 2.5, 
                    fontSize: isMobile ? 16 : 15,
                    lineHeight: 1.6,
                  }}
                >
                  Configuradas en tu perfil y siempre activas.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 1 : 1.5 }}>
                  {permanentPreferences.map((pref) => (
                    <Chip
                      key={pref}
                      icon={<LockIcon sx={{ fontSize: isMobile ? 16 : 18 }} />}
                      label={PREFERENCE_LABELS[pref]}
                      sx={{
                        bgcolor: '#E8F5E9',
                        color: '#2D6A4F',
                        fontWeight: 600,
                        fontSize: isMobile ? 14 : 15,
                        border: isMobile ? '3px solid #77A787' : '2px solid #77A787',
                        height: isMobile ? 35 : 40,
                        '& .MuiChip-icon': {
                          color: '#77A787',
                          ml: isMobile ? 1 : 1,
                        },
                        '& .MuiChip-label': {
                          px: isMobile ? 1.5 : 2,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Filtros Adicionales */}
            <Box>
              <Typography
                variant="h3"
                sx={{ 
                  fontWeight: 700, 
                  fontSize: isMobile ? 22 : 20,
                  mb: isMobile ? 2 : 3,
                  color: '#2D2D2D',
                }}
              >
                Filtros adicionales
              </Typography>

              {/* Preferencias temporales */}
              <Accordion
                defaultExpanded
                sx={{
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  bgcolor: '#FFF',
                  border: isMobile ? '3px solid #E0E0E0' : '1px solid #E0E0E0',
                  borderRadius: isMobile ? '12px !important' : '12px !important',
                  mb: isMobile ? 2 : 2,
                  overflow: 'hidden',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ fontSize: isMobile ? 16 : 28 }} />}
                  sx={{
                    minHeight: isMobile ? 35 : 56,
                    '& .MuiAccordionSummary-content': {
                      my: isMobile ? 1 : 1.5,
                    },
                    px: isMobile ? 1.5 : 2,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={isMobile ? 1 : 1.5}>
                    <Typography 
                      variant="h4"
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: isMobile ? 19 : 16,
                        color: '#2D2D2D',
                      }}
                    >
                      Preferencias alimenticias
                    </Typography>
                    {temporaryPreferences.length > 0 && (
                      <Box
                        sx={{
                          bgcolor: '#77A787',
                          color: '#FFF',
                          borderRadius: isMobile ? '14px' : '12px',
                          px: isMobile ? 1 : 1.5,
                          py: isMobile ? 1 : 0.5,
                          fontSize: isMobile ? 16 : 13,
                          fontWeight: 700,
                          minWidth: isMobile ? 20 : 24,
                          textAlign: 'center',
                        }}
                      >
                        {temporaryPreferences.length}
                      </Box>
                    )}
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ 
                  pt: 0, 
                  pb: isMobile ? 2 : 2,
                  px: isMobile ? 2 : 2,
                }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 2 : 1.5 }}>
                    {Object.values(PreferenceType).map((pref) => {
                      const isPermanent = permanentPreferences.includes(pref);
                      const isActive = temporaryPreferences.includes(pref);

                      return (
                        <Chip
                          key={pref}
                          label={PREFERENCE_LABELS[pref]}
                          onClick={() => !isPermanent && toggleTemporaryPreference(pref)}
                          disabled={isPermanent}
                          sx={{
                            bgcolor: isActive ? '#77A787' : '#F5F5F5',
                            color: isActive ? '#FFF' : '#2D2D2D',
                            fontWeight: 600,
                            fontSize: isMobile ? 14 : 15,
                            height: isMobile ? 35 : 40,
                            border: isActive 
                              ? (isMobile ? '1px solid #77A787' : '2px solid #77A787')
                              : (isMobile ? '1px solid #E0E0E0' : '2px solid #E0E0E0'),
                            cursor: isPermanent ? 'not-allowed' : 'pointer',
                            opacity: isPermanent ? 0.5 : 1,
                            transition: 'all 0.2s ease',
                            '& .MuiChip-label': {
                              px: isMobile ? 1.5 : 2,
                            },
                            '&:hover': !isPermanent
                              ? {
                                  bgcolor: isActive ? '#6B9677' : '#EEEEEE',
                                  transform: 'scale(1.02)',
                                }
                              : {},
                            '&:active': !isPermanent
                              ? {
                                  transform: 'scale(0.98)',
                                }
                              : {},
                          }}
                        />
                      );
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Categorías por grupo */}
              {Object.entries(CATEGORY_GROUPS).map(([key, group]) => (
                <Accordion
                  key={key}
                  sx={{
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                    bgcolor: '#FFF',
                    border: isMobile ? '1px solid #E0E0E0' : '1px solid #E0E0E0',
                    borderRadius: isMobile ? '10px !important' : '12px !important',
                    mb: isMobile ? 1 : 2,
                    overflow: 'hidden',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: isMobile ? 20 : 28 }} />}
                    sx={{
                      minHeight: isMobile ? 40 : 56,
                      '& .MuiAccordionSummary-content': {
                        my: isMobile ? 1 : 1.5,
                      },
                      px: isMobile ? 1.5 : 2,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={isMobile ? 1 : 1.5}>
                      <Typography 
                        variant="h4"
                        sx={{ 
                          fontWeight: 600, 
                          fontSize: isMobile ? 19 : 16,
                          color: '#2D2D2D',
                        }}
                      >
                        {group.title}
                      </Typography>
                      {group.categories.some((cat) => categories.includes(cat)) && (
                        <Box
                          sx={{
                            bgcolor: '#77A787',
                            color: '#FFF',
                            borderRadius: isMobile ? '10px' : '12px',
                            px: isMobile ? 1 : 1.5,
                            py: isMobile ? 0.7 : 0.5,
                            fontSize: isMobile ? 18 : 13,
                            fontWeight: 700,
                            minWidth: isMobile ? 16 : 24,
                            textAlign: 'center',
                          }}
                        >
                          {group.categories.filter((cat) => categories.includes(cat)).length}
                        </Box>
                      )}
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails sx={{ 
                    pt: 0, 
                    pb: isMobile ? 2 : 2,
                    px: isMobile ? 1.5 : 2,
                  }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 1 : 1.5 }}>
                      {group.categories.map((category) => {
                        const isActive = categories.includes(category);
                        return (
                          <Chip
                            key={category}
                            label={CATEGORY_LABELS[category]}
                            onClick={() => toggleCategory(category)}
                            sx={{
                              bgcolor: isActive ? '#77A787' : '#F5F5F5',
                              color: isActive ? '#FFF' : '#2D2D2D',
                              fontWeight: 600,
                              fontSize: isMobile ? 14 : 15,
                              height: isMobile ? 35 : 40,
                              border: isActive
                                ? (isMobile ? '1px solid #77A787' : '2px solid #77A787')
                                : (isMobile ? '1px solid #E0E0E0' : '2px solid #E0E0E0'),
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '& .MuiChip-label': {
                                px: isMobile ? 1.5 : 2,
                              },
                              '&:hover': {
                                bgcolor: isActive ? '#6B9677' : '#EEEEEE',
                                transform: 'scale(1.02)',
                              },
                              '&:active': {
                                transform: 'scale(0.98)',
                              },
                            }}
                          />
                        );
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Stack>
        </Box>

        {/* Footer Fixed con botón */}
        <Box
          sx={{
            position: isMobile ? 'fixed' : 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            p: isMobile ? 2 : 3,
            bgcolor: '#FFF',
            borderTop: isMobile ? '3px solid #E0E0E0' : '2px solid #E0E0E0',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
            zIndex: 10,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={handleApply}
            sx={{
              bgcolor: '#77A787',
              color: '#FFF',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: isMobile ? 18 : 17,
              py: isMobile ? 2 : 2,
              borderRadius: isMobile ? 2 : 2,
              boxShadow: '0 2px 8px rgba(119, 167, 135, 0.3)',
              '&:hover': {
                bgcolor: '#6B9677',
                boxShadow: '0 4px 12px rgba(119, 167, 135, 0.4)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            {activeFiltersCount > 0
              ? `Mostrar resultados (${activeFiltersCount} filtro${activeFiltersCount > 1 ? 's' : ''})`
              : 'Mostrar resultados'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
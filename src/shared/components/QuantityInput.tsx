import { Box, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface QuantityInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  register: ReturnType<UseFormRegister<any>>;
  error?: FieldError;
  label?: string;
  min?: number;
  buttonSx?: object;
  textFieldSx?: object;
}

export const QuantityInput = ({
  value,
  onIncrement,
  onDecrement,
  register,
  error,
  min = 1,
  buttonSx,
  textFieldSx,
}: QuantityInputProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Botón Restar */}
        <IconButton 
          onClick={onDecrement}
          disabled={value <= min}
          sx={{ border: '1px solid #ddd', borderRadius: 1, ...buttonSx }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        
        {/* Campo de texto editable*/}
        <TextField
          {...register}
          type="number"
          inputProps={{ 
            style: { textAlign: 'center' }, 
            min 
          }} 
          sx={{ 
            width: 60,
            '& input': { p: 1, height: 'auto' },
            mx: 1,
            ...textFieldSx,
            '& input[type=number]': {
              MozAppearance: 'textfield'
            },
            '& input[type=number]::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0
            },
            '& input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0
            }
          }}
          size="small"
          error={!!error}
        />
        
        {/* Botón Sumar */}
        <IconButton 
          onClick={onIncrement}
          sx={{ border: '1px solid #ddd', borderRadius: 1, ...buttonSx }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      
      {error && (
        <Typography color="error" variant="caption">
          {error.message}
        </Typography>
      )}
    </Box>
  );
};
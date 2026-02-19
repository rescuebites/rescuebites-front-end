import { TextField, InputAdornment, IconButton, Box, Badge } from "@mui/material";
import { useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import TuneIcon from "@mui/icons-material/Tune";
import { useFilterStore } from '../../../modules/customer/home/useFilterStore';


export default function SearchBar({ 
  onSearchChange,
}: {
  onSearchChange: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearchChange(newValue);
  };

  const clearSearch = () => {
    setValue("");
    onSearchChange("");
  };

  const { openFilterDrawer, getActiveFiltersCount } = useFilterStore();
  const activeFiltersCount = getActiveFiltersCount();


  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3.5,
        alignItems: 'center',
      }}
    >
    <TextField
      fullWidth
      placeholder="Buscar productos..."
      value={value}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearchChange(value);
        }
      }}
      sx={{
        bgcolor: '#F5F5F5',
        borderRadius: 3,
        '& .MuiOutlinedInput-root': {
          fontSize: { xs: 18, sm: 18 },
          '& .MuiOutlinedInput-input': {
            py: { xs: 2, sm: 2.5 },
          },    
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: '4px solid #77A787',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdSearch size={32} color="#757575" />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton 
              onClick={clearSearch}
              size="small"
              sx={{ 
                color: '#757575',
                '&:hover': { color: '#2D2D2D' }
              }}
            >
              <MdClose size={28} />
            </IconButton>
          </InputAdornment>
          
        ),
      }}
    />
    <IconButton
        onClick={openFilterDrawer}
        sx={{
          bgcolor: '#FFF',
          border: '1px solid #E0E0E0',
          borderRadius: 2,
          width: { xs: 56, sm: 48 },
          height: { xs: 56, sm: 48 },
          '&:hover': {
            bgcolor: '#F5F5F5',
            borderColor: '#77A787',
          },
        }}
      >
        <Badge
          badgeContent={activeFiltersCount}
          color="primary"
          sx={{
            '& .MuiBadge-badge': {
              bgcolor: '#77A787',
              color: '#FFF',
              fontSize: { xs: 18, sm: 11 },
              fontWeight: 700,
              minWidth: { xs: 26, sm: 18 },
              height: { xs: 26, sm: 18 },
            },
          }}
        >
          <TuneIcon sx={{ color: '#77A787', fontSize: 24 }} />
        </Badge>
      </IconButton>
    </Box>
  );
}
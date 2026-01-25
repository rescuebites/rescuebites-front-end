import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";

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

  return (
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
          fontSize: { xs: 14, sm: 15 },
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: '2px solid #77A787',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdSearch size={20} color="#757575" />
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
              <MdClose size={20} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
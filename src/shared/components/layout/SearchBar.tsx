import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        gap: 3.5,
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search Anything..."
        value={value}
        onChange={handleChange}
        variant="outlined"
        sx={{
          bgcolor: "#E0E3E7",
          borderRadius: "20px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            fontSize: 18,
            color: "#5F6F86",

            "& .MuiOutlinedInput-input": {
              py: 2.2,
            },

            "& fieldset": {
              border: "none",
            },

            "&:hover fieldset": {
              border: "none",
            },

            "&.Mui-focused fieldset": {
              border: "none",
            },
          },

          "& input::placeholder": {
            color: "#7A8CA5",
            opacity: 1,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdSearch size={28} color="#7A8CA5" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton onClick={clearSearch}>
                <MdClose size={22} color="#7A8CA5" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
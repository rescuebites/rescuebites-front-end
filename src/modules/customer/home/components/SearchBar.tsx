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
      placeholder="Buscar productos o locales..."
      value={value}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearchChange(value);
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdSearch />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={clearSearch}>
              <MdClose />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

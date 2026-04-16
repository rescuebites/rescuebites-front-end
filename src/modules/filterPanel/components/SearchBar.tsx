import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  ClickAwayListener,
} from "@mui/material";
import { MdClose, MdSearch, } from "react-icons/md";
import TuneIcon from "@mui/icons-material/Tune";
import { useFilterStore } from "../hooks/useFilterStore";
import type { SearchSuggestion } from "../interfaces/responses/search-response.interface";
import { ShoppingBasket, Store } from "lucide-react";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (query?: string) => void;
  onClear: () => void;
  suggestions: SearchSuggestion[];
  showSuggestions: boolean;
  onHideSuggestions: () => void;
  onShowSuggestions: () => void;
}

export default function SearchBar({
  query,
  onQueryChange,
  onSearch,
  onClear,
  suggestions,
  showSuggestions,
  onHideSuggestions,
  onShowSuggestions,
}: SearchBarProps) {
  const { openFilterDrawer, getActiveFiltersCount } = useFilterStore();
  const activeFiltersCount = getActiveFiltersCount();

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSearch(suggestion.label);
  };

  return (
    <ClickAwayListener onClickAway={onHideSuggestions}>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
        {/* Search input + dropdown wrapper */}
        <Box sx={{ flex: 1, position: "relative" }}>
          <TextField
            fullWidth
            placeholder="Buscar productos..."
            autoComplete="off"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
              if (e.key === "Escape") onHideSuggestions();
            }}
            onFocus={() => {
              if (suggestions.length > 0) onShowSuggestions();
            }}
            sx={{
              bgcolor: "#F5F5F5",
              borderRadius: 3,
              "& .MuiOutlinedInput-root": {
                fontSize: { xs: 18, sm: 18 },
                "& .MuiOutlinedInput-input": {
                  py: { xs: 2, sm: 2.5 },
                },
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
                "&.Mui-focused fieldset": {
                  border: "4px solid #77A787",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={32} color="#757575" />
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={onClear}
                    size="small"
                    sx={{ color: "#757575", "&:hover": { color: "#2D2D2D" } }}
                  >
                    <MdClose size={28} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <Paper
              elevation={8}
              sx={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                right: 0,
                zIndex: 1300,
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #E8E8E8",
              }}
            >
              {/* Group header: COMMERCE */}
              {suggestions.some((s) => s.type === "COMMERCE") && (
                <>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 2,
                      pt: 1.5,
                      pb: 0.5,
                      display: "block",
                      color: "#9E9E9E",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      fontSize: 11,
                    }}
                  >
                    Comercios
                  </Typography>
                  <List disablePadding>
                    {suggestions
                      .filter((s) => s.type === "COMMERCE")
                      .map((s) => (
                        <ListItem key={s.id} disablePadding>
                          <ListItemButton
                            onClick={() => handleSuggestionClick(s)}
                            sx={{
                              px: 2,
                              py: 1,
                              "&:hover": { bgcolor: "#F0F7F2" },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Store size={20} color="#77A787" />
                            </ListItemIcon>
                            <ListItemText
                              primary={s.label}
                              primaryTypographyProps={{
                                fontSize: 15,
                                color: "#2D2D2D",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </>
              )}

              {/* Group header: PRODUCT */}
              {suggestions.some((s) => s.type === "PRODUCT") && (
                <>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 2,
                      pt: 1.5,
                      pb: 0.5,
                      display: "block",
                      color: "#9E9E9E",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      fontSize: 11,
                    }}
                  >
                    Productos
                  </Typography>
                  <List disablePadding>
                    {suggestions
                      .filter((s) => s.type === "PRODUCT")
                      .map((s) => (
                        <ListItem key={s.id} disablePadding>
                          <ListItemButton
                            onClick={() => handleSuggestionClick(s)}
                            sx={{
                              px: 2,
                              py: 1,
                              "&:hover": { bgcolor: "#F0F7F2" },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <ShoppingBasket size={20} color="#be8573" />
                            </ListItemIcon>
                            <ListItemText
                              primary={s.label}
                              primaryTypographyProps={{
                                fontSize: 15,
                                color: "#2D2D2D",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </>
              )}
            </Paper>
          )}
        </Box>

        {/* Filter button */}
        <IconButton
          onClick={openFilterDrawer}
          sx={{
            bgcolor: "#FFF",
            border: "1px solid #E0E0E0",
            borderRadius: 2,
            width: { xs: 56, sm: 48 },
            height: { xs: 56, sm: 48 },
            flexShrink: 0,
            "&:hover": { bgcolor: "#F5F5F5", borderColor: "#77A787" },
          }}
        >
          <Badge
            badgeContent={activeFiltersCount}
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "#77A787",
                color: "#FFF",
                fontSize: { xs: 18, sm: 11 },
                fontWeight: 700,
                minWidth: { xs: 26, sm: 18 },
                height: { xs: 26, sm: 18 },
              },
            }}
          >
            <TuneIcon sx={{ color: "#77A787", fontSize: 24 }} />
          </Badge>
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
}
import { useState } from "react";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export interface CollapsibleSectionProps {
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
  sx?: object;
  contentSx?: object;
  titleSx?: object;
  showDivider?: boolean;
  iconSize?: number | string;
  badgeSx?: object;
  headerSx?: object;
}

export const CollapsibleSection = ({
  title,
  count,
  children,
  defaultOpen = true,
  sx,
  contentSx,
  titleSx,
  showDivider = true,
  iconSize,
  badgeSx,
  headerSx,
}: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ mb: 1, ...sx }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1.2,
          cursor: "pointer",
          ...headerSx,
        }}
        onClick={() => setOpen(!open)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: 15, color: "#222", ...titleSx }}
          >
            {title}
          </Typography>
          {count !== undefined && count > 0 && (
            <Box
              sx={{
                bgcolor: "#77A787",
                color: "#fff",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                ...badgeSx,
              }}
            >
              {count}
            </Box>
          )}
        </Box>
        <IconButton size="small" sx={{ p: 0 }}>
          {open ? (
            <ExpandLessIcon sx={iconSize ? { fontSize: iconSize } : { fontSize: "small" }} />
          ) : (
            <ExpandMoreIcon sx={iconSize ? { fontSize: iconSize } : { fontSize: "small" }} />
          )}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 1, pb: 1.5, ...contentSx }}
        >
          {children}
        </Box>
      </Collapse>
      {showDivider && <Box sx={{ borderBottom: "1px solid #EFEFEF" }} />}
    </Box>
  );
};

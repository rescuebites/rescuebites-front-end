import React from "react";
import { Chip } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

interface FilterChipProps {
  label: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  icon?: React.ReactElement | null;
}

export default function FilterChip({ label, active = false, onClick, sx, icon }: FilterChipProps) {
  return (
    <Chip
      label={label}
      onClick={onClick}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon={icon as any}
      sx={[
        {
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: active ? 700 : 600,
          fontSize: { xs: 16, sm: 18 },
          px: { xs: 1.5, sm: 2.5 },
          py: { xs: 0.5, sm: 0.7 },
          borderRadius: 999,
          height: "auto",
          background: active ? "linear-gradient(90deg,#77A787 0%,#5DAF62 100%)" : "transparent",
          color: active ? "#FFFFFF" : "text.secondary",
          border: active ? "none" : "1px solid",
          borderColor: active ? "transparent" : "divider",
          boxShadow: active ? "0 6px 18px rgba(119,167,135,0.18)" : "none",
          transition: "transform 180ms ease, box-shadow 180ms ease, background 180ms ease",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: active
              ? "0 8px 22px rgba(119,167,135,0.22)"
              : "0 4px 12px rgba(0,0,0,0.06)",
            background: active
              ? "linear-gradient(90deg,#77A787 0%,#5DAF62 100%)"
              : "rgba(0,0,0,0.04)",
          },
          "& .MuiChip-icon": { ml: 0.5, mr: -0.5 },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    />
  );
}

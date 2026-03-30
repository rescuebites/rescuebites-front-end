export const chipSx = {
  bgcolor: "#EAF6E7",
  color: "#4C7C5A",
  fontWeight: 600,
  fontSize: 12,
};

interface FilterChipSxOptions {
  activeColor?: string;
  activeHoverColor?: string;
  isMobile?: boolean;
  isPermanent?: boolean;
}

export const filterChipSx = (
  selected: boolean,
  {
    activeColor = "#77A787",
    activeHoverColor = "#6B9677",
    isMobile = false,
    isPermanent = false,
  }: FilterChipSxOptions = {}
) => ({
  bgcolor: selected ? activeColor : "#F5F5F5",
  color: selected ? "#FFF" : "#2D2D2D",
  fontWeight: 600,
  fontSize: isMobile ? 14 : 15,
  height: isMobile ? 35 : 40,
  border: selected
    ? `${isMobile ? 1 : 2}px solid ${activeColor}`
    : `${isMobile ? 1 : 2}px solid #E0E0E0`,
  cursor: isPermanent ? "not-allowed" : "pointer",
  opacity: isPermanent ? 0.5 : 1,
  transition: "all 0.2s ease",
  borderRadius: "20px",
  "& .MuiChip-label": { px: isMobile ? 1.5 : 2 },
  ...(!isPermanent && {
    "&:hover": {
      bgcolor: selected ? activeHoverColor : "#EEEEEE",
      transform: "scale(1.02)",
    },
    "&:active": { transform: "scale(0.98)" },
  }),
});
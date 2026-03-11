import { Box, Typography, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  title: string;
  onClick?: () => void;
}

export default function SectionHeader({ title, onClick }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        mt: 3
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 22,
          color: "#2D2D2D"
        }}
      >
        {title}
      </Typography>

      <IconButton
        onClick={onClick}
        sx={{
          color: "#77A787"
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
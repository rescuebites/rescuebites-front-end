import { Box } from "@mui/material";

export default function Badge({ text }: { text: string }) {
  return (
    <Box
      sx={{
        fontSize: 12,
        bgcolor: "#FFE4D6",
        color: "#F97316",
        px: 1,
        py: 0.3,
        borderRadius: 2,
        fontWeight: 600,
      }}
    >
      {text}
    </Box>
  );
}
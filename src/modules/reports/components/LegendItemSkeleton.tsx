import { Stack, Box, Skeleton } from "@mui/material";

export const LegendItemSkeleton = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Skeleton variant="circular" width={28} height={28} />
        <Box>
          <Skeleton width={80} height={16} />
          <Skeleton width={120} height={14} />
        </Box>
      </Stack>
      <Box textAlign="right">
        <Skeleton width={60} height={16} />
        <Skeleton width={40} height={14} />
      </Box>
    </Stack>
  );
};

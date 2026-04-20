import { Card, CardContent, Stack, Box, Skeleton } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  isLoading?: boolean;
}

export const StatCard = ({ icon, title, value, isLoading }: StatCardProps) => {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "#E6F4EA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Box>
            <CustomTitle
              text={title}
              variant="body2"
              fontSize={20}
              color="#6B7280"
              align="left"
            />
            {isLoading ? (
              <Skeleton width={40} />
            ) : (
              <CustomTitle
                text={value.toString()}
                variant="h6"
                fontSize={26}
                color="#1F2937"
                align="left"
              />
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

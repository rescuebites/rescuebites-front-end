import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import { PieChart, Pie } from "recharts";
import { useForm } from "react-hook-form";
import DateField from "@/shared/components/DateField";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const COLORS = ["#86EFAC", "#4ADE80", "#166534"];

const rawData = [
  { name: "Café", value: 12, percent: "33%" },
  { name: "Panadería", value: 10, percent: "27%" },
  { name: "Snacks", value: 14, percent: "38%" },
];

const data = rawData.map((item, index) => ({
  ...item,
  fill: COLORS[index],
}));

const total = data.reduce((acc, item) => acc + item.value, 0);

export const SalesReport = ({}) => {
  const { control } = useForm({
    defaultValues: {
      from: "",
      to: "",
    },
  });

  return (
    <Box p={2} bgcolor="#f5f5f5" minHeight="100vh">
      {/* Header */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Ventas realizadas
      </Typography>

      {/* Filtros */}
      <Stack direction="row" spacing={2}>
        <DateField control={control} name="from" label="Desde" size="small" />
        <DateField control={control} name="to" label="Hasta" size="small" />
      </Stack>

      {/* Total Sales (card grande) */}
      <Card
        sx={{
          mt: 2,
          borderRadius: 4,
          background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
          color: "white",
        }}
      >
        <CardContent>
          <Typography fontSize={14}>Total Sales</Typography>
          <Typography fontWeight={800} fontSize={28}>
            $80.000
          </Typography>
        </CardContent>
      </Card>

      <Box mt={2} display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        {/* Orders */}
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Icono */}
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
                <ReceiptLongOutlinedIcon
                  sx={{
                    color: "#2E7D32",
                    fontSize: 24,
                  }}
                />
              </Box>

              {/* Texto */}
              <Box>
                <Typography fontSize={14} color="text.secondary">
                  Orders
                </Typography>
                <Typography fontWeight={800} fontSize={24}>
                  28
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Products */}
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Icono */}
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
                <Inventory2OutlinedIcon
                  sx={{
                    color: "#2E7D32",
                    fontSize: 24,
                  }}
                />
              </Box>

              {/* Texto */}
              <Box>
                <Typography fontSize={14} color="text.secondary">
                  Products
                </Typography>
                <Typography fontWeight={800} fontSize={24}>
                  56
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Chart */}
      <Card sx={{ mt: 3, borderRadius: 4 }}>
        <CardContent>
          <Typography
            fontSize={14}
            fontWeight={700} // 🔥 negrita
            textAlign="center" // 🔥 centrado
            mb={2}
          >
            Top 3 Productos más Vendidos
          </Typography>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PieChart width={220} height={220}>
              <Pie
                data={data}
                dataKey="value"
                startAngle={360} // 🔥 clave
                endAngle={0} // 🔥 clave
                innerRadius={70}
                outerRadius={90}
                stroke="none"
              />
            </PieChart>

            {/* Centro */}
            <Box
              sx={{
                position: "absolute",
                textAlign: "center",
              }}
            >
              <Typography fontWeight={800} fontSize={22}>
                {total}
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                Unidades
              </Typography>
            </Box>
          </Box>

          {/* Leyenda */}
          <Stack mt={2} spacing={1}>
            {data.map((item) => (
              <Stack
                key={item.name}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: item.fill,
                    }}
                  />
                  <Typography fontSize={14}>{item.name}</Typography>
                </Stack>

                <Typography fontWeight={600}>
                  {item.value} - {item.percent}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

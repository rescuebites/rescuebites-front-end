import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import { PieChart, Pie } from "recharts";
import { useForm } from "react-hook-form";
import DateField from "@/shared/components/DateField";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const COLORS = ["#166534", "#4ADE80", "#86EFAC"];

const rawData = [
  {
    name: "Snacks",
    value: 14,
    price: "9.000",
    percent: "40%",
  },
  {
    name: "Panadería",
    value: 13,
    price: "15.000",
    percent: "35%",
  },
  { name: "Café", value: 9, price: "20.000", percent: "25%" },
];

const data = [...rawData]
  .sort((a, b) => b.value - a.value) // opcional seguridad
  .map((item, index) => ({
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
          <Stack mt={2} spacing={1.5}>
            {data.map((item) => (
              <Stack
                key={item.name}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  py: 1,
                }}
              >
                {/* IZQUIERDA */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {/* Dot */}
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: `${item.fill}20`, // 🔥 color con transparencia
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: item.fill, // 🔥 color sólido
                      }}
                    />
                  </Box>

                  {/* Texto */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600, // semi-bold
                        color: "#1F2937", // gris oscuro (no negro)
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280", // gris suave
                        lineHeight: 1.2,
                      }}
                    >
                      {item.value} Unidades Vendidas
                    </Typography>
                  </Box>
                </Stack>

                {/* DERECHA */}
                <Box textAlign="right">
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1F2937",
                      lineHeight: 1.2,
                    }}
                  >
                    ${item.price}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: item.fill, // 🔥 dinámico según ranking
                      lineHeight: 1.2,
                    }}
                  >
                    {item.percent}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

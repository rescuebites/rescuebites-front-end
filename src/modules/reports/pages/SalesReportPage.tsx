import { Box, Card, CardContent, Stack, Skeleton } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import { PieChart, Pie, Cell } from "recharts";
import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useCommerceReport } from "@/modules/reports/hooks/useCommerceReport";
import { StatCard } from "@/modules/reports/components/StatCard";
import { DateRangeFilter } from "@/modules/reports/components/DateRangeFilter";
import { ProductLegendItem } from "@/modules/reports/components/ProductLegendItem";
import { LegendItemSkeleton } from "@/modules/reports/components/LegendItemSkeleton";

const COLORS = ["#166534", "#4ADE80", "#86EFAC"];

export const SalesReportPage = () => {
  const { commerceId } = useAuthStore();

  const { control } = useForm({
    defaultValues: { from: "", to: "" },
  });

  const from = useWatch({ control, name: "from" });
  const to = useWatch({ control, name: "to" });

  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");

  const reportQuery = useCommerceReport(commerceId, appliedFrom, appliedTo);
  const report = reportQuery.data;
  const isLoading = reportQuery.isLoading;
  const isError = reportQuery.isError;

  const chartData = (report?.topProducts ?? []).map((item, index) => ({
    ...item,
    fill: COLORS[index] ?? "#86EFAC",
  }));

  const totalUnits = report?.totalProductsSold ?? 0;

  const handleApplyFilter = () => {
    if (!from || !to) return;
    setAppliedFrom(from);
    setAppliedTo(to);
  };

  return (
    <Box p={2}>
      <DateRangeFilter
        control={control}
        from={from}
        to={to}
        onApply={handleApplyFilter}
      />

      {isError && (
        <Box mt={2}>
          <CustomTitle
            text="No se pudo cargar el reporte. Verificá el rango de fechas."
            color="#D32F2F"
            fontSize={16}
            align="left"
            fontWeight={400}
          />
        </Box>
      )}

      {/* Total Sales */}
      <Card
        sx={{
          mt: 2,
          borderRadius: 4,
          background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
          color: "#f5f5f5",
        }}
      >
        <CardContent>
          <CustomTitle
            text="Total ventas"
            color="white"
            variant="body2"
            fontSize={22}
            align="left"
          />
          {isLoading ? (
            <Skeleton
              width={120}
              height={32}
              sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
            />
          ) : report ? (
            <CustomTitle
              text={`$${report.totalSales.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`}
              color="white"
              variant="h5"
              fontWeight={800}
              fontSize={30}
              align="left"
            />
          ) : (
            <CustomTitle
              text="—"
              color="white"
              variant="h5"
              fontSize={30}
              align="left"
            />
          )}
        </CardContent>
      </Card>

      {/* Cards */}
      <Box mt={2} display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <StatCard
          icon={<ReceiptLongOutlinedIcon sx={{ color: "#2E7D32", fontSize: 24 }} />}
          title="Pedidos"
          value={report?.totalOrders ?? "—"}
          isLoading={isLoading}
        />
        <StatCard
          icon={<Inventory2OutlinedIcon sx={{ color: "#2E7D32", fontSize: 24 }} />}
          title="Productos"
          value={report?.totalProductsSold ?? "—"}
          isLoading={isLoading}
        />
      </Box>

      {/* Chart */}
      <Card sx={{ mt: 3, borderRadius: 4 }}>
        <CardContent>
          <Box mb={2}>
            <CustomTitle
              text="Top 3 Productos más Vendidos"
              fontSize={24}
              color="#6B7280"
              align="center"
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <Skeleton variant="circular" width={180} height={180} />
            ) : chartData.length > 0 ? (
              <PieChart width={220} height={220}>
                <Pie
                  data={chartData}
                  dataKey="unitsSold"
                  startAngle={360}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={90}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <Box py={4}>
                <CustomTitle
                  text="Sin datos para el período seleccionado"
                  fontSize={15}
                  color="#6B7280"
                  align="center"
                />
              </Box>
            )}

            {!isLoading && chartData.length > 0 && (
              <Box sx={{ position: "absolute", textAlign: "center" }}>
                <CustomTitle
                  text={totalUnits.toString()}
                  fontSize={24}
                  align="center"
                />
                <CustomTitle
                  text="Unidades"
                  fontSize={18}
                  color="#6B7280"
                  align="center"
                  variant="body2"
                />
              </Box>
            )}
          </Box>

          {/* Leyenda */}
          <Stack mt={2} spacing={1.5}>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <LegendItemSkeleton key={i} />
                ))
              : chartData.map((item) => (
                  <ProductLegendItem
                    key={item.name}
                    name={item.name}
                    unitsSold={item.unitsSold}
                    revenue={item.revenue}
                    percentage={item.percentage}
                    fill={item.fill}
                  />
                ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

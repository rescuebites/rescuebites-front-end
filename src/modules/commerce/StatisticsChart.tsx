import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Box } from "@mui/material";

const data = [
  { day: "Mon", sales: 120 },
  { day: "Tue", sales: 200 },
  { day: "Wed", sales: 150 },
  { day: "Thu", sales: 180 },
  { day: "Fri", sales: 90 },
  { day: "Sat", sales: 260 },
  { day: "Sun", sales: 210 },
];

export default function StatisticsChart() {
  return (
    <Box sx={{ width: "100%", height: 140 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#7A8B6F" }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              fontSize: 12,
            }}
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#7A8B6F"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

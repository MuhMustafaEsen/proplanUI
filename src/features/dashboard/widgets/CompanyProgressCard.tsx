import { Card, CardContent, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { dashboardService } from "../../../core/api/dashboard.service";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#9c27b0",
  "#d32f2f",
  "#8eca1d"
];

export default function CompanyProgressCard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService
      .getCompanyProgress().then((res) => {
        const coloredData = res.map((item: any, index: number) => ({
          ...item,
          fill: COLORS[index % COLORS.length]
        }));

        setData(coloredData);
      })
      .finally(() => setLoading(false));
  }, []);   

  return (
    <Card>
      <CardContent>

        {loading && <Typography>Yükleniyor...</Typography>}

        {!loading && data.length === 0 && (
          <Typography>Veri bulunamadı</Typography>
        )}

        {!loading && data.length > 0 && (
          <Box height={260}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="completionRate"
                  nameKey="companyName"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  label={/*({ name, percent }) =>
                    percent !== undefined
                        ? `${name} ${(percent * 100).toFixed(0)}%`
                        : name
                  */false}
                >             
                </Pie>

                <Tooltip        
                    formatter={(value) => {
                        if (typeof value !== "number") return value;
                        return `%${value.toFixed(2)}`;
                    }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

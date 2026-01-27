import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { dashboardService } from "../../../core/api/dashboard.service";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function MonthlyCompletionChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    dashboardService.getMonthlyCompletion().then(setData);
  }, []);

  return (
    <Card>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `%${v}`} />
            <Tooltip formatter={(v) => `%${v}`} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#1976d2"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

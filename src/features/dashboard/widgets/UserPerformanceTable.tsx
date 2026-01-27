import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { dashboardService } from "../../../core/api/dashboard.service";

const getColor = (rate: number) => {
  if (rate >= 80) return "success";
  if (rate >= 50) return "warning";
  return "error";
};

export default function UserPerformanceTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    dashboardService.getUserPerformance().then(setData);
  }, []);

  return (
    <Paper sx={{ p: 2 }}>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Personel</TableCell>
              <TableCell align="center">Toplam Görev</TableCell>
              <TableCell align="center">Tamamlanan</TableCell>
              <TableCell>Oran</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((x) => (
              <TableRow hover sx={{
                        bgcolor:
                        x.rate >= 80
                        ? "rgba(46,125,50,0.05)"
                        : x.rate >= 50
                        ? "rgba(237,108,2,0.05)"
                        : "rgba(211,47,47,0.05)"
                        }} 
                        key={x.userId}>
                <TableCell>{x.userName}</TableCell>
                <TableCell align="center">{x.total}</TableCell>
                <TableCell align="center">{x.completed}</TableCell>

                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box width="100%">
                      <LinearProgress
                        variant="determinate"
                        value={x.rate}
                        color={getColor(x.rate)}
                        sx={{ height: 8, borderRadius: 5 }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 40 }}
                    >
                      %{x.rate.toFixed(2)}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

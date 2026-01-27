import { Box, Typography } from "@mui/material";
import CompanyProgressCard from "./widgets/CompanyProgressCard";
import MonthlyCompletionChart from "./widgets/MonthlyCompletionChart";
import UserPerformanceTable from "./widgets/UserPerformanceTable";
import DashboardCard from "../../components/DashboardCard";
import SectionHeader from "../../components/SectionHeader";

export default function Dashboard() {
    /*
    //bu düzen [1 - 1]
               [1 - 0]
    return (
        <Box>
            <Typography variant="h4" mb={3}>
                DASHBOARD
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: "1fr",          // mobil: tek kolon
                    md: "4fr 8fr",      // desktop: 4 / 8 oranı
                }}
                gap={2}
            >
                <MonthlyCompletionChart />

                <CompanyProgressCard />

                <Box gridColumn="1 / -1">
                    <UserPerformanceTable />
                </Box>
            </Box>
        </Box>
    );
    */
   //alt alta hepsi
     return (
    <Box>
      <Typography variant="h4" mb={3}>
        DASHBOARD
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <DashboardCard>
        <SectionHeader title="Personel Performansı" />
                <UserPerformanceTable />
        </DashboardCard>
        <DashboardCard>
        <SectionHeader title="Firma Bazlı Durum (Pie)" />
                <CompanyProgressCard />
        </DashboardCard>
        <DashboardCard>
        <SectionHeader title="Aylık Tamamlanma (Grafik)" />
                <MonthlyCompletionChart />
        </DashboardCard>
      </Box>
    </Box>
  );
}
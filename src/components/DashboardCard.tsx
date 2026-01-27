import { Card, CardContent } from "@mui/material";
import type { ReactNode } from "react";

export default function DashboardCard({ children }: { children: ReactNode }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}

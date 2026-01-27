import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FactCheckIcon from "@mui/icons-material/FactCheck";

export type Role = "admin" | "user";

export interface NavItem {
    text: string;
    to: string;
    icon: React.ReactNode;
    roles: Role[];
}

export const navItems: NavItem[] = [
    {
        text: "Görevlerim",
        to: "/my-tasks",
        icon: <AssignmentTurnedInIcon />,
        roles: ["admin", "user"],
    },
    {
        text: "Firmalar",
        to: "/companies",
        icon: <BusinessIcon />,
        roles: ["admin"],
    },
    {
        text: "Görev Tanımları",
        to: "/tasks-definitions",
        icon: <ListAltIcon />,
        roles: ["admin"],
    },
    {
        text: "Alt Görev Tanımları",
        to: "/subtasks-definitions",
        icon: <FactCheckIcon />,
        roles: ["admin"],
    },
    {
        text: "Aylık Görev Planı",
        to: "/company-tasks",
        icon: <CalendarMonthIcon />,
        roles: ["admin"],
    },
    {
        text: "Görev Takibi / Atama",
        to: "/task-assignments",
        icon: <AssignmentIcon />,
        roles: ["admin"],
    },
    {
        text: "Görev Tamamlama",
        to: "/tasks",
        icon: <AssignmentTurnedInIcon />,
        roles: ["admin"],
    },
    {
        text: "Dashboard",
        to: "/dashboard",
        icon: <DashboardIcon />,
        roles: ["admin"],
    },
];

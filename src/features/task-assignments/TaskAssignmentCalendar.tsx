import {
    Box,
    Card,
    CardContent,
    Typography,
    Checkbox,
    Collapse,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState, useMemo } from "react";

import { taskAssignmentService } from "../../core/api/task-assignment.service";
import type { TaskAssignment } from "../../core/models/TaskAssignment";
import TaskSubItemList from "../task-subitems/TaskSubItemList";

export default function TaskAssignmentCalendar() {
    /* ---------------- STATE ---------------- */
    const [tasks, setTasks] = useState<TaskAssignment[]>([]);
    const [taskWithoutSubItems, setTaskWithoutSubItems] = useState<Record<number, boolean>>({});
    const [collapsedCompleted, setCollapsedCompleted] = useState<Record<number, boolean>>({});

    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedCompany, setSelectedCompany] = useState<string>("ALL");

    const [completedOpen, setCompletedOpen] = useState<boolean>(false);

    /* ---------------- DATA ---------------- */
    const loadData = async () => {
        const data = await taskAssignmentService.getMyTasks();
        setTasks(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const completeTask = async (id: number) => {
        await taskAssignmentService.complete(id);
        loadData();
    };

    /* ---------------- HELPERS ---------------- */
    const formatDateTime = (dateStr?: string) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    /* ---------------- FILTER PIPELINE ---------------- */

    // 1️⃣ Ay & Yıl
    const monthFiltered = useMemo(() => {
        return tasks.filter(t => {
            if (!t.taskDate) return false;
            const d = new Date(t.taskDate);
            return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
        });
    }, [tasks, selectedMonth, selectedYear]);

    // 2️⃣ Firma
    const companyFiltered =
        selectedCompany === "ALL"
            ? monthFiltered
            : monthFiltered.filter(t => (t.companyName ?? "Bilinmeyen Firma") === selectedCompany
        );

    // 3️⃣ Durum
    const activeTasks = companyFiltered.filter(t => !t.isCompleted);
    const completedTasks = companyFiltered.filter(t => t.isCompleted);

    /* ---------------- COMPANY COUNTS ---------------- */

    const companyCounts = useMemo(() => {
    const map: Record<string, number> = {};

    monthFiltered.forEach(t => {
        const key = t.companyName ?? "Bilinmeyen Firma";
        map[key] = (map[key] || 0) + 1;
    });

    return map;
    }, [monthFiltered]);

    const companyList = Object.keys(companyCounts);

    /* ---------------- CARD RENDER ---------------- */
    const renderTaskCard = (t: TaskAssignment) => (
        <Card
            key={t.id}
            sx={{
                height: "100%",
                backgroundColor: t.isCompleted ? "#f6fff6" : "inherit"
            }}
        >
            <CardContent>
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                            {t.companyName}
                        </Typography>
                        <Typography variant="body2">
                            {t.taskName}
                        </Typography>
                    </Box>

                    {t.isCompleted && (
                        <IconButton
                            size="small"
                            onClick={() =>
                                setCollapsedCompleted(prev => ({
                                    ...prev,
                                    [t.id]: !prev[t.id]
                                }))
                            }
                        >
                            <ExpandMoreIcon
                                sx={{
                                    transform: collapsedCompleted[t.id]
                                        ? "rotate(0deg)"
                                        : "rotate(180deg)",
                                    transition: "0.3s"
                                }}
                            />
                        </IconButton>
                    )}
                </Box>

                {/* BODY */}
                <Collapse in={!collapsedCompleted[t.id]}>
                    <Typography variant="caption" mt={1} display="block">
                        Tarih : {t.taskDate}
                    </Typography>

                    <TaskSubItemList
                        taskAssignmentId={t.id}
                        onEmptyChange={(isEmpty) =>
                            setTaskWithoutSubItems(prev => ({
                                ...prev,
                                [t.id]: isEmpty
                            }))
                        }
                    />

                    {t.isCompleted && (
                        <Box display="flex" alignItems="center" gap={1} mt={1} color="success.main">
                            <CheckCircleIcon fontSize="small" />
                            <Typography variant="caption">
                                {formatDateTime(t.completedAt)}’de tamamlandı
                            </Typography>
                        </Box>
                    )}

                    {!t.isCompleted && taskWithoutSubItems[t.id] && (
                        <Box display="flex" alignItems="center" mt={1}>
                            <Checkbox
                                size="small"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        completeTask(t.id);
                                    }
                                }}
                            />
                            <Typography variant="body2">
                                Görevi tamamla
                            </Typography>
                        </Box>
                    )}

                    {!t.isCompleted && !taskWithoutSubItems[t.id] && (
                        <Typography variant="caption" color="text.secondary">
                            Alt görevler kapanmadan görev kapanmaz.
                        </Typography>
                    )}
                </Collapse>
            </CardContent>
        </Card>
    );

    /* ---------------- UI ---------------- */
    return (
        <Box>
            <Typography variant="h5" mb={2}>
                {new Date(selectedYear, selectedMonth).toLocaleString("tr-TR", { month: "long" })}{" "}
                {selectedYear} Görevlerim
            </Typography>

            {/* 🔎 FİLTRELER */}
            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                {/* Firma */}
                <FormControl size="small" sx={{ minWidth: 220 }}>
                    <InputLabel>Firma</InputLabel>
                    <Select
                        value={selectedCompany}
                        label="Firma"
                        onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                        <MenuItem value="ALL">
                            Tümü ({monthFiltered.length})
                        </MenuItem>

                        {companyList.map(c => (
                            <MenuItem key={c} value={c}>
                                {c} ({companyCounts[c]})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Ay */}
                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Ay</InputLabel>
                    <Select
                        value={selectedMonth}
                        label="Ay"
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                        {Array.from({ length: 12 }).map((_, i) => (
                            <MenuItem key={i} value={i}>
                                {new Date(0, i).toLocaleString("tr-TR", { month: "long" })}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Yıl */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Yıl</InputLabel>
                    <Select
                        value={selectedYear}
                        label="Yıl"
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {[2024, 2025, 2026].map(y => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* 🔵 AKTİF GÖREVLER */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: 2
                }}
            >
                {activeTasks.map(renderTaskCard)}
            </Box>

            {/* ✅ TAMAMLANANLAR */}
            {completedTasks.length > 0 && (
                <>
                    <Divider sx={{ my: 3 }} />

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        sx={{ cursor: "pointer" }}
                        onClick={() => setCompletedOpen(prev => !prev)}
                    >
                        <ExpandMoreIcon
                            sx={{
                                transform: completedOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "0.3s"
                            }}
                        />
                        <Typography fontWeight={600}>
                            Tamamlanan Görevler ({completedTasks.length})
                        </Typography>
                    </Box>

                    <Collapse in={completedOpen}>
                        <Box
                            mt={2}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                                gap: 2
                            }}
                        >
                            {completedTasks.map(renderTaskCard)}
                        </Box>
                    </Collapse>
                </>
            )}
        </Box>
    );
}

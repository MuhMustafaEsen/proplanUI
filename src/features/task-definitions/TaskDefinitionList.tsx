import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    //TableCell,
    TableContainer,
    TableHead,
    //TableRow,
    Typography
} from "@mui/material";
import {useEffect,useState} from "react";
import type { TaskDefinition } from "../../core/models/TaskDefinition";
import { taskDefinitionService } from "../../core/api/task-definition.service";
import TaskDefinitionForm from "./TaskDefinitionForm";
import {StyledTableRow,StyledTableCell} from "../../styles/tableStyles"

export default function TaskDefinitionList(){
    const [tasks,setTasks] = useState<TaskDefinition[]>([]);
    const [openForm,setOpenForm] = useState(false);
    const [selected,setSelected] = useState<TaskDefinition | null>(null);

    const loadData = async () => {
        const data = await taskDefinitionService.getAll();
        setTasks(data);
    };

    useEffect(() => {
        loadData();
    },[]);

    const handleEdit = (task:TaskDefinition) => {
        setSelected(task);
        setOpenForm(true);
    };

    const handleClose = () => {
        setSelected(null);
        setOpenForm(false);
    };

    return(
        <Box>
            <Box sx={{display:"flex", justifyContent:"space-between",mb:2}}>
                <Typography variant="h5">Görev  Tanimlari</Typography>
                <Button variant="contained" onClick={() => setOpenForm(true)}>
                    Yeni Görev
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>GÖREV ADI</StyledTableCell>
                            <StyledTableCell>AÇIKLAMA</StyledTableCell>
                            <StyledTableCell>AKTİFLİK DURUMU</StyledTableCell>
                            <StyledTableCell width={120}>İŞLEM</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>

                    <TableBody>
                        {tasks.map((t) => (
                            <StyledTableRow key={t.id}>
                                <StyledTableCell>{t.taskName}</StyledTableCell>
                                <StyledTableCell>{t.description}</StyledTableCell>
                                <StyledTableCell>{t.isActive ? "Evet" : "Hayir"}</StyledTableCell>
                                <StyledTableCell>
                                    <Button size="small" onClick={() => handleEdit(t)}>
                                        DÜZENLE
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TaskDefinitionForm
            open={openForm}
            onClose={handleClose}
            task={selected}
            onSuccess={loadData}/>
        </Box>
    );
}

import{
    Box,
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    //TableCell,
    TableContainer,
    TableHead,
    //TableRow,
    Typography,
} from "@mui/material";
import { useEffect,useState } from "react";
import { taskAssignmentService } from "../../core/api/task-assignment.service";
import type { TaskAssignment } from "../../core/models/TaskAssignment";
import { StyledTableCell,StyledTableRow } from "../../styles/tableStyles";
import TaskAssignmentCreate from "./taskAssignmentsCreate";

export default function TaskAssignmentList(){
    const [data,setData] = useState<TaskAssignment[]>([]);
    const [openAssign,setOpenAssign] = useState(false);

    useEffect(() => {
        taskAssignmentService.getAll().then(setData);
    },[]);

    return (
        <Box>
             <Box sx={{ display: "flex",justifyContent:"space-between",mb:2}}>
                    <Typography variant="h5">Günlük Görev Takibi</Typography>
                    <Button variant="contained"
                    sx={{mb:2}}
                    onClick={() => setOpenAssign(true)}>
                    Personele Görev Ata
                    </Button>
            </Box>
            {/*}
            <Typography variant="h5" mb={2}>
                Günlük Görev Takibi
            </Typography>
            */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>FİRMA ADI</StyledTableCell>
                            <StyledTableCell>GÖREV</StyledTableCell>
                            <StyledTableCell>PERSONEL</StyledTableCell>
                            <StyledTableCell>TARİH</StyledTableCell>
                            <StyledTableCell>DURUM</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((x) => (
                            <StyledTableRow key={x.id}>
                                <StyledTableCell>{x.companyName}</StyledTableCell>
                                <StyledTableCell>{x.taskName}</StyledTableCell>
                                <StyledTableCell>{x.userName}</StyledTableCell>
                                <StyledTableCell>{x.taskDate}</StyledTableCell>
                                <StyledTableCell>
                                    <Chip
                                    label={x.isCompleted ? "Tamamlandi" : "Bekliyor"}
                                    color={x.isCompleted ? "success" : "warning"}/>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TaskAssignmentCreate
            open={openAssign}
            onClose={() => setOpenAssign(false)}
            onSuccess={() => taskAssignmentService.getAll().then(setData)}
            
            />
        </Box>
    );
}
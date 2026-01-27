import{
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
import { useEffect,useState } from "react";
import type { CompanyTask } from "../../core/models/CompanyTask";
import { companyTaskService } from "../../core/api/company-task.service";
import CompanyTaskForm from "./CompanyTaskForm";
import { StyledTableRow,StyledTableCell } from "../../styles/tableStyles";

export default function CompanyTaskList(){
    const [data,setData] = useState<CompanyTask[]>([]);
    const [open,setOpen] = useState(false);

    const loadData = async () => {
        const result = await companyTaskService.getAll();
        setData(result);
    };

    useEffect(() => {
        loadData();
    },[]);

    return (
            <Box>
                <Box sx={{display:"flex",justifyContent:"space-between",mb:2}}>
                    <Typography variant="h5">Firma Aylik Görevleri</Typography>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        Görev Ata
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>FİRMA</StyledTableCell>
                                <StyledTableCell>GÖREV</StyledTableCell>
                                <StyledTableCell>YIL</StyledTableCell>
                                <StyledTableCell>AY</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((x) => (
                                <StyledTableRow key={x.id}>
                                    <StyledTableCell>{x.companyName}</StyledTableCell>
                                    <StyledTableCell>{x.taskName}</StyledTableCell>
                                    <StyledTableCell>{x.year}</StyledTableCell>
                                    <StyledTableCell>{x.month}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <CompanyTaskForm
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={loadData}/>
            </Box>
    );
}
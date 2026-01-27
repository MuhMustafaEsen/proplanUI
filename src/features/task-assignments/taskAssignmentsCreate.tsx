import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";
import { useEffect,useState } from "react";
import { companyTaskService } from "../../core/api/company-task.service";
import { userService } from "../../core/api/user.service";
import { taskAssignmentService } from "../../core/api/task-assignment.service";
import { useUI } from "../../core/ui/uiContext";
import { useFormValidation } from "../../core/validatehooks/useFormValidation";

interface Props {
    open:boolean;
    onClose:() => void;
    onSuccess:() => void;
}

export default function TaskAssignmentCreate({
    open,
    onSuccess,
    onClose
}:Props) {
    const [companyTasks,setCompanyTasks] = useState<any[]>([]);
    const [users,setUsers] = useState<any[]>([]);

    const [companyTaskId,setCompanyTaskId] = useState<number>();
    const [userId,setUsreId] =useState<number>();
    const[taskDate,setTaskDate] = useState("");

    const { showMessage } = useUI();

    const values = {
        companyTaskId,
        userId,
        taskDate
    };

    const { errors, validateForm } = useFormValidation(values, {
        companyTaskId: {
            required: true,
            message: "Firma / Görev seçilmelidir"
        },
        userId: {
            required: true,
            message: "Personel seçilmelidir"
        },
        taskDate: {
             required: true,
             message: "Görev tarihi seçilmelidir"
        }
    });

    useEffect(() => {
        companyTaskService.getAll().then(setCompanyTasks);
        userService.getAll().then(setUsers);//getStaff().then(setUsers);
    },[]);

    const handleSave = async () => {
        if (!validateForm()) {
            showMessage("Lütfen formu kontrol edin", "warning");
            return;
        }
        try {
            await taskAssignmentService.create({
            companyTaskId:companyTaskId!,
            userId:userId!,
            taskDate
        });
            showMessage("Görev personele atandı", "success");
            onSuccess();
            onClose();
        } catch  {
            showMessage("Bir hata oluştu", "error");
        }
        
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Personele Görev Ata</DialogTitle>

            <DialogContent>
                 <TextField
                select
                fullWidth
                label="Firma / Görev / Ay"
                margin="normal"
                value={companyTaskId ?? ""}
                onChange={(e) => setCompanyTaskId(Number(e.target.value))}
                error={!!errors.companyTaskId}
                helperText={errors.companyTaskId}
                >
                    {companyTasks.map((x) => (
                        <MenuItem key={x.id} value={x.id}>
                            {x.companyName} {x.taskName} {x.month}/{x.year}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                select
                fullWidth
                label="Personel"
                margin="normal"
                value={userId ?? ""}
                onChange={(e) => setUsreId(Number(e.target.value))}
                error={!!errors.userId}
                helperText={errors.userId}
                >
                    {users.map((u) => (
                        <MenuItem key={u.id} value={u.id}>
                            {u.firstName} {u.lastName}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                type="date"
                fullWidth
                label="Görev Tarihi"
                margin="normal"
                slotProps={{inputLabel: {shrink: true,},}}
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                error={!!errors.taskDate}
                helperText={errors.taskDate}
                />

                <DialogActions>
                    <Button onClick={onClose}>İptal</Button>
                    <Button variant="contained" onClick={handleSave}>
                        ATA
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
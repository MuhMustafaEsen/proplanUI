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
import { companyService } from "../../core/api/company.service";
import { taskDefinitionService } from "../../core/api/task-definition.service";
import { useUI } from "../../core/ui/uiContext";
import { useFormValidation } from "../../core/validatehooks/useFormValidation";

interface Props {
    open:boolean;
    onClose:() => void;
    onSuccess:() => void;
}

export default function CompanyTaskForm({open,onClose,onSuccess}:Props) {
    const [companies,setCompanies] = useState<any[]>([]);
    const [tasks,setTasks] =useState<any[]>([]);

    const [companyId,setCompanyId] = useState<number>();
    const [taskDefinitionId,setTaskDefinitionId] =useState<number>();
    const [year,setYear] = useState(new Date().getFullYear());
    const [month,setMonth] = useState(new Date().getMonth() + 1);

    const { showMessage } = useUI();
    
    const values = {
        companyId,
        taskDefinitionId,
        year,
        month
    };

    const { errors, validateForm } = useFormValidation(values, {
      companyId: {
        required: true,
        message: "Firma seçilmelidir"
      },
      taskDefinitionId: {
        required: true,
        message: "Görev seçilmelidir"
      },
      year: {
        required: true,
        min: 2000,
        max: 2100,
        message: "Geçerli bir yıl giriniz"
      },
      month: {
        required: true,
        min: 1,
        max: 12,
        message: "Ay 1-12 arasında olmalıdır"
      }
    });

    useEffect(() => {
        companyService.getAll().then(setCompanies);
        taskDefinitionService.getAll().then(setTasks);
    },[]);
    
    const handleSave = async () => {

        if (!validateForm()) {
            showMessage("Lütfen formu kontrol edin", "warning");
            return;
        }

        try {
            await companyTaskService.create({
            companyId:companyId!,
            taskDefinitionId:taskDefinitionId!,
            year,
            month
        });
            showMessage("Görev başarıyla atandı", "success");
            onSuccess();
            onClose();
        } catch  {
            showMessage("Bir hata oluştu", "error");
        } 
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Aylik Görev Ata</DialogTitle>

            <DialogContent>
                <TextField 
                id="company-select"
                select
                fullWidth
                label="Firma"
                margin="normal"
                value={companyId ?? ""}
                onChange={(e) => setCompanyId(Number(e.target.value))}
                error={!!errors.companyId}
                helperText={errors.companyId}
                >
                    {companies.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                            {c.companyName}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                id="task-select"
                select
                fullWidth
                label="Görev"
                margin="normal"
                value={taskDefinitionId ?? ""}
                onChange={(e) => setTaskDefinitionId(Number(e.target.value))}
                error={!!errors.taskDefinitionId}
                helperText={errors.taskDefinitionId}
                >
                    {tasks.map((t) => (
                        <MenuItem key={t.id} value={t.id}>
                            {t.taskName}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                id="year-input"
                label="Yil"
                type="number"
                fullWidth
                margin="normal"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                error={!!errors.year}
                helperText={errors.year}
                />

                <TextField
                id="month-input"
                label="Ay"
                type="number"
                fullWidth
                margin="normal"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                error={!!errors.month}
                helperText={errors.month}
                />

            </DialogContent>

                    <DialogActions>
                        <Button onClick={onClose}>İptal</Button>
                        <Button variant="contained" onClick={handleSave}>Kaydet</Button>
                    </DialogActions>

        </Dialog>
    );
}
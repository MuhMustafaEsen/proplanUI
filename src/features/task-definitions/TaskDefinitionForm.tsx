import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Switch,
    FormControlLabel
} from "@mui/material";

import { useEffect,useState } from "react";
import type { TaskDefinition } from "../../core/models/TaskDefinition";
import { taskDefinitionService } from "../../core/api/task-definition.service";
import { useUI } from "../../core/ui/uiContext";
import { useFormValidation } from "../../core/validatehooks/useFormValidation";

interface Props {
    open:boolean;
    onClose:() => void;
    onSuccess:() => void;
    task: TaskDefinition | null;
}

export default function TaskDefinitionForm({
    open,
    onClose,
    onSuccess,
    task
}:Props) {
    const [taskName,setTaskName] = useState("");
    const [description,setDescription] = useState("");
    const [isActive,setIsActive] = useState(true);
    const [id,setTaskId] = useState("");

    const { showMessage } = useUI();


    useEffect(() => {
        if (task) {
            setTaskId(task.id.toString());
            setTaskName(task.taskName);
            setDescription(task.description ?? "");
            setIsActive(task.isActive);
        }else{
            setTaskId("");
            setTaskName("");
            setDescription("");
            setIsActive(true);          
        }
    },[task]);

    const values = {
    taskName,
    description
    };

    const { errors, validateForm } = useFormValidation(values, {
        taskName: {
          required: true,
          minLength: 3,
          message: "Görev adı en az 3 karakter olmalıdır"
        },
        description: {
          minLength: 5,
          message: "Açıklama en az 5 karakter olmalıdır"
        }
    });

    const handleSave = async () => {
        if (!validateForm()) {
            showMessage("Lütfen formu kontrol edin", "warning");
            return;
        }
        try {
            if (task) {
                await taskDefinitionService.update(task.id,{
                    id:parseInt(id),
                    taskName,
                    description,
                    isActive
                });
                showMessage("Görev başarıyla güncellendi", "success");
            }
            else{
                await taskDefinitionService.create({
                    taskName,
                    description,
                    isActive
                });
                showMessage("Yeni görev tanımı oluşturuldu", "success");
            }
    
            onSuccess();
            onClose();
        } catch {
            showMessage("Bir hata oluştu", "error");
        }
    };
    
    return(
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                 {task ? "Görev Güncelle" : "Yeni Görev Tanimi Ekle"}
            </DialogTitle>

            <DialogContent>
                <TextField
                label="Görev adi"
                fullWidth
                margin="normal"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                error={!!errors.taskName}
                 helperText={errors.taskName}
                />

                <TextField
                label="Açiklama"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                />

                <FormControlLabel
                control={
                    <Switch
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}/>
                }
                label="Aktif"/>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button variant="contained" onClick={handleSave}>Kaydet</Button>
            </DialogActions>
        </Dialog>
    );
}


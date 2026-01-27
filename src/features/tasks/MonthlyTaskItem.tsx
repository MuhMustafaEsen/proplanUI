import {
    Checkbox,
    Typography,
    Stack
} from "@mui/material";
import type { TaskAssignment } from "../../core/models/TaskAssignment";
import {monthlyTaskService} from "../../core/api/monthly-task.service";

interface Props {
    task:TaskAssignment;
}

export const MonthlyTaskItem = ({task}:Props) => {

    const toggleComplete = async () => {
        await monthlyTaskService.completeTask(task.id);
        window.location.reload();
    };

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Checkbox
            checked={task.status == "Completed"}
            onChange={toggleComplete}/>

            <Typography
            sx={{textDecoration:
                task.status == "Completed" ? "line-through" : "none"
            }}
            >
                {task.taskName} - {task.userName}
            </Typography>
        </Stack>
    );
}
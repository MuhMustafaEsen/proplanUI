import {Paper,Typography,Stack} from "@mui/material";
import type { TaskAssignment } from "../../core/models/TaskAssignment";
import {MonthlyTaskItem} from "../tasks/MonthlyTaskItem";

interface Props {
    day:number;
    tasks:TaskAssignment[];
}

export const MonthlyTaskDayColumn = ({day,tasks}:Props) => {
return (
    <Paper sx = {{p: 1,minHeight:120}}>
        <Typography fontWeight="bold" mb={1}>
            {day}
        </Typography>

        <Stack spacing={1}>
            {tasks.map(task => (
                <MonthlyTaskItem key={task.id} task={task}/>
            ))}
        </Stack>
    </Paper>
    );
}
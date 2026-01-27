import {Box,CircularProgress} from "@mui/material";
import dayjs from "dayjs";
import { useEffect,useState,useMemo } from "react";
import { monthlyTaskService } from "../../core/api/monthly-task.service";
import type { TaskAssignment } from "../../core/models/TaskAssignment";
import { MonthlyTaskDayColumn } from "./MonthlyTaskDayColumn";
import { getDaysInMonth } from "../../core/utils/data.utils";
import { MonthlyTaskFilter } from "./MonthlyTaskFilter";


export default function MonthlyTaskBoard(){
  const [month,setMonth] = useState(dayjs());
  const [tasks,setTasks] = useState<TaskAssignment[]>([]);
  const [loading,setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    const res = await monthlyTaskService.getMonthlyTasks({
      year:month.year(),
      month:month.month() + 1
    });
    setTasks(res);
    setLoading(false);
  };
  useEffect(() => {
    loadTasks();
  },[month]);

  const grouped = useMemo(() => {
    return tasks.reduce((acc,t) => {
      const day = dayjs(t.plannedDate).date();
      acc[day] = acc[day] || [];
      acc[day].push(t);
      return acc;
    },{} as Record<number,TaskAssignment[]>);
  },[tasks]);

  if (loading) return <CircularProgress/> 
return (
  <>
    <MonthlyTaskFilter
      month={month}
      onMonthChange={setMonth}
    />
     <Box
        display="grid"
       gridTemplateColumns={{
         xs: "1fr",
         md: "repeat(6, 1fr)",
        }}
        gap={2}
      >
        {Array.from({ length: getDaysInMonth(month) }, (_, i) => (
          <Box key={i + 1}>
           <MonthlyTaskDayColumn
              day={i + 1}
              tasks={grouped[i + 1] || []}
           />
          </Box>
       ))}
      </Box>
    </>
  );
  /*Grid olmadı
  return (
    <>
    <MonthlyTaskFilter
    month={month}
    onMonthChange={setMonth}/>
    
    <Grid container spacing={2}>
      {Array.from({length:getDaysInMonth(month) },(_, i) => (
        <Grid item xs={12} md={2} key={i+1}>
          <MonthlyTaskDayColumn
          day={i+1}
          tasks={grouped[i+1] || []}/>
          </Grid>
      ))}
    </Grid>    
    </>
  );
  */
}

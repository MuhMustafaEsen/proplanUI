import {
    Checkbox,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

import { useEffect,useState } from "react";
import { taskSubItemService } from "../../core/api/task-sub-item.service";
import { useUI } from "../../core/ui/uiContext";

export default function TaskSubItemList(
    { taskAssignmentId,onEmptyChange} : /*any*/ {taskAssignmentId:number;onEmptyChange?: (isEmpty: boolean) => void;})
{
    const [items,setItems] = useState<any[]>([]);
    const { showMessage } = useUI();
    
    const loadData = async () => {
        const data = await taskSubItemService.getByTaskSubItemsByAssignmentId(taskAssignmentId);
        setItems(/*Array.isArray(data) ? data : []*/ data);

        onEmptyChange?.(data.length === 0);
    };

    useEffect(() => {
        loadData();
    },[taskAssignmentId]);
    /*
    const toggle = async (item:any) => {
        await  taskSubItemService.update(item.id,{
            taskTitle:item.title,
            taskDescription:item.description,
            isCompleted:item.isCompleted
        });
        loadData();
    };
    */
   const toggle = async (id:number,value:boolean) => {
    try {
        await taskSubItemService.toggle(id,value);
        loadData();
    } catch (err : any) {
         showMessage(
            err.response?.data?.message ?? "Sıralı görev kuralı ihlali",
            "warning"
            );
    }
   };

   const isDisabled = (index:number) => {
    if (index ===0) return false;
    return !items[index-1].isCompleted;
   };

    return (
        <List dense>
            {items
            .sort((a,b) => a.order - b.order)
            .map((i,index) => (
                <ListItem key={i.id}>
                    <Checkbox
                    checked={i.isCompleted}
                    disabled={!i.isCompleted && isDisabled(index)}
                    onChange={e => toggle(i.id, e.target.checked)}
                    />
                    <ListItemText 
                    primary={i.title}
                    secondary={!i.isCompleted && isDisabled(index)
                        ? "önceki görevi tamamlanmalı" : i.description
                    }
                    />
                </ListItem>
            ))}
        </List>
    );
}


/*
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";


import { useEffect,useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TaskSubItemForm from "../task-subitems/TaskSubItemForm";

export function TaskSubItemList() {
    const [items,setItems] = useState([]);
    const [open,setOpen] = useState(false);
    const [editingItem,setEditingItem] = useState(null);

    const FetchItems = async () => {
        //const response = await
    };

    useEffect(() => {
        FetchItems();
    },[]);

    const handleDelete = async (id) => {
        //await 
        FetchItems();
    };

    return (
        <Box p={3}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Alt Görevler</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Yeni Alt Görev
                </Button>
            </Stack>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Başlık</TableCell>
                        <TableCell>Tamamlandı</TableCell>
                        <TableCell>Sıra</TableCell>
                        <TableCell align="right">işlemler</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.taskTitle}</TableCell>
                            <TableCell>
                                <Checkbox checked={row.isCompleted} disabled/>
                            </TableCell>
                            <TableCell>{row.order}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    onClick={() => {
                                        setEditingItem(row);
                                        setOpen(true);
                                    }}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(row.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TaskSubItemForm
            open={open}
            onClose={() => {
                setOpen(false);
                setEditingItem(null);
            }}
            editingItem={editingItem}
            onSuccess={FetchItems}
            />
        </Box>
    );
}
*/


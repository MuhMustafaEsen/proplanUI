import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  //DropResult,
} from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

import { taskSubItemService } from "../../core/api/task-sub-item.service";
import { taskAssignmentService } from "../../core/api/task-assignment.service";
import {
  SUBTASK_TEMPLATES
} from "../../core/subtasks/templates";

import { useUI } from "../../core/ui/uiContext";
import { useFormValidation } from "../../core/validatehooks/useFormValidation";


/* ================= PAGE ================= */

export default function TaskSubItemCreatePage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | "">(
    ""
  );
  const [subItems, setSubItems] = useState<any[]>([]);

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [order, setOrder] = useState(1);

  const { showMessage } = useUI();
  //validate
  const values = {
    selectedAssignmentId,
    Title,
    order
  };

  const { errors, validateForm } = useFormValidation(values, {
    selectedAssignmentId: {
      required: true,
      message: "Önce görev seçmelisiniz"
    },
    Title: {
      required: true,
      minLength: 3,
      message: "Alt görev başlığı en az 3 karakter olmalıdır"
    },
    order: {
      required: true,
      min: 1,
      message: "Order 1 veya daha büyük olmalıdır"
    }
  });

  /* ================= LOADERS ================= */

  const loadAssignments = async () => {
    const data = await taskAssignmentService.getAll();
    setAssignments(data);
  };

  const loadSubItems = async (assignmentId: number) => {
    const data =
      await taskSubItemService.getByTaskSubItemsByAssignmentId(assignmentId);

    setSubItems(data);

    const maxOrder =
      data.length > 0 ? Math.max(...data.map((x: any) => x.order)) : 0;

    setOrder(maxOrder + 1);
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  useEffect(() => {
    if (selectedAssignmentId) {
      loadSubItems(selectedAssignmentId);
    } else {
      setSubItems([]);
    }
  }, [selectedAssignmentId]);

  /* ================= MANUAL ADD ================= */

  const addSubItem = async () => {
    //validate
     if (!validateForm()) {
      showMessage("Lütfen formu kontrol edin", "warning");
      return;
    }

    if (!selectedAssignmentId) return;

    await taskSubItemService.create({
      taskAssignmentId: selectedAssignmentId as number,
      Title,
      Description,
      order,
    });

    setTitle("");
    setDescription("");
    setOrder(order + 1);

    loadSubItems(selectedAssignmentId as number);
  };

  const removeSubItem = async (id: number) => {
    await taskSubItemService.remove(id);
      if (selectedAssignmentId) {
        loadSubItems(selectedAssignmentId as number);
    }
  };
  /* ================= DRAG END ================= */

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (!selectedAssignmentId) return;

    // TEMPLATE -> SUBTASKS
    if (
      source.droppableId.startsWith("template-") &&
      destination.droppableId === "subtasks"
    ) {
      const templateItem = SUBTASK_TEMPLATES.flatMap(t => t.items).find(
        i => i.id === draggableId
      );

      if (!templateItem) return;

         const tempItem = {
         id: `temp-${Date.now()}`,
         Title: templateItem.title,
         Description: templateItem.description,
         order,
       };
   
       setSubItems(prev => [...prev, tempItem]);
       setOrder(prev => prev + 1);

      await taskSubItemService.create({
        taskAssignmentId: selectedAssignmentId,
        Title: templateItem.title,
        Description: templateItem.description,
        order,
      });

      //setOrder(order + 1);
      //loadSubItems(selectedAssignmentId);
      await loadSubItems(selectedAssignmentId);
    }
  };

  /* ================= UI ================= */

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        <Typography variant="h5" mb={2}>
          Alt Görev Tanımlama (Admin)
        </Typography>

        {/* ASSIGNMENT SELECT */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Görev (Assignment)</InputLabel>
          <Select
            value={selectedAssignmentId}
            label="Görev (Assignment)"
            onChange={e =>
              setSelectedAssignmentId(e.target.value as number)
            }
          >
            {assignments.map(a => (
              <MenuItem key={a.id} value={a.id}>
                {a.companyName} - {a.taskName} (
                {new Date(a.taskDate).toLocaleDateString()})
              </MenuItem>
            ))}
          </Select>
          {errors.selectedAssignmentId && (
            <Typography color="error" variant="caption">
              {errors.selectedAssignmentId}
            </Typography>
          )}
        </FormControl>

        {!selectedAssignmentId && (
          <Typography color="text.secondary">
            Alt görev eklemek için önce görev seçiniz.
          </Typography>
        )}

        {selectedAssignmentId && (
          <>
            <Divider sx={{ my: 3 }} />

            <Box display="flex" gap={3}>
              {/* ========== LEFT: TEMPLATES ========== */}
              <Paper sx={{ width: "35%", p: 2 }}>
                <Typography fontWeight="bold" mb={1}>
                  Standart Alt Görevler
                </Typography>

                {SUBTASK_TEMPLATES.map(template => (
                  <Box key={template.id} mb={2}>
                    <Typography variant="subtitle1">
                      {template.title}
                    </Typography>

                    <Droppable
                      droppableId={`template-${template.id}`}
                      isDropDisabled
                    >
                      {provided => (
                        <List
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {template.items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {provided => (
                                <ListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    border: "1px dashed #aaa",
                                    mb: 1,
                                    cursor: "grab",
                                  }}
                                >
                                  {item.title}
                                </ListItem>
                              )}
                            </Draggable>
                          ))}
                          {/*provided.placeholder*/}
                        </List>
                      )}
                    </Droppable>
                  </Box>
                ))}
              </Paper>

              {/* ========== RIGHT: SUBTASKS ========== */}
              <Paper sx={{ width: "65%", p: 2 }}>
                <Typography fontWeight="bold" mb={1}>
                  Alt Görevler
                </Typography>

                {/* MANUAL ADD */}
                <Box display="flex" gap={1} my={2}>
                  <TextField
                    label="Alt görev başlığı"
                    value={Title}
                    onChange={e => setTitle(e.target.value)}
                    fullWidth
                    error={!!errors.Title}
                    helperText={errors.Title}
                  />
                  <TextField
                    label="Order"
                    type="number"
                    value={order}
                    onChange={e => setOrder(+e.target.value)}
                    sx={{ width: 100 }}
                    error={!!errors.order}
                    helperText={errors.order}
                  />
                  <Button
                    variant="contained"
                    onClick={addSubItem}
                    disabled={!Title}
                  >
                    Ekle
                  </Button>
                </Box>

                <TextField
                  label="Açıklama"
                  value={Description}
                  onChange={e => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />

                <Droppable droppableId="subtasks">
                  {(provided, snapshot) => (
                    <List
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        minHeight: 200,
                        border: "2px dashed",
                        borderColor: snapshot.isDraggingOver
                          ? "primary.main"
                          : "grey.400",
                      }}
                    >
                      {subItems
                        .sort((a, b) => a.order - b.order)
                        .map(i => (
                          <ListItem
                            key={i.id}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                onClick={() => removeSubItem(i.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            #{i.order} - {i.Title}
                          </ListItem>
                        ))}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </Paper>
            </Box>
          </>
        )}
      </Box>
    </DragDropContext>
  );
}

/*
import {
    Box,
    Button,
    TextField,
    Typography,
    List,
    ListItem,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Divider,
} from "@mui/material";

import DeletIcon from "@mui/icons-material/Delete";
import { useEffect,useState } from "react";
import { taskSubItemService } from "../../core/api/task-sub-item.service";
import { taskAssignmentService } from "../../core/api/task-assignment.service";

export default function TaskSubItemCreatePage() {
        const [assignments,setAssignments] = useState<any[]>([]);
        const [selectedAssignmentId,setSelectedAssignmentId] = useState<number | "">("");
        const [subItems,setSubItems] = useState<any[]>([]);

        //const [items,setItems] = useState<any[]>([]);
        const [Title,setTitle] = useState("");
        const [Description,setDescription] = useState("");
        const [order,setOrder] = useState(1);

        const loadAssignments = async () => {
            const data = await taskAssignmentService.getAll();
            setAssignments(data);
        };

        const loadSubItems = async (assigmentsId:number) => {
            const data = await taskSubItemService.getByTaskSubItemsByAssignmentId(assigmentsId);
            setSubItems(data);

            const maxOrder = data.length > 0 ? Math.max(...data.map((x:any) => x.order)) : 0;

            setOrder(maxOrder +1);
        };
        /*
        const loadData = async () => {
            const data = await taskSubItemService.getByTaskSubItemsByAssignmentId(taskAssignmentId);
            setItems(data);
        };
        //
        useEffect(() => {
            loadAssignments();
        },[]);

        useEffect(() => {
            if (selectedAssignmentId) {
                loadSubItems(selectedAssignmentId);
            }else{
                setSubItems([]);
            }
        },[selectedAssignmentId]);
        
        const addSubItem = async () =>{
            if (!selectedAssignmentId) return;

            await taskSubItemService.create({taskAssignmentId:selectedAssignmentId,
            Title,
            Description,
            order
        });

        setTitle("");
        setDescription("");
        setOrder(order + 1);

        loadSubItems(selectedAssignmentId);
        };
        
        const removeSubItem = async (id:number) => {
            await taskSubItemService.remove(id);
            if (selectedAssignmentId) {
                loadSubItems(selectedAssignmentId);  
            }
        };


        /*
        const add = async () => {
        await taskSubItemService.create({taskAssignmentId,
            taskTitle,
            order,
        });
        setTaskTitle("");
        setOrder(order + 1);
        loadData();
        };
        
        const remove = async (id:number) => {
            await taskSubItemService.remove(id);
            loadData();
        };
        //
        return (
            <Box>
                <Typography variant="h5" mb={2}>
                    Alt Görev Tanımlama (Admin)
                </Typography>

                {/* Assignment seçimi//}
                <FormControl fullWidth sx={{mb:3}}>
                    <InputLabel>Görev (Assignment)</InputLabel>
                    <Select
                        value={selectedAssignmentId}
                        label="Görev (Assignment)"
                        onChange={e => setSelectedAssignmentId(e.target.value as number)}>

                            {assignments.map(a => (
                                <MenuItem key={a.id} value={a.id}>
                                    {a.companyName} - {a.taskName} (
                                    {new Date(a.taskDate).toLocaleDateString()}
                                    )
                                </MenuItem>
                            ))}
                        </Select>
                </FormControl>
                
                {!selectedAssignmentId && (<Typography color="text.secondary">
                    Alt görev eklemek için önce bir görev seçimi yapınız.
                </Typography>
                )}

                {selectedAssignmentId && (<>
                <Divider sx={{my:2}}/>
                </>)}

                {/* add //}
                <Box display="flex" gap={1} my={2}>
                    <TextField
                    label="alt görev başlığı"
                    value={Title}
                    onChange={e => setTitle(e.target.value)}
                    fullWidth
                    />

                    <TextField
                    label="Order"
                    type="number"
                    value={order}
                    onChange={e => setOrder(+e.target.value)}
                    sx={{width:120}}/>
                    <Button 
                    variant="contained" 
                    onClick={addSubItem}
                    disabled={!Title}
                    >
                        Ekle
                    </Button>
                </Box>
                <TextField
                label="açıklama"
                value={Description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={2}
                sx={{mb:2}}
                />

                <List>
                    {subItems.sort((a,b) => a.order - b.order)
                    .map(i => (
                        <ListItem
                        key={i.id}
                        secondaryAction={
                            <IconButton
                            edge="end"
                            onClick={() => removeSubItem(i.id)}>
                                <DeletIcon/>
                            </IconButton>
                        }
                        >
                            #{i.order} - {i.Title} - {i.Description}
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
}
        */
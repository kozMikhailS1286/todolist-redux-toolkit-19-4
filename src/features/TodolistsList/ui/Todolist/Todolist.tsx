import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Task } from "./Task/Task";
import {
    TodolistDomainType,
    todolistsThunks
} from "features/TodolistsList/model/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import { TaskStatuses } from "common/enums/index";
import { useActions } from "common/hooks/index";
import { AddItemForm, EditableSpan } from "common/components/index";
import {TaskType} from "../../api/tasksApi.types";
import FilterTasksButtons from "./FilterTasksButtons";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = function (props: Props) {
  const { fetchTasks, addTask } = useActions(tasksThunks);
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks)



  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTaskCb = (title: string) => {
      addTask({title, todolistId: props.todolist.id});
    }


  const removeTodolistCb = () => {
    removeTodolist(props.todolist.id);
  };

  const changeTodolistTitleCb = (title: string) => {
      changeTodolistTitle({id: props.todolist.id, title});
  }


  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleCb} />
        <IconButton onClick={removeTodolistCb} disabled={props.todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCb} disabled={props.todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
          />
        ))}
      </div>
        <div style={{ paddingTop: "10px" }}>
            <FilterTasksButtons todolist={props.todolist}/>
        </div>
    </div>
  );
};

import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components/index";
import { TaskStatuses } from "common/enums/index";
import {TaskType} from "../../../api/tasksApi.types";
import {useActions} from "../../../../../common/hooks/index";
import {tasksThunks} from "../../../model/tasks/tasks.reducer";
import s from "./Task.module.css"

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {

const {removeTask, updateTask } = useActions(tasksThunks)



  const removeTaskHandler = () => {
    removeTask({taskId: props.task.id, todolistId: props.todolistId})
  }

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      updateTask({
          taskId: props.task.id,
          domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
          todolistId: props.todolistId,
      });
  }

  const changeTaskTitleHandler = (newValue: string) => {
      updateTask({taskId: props.task.id, domainModel: { title: newValue}, todolistId: props.todolistId});
  }

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={props.task.status === TaskStatuses.Completed} color="primary" onChange={onChangeStatusHandler} />

      <EditableSpan value={props.task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});

import React from "react";
import {Task} from "./Task/Task";
import {TaskType} from "../../../api/tasksApi.types";
import {TodolistDomainType} from "../../../model/todolists/todolists.reducer";
import {TaskStatuses} from "../../../../../common/enums/index";


type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}
const Tasks = (props: Props) => {

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
    }



    return <div>
        {tasksForTodolist.map((t) => (
            <Task
                key={t.id}
                task={t}
                todolistId={props.todolist.id}
            />
        ))}
    </div>
}

export default Tasks;
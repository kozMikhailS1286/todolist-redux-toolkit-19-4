import React, {useEffect} from "react";
import {TodolistDomainType} from "features/TodolistsList/model/todolists/todolists.reducer";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasks.reducer";
import {useActions} from "common/hooks/index";
import {AddItemForm} from "common/components/index";
import {TaskType} from "../../api/tasksApi.types";
import FilterTasksButtons from "./FilterTasksButtons";
import Tasks from "./Tasks/Tasks";
import TodolistTitle from "./TodolistTitle/TodolistTitle";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist = function (props: Props) {
    const {fetchTasks, addTask} = useActions(tasksThunks);



    useEffect(() => {
        fetchTasks(props.todolist.id);
    }, []);

    const addTaskCb = (title: string) => {
        return addTask({title, todolistId: props.todolist.id}).unwrap();
    }


    return (
        <div>
            <TodolistTitle todolist={props.todolist} />
            <AddItemForm addItem={addTaskCb} disabled={props.todolist.entityStatus === "loading"}/>
            <Tasks tasks={props.tasks}
                   todolist={props.todolist}/>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButtons todolist={props.todolist}/>
            </div>
        </div>
    );
};

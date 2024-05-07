import {Button} from "@mui/material";
import React from "react";
import {useActions} from "../../../../common/hooks/index";
import {FilterValuesType, TodolistDomainType, todolistsActions} from "../../model/todolists/todolists.reducer";

type Props = {
    todolist: TodolistDomainType;
}
const FilterTasksButtons = (props: Props) => {

    const {changeTodolistFilter} = useActions(todolistsActions)


    const changeTodolistFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({filter, id: props.todolist.id})
    }


    return <div>
        <Button
            variant={props.todolist.filter === "all" ? "outlined" : "text"}
            onClick={()=>{changeTodolistFilterHandler("all")}}
            color={"inherit"}
        >
            All
        </Button>
        <Button
            variant={props.todolist.filter === "active" ? "outlined" : "text"}
            onClick={()=>{changeTodolistFilterHandler("active")}}
            color={"primary"}
        >
            Active
        </Button>
        <Button
            variant={props.todolist.filter === "completed" ? "outlined" : "text"}
            onClick={()=>{changeTodolistFilterHandler("completed")}}
            color={"secondary"}
        >
            Completed
        </Button>
    </div>
}

export default FilterTasksButtons;

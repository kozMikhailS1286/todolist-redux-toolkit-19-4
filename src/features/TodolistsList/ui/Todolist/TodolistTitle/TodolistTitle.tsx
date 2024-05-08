import React from "react";
import {EditableSpan} from "../../../../../common/components/index";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistDomainType, todolistsThunks} from "../../../model/todolists/todolists.reducer";
import {useActions} from "../../../../../common/hooks/index";

type Props = {
    todolist: TodolistDomainType
}
const TodolistTitle = (props: Props) => {

    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)
    const removeTodolistHandler = () => {
        removeTodolist(props.todolist.id);
    };

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({id: props.todolist.id, title});
    }


 return   <h3>
     <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler}/>
     <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
         <Delete/>
     </IconButton>
 </h3>
}

export default TodolistTitle;
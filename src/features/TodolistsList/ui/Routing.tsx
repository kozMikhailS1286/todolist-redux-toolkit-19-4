import React from "react"
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "./TodolistsList";
import {Login} from "../../auth/ui/login/login";
import {Container} from "@mui/material";

const Routing = () => {
    return (
        <Container fixed>
            <Routes>
                <Route path={"/"} element={<TodolistsList />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </Container>
    )
}

export default Routing;
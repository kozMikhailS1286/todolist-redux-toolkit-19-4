import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorSnackbar } from "common/components";
import Header from "../features/TodolistsList/ui/Header";
import Routing from "../features/TodolistsList/ui/Routing";

function App() {

  return (
    <BrowserRouter>
      <div>
        <ErrorSnackbar />
        <Header />
        <Routing />
      </div>
    </BrowserRouter>
  );
}

export default App;

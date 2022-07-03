import React from "react";
import { ProvedorCarrinho } from "./src/context/CarrinhoContexto";
import { Routes } from "./src/routes";

const App = () => {
  return (
    <ProvedorCarrinho>
      <Routes/>
    </ProvedorCarrinho>
  )
}

export default App

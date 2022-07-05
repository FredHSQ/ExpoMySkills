import React, { useEffect, useState } from "react";
import { ProvedorCarrinho } from "./src/context/CarrinhoContexto";
import { Routes } from "./src/routes";

import Circulo from "./src/assets/images/PngItem_2901848.png"

import { StatusBar } from "expo-status-bar";
import AnimatedSplash from "react-native-animated-splash-screen";

const App = () => {

  const [estaCarregado, setEstaCarregado] = useState<boolean>(false);

  useEffect(()=>{
    setTimeout(()=>{
      setEstaCarregado(true);
    }, 2000)
  });

  return (
    <AnimatedSplash
      isLoaded={estaCarregado}
      logoImage={Circulo}
      backgroundColor={"#fff"}
      logoHeight={150}
      logoWidth={150}
    >
      <ProvedorCarrinho>
        <StatusBar
          translucent={true}
          style={"light"}
        />
        <Routes />
      </ProvedorCarrinho>
    </AnimatedSplash>
  )
}

export default App

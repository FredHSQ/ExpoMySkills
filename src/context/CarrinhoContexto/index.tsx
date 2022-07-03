import React, { createContext, useEffect, useState } from "react";
import { ListaItemMagico } from "../../screens/Loja";

export interface TipoContextoCarrinho {
    listaItemMagico?: ListaItemMagico[],
    setListaItemMagico: (listaItemMagico:ListaItemMagico[])=>void;
}

export const ContextoCarrinho = createContext<TipoContextoCarrinho>({
    listaItemMagico: [{
        index: "",
        name: "",
        url: "",
    }],
    setListaItemMagico: (listaItemMagico:ListaItemMagico[])=>{}
})

export const ProvedorCarrinho = ({ children }) =>{
    const [listaItemMagico, setListaItemMagico] = useState<ListaItemMagico[]>([]);

    useEffect(()=>{
        console.log(listaItemMagico);
    },[listaItemMagico])

    return (
        <ContextoCarrinho.Provider
            value={{
                listaItemMagico,
                setListaItemMagico
            }}
        >
            {children}
        </ContextoCarrinho.Provider>
    )

}
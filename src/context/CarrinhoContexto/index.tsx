import React, { createContext, useEffect, useState } from "react";
import { ListaItemMagico } from "../../screens/Loja";

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TipoContextoCarrinho {
    listaItemMagico?: ListaItemMagico[],
    adiconaItemCarrinho: (itemMagico: ListaItemMagico) => void;
    precoTotal: number,
    retiraItemCarrinho: (index: string) => void
}

export const ContextoCarrinho = createContext<TipoContextoCarrinho>({
    listaItemMagico: [{
        index: "",
        name: "",
        url: "",
    }],
    adiconaItemCarrinho: (itemMagico: ListaItemMagico) => { },
    precoTotal: 0,
    retiraItemCarrinho: (index: string) => { }
})

export const ProvedorCarrinho = ({ children }) => {
    const [listaItemMagico, setListaItemMagico] = useState<ListaItemMagico[]>([]);
    const [precoTotal, setPrecoTotal] = useState<number>(0);

    useEffect(() => {
        calculaPrecoTotal();
    }, [listaItemMagico]);

    useEffect(() => {
        getData().then((res) => {
            res && setListaItemMagico(res);
        })
    }, [])

    function calculaPrecoTotal() {
        let somaTotal = 0
        listaItemMagico.length !== 0 && listaItemMagico.map((item) => {
            somaTotal = somaTotal + Number(item.preco)
        });
        setPrecoTotal(somaTotal);
    };

    function retiraItemCarrinho(index: string) {
        let novoCarrinho = listaItemMagico.filter((itemMagico) => {
            return itemMagico.index !== index
        });
        setListaItemMagico(novoCarrinho);
    };

    function adiconaItemCarrinho(item: ListaItemMagico) {
        storeData([...listaItemMagico, item])
        setListaItemMagico([...listaItemMagico, item]);
    }

    const storeData = async (value: ListaItemMagico[]) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@listaIM', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@listaIM')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    return (
        <ContextoCarrinho.Provider
            value={{
                listaItemMagico,
                adiconaItemCarrinho,
                precoTotal,
                retiraItemCarrinho
            }}
        >
            {children}
        </ContextoCarrinho.Provider>
    )

}
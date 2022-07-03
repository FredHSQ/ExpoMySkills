import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { CartaItemMagico } from "../../components/CartaItemMagico";
import { ModalAtributos } from "../../components/modais/ModalAtributos";
import { buscaItemsMagicos } from "../../services/api";
import { styles } from "./styles";

export interface ItemMagico {
    index: string,
    name: string,
    equipment_category: {
        index: string,
        name: string,
        url: string,
    },
    rarity: {
        name: string,
    },
    variants: ListaItemMagico[],
    variant: boolean,
    desc: string[],
    url: string,
};

export interface ListaItemMagico {
    index: string,
    name: string,
    url: string,
    preco?: string,
}

export const Loja = () => {
    const [listaItensMagicos, setListaItensMagicos] = useState<ListaItemMagico[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [visibilidadeModal, setVisibilidadeModal] = useState<boolean>(true);
    const [indexItemMagico, setIndexItemMagico] = useState<string>();
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        setCarregando(true);
        buscaItemsMagicos().then((res) => {
            setListaItensMagicos(res.data.results);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setCarregando(false);
        })
    }, [reload])

    return <View style={styles.container}>
        <Text style={styles.title}>Loja Magica</Text>
        {carregando ?
            <Text style={styles.title}>Carregando</Text>
            :
            <FlatList
                data={listaItensMagicos}
                refreshing={carregando}
                onRefresh={() => setReload(!reload)}
                renderItem={({ item }) => {
                    return <CartaItemMagico
                        setVisibilidadeModal={setVisibilidadeModal}
                        setIndexItemMagico={setIndexItemMagico}
                        item={item}
                    />
                }}
            />
        }
        {indexItemMagico && <ModalAtributos
            indexItemMagico={indexItemMagico}
            visibilidadeModal={visibilidadeModal}
            setVisibilidadeModal={setVisibilidadeModal}
        />
        }
    </View>
}
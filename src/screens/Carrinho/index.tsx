import React, { useContext, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { CartaItemMagico } from "../../components/CartaItemMagico";
import { ModalAtributos } from "../../components/modais/ModalAtributos";
import { ContextoCarrinho } from "../../context/CarrinhoContexto";
import { styles } from "./styles";

export const Carrinho = () => {

    const [visibilidadeModal, setVisibilidadeModal] = useState<boolean>(false);
    const [indexItemMagico, setIndexItemMagico] = useState<string>("");
    const [preco, setPreco] = useState<string>();

    const listaItemMagico = useContext(ContextoCarrinho).listaItemMagico;
    const precoTotal = useContext(ContextoCarrinho).precoTotal;


    return <View style={styles.container}>
        <Text style={styles.title}>
            Carrinho
        </Text>
        <FlatList
            data={listaItemMagico}
            showsVerticalScrollIndicator={false}
            keyExtractor={(data) => data.index}
            renderItem={({ item, index }) => (
                <CartaItemMagico
                    item={item}
                    setPreco={setPreco}
                    setVisibilidadeModal={setVisibilidadeModal}
                    setIndexItemMagico={setIndexItemMagico}
                    carrinho={true}
                />
            )
            }
        />
        {visibilidadeModal &&
            <ModalAtributos
                indexItemMagico={indexItemMagico}
                visibilidadeModal={visibilidadeModal}
                setVisibilidadeModal={setVisibilidadeModal}
                preco={preco}
                carrinho={true}
            />
        }
        <Text style={styles.title}>
            Preço Total: R$ {precoTotal},00
        </Text>
    </View>
}
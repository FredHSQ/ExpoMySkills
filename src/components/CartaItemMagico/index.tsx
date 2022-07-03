import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { ListaItemMagico } from "../../screens/Loja";
import { styles } from "./styles";

interface CartaItemMagicoProps extends TouchableOpacityProps {
    item: ListaItemMagico,
    setVisibilidadeModal: React.Dispatch<React.SetStateAction<boolean>>,
    setIndexItemMagico: React.Dispatch<React.SetStateAction<string>>,
    setPreco?: React.Dispatch<React.SetStateAction<string>> 
}

export const CartaItemMagico = ({ item,setVisibilidadeModal,setIndexItemMagico, setPreco, ...rest }: CartaItemMagicoProps) => {

    function lidarAbrirModal () {
        setVisibilidadeModal(true);
        setPreco && setPreco(item.preco);
        setIndexItemMagico(item.index);
    }

    return <TouchableOpacity
        style={styles.buttonMagicItem}
        onPress={()=>lidarAbrirModal()}
        {...rest}
    >
        <Text style={styles.textMagicItem}>
            {item.name}
        </Text>
    </TouchableOpacity>
}

import React, { useContext } from "react";
import { TouchableOpacity, Text, TouchableOpacityProps, Image } from "react-native";
import { styles } from "./styles";

import { ListaItemMagico } from "../../screens/Loja";
import FechaIcon from "../../assets/icons/close_FILL0_wght400_GRAD0_opsz48.png"
import { ContextoCarrinho } from "../../context/CarrinhoContexto";

interface CartaItemMagicoProps extends TouchableOpacityProps {
    item: ListaItemMagico,
    setVisibilidadeModal: React.Dispatch<React.SetStateAction<boolean>>,
    setIndexItemMagico: React.Dispatch<React.SetStateAction<string>>,
    setPreco?: React.Dispatch<React.SetStateAction<string>>,
    carrinho?: boolean
}

export const CartaItemMagico = ({ item,setVisibilidadeModal,setIndexItemMagico, setPreco, carrinho, ...rest }: CartaItemMagicoProps) => {

    function lidarAbrirModal () {
        setVisibilidadeModal(true);
        setPreco && setPreco(item.preco);
        setIndexItemMagico(item.index);
    }

    const retiraItemCarrinho = useContext(ContextoCarrinho).retiraItemCarrinho;

    return <TouchableOpacity
        style={styles.buttonMagicItem}
        onPress={()=>lidarAbrirModal()}
        {...rest}
    >
        <Text style={styles.textMagicItem}>
            {item.name}
        </Text>
       {carrinho && <TouchableOpacity onPress={()=>retiraItemCarrinho(item.index)}>
            <Image style={styles.closeIcon} source={FechaIcon}/>
        </TouchableOpacity>
}
    </TouchableOpacity>
}

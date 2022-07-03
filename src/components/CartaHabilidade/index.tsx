import React from "react";
import { TouchableOpacity, Image, Text, TouchableOpacityProps, ImageProps } from "react-native";
import { styles } from "./styles";

import CirculoHabilidade from "../../assets/images/PngItem_2901848.png";
import { HabilidadeProps } from "../../screens/skills";

interface CartaHabilidadeProps extends TouchableOpacityProps {
    habilidade: HabilidadeProps,
};

export const CartaHabilidade = ({habilidade, ...rest}: CartaHabilidadeProps) => {

    return <TouchableOpacity style={styles.buttonSkill} {...rest}>
        <Image source={CirculoHabilidade} style={styles.image} />
        <Text style={styles.textSkill}>
            {habilidade.name}
        </Text>
    </TouchableOpacity>
}
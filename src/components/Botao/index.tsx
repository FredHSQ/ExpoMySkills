import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles"

interface BotaoProps extends TouchableOpacityProps {
    titulo: string
}

export const Botao = ( {titulo, ...rest }: BotaoProps) => {

    return <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        {...rest}
    >
        <Text style={styles.buttonText}>
            {titulo}
        </Text>
    </TouchableOpacity>
}
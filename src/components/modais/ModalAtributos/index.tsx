import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, ModalProps, ScrollView, Image, Button } from "react-native";
import { ItemMagico, ListaItemMagico } from "../../../screens/Loja";
import { styles } from "./styles";

import IconeFechar from "../../../assets/icons/close_FILL0_wght400_GRAD0_opsz48.png"
import { buscaItemMagicoEspecifico } from "../../../services/api";
import { Botao } from "../../Botao";
import { ContextoCarrinho } from "../../../context/CarrinhoContexto";

interface ModalAtributosProps extends ModalProps {
    visibilidadeModal: boolean,
    setVisibilidadeModal: React.Dispatch<React.SetStateAction<boolean>>,
    indexItemMagico: string,
    preco?: string,
    carrinho?:boolean
}

export const ModalAtributos = ({ visibilidadeModal, setVisibilidadeModal, indexItemMagico, preco, carrinho }: ModalAtributosProps) => {

    const [reload, setReload] = useState<boolean>(false);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [itemMagicoDetalhes, setItemMagico] = useState<ItemMagico>({
        index: "",
        name: "",
        equipment_category: {
            index: "",
            name: "",
            url: ""
        },
        rarity: {
            name: "",
        },
        variants: [{
            index: "",
            name: "",
            url: "",
        }],
        variant: false,
        desc: [""],
        url: "",
    });

    const adiconaItemCarrinho = useContext(ContextoCarrinho).adiconaItemCarrinho;
    const retiraItemCarrinho = useContext(ContextoCarrinho).retiraItemCarrinho;

    const itemMagico: ListaItemMagico = {
        index: itemMagicoDetalhes.index,
        name: itemMagicoDetalhes.name,
        url: itemMagicoDetalhes.url,
        preco: preco ? preco : Math.floor(Math.random() * 10000).toString()
    };

    useEffect(() => {
        setCarregando(true);
        buscaItemMagicoEspecifico(indexItemMagico).then((res) => {
            setItemMagico(res.data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setCarregando(false);
        })
    }, [reload, indexItemMagico]);

    

    function lidaBotao (){
        if (carrinho) {
            retiraItemCarrinho(itemMagico.index);
            setVisibilidadeModal(false);
        } else {
            adiconaItemCarrinho(itemMagico);
            setVisibilidadeModal(false);
        }
    }

    return <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
            setVisibilidadeModal(false)
        }}
        visible={visibilidadeModal}
    >
        <View style={styles.modal}>
            <View style={styles.modalContainer}>
                {carregando ? <Text style={styles.text}>
                    Carregando
                </Text>
                    :
                    <>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {itemMagicoDetalhes.name}
                            </Text>
                            <TouchableOpacity onPress={() => setVisibilidadeModal(false)} style={{ alignContent: "flex-end", width: "10%" }}>
                                <Image
                                    source={IconeFechar}
                                    style={styles.closeIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <ScrollView indicatorStyle="white" style={{ padding: 5 }}>
                            <View>
                                <View>
                                    <Text style={styles.textTitle}>
                                        Raridade:
                                    </Text>
                                    <Text style={styles.text}>
                                        {itemMagicoDetalhes.rarity.name}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.textTitle}>
                                        Tipo:
                                    </Text>
                                    <Text style={styles.text}>
                                        {itemMagicoDetalhes.desc[0]}
                                    </Text>
                                </View>
                                <View style={styles.firstStats}>
                                    <Text style={styles.textTitle}>
                                        Price:
                                    </Text>
                                    <Text style={styles.text}>
                                        R$ {itemMagico.preco},00
                                    </Text>
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.textTitle}>
                                        Descrição:
                                    </Text>
                                    <Text style={styles.text}>
                                        {itemMagicoDetalhes.desc[1]}
                                    </Text>
                                </View>
                                {itemMagicoDetalhes.desc[2] && <View style={styles.descriptionContainer}>
                                    <Text style={styles.textTitle}>
                                        Informação adicional:
                                    </Text>
                                    <Text style={styles.text}>
                                        {itemMagicoDetalhes.desc.map((text, index) => {
                                            if (index > 1)
                                                return text + " "
                                        }
                                        )}
                                    </Text>
                                </View>
                                }
                            </View>
                        </ScrollView>
                    </>
                }
                <Botao titulo={carrinho ? "Retirar do Carrinho" : "Comprar"} onPress={() => { lidaBotao() }} />
            </View>
        </View>
    </Modal>
}

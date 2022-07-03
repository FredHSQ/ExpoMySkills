import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from "react-native";
import { styles } from "./styles";

import { Botao } from "../../components/Botao";
import { CartaHabilidade } from "../../components/CartaHabilidade";

export interface HabilidadeProps {
    id: string,
    name: string,
};

export const Skills = () => {
    const [greetings, setGreetings] = useState<string>('');
    const [skill, setSkill] = useState<string>('');
    const [habilidadeLista, setHabilidadeLista] = useState<HabilidadeProps[]>([]);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreetings('GoodMorning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreetings('Good Afternoon');
        } else {
            setGreetings('Good Evening');
        }
    }, []);

    function addSkillToList() {
        let newSkill: HabilidadeProps = {
            id: String(new Date().getTime()),
            name: skill,
        };
        setHabilidadeLista([...habilidadeLista, newSkill]);
        setSkill(skill);
    }

    return <View style={styles.container}>
        <Text style={styles.title}>
            {greetings}!
        </Text>

        <TextInput
            style={styles.input}
            value={skill}
            onChangeText={(e) => setSkill(e)}
        />

        <Botao
            titulo="Adicionar"
            onPress={addSkillToList}
        />

        <Text style={[styles.title, { marginVertical: 20 }]}>
            My skills
        </Text>

        <FlatList
            data={habilidadeLista}
            renderItem={({ item }) =>
                <CartaHabilidade
                    habilidade={item}
                />
            }
            keyExtractor={item => item.id}
        />

    </View>
}
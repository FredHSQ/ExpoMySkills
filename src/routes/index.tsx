import React from 'react';
import { Image } from 'react-native';

import { Skills } from '../screens/skills';
import { Loja } from '../screens/Loja';

import IconeSkills from "../assets/icons/fact_check_FILL0_wght400_GRAD0_opsz48.png"
import LojaIcon from '../assets/icons/storefront_FILL0_wght400_GRAD0_opsz48.png';
import CarrinhoIcon from '../assets/icons/shopping_cart_FILL0_wght400_GRAD0_opsz48.png'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Carrinho } from '../screens/Carrinho';

const Tab = createBottomTabNavigator<ListaParametrosRotasTab>();

export type ListaParametrosRotasTab = {
    Skills: undefined;
    Loja: undefined;
    Carrinho: undefined;
};

export const Routes = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: "#000", paddingBottom: 2 },
                    tabBarActiveTintColor: '#a370f7',
                    tabBarInactiveTintColor: '#aaa',
                }}
            >
                <Tab.Screen
                    name="Skills"
                    component={Skills}
                    options={{
                        tabBarIcon: ({color}) => (
                            <Image
                                resizeMode='contain'
                                style={{width: 30, tintColor: color }}
                                source={IconeSkills}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Loja"
                    component={Loja}
                    options={{
                        tabBarIcon: ({color})=> (
                            <Image
                                resizeMode='contain'
                                style={{width: 30, tintColor: color }}
                                source={LojaIcon}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Carrinho"
                    component={Carrinho}
                    options={{
                        tabBarIcon: ({color})=> (
                            <Image
                                resizeMode='contain'
                                style={{width: 30, tintColor: color }}
                                source={CarrinhoIcon}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

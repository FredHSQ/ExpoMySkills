import axios from "axios";

const apiItemsMagicos = axios.create({
    baseURL: 'https://www.dnd5eapi.co/api/',
});

export function buscaItemsMagicos () {
    const url = `magic-items`;

    return apiItemsMagicos.get(url);
}

export function buscaItemMagicoEspecifico (index: string) {
    const url = `magic-items/${index}`;

    return apiItemsMagicos.get(url);
}

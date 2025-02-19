import { defineStore } from "pinia";
import axios from "axios";


export const useCharacterStore  = defineStore('characteres', {
    state: () => ({
        characters: [],
    }),
    actions: {
        async fetchCharacters() {
            try {
                const response = await axios.get('https://dragonball-api.com/api/characters?limit=58')
                this.characters = response.data.items
            } catch (error) {
                console.log('Error al cargar personajes', error)
            }
        }
    }
} )
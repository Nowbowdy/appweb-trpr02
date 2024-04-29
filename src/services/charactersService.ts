import axios from 'axios'
import { API_URL } from './global'

async function getCharacters () {
  const { data } = await axios.get(`${API_URL}/characters`)
  return data
}

async function getCharacter (id : string) {
  const { data } = await axios.get(`${API_URL}/characters/${id}`)
  return data
}

export const charactersService = {
    getCharacters,
    getCharacter,
  
}
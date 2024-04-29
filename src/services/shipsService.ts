import axios from 'axios'
import { API_URL } from './global'

async function getShips () {
  const { data } = await axios.get(`${API_URL}/ships`);
  return data
}

async function getShip (id : string) {
  const { data } = await axios.get(`${API_URL}/ships/${id}`)
  return data
}

export const shipsService = {
    getShips,
    getShip,
  
}
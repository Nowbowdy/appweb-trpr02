import axios from 'axios'
import type Ranking from '../scripts/ranking'
import { API_URL } from './global'

async function getRankings () {
  const { data } = await axios.get(`${API_URL}/ranking`)
  return data
}

async function getRanking (id : string) {
  const { data } = await axios.get(`${API_URL}/ranking/${id}`)
  return data
}

async function addRanking(rankingData: Ranking) {
  const response = await axios.post(`${API_URL}/ranking`, rankingData);
  return response.data;
}

export const rankingsService = {
    getRankings,
    getRanking,
    addRanking
}
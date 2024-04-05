import axios from 'axios'
// import { API } from '@/shared/config'

// Note sur le gestion des erreurs:
// - Dans ce projet, la gestion des erreurs (try/catch) est gérée par le code qui utilise ce service.
// - Dans un contexte d'entreprise, il serait utile de loguer les erreurs qui surviennent dans ce service et ensuite de les relancer en précisant le contexte de l'erreur.

const API_URL = 'http://127.0.0.1:3000'

async function getRankings () {
  const { data } = await axios.get(`${API_URL}/characters`)
  return data
}

async function getRanking (id : string) {
  const { data } = await axios.get(`${API_URL}/characters/${id}`)
  return data
}

export const postsService = {
    getRankings,
    getRanking,
  
}
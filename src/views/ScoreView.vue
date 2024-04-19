<!-- Ce composant est associé à la route "/about" (voir fichier src/router/index.ts). -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { rankingsService } from '../services/rankingsService'
import type Ranking from '../scripts/ranking'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const rankings = ref([] as Ranking[])
const isLoading = ref(false)

const orderedRankingsList = ref([] as Ranking[])

//Méthode tiré d'ici : https://www.w3schools.com/js/js_array_sort.asp#mark_numeric
function orderRankingListByScore(unorderedRankingList: Ranking[]) : Ranking[]{
  return (unorderedRankingList.sort(function(a, b){return a.score - b.score})).reverse();
}

//onMounted est utilisée pour exécuter du code spécifiquement après que le composant a été monté dans le DOM (Document Object Model).
onMounted(async () => {
  isLoading.value = true

  try 
  {
    rankings.value = await rankingsService.getRankings()
    orderedRankingsList.value = orderRankingListByScore(rankings.value)

  } 
  catch (error) 
  {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Est-ce que vous avez démarré le backend localement ?`,
      { duration: 6000 }
    )
  } 
  finally 
  {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container mt-5">
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ranking, index) in orderedRankingsList" v-bind:key="ranking.id"> 
          <th scope="row">{{index + 1}}</th>
          <td>{{ ranking.name }}</td>
          <td>{{ ranking.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loading :active="isLoading" />
</template>

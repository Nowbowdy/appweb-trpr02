<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-loading-overlay/dist/css/index.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import type Ship from '../scripts/ship'

const DEFAULT_SHIP = "Millennium Falcon";

const props = defineProps({
  ships: Array as () => Ship[]
})

const isLoading = ref(false)
const fetchedPlayerName = ref('')
const fetchedShipName = ref('')

onMounted(async () => {
  isLoading.value = true
  try
  {
    fetchedShipName.value = DEFAULT_SHIP;
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
    isLoading.value = false;
    
  }
})
</script>

<template>
    <div class="container">
      
    <h4 class="text-center mt-5">Votre objectif: Survivre à 5 missions en obtenant le plus de crédits galactiques.</h4>

    <div class="col-4 mx-auto mt-5">

      <div class="row">
        <label>Nom du joueur :</label>
        <input type="text" id="playerInput" name="playerInput" v-model="fetchedPlayerName">
      </div>

      <div class="row mt-3">
        <label>Choix du vaisseau :</label>
        <select name="player-ship-select" id="player-ship-select" v-model="fetchedShipName">
          <option v-for="ship in ships" v-bind:key="ship.id" :value="ship.name"> {{ ship.name }}</option>
        </select>
      </div>

      <div class="mt-3 text-center">
        <RouterLink
          v-if="fetchedPlayerName && fetchedShipName"
          :to="{
            name: 'Game',
            params: { 
              playerName: fetchedPlayerName, 
              shipName: fetchedShipName
            }
          }"
        >
        <!--Venir emit la valeur ici-->
          <button class="btn btn-outline-dark">Combattre !</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
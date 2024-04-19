<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { shipsService } from '../services/shipsService'
import { useToast } from 'vue-toast-notification'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import type Ship from '../scripts/ship'
import { rng, setDefaultValue } from '@/scripts/utility'

const isLoading = ref(false)
const ships = ref([] as Ship[])
const fetchedPlayerName = ref('')
const fetchedShipName = ref('')

onMounted(async () => {
  isLoading.value = true
  try
  {
    ships.value = await shipsService.getShips();
    fetchedPlayerName.value = "";
    fetchedShipName.value = ships.value[rng(0, ships.value.length)].name;
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

<!-- Ce composant est associé à la route "/". Il affiche la liste des publications de l'utilisateur. Lorsque l'utilisateur clique sur l'un des liens "Éditer" associés à une publication, il est redirigé vers la route "/posts/:id" (voir fichier src/router/routes.js). -->
<template>

  <div class="container">
    <h4 class="text-center">Votre objectif: Survivre à 5 missions en obtenant le plus de crédits galactiques.</h4>

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
      <div class="row mt-3 text-center">
        <RouterLink
          :to="{
            name: 'Game',
            params: { 
              playerName: setDefaultValue(fetchedPlayerName, `DEFAULT-PLAYER-NAME`), 
              shipName: setDefaultValue(fetchedShipName, `DEFAULT-SHIP-NAME`)
            }
          }"
        >
          <button :disabled="fetchedPlayerName.length === 0">Combattre !</button>
        </RouterLink>
      </div>

      <!-- La libraire vue-loading-overlay a été installée dans ce projet avec npm. C'est une librairie qui facilite la mise en place d'un indicateur de chargement. Pour plus d'information sur son utilisation voir https://github.com/ankurk91/vue-loading-overlay. -->
      <Loading :active="isLoading" />
    </div>
  </div>
  
</template>

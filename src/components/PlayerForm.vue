<script setup lang="ts">
import { onMounted, ref } from 'vue'


import type Ship from '../scripts/ship'


const props = defineProps({
  ships: Array as () => Ship[]
})

const shipName = ref('')
const playerName = ref('')


  
</script>

<template>
    <div class="container">
      
    <h4 class="text-center mt-5">Votre objectif: Survivre à 5 missions en obtenant le plus de crédits galactiques.</h4>

    <div class="col-4 mx-auto mt-5">

      <div class="row">
        <label>Nom du joueur :</label>
        <input type="text" id="playerInput" name="playerInput" v-model="playerName">
      </div>

      <div class="row mt-3">
        <label>Choix du vaisseau :</label>
        <select name="player-ship-select" id="player-ship-select" v-model="shipName">
          <option v-for="ship in ships" v-bind:key="ship.name" :value="ship.name"> {{ ship.name }}</option>
        </select>
      </div>

      <div class="mt-3 text-center">
        <RouterLink
          v-if="shipName && playerName"
          :to="{
            name: 'Game',
            params: { playerName: playerName, shipName: shipName }
          }"
        >
        <button>Combattre !</button>
        </RouterLink>

      </div>
    </div>
  </div>
</template>
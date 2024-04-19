<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, onBeforeRouteLeave  } from 'vue-router'
import { charactersService } from '../services/charactersService'
import { shipsService } from '@/services/shipsService'
import ConfirmModal from '../components/ConfirmModal.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import type Character from '../scripts/character'
import type Ship from '../scripts/ship'
import type CharacterShip from '../scripts/characterShip'

const props = defineProps({
  id: String
})

const player = ref([] as unknown as CharacterShip)
const isLoading = ref(false)

// Mik: On va sûrement les utilisé plus tard donc je les laisse là.
const triggerModal = ref(0)
const router = useRouter()

/**
 * Renvoie un des vaiseaux trouvé pendant la recherche.
 * 
 * @param characters Les characters qui ont le vaiseau que l'on cherche.
 * @param id         L'id pour trouver le vaisseau.
 * 
 * @returns Un des vaiseau trouvé.
 */
function chooseOneOfManyShips(characters:Array<Character>, id:number): CharacterShip {
  // Le "any" est pour ne pas avoir d'erreur TypeScript.
  let charWithShip:Array<any> = characters.filter((data) => data.ship.id === id);
  return charWithShip[rng(0,charWithShip.length)].ship;
}

function rng(min:number, max:number){
  return Math.floor(Math.random() * (max - min)) + min;
}

onMounted(async () => {
  isLoading.value = true
  try {
    const retrievedShips = await charactersService.getCharacters()
    player.value = chooseOneOfManyShips(retrievedShips, parseInt(props.id!))
  } catch (error) {
    console.error('Erreur avec le service: ', (error as any).message)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>



    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Informations partie</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-6">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Informations joueur</h5>
              <p class="card-text" >{{ player.name }}</p>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Informations ennemi</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-12">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Actions partie</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>









    <h1>Game View</h1>
    <form class="row g-3">
      <label for="title-input">ID du vaisseau</label>
      <input
        type="number"
        id="ship-id"
        class="form-control"
        v-model="player.id"
      />

      <label for="title-input">Nom du vaisseau</label>
      <input
        type="text"
        id="ship-name"
        class="form-control"
        v-model="player.name"
      />

      <label for="title-input">Vitalité du vaisseau</label>
      <input
        type="number"
        id="ship-vitality"
        class="form-control"
        v-model="player.vitality"
      />
    </form>
  </div>
</template>

<style scoped></style>
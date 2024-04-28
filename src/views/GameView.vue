<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, onBeforeRouteLeave  } from 'vue-router'
import { charactersService } from '../services/charactersService'
import { shipsService } from '@/services/shipsService'
import ConfirmModal from '../components/ConfirmModal.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import type Character from '../scripts/character'
import type CharacterShip from '../scripts/characterShip'
import { rng } from '../scripts/utility'

import GameInformations from '../components/GameInformations.vue'
import EnemyInformations from '../components/EnemyInformations.vue'
import PlayerInformations from '../components/PlayerInformations.vue'
import GameActions from '../components/GameActions.vue'
import type Player from '../scripts/player'
import type PlayerShip from '../scripts/playerShip'

const DEFAULT_SHIP_VITALITY: number = 100;
const DEFAULT_PLAYER_EXPERIENCE: String = "Maitre"


let myPlayer = ref<Player>()
let myShip: PlayerShip

let myEnemy = ref<Character>()
let characterList: Character[]

const props = defineProps({
  playerName: String,
  shipName: String
})

const fetchedPlayerName = ref<string>('')
const fetchedPlayerShip = ref([] as unknown as CharacterShip)
const isLoading = ref(false)

// Mik: On va sûrement les utilisé plus tard donc je les laisse là.
const triggerModal = ref(0)
const router = useRouter()

function getRandomCharacterAsEnemy()
{
  myEnemy.value = characterList[rng(0, characterList.length)]
}

function createPlayerShipObject()
{
  myShip = {
    shipName: props.shipName!,
    vitality: DEFAULT_SHIP_VITALITY
  }
}

function createPlayerObject()
{
  isLoading.value = true;

  myPlayer.value = {
    name: props.playerName!,
    experience: DEFAULT_PLAYER_EXPERIENCE,
    score: 0,
    ship: myShip

  }
  isLoading.value = false;

}

onMounted(async () => {
  isLoading.value = true
  try {
    characterList = await charactersService.getCharacters()

    //Création du vaisseau du joueur (nom + vitalité)
    createPlayerShipObject()

    //Création du joueur (nom + xp + score + vaisseau créé en haut)
    createPlayerObject()

    //Initialisation du premier ennemi en cherchant un "character" de manière random (nom + xp + score + vaisseau)
    getRandomCharacterAsEnemy()

    fetchedPlayerName.value = props.playerName!
  } catch (error) {
    console.error('Erreur avec le service: ', (error as any).message)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
    <div class="container mt-5">

      <GameInformations />

      <div class="row mt-3" v-if="myPlayer && myEnemy">
        <PlayerInformations :player="myPlayer!" />

        <EnemyInformations :enemy="myEnemy" />
      </div>
      <div class="row mt-3" v-else>
        <Loading :active="isLoading" />
      </div>

      <GameActions />
    </div>
</template>

<style scoped></style>
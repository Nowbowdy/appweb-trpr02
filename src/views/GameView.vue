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


const STARTING_SHIP_VITALITY = 100;

const props = defineProps({
  playerName: String,
  shipName: String
})

const fetchedPlayerName = ref('')
const fetchedPlayerShip = ref([] as unknown as CharacterShip)
const isLoading = ref(false)

// Mik: On va sûrement les utilisé plus tard donc je les laisse là.
const triggerModal = ref(0)
const router = useRouter()



onMounted(async () => {
  isLoading.value = true
  try {
    const retrievedShips = await charactersService.getCharacters()
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

      <div class="row mt-3">
        <PlayerInformations :playerName="props.playerName" />

        <EnemyInformations />
      </div>

      <GameActions />

    </div>
</template>

<style scoped></style>
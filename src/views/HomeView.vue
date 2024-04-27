<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { shipsService } from '../services/shipsService'
import { useToast } from 'vue-toast-notification'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import type Ship from '../scripts/ship'
import PlayerForm from '../components/PlayerForm.vue'

const isLoading = ref(false)
const ships = ref([] as Ship[])

onMounted(async () => {
  isLoading.value = true
  try
  {
    ships.value = await shipsService.getShips();
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
  <PlayerForm :ships="ships" />
  <Loading :active="isLoading" />
</template>
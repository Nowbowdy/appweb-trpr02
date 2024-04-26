<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { shipsService } from '../services/shipsService'
import { useToast } from 'vue-toast-notification'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import type Ship from '../scripts/ship'
import { rng, setDefaultValue } from '@/scripts/utility'

import PlayerForm from '../components/PlayerForm.vue'
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
  <PlayerForm :ships="ships" :initialShipName="initialShipName" />

  <Loading :active="isLoading" />
</template>

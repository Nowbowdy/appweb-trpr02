<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { shipsService } from '../services/shipsService'
import type Ship from '../scripts/ship'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const ships = ref([] as Ship[])
const isLoading = ref(false)


//onMounted est utilisée pour exécuter du code spécifiquement après que le composant a été monté dans le DOM (Document Object Model).
onMounted(async () => {
  isLoading.value = true

  try 
  {
    ships.value = await shipsService.getShips()
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
        <input type="text" id="playerInput" name="playerInput">
      </div>


      <div class="row mt-3">
        <label>Choix du vaisseau :</label>

        <select>
          <option v-for="ship in ships" v-bind:key="ship.id"> {{ ship.name }}</option>
        </select>
      </div>
      <div class="row mt-3 text-center">
        <RouterLink
          :to="{
            name: 'Score',
            // On peut passer des props à la route. Ici, on passe l'id du post à éditer pour que le composant PostDetailView puisse récupérer la publication et l'afficher.
            // Attention, l'autorisation de passer des paramètres à un composant doit être activé dans la déclaration de la route (voir la route PostDetailView dans le fichier routes.js).

            //Zach :: Passer l'id du vaisseaux, mais il faut linker le choix de vaisseaux avec un variable dynamique
            //params: { id: ship.id }
          }"
        >
          <button>Combattre !</button>
        </RouterLink>
      </div>


      <!-- La libraire vue-loading-overlay a été installée dans ce projet avec npm. C'est une librairie qui facilite la mise en place d'un indicateur de chargement. Pour plus d'information sur son utilisation voir https://github.com/ankurk91/vue-loading-overlay. -->
      <Loading :active="isLoading" />
    </div>
  </div>
  
</template>

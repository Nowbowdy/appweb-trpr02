<script setup lang="ts">

//Le reste
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

//Service
import { charactersService } from '../services/charactersService'

//Composants
import ConfirmModal from '../components/ConfirmModal.vue'
import GameInformations from '../components/GameInformations.vue'
import EnemyInformations from '../components/EnemyInformations.vue'
import PlayerInformations from '../components/PlayerInformations.vue'
import GameActions from '../components/GameActions.vue'

//Scripts et types
import type Player from '../scripts/player'
import type PlayerShip from '../scripts/playerShip'
import type Character from '../scripts/character'
import type CharacterShip from '../scripts/characterShip'
import { rng } from '../scripts/utility'

//Constantes
const DEFAULT_SHIP_VITALITY: number = 100;
const DEFAULT_PLAYER_EXPERIENCE: String = "Maitre"

//Variables de jeu
let isGameStarted: boolean
let isGameWon: boolean

//variables du modal (Venir modifier les valeurs pour changer ce qu'affiche le modal)
let modalTitleText: string
let modalBodyText: string
let modalConfirmButtonText: string
let modalCancelButtonText: string
let modalCancelButtonStyle: string

//Variable du joueur
const myPlayer = ref<Player>()
let myShip: PlayerShip

//Variable des ennemis
const myEnemy = ref<Character>()
let characterList: Character[]

//Variables de fonctionnalités
const triggerModal = ref<number>(0)
let router = useRouter()
let nextRoute: string;
const isLoading = ref<boolean>(false)

//Définition des props
const props = defineProps({
  playerName: String,
  shipName: String
})

//Actions lors du montage de la vue
onMounted(async () => {
  isLoading.value = true
  try {
    characterList = await charactersService.getCharacters()

    initialize()

  } catch (error) {
    console.error('Erreur avec le service: ', (error as any).message)
  } finally {
    isLoading.value = false
  }
})

//Fonction appelée lorsque l'on quitte une page
onBeforeRouteLeave((to, from, next) => {
  if (isGameStarted) { //Vérifie que la partie soit commencé

    nextRoute = to.name!.toString() //Récupère le nom du path vers lequel on allait
    triggerModal.value++ //Déclenche l'affichage du modal

    next(false) //Empêche la navigation
  } else {
    next() // Poursuit la navigation
  }
});

//Initialise les variables de départ de la partie
function initialize()
{
  //variable de la partie
  isGameStarted = true
  isGameWon = true

  //Création et initialisation du vaisseau du joueur (nom + vitalité)
  createPlayerShipObject()

  //Création et initialisation du joueur (nom + xp + score + vaisseau créé en haut)
  createPlayerObject()

  //Initialisation du premier ennemi en cherchant un "character" de manière random (nom + xp + score + vaisseau)
  getRandomCharacterAsEnemy()


  //variables de départ du modal
  modalTitleText = "Êtes-vous sur de vouloir quitter ?"
  modalBodyText = "Votre progression sera perdue."
  modalConfirmButtonText = "Oui ..."
  modalCancelButtonText = "Non !"
  modalCancelButtonStyle = 'block'
}

//Donne un ennemi "random" parmis la liste
function getRandomCharacterAsEnemy()
{
  myEnemy.value = characterList[rng(0, characterList.length)]
}

//Initialise les données du vaisseau du joueur
function createPlayerShipObject()
{
  myShip = {
    shipName: props.shipName!,
    vitality: DEFAULT_SHIP_VITALITY
  }
}

//Initialise les données du joueur
function createPlayerObject()
{
  myPlayer.value = {
    name: props.playerName!,
    experience: DEFAULT_PLAYER_EXPERIENCE,
    score: 0,
    ship: myShip
  }
}

//Fonction de fin de partie
function finishGame()
{

  //Sert à venir cacher le bouton "Non" dans le modal lorsque la partie est fini (pour empêcher le joueur de juste dire "non")
  if(isGameWon){
    modalCancelButtonStyle = "none"
  }
}


function modalConfirmed()
{
  isGameStarted = false //Pour empêcher de rentrer une seconde fois dans le "if" de onBeforeRouteLeave (J'ai cherché longtemps pourquoi le route.push fonctionnait pas et c'était à cause de sa)

  router.push({ name: nextRoute })   //Envoie l'utilisateur sur la page choisie
}

</script>

<template>
    <div class="container mt-5">

      <ConfirmModal 
        :trigger="triggerModal"
        :title="modalTitleText"
        :body="modalBodyText"
        :confirmButton="modalConfirmButtonText"
        :cancelButton="modalCancelButtonText"
        :display="modalCancelButtonStyle"
        @onModalConfirmed="modalConfirmed()"
      />

      <GameInformations />

      <div class="row mt-3" v-if="myPlayer && myEnemy"> <!--On s'assure que les variables soient initialisées avant d'afficher les composants-->
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
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
const DEFAULT_PLAYER_EXPERIENCE: String = "Maître";
const POSSIBLE_GAME_STATE = Object.freeze({
    SUCCESS: 0,
    FAILURE: 1,
    PLAYING: 2,
    IDLE: 3,
    FAST_FORWARD: 4
});

//Variables de jeu
let gameState: number
let enemyCount: number

//variables du modal (Venir modifier les valeurs pour changer ce qu'affiche le modal)
let modalTitleText: string
let modalBodyText: string
let modalConfirmButtonText: string
let modalCancelButtonText: string
let modalConfirmButtonStyle: string
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
    if (gameState === POSSIBLE_GAME_STATE.PLAYING) { //Vérifie que la partie soit commencé

        nextRoute = to.name!.toString() //Récupère le nom du path vers lequel on allait
        triggerModal.value++ //Déclenche l'affichage du modal

        next(false) //Empêche la navigation
    } else {
        next() // Poursuit la navigation
    }
});

//Initialise les variables de départ de la partie
function initialize() {
    //variable de la partie
    gameState = POSSIBLE_GAME_STATE.PLAYING;
    enemyCount = 1;

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
function getRandomCharacterAsEnemy() {
    myEnemy.value = characterList[rng(0, characterList.length)]
}

//Initialise les données du vaisseau du joueur
function createPlayerShipObject() {
    myShip = {
        shipName: props.shipName!,
        vitality: DEFAULT_SHIP_VITALITY
    }
}

//Initialise les données du joueur
function createPlayerObject() {
    myPlayer.value = {
        name: props.playerName!,
        experience: DEFAULT_PLAYER_EXPERIENCE,
        score: 0,
        ship: myShip
    }
}

//Fonction de fin de partie
function modalConfirmed() {
    //Pour empêcher de rentrer une seconde fois dans le "if" de onBeforeRouteLeave (J'ai cherché longtemps pourquoi le route.push fonctionnait pas et c'était à cause de sa)
    gameState = POSSIBLE_GAME_STATE.IDLE;
    router.push({ name: nextRoute })   //Envoie l'utilisateur sur la page choisie
}









// Mik: Je m'excuse si c'est pas claire, je vais commenter/mettre des constantes plus tard.
function getHitrateBasedOnRank(exp: number) {
    switch (exp) {
        case 1: return 20;
        case 2: return 35;
        case 3: return 50;
        case 4: return 70;
        default: return -1;
    }
}

const changeModalForSuccessState = () => {
    gameState = POSSIBLE_GAME_STATE.SUCCESS;
    nextRoute = "Score"
    modalTitleText = "Partie terminée avec succès!";
    modalBodyText = `Votre nombre total de crédits galactiques est de ${myPlayer.value!.score}.`
    modalConfirmButtonText = "Ok !";
    modalConfirmButtonStyle = "block";
    modalCancelButtonStyle = "none";
    triggerModal.value++;
}

const changeModalForFailureState = () => {
    gameState = POSSIBLE_GAME_STATE.FAILURE;
    nextRoute = "Home"
    modalTitleText = "Partie terminée sans succès...";
    modalBodyText = `Votre vaisseau à été explosé, vous n'avez pas terminé les 5 missions`;
    modalConfirmButtonText = "Ok ...";
    modalConfirmButtonStyle = "block";
    modalCancelButtonStyle = "none";
    triggerModal.value++;
}

const changeModalForIdleState = () => {
    gameState = POSSIBLE_GAME_STATE.IDLE;
    modalTitleText = "Récapitulatif";
    modalBodyText = `Vous avez obtenu ${myEnemy.value!.credit} du vaiseau adverse.`
    modalCancelButtonText = "Ok";
    modalConfirmButtonStyle = "none";
    modalCancelButtonStyle = "block";
    triggerModal.value++;
}

const changeModalForLeavingPageEarly = () => {
    modalTitleText = "Êtes-vous sur de vouloir quitter ?"
    modalBodyText = "Votre progression sera perdue."
    modalConfirmButtonText = "Oui ..."
    modalCancelButtonText = "Non !"
    modalConfirmButtonStyle = "block";
    modalCancelButtonStyle = 'block'
}

const handleEndgame = () => {
    switch(gameState){
        case POSSIBLE_GAME_STATE.SUCCESS: changeModalForSuccessState(); break;
        case POSSIBLE_GAME_STATE.FAILURE: changeModalForFailureState(); break;
    }
}

const isGameOver = () => gameState === POSSIBLE_GAME_STATE.SUCCESS || gameState === POSSIBLE_GAME_STATE.FAILURE;

const attackOpponent = (target:any, hitrate:number) => {
    if (rng(0, 100 + 1) <= hitrate) {
        target.value!.ship.vitality -= rng(3, 6 + 1)
        if(target.value!.ship.vitality <= 0){
            target.value!.ship.vitality = 0;
        }
    }
}

const handlePostGame = () => {
    if(myPlayer.value!.ship.vitality === 0) changeModalForFailureState();
    else if(myEnemy.value!.ship.vitality === 0) killedEnemySequence();
}

const killedEnemySequence = () => {
    changeModalForIdleState();
    myPlayer.value!.score += myEnemy.value!.credit;
    getRandomCharacterAsEnemy();
    enemyCount++;
    if(enemyCount > 5){
        enemyCount--; // Pour rentrer dans le if mais que ce sois 5 qui est afficher sur la page.
        changeModalForSuccessState();
    }
}

const continueCombat = () => {
    if(!isGameOver()){
        if(gameState !== POSSIBLE_GAME_STATE.FAST_FORWARD) gameState = POSSIBLE_GAME_STATE.PLAYING;
        attackOpponent(myEnemy, getHitrateBasedOnRank(4));
        attackOpponent(myPlayer, getHitrateBasedOnRank(myEnemy.value!.experience));
        changeModalForLeavingPageEarly();
        handlePostGame();
    }
    else{
        handleEndgame();
    }
}

const finishMission = () => {
    if(!isGameOver()) {
        gameState = POSSIBLE_GAME_STATE.FAST_FORWARD;
        while(gameState === POSSIBLE_GAME_STATE.FAST_FORWARD){
            continueCombat();
        }
    }
    else{
        handleEndgame();
    }
}

const finishMissionAndHeal = () => {
    finishMission();
    if(gameState === POSSIBLE_GAME_STATE.IDLE) {
        let healing = Math.floor(myPlayer.value!.score / 5);
        if(myPlayer.value!.ship.vitality + healing > 100){
            healing = 100 - myPlayer.value!.ship.vitality;
        }
        myPlayer.value!.ship.vitality += healing;
        myPlayer.value!.score -= healing * 5;
    }
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
            :confirmButtonStyle="modalConfirmButtonStyle"
            :cancelButtonStyle="modalCancelButtonStyle" 
            @onModalConfirmed="modalConfirmed()"
        />

        <GameInformations :enemyCount="enemyCount" />

        <div class="row mt-3" v-if="myPlayer && myEnemy">
            <!--On s'assure que les variables soient initialisées avant d'afficher les composants-->
            <PlayerInformations :player="myPlayer!" />

            <EnemyInformations :enemy="myEnemy" />
        </div>
        <div class="row mt-3" v-else>
            <Loading :active="isLoading" />
        </div>

        <GameActions 
            @continue-combat="continueCombat()" 
            @quit-combat="finishMission()"
            @quit-combat-and-heal="finishMissionAndHeal()" 
        />
    </div>
</template>

<style scoped></style>
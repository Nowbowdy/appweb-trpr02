# Revue de code du TP2 de Zachary Vandermeerschen pour la semaine 3

Par Mikaël Charette

## **EnemyInformations.vue**
Je pense que `getExperienceString` aurait du être dans une classe global pour pouvoir être appelé pour le joueur.
En supposant que l'application évolue, il serait pertinent de la relocaliser.
```ts
function getExperienceString(rankingNumber: number)
{
    switch (rankingNumber) {
        case 1:
            return 'Débutant'
        case 2:
            return 'Confirmé'
        case 3:
            return 'Expert'
        case 4:
            return 'Maître'
        default:
            'Inconnu'
          break
    }
}
```

## **PlayerForm.vue**
La découverte de `v-if="fetchedPlayerName && fetchedShipName"` pour empêcher le `RouterLink` de créé une route dès que le component est chargé fut un miracle venu du ciel! Je remercie beaucoup Zac d'avoir pensé à ça car nous étions pris sur ce problème pendant bien trop longtemps.
```html
<RouterLink
  v-if="fetchedPlayerName && fetchedShipName"
  :to="{
    name: 'Game',
    params: { 
      playerName: fetchedPlayerName, 
      shipName: fetchedShipName
    }
  }"
>
<!--Venir emit la valeur ici-->
  <button class="btn btn-outline-dark">Combattre !</button>
</RouterLink>
```

## **PlayerInformations.vue**
Mes seul deux critiques ici seraient d'ajouter des `id` aux éléments HTML pour une plus grande facilité de tests et changé le nom de l'attribut `player.score` pour `player.credit` comme pour les ennemies. Ce fut un peu mêlant lors de la création de la logique de jeu pour savoir qui avait quoi.
```html
<h5 class="card-title">{{ props.player.experience }} {{ props.player.name }}</h5>
<p class="card-text" >{{ props.player.ship.shipName }} - {{ props.player.score }} GC</p>
<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" :style="{ width: props.player.ship.vitality + '%' }">
        {{ props.player.ship.vitality }}%
    </div>
</div>
```

## **EnemyInformations.test.ts**
Bon nommage de test. Bonne utilisation des props pour les tests.
```ts
it("devrait afficher l'experience (en string correspondant au int) et le nom de l'ennemi (reçu en props) en une ligne", async () => {
  const enemy = { 
      id: 1,        
      name: 'Test',
      credit: 0,
      experience: 4,
      ship: { id: 1, name:'Test', vitality: 100}
  }
  
  const wrapper = mount(EnemyInformations, {
    props: {
      enemy: enemy
    }
  })
  
  const experienceElement = wrapper.find('.card-title')

  expect(experienceElement.text()).toBe('Maître Test')
})
```

## **GameInformations.test.ts**
Encore une fois, bon nommage de test. Test efficace et simple pour voir si l'affichage change quand un props change de valeur.
```ts
it("Devrait afficher la manche en cours dynamiquement lorsque 'enemyCount' est changé", async () => {  
    const wrapper = mount(GameInformations, {
      props: {
        enemyCount: 1
      }
    })
    
    const p = wrapper.find('.card-text')
    expect(p.text()).toBe('1/5')

    await wrapper.setProps({ enemyCount: 2 });

    expect(p.text()).toBe('2/5')

})
```

## **GameView.vue**
Très bonne idée d'avoir séparé les variables en plusieurs section. Ce fut un plaisir de codé la logique de jeu avec un fichier si bien rangé.
```ts
//Le reste
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

//Service
import { charactersService } from '../services/charactersService'
import { rankingsService } from '../services/rankingsService'


//Composants
import ConfirmModal from '../components/ConfirmModal.vue'
import GameInformations from '../components/GameInformations.vue'
import EnemyInformations from '../components/EnemyInformations.vue'
import PlayerInformations from '../components/PlayerInformations.vue'
import GameActions from '../components/GameActions.vue'

//Scripts et types
import type Player from '../scripts/player'
import type Ranking from '../scripts/ranking'
import type PlayerShip from '../scripts/playerShip'
import type Character from '../scripts/character'
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

//Variables du joueur
const myPlayer = ref<Player>()
let myShip: PlayerShip

//Variables des ennemis
const myEnemy = ref<Character>()
let characterList: Character[]

//Variables de fonctionnalités
const triggerModal = ref<number>(0)
let router = useRouter()
let nextRoute: string;
const isLoading = ref<boolean>(false)

//Variables de rangs
let myRanking: Ranking
let rankings: Ranking[]
```
### initialize()
Bonne idée d'avoir mis la logique d'initialisation dans une fonction. Par contre pour le modal il aurait été mieux de faire une autre fonction pour l'initialiser. En sachant qu'il sera appeler plusieurs fois dans le future, une fonction pour le remettre "par défaut" aurait été apprécié.
```ts
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
```
### ConfirmModal
Bonne initialisation du ConfirmModal.
```html
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
```
### modalConfirmed
La fonction est un peu compliqué à suivre mais en général ça va.
```ts
async function modalConfirmed() {
    //Pour empêcher de rentrer une seconde fois dans le "if" de onBeforeRouteLeave (J'ai cherché longtemps pourquoi le route.push fonctionnait pas et c'était à cause de sa)

    if(gameState === POSSIBLE_GAME_STATE.SUCCESS)
    {
      createRankingObject()
      await rankingsService.addRanking(getRankingObject())
    }

    gameState = POSSIBLE_GAME_STATE.IDLE;
    router.push({ name: nextRoute })   //Envoie l'utilisateur sur la page choisie
}
```
### Fonction de création
Bonne utilisation de l'opérateur `...` dans la fonction `getGreatestRankingId`. Ça nous sauve des lignes de code. Si je ne m'abuse elle aurait même pus être fait en une ligne en faisant `return Math.max(...rankings.map(obj => obj.id))`. J'aime beaucoup les fonctions pour la création d'objet. Elles sont bien faitent.
```ts
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

//Fonction du rang pour le scoreboard
function getGreatestRankingId()
{
  let idList = rankings.map(obj => obj.id)
  return Math.max(...idList)
}

function createRankingObject()
{
  myRanking = {
      id: getGreatestRankingId() + 1,
      name: myPlayer.value!.name.toString(),
      score: myPlayer.value!.score,
  }
}
```
## Conclusion
Ce fut l'un de mes travails pratiques préféré de cette session.
\
\
Zachary est un chic type qui est plaisant à travailler avec. On c'est entraidé tout au long du travail. Nos interactions hors classe étaient plaisantes et dans le respect. Je ne pouvais demandé mieux comme coéquipier.
\
\
Nous sommes fier de l'application que nous avons créé. Nous trouvons l'interface simple mais belle. La logique applicative est toute là. Le jeu est robuste et il n'y a plus de bogue/avertissement dans la console.
\
\
Si on peut se remettre en équipe ensemble pour le TP3 je ne dis pas non 😉
\
\
🎉🎉🎉

---
# Revue de code du TP2 de Zachary Vandermeerschen pour la semaine 2

Par Mikaël Charette

## **HomeView.vue**
Zac s'est occupée de diviser l'application en components.
```html
<template>
  <PlayerForm :ships="ships" />

  <Loading :active="isLoading" />
</template>
```
## Conclusion
Ce fut une semaine avec beaucoup de maintenance.
\
\
Zac fut malade pendant une bonne partie de la semaine. Pendant son absence, je me suis occupé de faire le ménage dans GitHub parce qu'il y avait beaucoup de choses qui n'était pas au bon endroit et j'ai remarqué un peu trop tard qu'il fallait qu'on publie notre doc sur GitHub. Donc j'ai fais ça.
\
\
Mais quand il fut là, il a vraiment bien travaillé. Lui comme moi avions beaucoup de bug a gérer.
En plus de subdiviser l'application un peu trop tard en développement fait qu'on a pas l'impression d'avoir avancé beaucoup cette semaine. Je peux te dire que nous en apprenons beaucoup sur GitHub en ce moment dans nos cours et on deviens de plus en plus habile avec.
\
\
Sur ce, bonne dernière semaine de développement à nous 😉
\
\
🎉🎉🎉

---
# Revue de code du TP2 de Zachary Vandermeerschen pour la semaine 1

Par Mikaël Charette

## **ScoreView.vue**
Bon nommage de fonction, les noms des variables sont clairs et c'est un 'one ligner'.
```ts
//Méthode tiré d'ici : https://www.w3schools.com/js/js_array_sort.asp#mark_numeric
function orderRankingListByScore(unorderedRankingList: Ranking[]) : Ranking[]{
  return (unorderedRankingList.sort(function(a, b){return a.score - b.score})).reverse();
}
```
\
Bonne utilisation de Bootstrap. Quand il m'a montré à quoi ça ressemblais en classe, j'ai été étonné de la qualité de l'interface. Bonne idée aussi d'avoir utilisé 'v-for' pour peupler le tableau.
```html
  <div class="container mt-5">
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ranking, index) in orderedRankingsList" v-bind:key="ranking.id"> 
          <th scope="row">{{index + 1}}</th>
          <td>{{ ranking.name }}</td>
          <td>{{ ranking.score }}</td>
        </tr>
      </tbody>
    </table>
    <Loading :active="isLoading" />
  </div>
```
## Conclusion
Pas grand choses à dire pour cette semaine.
\
\
Très satisfait de ce qu'il a fait. C'est lui qui a créé le repository. 
\
\
Je sais qu'avec notre travail combiné nous avons une application qui marche mais nous devons maintenant codé la logique de jeu. Donc je m'attend à ce qu'il y ai beaucoup plus de commentaire la semaine prochaine.
\
\
🎉🎉🎉
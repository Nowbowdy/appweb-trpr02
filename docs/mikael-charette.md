# Revue de code de Mikael Charette

Par Zachary Vandermeerschen



# Semaine 1
## Envoie et réception d'informations.

Comme discuté avec le professeur, il serait plus judicieux de seulement récupérer le __nom__ du vaisseau _(ce qui nous intéresse)_ au lieu de récupérer l'__ID__ pour aller chercher le vaisseau ensuite.
```ts
<select name="player-ship-select" id="player-ship-select" v-model="shipID">
    <option v-for="ship in ships" v-bind:key="ship.id" :value="ship.id"> {{ ship.name }}</option>
</select>
```

```ts
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
```
_Je suis désolé que tu ai eu à autant te casser la tête Mike, je pensais qu'on avait mis sa au clair la dernière fois ^^', vraiment navré._


## Nommage de variables

Nom de variable confusant. (Temporaire je sais)

```ts
const post = ref([] as unknown as CharacterShip)
```

## Conclusion semaine 1

Malgré le léger problème de communication vis-à-vis l'information à récupérer et l'oubli du nom de variable, je suis très satisfait du code de mon collègue et regarde vers l'avant quant à la réalisation de ce projet !




# Semaine 2

Je ne pense pas que cette méthode nous soit vraiment utile, puisque nous n'avons pas besoin de récupérer le vaisseau que le joueur utilise, et que le vaisseau des ennemis est déjà inclu dans ses propriétés.

```ts
function getShipBasedOnName(characters:Array<Character>, name:string): CharacterShip {
  const character = characters.filter((data) => data.ship.name === name)[0];
  return {
    id: character.ship.id,
    name: character.ship.name,
    vitality: STARTING_SHIP_VITALITY
  }
}
```
D'après moi, il nous suffirait d'aller chercher tous les ennemis, de sortir un ennemi de façon random lorsque nécessaire, et d'afficher les informations du vaisseau dans les propriétés de l'ennemi.


## Conclusion semaine 2
Pas grand chose à dire cette semaine, nous n'avons pas vraiment avancé, beaucoup de petits problèmes ont été rencontrés, mais je pense qu'on va bien s'en sortir !


# Semaine 3


## Variables

Durant le développement, j'avais commencé à établir plusieurs _booléens_ pour l'état de la partie, __Mike__ est arrivé avec une superbe solution pour ne pas avoir _5 variables booléens_. J'ai beaucoup apprécié cette façon de faire. Peut-être seulement le _nom des états_ qui n'est pas assez __parlant__, mais n'étant pas parfaitement bilingue, cela doit sûrement venir de moi.
\
```ts
const POSSIBLE_GAME_STATE = Object.freeze({
    SUCCESS: 0,
    FAILURE: 1,
    PLAYING: 2,
    IDLE: 3,
    FAST_FORWARD: 4
});
```
\
D'après moi, ce nom de variable n'est pas assez explicite quant au lien qu'elle porte avec le nombre de manches, mais sinon le nom de variable fonctionne, c'est purement personnel.
```ts
let enemyCount: number
```

## Fonctions

#### getHitrateBasedOnRank
Je trouve que c'est une très bonne utilisation du __*switch()...case*__, rien à redire pour cette fonction.

```ts
function getHitrateBasedOnRank(exp: number) {
    switch (exp) {
        case 1: return 20;
        case 2: return 35;
        case 3: return 50;
        case 4: return 70;
        default: return -1;
    }
}
```

#### changeModalFor...
D'après moi, le code qui suit fait preuve de __*DRY*__, j'ai tendance à penser qu'une seule fonction venant modifier les variables selon, par exemple un _JSON_ passé en paramètre, fonctionnerait tout aussi bien, mais je ne sais pas si le __*DRY*__ ne serait pas juste déplacé à ce moment là. Bref, ces fonctions me laisse sceptique, mais je ne pense pas pouvoir mieux faire.

```ts
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
```

#### handleEndgame
Simple, efficace, compacte. Et ce genre de façon de faire est retrouvé dans bien des fonctions, j'apprécie énormément.

```ts
const handleEndgame = () => {
    switch(gameState){
        case POSSIBLE_GAME_STATE.SUCCESS: changeModalForSuccessState(); break;
        case POSSIBLE_GAME_STATE.FAILURE: changeModalForFailureState(); break;
    }
}
```

#### attackOpponent

Je pense que pour un soucis de lisibilité, nous aurions pu mettre la vie du joueur et de l'ennemi dans des variables.

```ts
const attackOpponent = (target:any, hitrate:number) => {
    if (rng(0, 100 + 1) <= hitrate) {
        target.value!.ship.vitality -= rng(3, 6 + 1)
        if(target.value!.ship.vitality <= 0){
            target.value!.ship.vitality = 0;
        }
    }
}
```



#### finishMissionAndHeal

Je trouve que cette méthode est compliqué à comprendre et aurait pu être plus simple.

```ts
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
```


# Conclusion finale

Je suis très satisfait du travail de mon collègue, je trouve qu'il a une façon de coder très "pro", et sa m'impressionne.
Je n'ai rien à dire sur le reste de son code.
\
\
Certes, je changerais certains noms de variables desquels je ne suis pas fan, mais c'est vraiment personnel.
Je pense même m'inspirer de certaines parties de son code dans le futur.
\
\
En bref, même si nous avons été dernière minute, je suis très satisfait de mon collègue et très heureux d'avoir pu travailler sur ce projet en sa compagnie. Il a été très disponible, flexible et compréhensif, et j'apprécie réellement ça ! 
\
\
Au plaisir de retravailler ensemble ! :)


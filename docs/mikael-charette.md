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
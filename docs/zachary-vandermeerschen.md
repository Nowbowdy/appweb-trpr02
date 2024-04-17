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
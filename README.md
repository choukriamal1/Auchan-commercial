. Si fetch('data.json') renvoie une erreur 404, le bloc catch est-il exécuté ? Comment gérer ce cas ?
Non, fetch ne rejette la Promise que sur une erreur réseau. Un 404 donne une réponse « réussie » avec response.ok === false. Il faut donc vérifier if (!response.ok) throw new Error(...) pour que l’erreur soit capturée par le catch.

fetch() envoie une requête HTTP et retourne une Promise, qui a trois états : pending (en cours), fulfilled (réussie) ou rejected (échouée).

Q1. Qu’est-ce qu’une requête GET et quel problème Fetch et Axios permettent-ils de résoudre ?
GET veut dire « lire » : la page demande des données à une adresse web (une API) et les reçoit, souvent en JSON, sans avoir besoin de base de données. Fetch et Axios répondent à la problématique : « Comment afficher dans ma page des données qui sont ailleurs ? ». La réponse met du temps à arriver, c’est donc une promesse : « quand elle arrive, fais ceci ».

Q2. Quelles sont les principales différences entre Fetch et Axios ?

Fetch : déjà dans le navigateur, rien à installer, il faut appeler response.json(), et les paramètres s’écrivent dans l’URL.
Axios : bibliothèque à ajouter (balise script CDN), les données sont directement dans response.data, les paramètres se passent avec params: { ... }, et il offre plus d’options toutes prêtes.

Q3. Comment chacun gère-t-il une erreur 404 ou 500 ?
Avec Fetch, une page introuvable (404) n’est pas considérée comme une erreur : la Promise n’est pas rejetée, il faut tester res.ok et lancer soi-même une erreur avec throw new Error(...). Avec Axios, la réponse en erreur (404, 500…) est envoyée directement vers catch.

Fetch est déjà dans le navigateur, mais demande un peu plus de code. Axios est à ajouter, mais plus simple à lire et à configurer. Dans tous les cas : then, catch, finally et deux modules (api.js et ui.js). Avec Fetch ou Axios, la page va chercher elle-même les données sur l’autre site et les affiche.

fetch(url) envoie la demande au serveur.
Il retourne une Promise : le résultat n’est pas immédiat, JavaScript continue son travail pendant l’attente.
Quand la réponse arrive, on obtient un objet Response.
response.json() transforme le contenu de cette réponse en données utilisables (objet ou tableau JavaScript).

-**Fonction de recherche en JS**

Elle a besoin de 2 paramètres :

le tableau de produits ( depuis data.json)
le texte tapé dans l’input
Pour chercher seulement dans le nom,on compare le texte uniquement avec product.name

**export** const **recherche**=((produits,text)=>{
  const search=text.toLowerCase().trim();
  return produits.filter((produit)=>  //filter hiya forEach + push
  produit.nom.toLowerCase().includes(search));
});

-filter() est une méthode des tableaux. Elle parcourt chaque élément, appelle la fonction de test dessus, et garde l’élément seulement si le test renvoie true. 
Elle renvoie un nouveau tableau et ne modifie pas l’original. 
Et filter = forEach + push
Cas particulier : si l’utilisateur efface tout, search vaut "". Or includes("") renvoie toujours true, donc tous les produits sont affichés
-includes() teste la présence d’un morceau de texte et renvoie un booléen.

- 300	Multiple Choices	The request has more than one possible response, and the user or browser must choose one.



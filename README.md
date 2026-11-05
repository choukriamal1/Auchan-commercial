# Documentation – Auchan Commercial

## 1. Fetch API et gestion des requêtes HTTP

### 1.1. Qu'est-ce que Fetch ?

`fetch()` est une fonction JavaScript qui permet d'envoyer une requête HTTP à un serveur pour récupérer des données depuis une API ou un fichier JSON.

```javascript
fetch("data.json")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

**Fonctionnement :**

1. `fetch(url)` envoie une requête au serveur.
2. Elle retourne une **Promise** : le résultat n'est pas immédiat, JavaScript continue son travail pendant l'attente.
3. Lorsque la réponse arrive, on obtient un objet `Response`.
4. `response.json()` transforme le contenu de la réponse en données JavaScript (objet ou tableau).
5. `.then()` permet de traiter le résultat.
6. `.catch()` permet de récupérer les erreurs.

### 1.2. Les trois états d'une Promise

Une Promise possède trois états :

- **Pending :** la requête est encore en cours.
- **Fulfilled :** la requête est terminée avec succès.
- **Rejected :** la requête a échoué.

### 1.3. Qu'est-ce qu'une requête GET ?

Une requête `GET` permet de demander et de récupérer des données depuis un serveur, sans les modifier.

Par exemple, récupérer la liste des produits depuis un fichier `data.json`.

**Problématique résolue par Fetch et Axios :**

Comment récupérer des données qui se trouvent ailleurs et les afficher dynamiquement dans notre page web ?

### 1.4. Différence entre Fetch et Axios

| Fetch | Axios |
|---|---|
| Déjà intégré au navigateur. | Bibliothèque externe à installer. |
| Utilise `response.json()`. | Les données sont directement dans `response.data`. |
| Nécessite de vérifier `response.ok`. | Les erreurs HTTP sont automatiquement envoyées vers `catch`. |
| Les paramètres peuvent être ajoutés à l'URL. | Utilise `params: { ... }`. |

**À retenir :** Fetch est intégré au navigateur et demande un peu plus de code pour gérer les erreurs HTTP. Axios est une bibliothèque externe qui simplifie certaines opérations.

### 1.5. Gestion des erreurs HTTP : 404 et 500

**Q1. Si `fetch('data.json')` renvoie une erreur 404, le bloc `catch` est-il exécuté ?**

Non. Fetch ne considère pas les erreurs HTTP comme des erreurs réseau.

Même si le serveur renvoie une réponse `404` (Not Found) ou `500` (Internal Server Error), la Promise est généralement résolue.

Il faut donc vérifier la propriété `response.ok`.

```javascript
fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur HTTP : " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log("Erreur :", error));
```

- `response.ok` : retourne `true` si le statut HTTP indique un succès.
- `throw new Error()` : crée une erreur et permet de passer directement dans `catch`.
- `.catch()` : récupère l'erreur.

**Q2. Comment Axios gère-t-il les erreurs 404 et 500 ?**

Contrairement à Fetch, Axios considère automatiquement les réponses HTTP 404 et 500 comme des erreurs et exécute directement le bloc `catch`.

---

## 2. Manipulation des tableaux JavaScript

### 2.1. Différence entre `map()` et `forEach()`

**Q1. Quelle est la différence principale entre `map()` et `forEach()` ?**

- `map()` : parcourt un tableau et retourne un nouveau tableau contenant les résultats de chaque élément.
- `forEach()` : parcourt un tableau pour exécuter une action sur chaque élément, sans retourner de nouveau tableau.

**Exemple :**

```javascript
const nombres = [1, 2, 3];

const resultat = nombres.map(nombre => nombre * 2);
// [2, 4, 6]

nombres.forEach(nombre => console.log(nombre));
// Affiche 1, 2 et 3
```

### 2.2. La méthode `filter()`

`filter()` est une méthode des tableaux qui permet de sélectionner uniquement les éléments qui respectent une condition.

**Fonctionnement :**

1. Elle parcourt chaque élément du tableau.
2. Elle vérifie si la condition retourne `true` ou `false`.
3. Elle conserve uniquement les éléments qui retournent `true`.
4. Elle retourne un nouveau tableau sans modifier le tableau original.

**À retenir :** Contrairement à `forEach()`, `filter()` retourne un nouveau tableau.

### 2.3. La méthode `includes()`

`includes()` permet de vérifier si un texte contient une partie d'un autre texte.

Elle retourne une valeur booléenne :

- `true` : le texte recherché existe.
- `false` : le texte recherché n'existe pas.

Exemple :

```javascript
"ordinateur".includes("ordi"); // true
"ordinateur".includes("phone"); // false
```

---

## 3. Fonctionnalité de recherche des produits

### 3.1. Objectif

Permettre à l'utilisateur de rechercher un produit en saisissant son nom dans un champ de recherche (`input`).

### 3.2. Paramètres nécessaires

La fonction de recherche utilise deux paramètres :

- `produits` : le tableau contenant les produits récupérés depuis `data.json`.
- `text` : le texte saisi par l'utilisateur dans le champ de recherche.

### 3.3. Code JavaScript

```javascript
export const recherche = (produits, text) => {
  const search = text.toLowerCase().trim();

  return produits.filter((produit) =>
    produit.nom.toLowerCase().includes(search)
  );
};
```

### 3.4. Explication du code

- `text.toLowerCase()` : transforme le texte en minuscules pour rendre la recherche insensible aux majuscules.
- `trim()` : supprime les espaces au début et à la fin du texte.
- `filter()` : parcourt tous les produits et conserve ceux qui respectent la condition.
- `produit.nom` : récupère le nom du produit.
- `includes(search)` : vérifie si le nom du produit contient le texte recherché.

### 3.5. Cas particulier : champ de recherche vide

Si l'utilisateur efface tout le texte saisi :

```javascript
search = "";
```

La méthode `includes("")` retourne toujours `true`.

Par conséquent, tous les produits sont affichés.

---

## 4. Codes de statut HTTP

Les codes HTTP indiquent le résultat d'une requête envoyée au serveur.

| Code | Signification | Explication |
|---|---|---|
| 200 | OK | La requête a réussi. |
| 201 | Created | Une ressource a été créée. |
| 300 | Multiple Choices | Plusieurs réponses sont possibles, un choix est nécessaire. |
| 400 | Bad Request | La requête est incorrecte. |
| 401 | Unauthorized | Une authentification est nécessaire. |
| 403 | Forbidden | L'accès est refusé. |
| 404 | Not Found | La ressource est introuvable. |
| 500 | Internal Server Error | Une erreur interne du serveur s'est produite. |

**À retenir :** Les codes HTTP permettent de comprendre rapidement si une requête a réussi ou si une erreur s'est produite.

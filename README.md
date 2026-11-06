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
2. Elle retourne une **Promise** : le résultat n'est pas immédiat.
3. Lorsque la réponse arrive, on obtient un objet `Response`.
4. `response.json()` transforme le contenu en données JavaScript.
5. `.then()` permet de traiter le résultat.
6. `.catch()` permet de récupérer les erreurs.

### 1.2. Les trois états d'une Promise

- **Pending :** la requête est encore en cours.
- **Fulfilled :** la requête est terminée avec succès.
- **Rejected :** la requête a échoué.

### 1.3. Qu'est-ce qu'une requête GET ?

Une requête `GET` permet de demander et de récupérer des données depuis un serveur, sans les modifier.

**Problématique :** Comment récupérer des données qui se trouvent ailleurs et les afficher dynamiquement dans notre page web ?

### 1.4. Différence entre Fetch et Axios

| Fetch | Axios |
|---|---|
| Déjà intégré au navigateur. | Bibliothèque externe à installer. |
| Utilise `response.json()`. | Les données sont dans `response.data`. |
| Nécessite de vérifier `response.ok`. | Les erreurs HTTP sont automatiquement envoyées vers `catch`. |
| Paramètres possibles dans l'URL. | Utilise `params: { ... }`. |

**À retenir :** Fetch est intégré au navigateur, tandis qu'Axios est une bibliothèque externe qui simplifie certaines opérations.

### 1.5. Gestion des erreurs HTTP : 404 et 500

**Q1. Si Fetch renvoie une erreur 404, le bloc `catch` est-il exécuté ?**

Non. Fetch ne considère pas les erreurs HTTP comme des erreurs réseau. Il faut vérifier `response.ok`.

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
- `throw new Error()` : crée une erreur et permet de passer dans `catch`.
- `.catch()` : récupère l'erreur.

**Q2. Comment Axios gère-t-il les erreurs 404 et 500 ?**

Axios considère automatiquement les réponses HTTP 404 et 500 comme des erreurs et exécute le bloc `catch`.

---

## 2. Manipulation des tableaux JavaScript

### 2.1. Différence entre `map()` et `forEach()`

**Q1. Quelle est la différence entre `map()` et `forEach()` ?**

- `map()` : parcourt un tableau et retourne un nouveau tableau.
- `forEach()` : parcourt un tableau pour exécuter une action, sans retourner un nouveau tableau.

```javascript
const nombres = [1, 2, 3];

const resultat = nombres.map(nombre => nombre * 2);
// [2, 4, 6]

nombres.forEach(nombre => console.log(nombre));
// Affiche 1, 2 et 3
```

### 2.2. La méthode `filter()`

`filter()` permet de sélectionner uniquement les éléments qui respectent une condition.

**Fonctionnement :**

1. Elle parcourt chaque élément du tableau.
2. Elle vérifie si la condition retourne `true` ou `false`.
3. Elle conserve uniquement les éléments qui retournent `true`.
4. Elle retourne un nouveau tableau sans modifier l'original.

**À retenir :** `filter()` retourne un nouveau tableau contenant les éléments sélectionnés.

### 2.3. La méthode `includes()`

`includes()` permet de vérifier si un texte contient une partie d'un autre texte.

Elle retourne une valeur booléenne :

- `true` : le texte recherché existe.
- `false` : le texte recherché n'existe pas.

```javascript
"ordinateur".includes("ordi"); // true
"ordinateur".includes("phone"); // false
```

### 2.4. La méthode `slice()`

`slice()` permet de récupérer une partie d'un tableau sans modifier le tableau original.

**Syntaxe :**

```javascript
tableau.slice(debut, fin);
```

- `debut` : index où commence la sélection.
- `fin` : index où s'arrête la sélection (non inclus).

**Q1. Comment utiliser `slice()` dans la pagination ?**

```javascript
const start = (currentPage - 1) * itemsPerPage;
const end = start + itemsPerPage;

const pageProducts = produits.slice(start, end);
```

**Q2. Quelle est la différence entre `slice()` et `filter()` ?**

- `slice()` : récupère une partie du tableau selon les index.
- `filter()` : récupère les éléments qui respectent une condition.

---

## 3. Fonctionnalité de recherche des produits

### 3.1. Objectif

Permettre à l'utilisateur de rechercher un produit en saisissant son nom dans un champ de recherche (`input`).

### 3.2. Paramètres nécessaires

- `produits` : le tableau contenant les produits récupérés depuis `data.json`.
- `text` : le texte saisi par l'utilisateur.

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

- `toLowerCase()` : transforme le texte en minuscules.
- `trim()` : supprime les espaces au début et à la fin.
- `filter()` : conserve les produits qui respectent la condition.
- `produit.nom` : récupère le nom du produit.
- `includes(search)` : vérifie si le nom contient le texte recherché.

### 3.5. Cas particulier : champ de recherche vide

Si l'utilisateur efface le texte saisi, `search` devient une chaîne vide (`""`).

La méthode `includes("")` retourne toujours `true`.

Par conséquent, tous les produits sont affichés.

---

## 4. Algorithme de pagination

### 4.1. Qu'est-ce que la pagination ?

La pagination est une technique qui permet de diviser une grande liste de données en plusieurs pages pour afficher un nombre limité d'éléments à la fois.

**Q1. Pourquoi utiliser la pagination ?**

Pour organiser l'affichage des produits et faciliter la navigation.

**Q2. C'est quoi `currentPage` ?**

C'est la variable qui indique la page actuellement affichée.

**Q3. C'est quoi `itemsPerPage` ?**

C'est le nombre de produits affichés dans chaque page.

**Q4. Comment calculer le nombre total de pages ?**

On divise le nombre total de produits par le nombre de produits par page avec `Math.ceil()`.

```javascript
const totalPages = Math.ceil(produits.length / itemsPerPage);
```

### 4.2. Utilisation de `slice()` dans la pagination

```javascript
const start = (currentPage - 1) * itemsPerPage;
const end = start + itemsPerPage;

const pageProducts = produits.slice(start, end);
```

**Q5. Pourquoi utiliser `slice()` ?**

Pour récupérer uniquement les produits qui correspondent à la page actuelle.

**Q6. Est-ce que la pagination supprime les autres produits ?**

Non. Elle affiche seulement une partie des produits à la fois.

### 4.3. Les méthodes Math

**Quelle est la différence entre `Math.floor()` et `Math.ceil()` ?**

- `Math.floor()` : arrondit vers le bas.
- `Math.ceil()` : arrondit vers le haut.

**Exemple :**

```javascript
Math.floor(2.8); // 2
Math.ceil(2.8);  // 3
```

**À retenir :** `Math.ceil()` est utilisée pour calculer le nombre total de pages afin de ne pas oublier les produits restants.

---

## 5. Changement du mode d'affichage : Grid et List

### 5.1. Qu'est-ce que le mode Grid ?

C'est un affichage qui organise les cartes des produits en plusieurs colonnes et lignes.

### 5.2. Qu'est-ce que le mode List ?

C'est un affichage qui présente les produits verticalement, généralement un produit par ligne.

### 5.3. Questions et réponses

**Q1. Pourquoi utiliser deux boutons ?**

Pour permettre à l'utilisateur de choisir entre deux modes d'affichage selon sa préférence.

**Q2. Comment changer le mode d'affichage avec JavaScript ?**

En utilisant `classList` pour ajouter ou supprimer des classes CSS.

**Q3. C'est quoi `classList` ?**

C'est une propriété JavaScript qui permet de gérer les classes CSS d'un élément HTML.

**Q4. Quelle est la différence entre `add()` et `remove()` ?**

- `add()` : ajoute une classe CSS.
- `remove()` : supprime une classe CSS.

**Q5. Comment détecter le clic sur un bouton ?**

Avec l'événement `click` et `addEventListener()`.

**Q6. Est-ce que le changement de mode modifie les données des produits ?**

Non. Il change uniquement leur présentation visuelle.

### 5.4. Exemple JavaScript

```javascript
gridBtn.addEventListener("click", function() {
    products.classList.add("grid");
    products.classList.remove("list");
});

listBtn.addEventListener("click", function() {
    products.classList.add("list");
    products.classList.remove("grid");
});
```

**À retenir :**

- Grid : affichage en colonnes et lignes.
- List : affichage vertical.
- `classList.add()` : ajoute une classe.
- `classList.remove()` : supprime une classe.
- `click` : détecte le clic de l'utilisateur.

---

## 6. API Drag & Drop

### 6.1. Qu'est-ce que l'API Drag & Drop ?

C'est une fonctionnalité JavaScript qui permet de déplacer un élément avec la souris d'un endroit à un autre.

- **Drag :** déplacer un élément.
- **Drop :** déposer un élément.

**Exemple :** Déplacer un produit dans un panier.

### 6.2. L'attribut `draggable`

`draggable` est un attribut HTML qui permet de rendre un élément déplaçable.

```html
<div draggable="true">
    Déplace-moi
</div>
```

Il existe trois valeurs :

- `true` : l'élément peut être déplacé.
- `false` : l'élément ne peut pas être déplacé.
- `auto` : comportement par défaut du navigateur.

### 6.3. Les principaux événements Drag & Drop

| Événement | Rôle |
|---|---|
| `dragstart` | Début du déplacement. |
| `dragover` | L'élément passe au-dessus de la zone. |
| `drop` | Déposer l'élément. |
| `dragend` | Fin du déplacement. |

### 6.4. Qu'est-ce que `e.preventDefault()` ?

C'est une méthode JavaScript qui permet d'empêcher le comportement par défaut du navigateur.

**Q1. Pourquoi utiliser `e.preventDefault()` avec Drag & Drop ?**

Parce que par défaut, le navigateur n'autorise pas le dépôt d'un élément dans une zone. `e.preventDefault()` permet donc d'autoriser le dépôt.

**Exemple :**

```javascript
zone.addEventListener("dragover", function(e) {
    e.preventDefault();
});
```

### 6.5. Qu'est-ce que `e.dataTransfer` ?

C'est un objet qui permet de transporter des données pendant le déplacement d'un élément.

### 6.6. Exemple complet : déplacer un produit dans un panier

```javascript
const produit = document.querySelector("#produit");
const panier = document.querySelector("#panier");

// Début du déplacement
produit.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData("text", produit.id);
});

// Autoriser le dépôt
panier.addEventListener("dragover", function(e) {
    e.preventDefault();
});

// Déposer le produit
panier.addEventListener("drop", function(e) {
    e.preventDefault();

    const id = e.dataTransfer.getData("text");
    panier.appendChild(document.getElementById(id));
});
```

**À retenir :**

- `draggable` : rend un élément déplaçable.
- `dragstart` : commence le déplacement.
- `dragover` : permet le passage au-dessus de la zone.
- `drop` : dépose l'élément.
- `e.preventDefault()` : empêche le comportement par défaut.
- `e.dataTransfer` : transporte les données de l'élément.

---

## 7. Codes de statut HTTP

Les codes HTTP indiquent le résultat d'une requête envoyée au serveur.

| Code | Signification | Explication |
|---|---|---|
| 200 | OK | La requête a réussi. |
| 201 | Created | Une ressource a été créée. |
| 300 | Multiple Choices | Plusieurs réponses sont possibles. |
| 400 | Bad Request | La requête est incorrecte. |
| 401 | Unauthorized | Une authentification est nécessaire. |
| 403 | Forbidden | L'accès est refusé. |
| 404 | Not Found | La ressource est introuvable. |
| 500 | Internal Server Error | Une erreur interne du serveur s'est produite. |

**À retenir :** Les codes HTTP permettent de comprendre rapidement si une requête a réussi ou si une erreur s'est produite.

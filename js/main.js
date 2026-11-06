import { getProductJSON } from "./api.js";
import { affichageProduit } from "./ui.js";
import { recherche, filtrerCategory } from "./products.js";
import { afficherPagination } from "./products.js";
import {resetPage } from "./products.js";


const produits = await getProductJSON();
console.table(produits);
afficherPagination(produits);

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    resetPage();
    const result = recherche(produits, searchInput.value);
    affichageProduit(result);
});

const boutons = document.querySelectorAll("#filters button");
boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        resetPage();
        const categorie = bouton.textContent.trim();
        const resultat =filtrerCategory(produits, categorie);  //objet selon les categorie des produits
        afficherPagination(resultat);
    });
});


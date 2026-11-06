import { getProductJSON } from "./api.js";
import { affichageProduit } from "./ui.js";
import { recherche, filtrerCategory } from "./products.js";

const produits = await getProductJSON();
console.table(produits);
affichageProduit(produits);

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    affichageProduit(recherche(produits, searchInput.value));
});

const boutons = document.querySelectorAll("#filters button");

boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        const categorie = bouton.textContent.trim();
        affichageProduit(filtrerCategory(produits, categorie));
    });
});
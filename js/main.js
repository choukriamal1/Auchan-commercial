import { getProductJSON } from "./api.js";
import { affichageProduit } from "./ui.js";
import { affichagePanier } from "./ui.js";
import { recherche, filtrerCategory } from "./products.js";
import { afficherPagination , resetPage,setMode} from "./products.js";
import { ajouter, panier, totalPanier, nbrArticles } from "./cart.js";


const produits = await getProductJSON();
console.table(produits);

let produitsActuels = produits;
afficherPagination(produitsActuels);


const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    resetPage();
    produitsActuels = recherche(produits, searchInput.value);
    afficherPagination(produitsActuels);
});

const boutons = document.querySelectorAll("#filters button");
boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        resetPage();
        const categorie = bouton.textContent.trim();
        produitsActuels =filtrerCategory(produits, categorie);  //objet selon les categorie des produits
        afficherPagination(produitsActuels);
    });
});




const majPanier = () => {
    affichagePanier(panier, totalPanier());

    const badgeCount = document.getElementById("cart-count");
    if (badgeCount) {
        badgeCount.textContent = nbrArticles();
    }
};

document.getElementById("catalogue").addEventListener("click", (e) => {
  const bouton = e.target.closest(".btn-ajouter");
  if (!bouton) return;

  const id = Number(bouton.dataset.id);
  const produit = produits.find((p) => p.id === id);

  ajouter(produit);
  majPanier();
});

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const ouvrir = () => {
  sidebar.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
};

const fermer = () => {
  sidebar.classList.add("translate-x-full");
  overlay.classList.add("hidden");
};

document.getElementById("cart-count").textContent = nbrArticles();
document.getElementById("cart-btn").addEventListener("click", ouvrir);
document.getElementById("close-cart").addEventListener("click", fermer);
overlay.addEventListener("click", fermer);


majPanier();






const btnGrille=document.getElementById("btn-grille");
const btnListe=document.getElementById("btn-liste");


btnGrille.addEventListener("click", () => {
    setMode("grille");
    resetPage();
    afficherPagination(produitsActuels);
});

// Au clic sur Liste
btnListe.addEventListener("click", () => {
    setMode("liste");
    resetPage();
    afficherPagination(produitsActuels);
});


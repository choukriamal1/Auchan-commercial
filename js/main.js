import { getProductJSON } from "./api.js";
import{affichageProduit} from "./ui.js";
import { recherche } from "./products.js";
<<<<<<< main.js

export const filtrerCategory = (produits, categorie)
=======
import {filtrerCategory} from "./products.js";

>>>>>>> local
let produits=[]
produits=await getProductJSON()
console.table(produits)
affichageProduit(produits);

const searchInput = document.getElementById("search");

searchInput.addEventListener("input",()=>{
    affichageProduit(recherche (produits, searchInput.value));
<<<<<<< main.js
})
=======
});


const bouttons=document.querySelectorAll("#filters button"); 
bouttons.forEach((boutton) => {
    boutton.addEventListener("click",() => {
        const categorie = boutton.textContent.trim();
        affichageProduit(filtrerCategory(produits, categorie));
    });
});
>>>>>>> local


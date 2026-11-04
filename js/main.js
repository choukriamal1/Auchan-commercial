import { getProductJSON } from "./api.js";
import{affichageProduit} from "./ui.js";
import { recherche } from "./products.js";
let produits=[]
produits=await getProductJSON()
console.table(produits)
affichageProduit(produits);

const searchInput = document.getElementById("search");

searchInput.addEventListener("input",()=>{
    affichageProduit(recherche (produits, searchInput.value));
})

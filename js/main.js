import { getProductJSON,produits } from "./api.js";

await getProductJSON()
produits.forEach(produit=>{
     console.log(produit)
})


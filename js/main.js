import { getProductJSON } from "./api.js";
import{affichageProduit} from "./ui.js"
let produits=[]
produits=await getProductJSON()
console.table(produits)
affichageProduit(produits)

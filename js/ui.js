import {getProductJSON} from "./api.js"
export function affichageProduit(produits)
{
     let gridCatalogue=document.getElementById("catalogue");
     
     gridCatalogue.innerHTML=produits.map(produit=>{
        return `  <article class="flex flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg active:cursor-grabbing">
                    <div class="relative aspect-4/3 overflow-hidden bg-stone-100">
                        <img src="${produit.image}" alt="" class=" w-full object-cover transition duration-300 group-hover:scale-105" >
                    </div>
                    <div class="flex flex-1 flex-col gap-1 p-5">
                        <p class="text-xs font-bold uppercase ">${produit.category}</p>
                        <h3 class="text-lg font-bold">${produit.nom}</h3>
                        <h3 class="text-lg font-bold">${produit.prix}</h3>
                    </div>
                </article>
                `
     }).join("")
}
import {getProductJSON} from "./api.js"
export function affichageProduit(produits, mode="grille")
{
     let gridCatalogue=document.getElementById("catalogue");
     if(!gridCatalogue) return;
     if(mode==="liste"){
        gridCatalogue.className="flex flex-col gap-4";
     }
     else{
        gridCatalogue.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
     }
     
     gridCatalogue.innerHTML=produits.map(produit=>{
        if(mode==="liste"){ 
        return `<article draggable="true" data-id="${produit.id}" class="flex flex-row items-center justify-between gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                <div class="flex items-center gap-4 flex-1 min-w-0">
                    <!-- Image compacte avec dimensions fixes (h-28 w-28) -->
                    <div class="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                        <img src="${produit.image}" alt="" class="h-full w-full object-cover">
                    </div>
                    <!-- Informations du produit -->
                    <div class="flex flex-col gap-1 min-w-0">
                        <p class="text-xs font-bold uppercase text-[#FF6467]">${produit.category}</p>
                        <h3 class="text-base font-bold text-slate-900 truncate">${produit.nom}</h3>
                        <h3 class="text-base font-bold text-slate-800">${produit.prix}</h3>
                    </div>
                </div>
                <!-- Bouton Ajouter -->
                <button type="button" data-id="${produit.id}" class="btn-ajouter shrink-0 cursor-pointer rounded-xl bg-[#FF6467] px-6 py-2.5 font-semibold text-white shadow-sm hover:opacity-90 transition">
                    + Ajouter
                </button>
            </article>`;
            } else{
                 return `  <article draggable="true" data-id="${produit.id}" class="flex flex-col items-center overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg active:cursor-grabbing">
                    <div class="relative aspect-4/3 overflow-hidden bg-stone-100">
                        <img src="${produit.image}" alt="" class=" w-full h-full object-cover transition duration-300 group-hover:scale-105" >
                    </div>
                    <div class="flex flex-1 flex-col gap-1 p-5">
                        <p class="text-xs font-bold uppercase text-slate-500">${produit.category}</p>
                        <h3 class="text-lg font-bold">${produit.nom}</h3>
                        <h3 class="text-lg font-bold text-slate-700">${produit.prix}</h3>
                        <button type="button" data-id="${produit.id}" class="btn-ajouter mt-auto w-full pt-3 cursor-pointer rounded-xl bg-[#FF6467] py-2 font-semibold text-white hover:opacity-90">
                            Ajouter
                        </button>
                    </div>
                </article>
                `;
        }

     }).join("")
}

export function affichagePanier(panier, total) {
    const conteneurPanier = document.getElementById("cart-items");
    if (!conteneurPanier) return;

    conteneurPanier.innerHTML = panier.map(item => {
        const prixNum = typeof item.prix === 'string' 
            ? parseFloat(item.prix.replace(',', '.').replace(/[^\d.-]/g, '')) 
            : item.prix;

        const sousTotal = (isNaN(prixNum) ? 0 : prixNum) * item.quantite;

        return `
            <div class="flex justify-between items-center border-b pb-2">
                <div>
                    <h4 class="font-bold text-sm">${item.nom}</h4>
                    <p class="text-xs text-gray-500">${item.prix} x ${item.quantite}</p>
                </div>
                <span class="font-semibold text-sm">${sousTotal.toFixed(2)} DH</span>
            </div>
        `;
    
    }).join("");

    const totalElement = document.getElementById("cart-total");
    if (totalElement) {
        totalElement.textContent = total.toFixed(2) + " DH";
    }
}




//attribut draggable="true"
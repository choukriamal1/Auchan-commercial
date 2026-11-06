import {affichageProduit} from "./ui.js";
export const recherche=(produits,text)=>{
  const search=text.toLowerCase().trim();
  return produits.filter((produit)=>  //filter hiya forEach + push
  produit.nom.toLowerCase().includes(search));
};

//filter : products recoit un tableau et il en renvoie un autre 

export const filtrerCategory = (produits, categorie) => {
  if (categorie === "Tout"){
    return produits; 
  }
    return produits.filter((produit)=>
    produit.category === categorie);
};



// const produitPerPage =;

export const  itemsPerPage = 6;
let currentPage = 1;
let modeActuelle="grille";
export const setMode=(mode) =>{
  modeActuelle= mode;
};

export const  pagination = (produits) => {
  const start = (currentPage - 1) * itemsPerPage;
  return produits.slice(start, start + itemsPerPage);
};

export const  total = (produits) => {
  return Math.ceil(produits.length / itemsPerPage);
};

export const afficherPagination = (produits) => {
  const paginationEl = document.getElementById("pagination");
  if (!paginationEl) return;

  affichageProduit(pagination(produits), modeActuelle);
    
    paginationEl.innerHTML = "";
  
    for (let i = 1; i <= total(produits); i++) {
        const btn = document.createElement("button");
        btn.classList.add( "border","rounded", "gap-4" ,"hover:bg-[#FF6467]", "text-slate-800", "px-3", "py-1", "cursor-pointer", "font-semibold")
        btn.textContent = i;
        if (i === currentPage){
             btn.disabled = true; 
             btn.classList.add("bg-[#FF6467]");
            }
        btn.addEventListener('click', () => { 
        currentPage = i; 
        afficherPagination(produits); 
      });
        paginationEl.appendChild(btn);
    }
};
export const resetPage =() =>{
  currentPage=1;
};


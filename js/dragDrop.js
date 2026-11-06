import { ajouter, panier, totalPanier, nbrArticles } from "./cart.js";
import { affichagePanier } from "./ui.js";

export function initDragDrop(produits) {
    let draggedProduitId = null;

    
    document.addEventListener("dragstart", (e) => {
        const carte = e.target.closest("article");
        if (!carte) return;

        draggedProduitId = Number(carte.dataset.id);
        if (e.dataTransfer) {
            e.dataTransfer.setData("text/plain", draggedProduitId);
        }
    });

   
    const cartBtn = document.getElementById("cart-btn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (cartBtn) {
     
        cartBtn.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            cartBtn.classList.add("scale-110", "transition-transform"); 
        });

        cartBtn.addEventListener("dragleave", () => {
            cartBtn.classList.remove("scale-110");
        });

       
        cartBtn.addEventListener("drop", (e) => {
            e.preventDefault();
            cartBtn.classList.remove("scale-110");

            if (!draggedProduitId) return;

            const produit = produits.find((p) => p.id === draggedProduitId);

            if (produit) {

                ajouter(produit);
                
                affichagePanier(panier, totalPanier());
                
                const badgeCount = document.getElementById("cart-count");
                if (badgeCount) {
                    badgeCount.textContent = nbrArticles();
                }

            
                if (sidebar) sidebar.classList.remove("translate-x-full");
                if (overlay) overlay.classList.remove("hidden");
            }

            draggedProduitId = null;
        });
    }
}
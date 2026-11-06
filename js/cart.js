export const panier=[];

export const ajouter = (produit) => {
    const ligne = panier.find((l) => l.id === produit.id);

    if(ligne){
        ligne.quantite++;
    }
    else {
        panier.push({ ...produit, quantite:1});
    }
};

export const totalPanier = () => {
    return panier.reduce((somme, l) => {
        const prixNum = typeof l.prix === 'string' 
            ? parseFloat(l.prix.replace(',', '.').replace(/[^\d.-]/g, '')) 
            : l.prix;
        return somme + (isNaN(prixNum) ? 0 : prixNum * l.quantite);
    }, 0);
};

export const nbrArticles = () => {
    return panier.reduce((somme, l) => somme + l.quantite, 0);
};
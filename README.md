-**Fonction de recherche en JS**

Elle a besoin de 2 paramètres :

le tableau de produits ( depuis data.json)
le texte tapé dans l’input
Pour chercher seulement dans le nom,on compare le texte uniquement avec product.name

**export** const **recherche**=((produits,text)=>{
  const search=text.toLowerCase().trim();
  return produits.filter((produit)=>  //filter hiya forEach + push
  produit.nom.toLowerCase().includes(search));
});

-filter() est une méthode des tableaux. Elle parcourt chaque élément, appelle la fonction de test dessus, et garde l’élément seulement si le test renvoie true. 
Elle renvoie un nouveau tableau et ne modifie pas l’original. 
Et filter = forEach + push
Cas particulier : si l’utilisateur efface tout, search vaut "". Or includes("") renvoie toujours true, donc tous les produits sont affichés
-includes() teste la présence d’un morceau de texte et renvoie un booléen.


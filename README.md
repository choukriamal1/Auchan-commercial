-**Fonction de recherche en JS**

Elle a besoin de 2 paramètres :

le tableau de produits ( depuis data.json)
le texte tapé dans l’input
Pour chercher seulement dans le nom,on compare le texte uniquement avec product.name

**function rechercher(produits, texte)** {
  return produits.filter((p) =>
    p.name.toLowerCase().includes(texte.toLowerCase())
  );
}

**input.addEventListener("input", (e)** => {
  const resultats = rechercher(produits, e.target.value);
  afficher(resultats);
});

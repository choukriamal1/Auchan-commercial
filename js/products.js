function rechercher(produits, texte){
  return produits.filter(p => p.nom .toLowerCase().includes(texte.toLowerCase()));
}
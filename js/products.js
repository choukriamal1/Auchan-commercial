export const recherche=((produits,text)=>{
  const search=text.toLowerCase().trim();
  return produits.filter((produit)=>  //filter hiya forEach + push
  produit.nom.toLowerCase().includes(search));
});

//filter : products recoit un tableau et il en renvoie un autre 

export const filtrerCategory = (produits, categorie) => {
  if (categorie === "Tout"){
    return produits; 
  }
    return produits.filter((produit)=>
    produit.category.toLowerCase()=== categorie.toLowerCase());
};




                                                                                 
export const recherche=((produits,text)=>{
  const search=text.toLowerCase().trim();
  return produits.filter((produit)=>  //filter hiya forEach + push
  produit.nom.toLowerCase().includes(search));
});

//products recoit un tableau et il en renvoie un autre 

                                                                                 
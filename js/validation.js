//modifie le texte

document.getElementById('demo').textContent='neveau texte';

document.getElementById('before').textContent='after';

//ajouter une class
document.getElementById('monId').classList.add('active');

document.getElementById('monId').classList.add('active');

document.getElementById('monId').classList.remove('active');
document.getElementById('monId').classList.toggle('active');

//creer un li et l ajouter a un ul

const li=document.createElement('li');
li.textContent='element';
document.querySelector('ul').appendChild(li);


const li = document.createElement('li');
li.textContent='element';
document.querySelector('ul').appendndChild('li');

//style en ligne script
element.style.color='red';  

//querySelector renvoie un seul element le premier trouver
//querySelectorAll renvoie une NodeList statique n est pas mise a jour lorsque le DOM change apres
//getElementsByClassName et childNodes sont dynamique 
//display: inline-block permet de définir width et height, ce que inline restant sur la ligne.
//z-index ne fonctionne que sur les éléments positionnés (donc pas static), et sur les enfants d’un conteneur flex ou grid.
//git fetch telecharge les nouveaux commits sans fusionner
//git pull fetch puis merge
//Crée une branche (git switch -c <nom> la crée et bascule dessus)
//git merge<branche> Fusionne la branche indiquée dans la branche courante








const titre=document.queruSelector("h1"); //trouver le premier h1
const cartes = document.querySelectorAll(".products");
//si tu ajoutes des éléments après. On la parcourt avec forEach

cartes.forEach(function(carte){
    console.log(carte.textContent);
});

//quand tu cliques sur un bouton dans une carte 
//et que tu veux modifier cette carte. 
//Tu pars du bouton et tu fais bouton.parentElement

carte.parentElement;             // le parent (monte d'un niveau)
carte.children;                 // les enfants directs (h2, p...)
carte.nextElementSibling ;      // le frère suivant (ou null)

//Créer puis insérer : Create → Configure → Insert
const produits = document.querySelector(".products");
const carte = document.createElement("div");
carte.classList.add("product-card");
carte.textContent="guitar elec";
produits.append(carte);

//textContent écrit du texte brut. "<strong>Argan</strong>" s’affiche tel quel, avec les balises visibles.
//innerHTML interprète le HTML, donc <strong> met en gras.
//Par défaut, utilise textContent Réserve innerHTML aux cas où tu veux vraiment des balises.


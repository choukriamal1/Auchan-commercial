export  function getProductJSON() { //exporter les produits depuis data.json
        return  fetch("./data/data.json") 
        //`fetch` va chercher `data.json` et renvoie une **Promise**plus tard   
              .then(response => {   
                  return response.json(); //return file to table
              })
              .then(data => {
                  return data
              })
              .catch(error => { //si error
                  console.log("Error:", error);
              });
                    
           
}





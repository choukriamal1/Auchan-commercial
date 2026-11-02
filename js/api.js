export  function getProductJSON() {
        return  fetch("./data/data.json")
          
    
              .then(response => {
                  return response.json();
              })
              .then(data => {
                  return data
              })
              .catch(error => {
                  console.log("Error:", error);
              });
                    
           
}


// then key value




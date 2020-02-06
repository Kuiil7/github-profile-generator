const colors = {
  gray: {
    jumbotronBackground: "gray",
    body2Background: "lightgray",
    cardsColor: "lightgray",
  },
  blue: {
    jumbotronBackground: "lightblue",
   body2Background: "darkblue",
    cardsColor: "lightblue",
  },
  salmon: {
    jumbotronBackground: "salmon",
   body2Background: "lightsalmon",
    cardsColor: "lightsalmon",
  },
  green: {
    jumbotronBackground: "limegreen",
   body2Background: "darkgreen",
    cardsColor: "limegreen",

  }
};



  function generateHTML(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css
"/>
    <title>Git-Hub Profile Generator</title>
  
  <style>
  html, body{
    background-color: white;

  }
  html {
    -webkit-print-color-adjust: exact !important;
  
  }


#body-title {
    color:black;
    font-size: 2em;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}



.card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin-top: 10px; 
    background-color: salmon;
  background-color: ${colors[data.color]
    .body2Background};
     color: ${colors[data.color].cardsColor};

}

.card-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}



.jumbotron {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top:100px;
    border-radius: 2px;
    background-color: ${colors[data.color].jumbotronBackground};
    color: ${colors[data.color].cards2Color};
}


#body2 {
    background-color: lavender;
    height: 350px;
}
img {
    border-radius: 50%;
  }

  #avatar {
    display: flex;
    justify-content: center;
    align-items: center;
      height: 200px;
      border: 6px solid white;


  }
  .links-nav {
     display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 10px;
  }

  

  </style>

    
   
  
    <body>

           
    
        <div class="jumbotron jumbotron-fluid">

               <div class="container">

            <img id="avatar" src="${data.portPic}" alt="Avatar">          
            <h1 class="display-4">Hi!</h1>
            <h2>My name is ${data.name}</h2>
            <h3>Currently @ ${data.company}</h3>
            <div class="links-nav">
            <a class="nav-link" href="https://www.google.com/maps/place/${data.location.split(' ')[0]}+${data.location.split(' ')[1]}"><i class="fas fa-location-arrow"></i>&nbsp${data.location}</a>
            
                <a class="nav-link" href="https://github.com/${data.username}"><i class="fab fa-github">&nbsp</i></i>github</a>
    
                <a class="nav-link" href="${data.blog}"><i class="fas fa-rss-square"></i>
                 blog</a>     
                </div>
          </div>
        
 </head>
    
     
        
          <div id="body2">
                <p id="body-title">I build things and teach people to code. </p>
               
            <div class="row">
                <div class="col-sm-6">
                  <div id="card1" class="card">
                    <div class="card-body">
                      <h5 class="card-title">Public Repositories</h5>
                      <p class="card-repositories">${data.numOfRepo}</p>
                    
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div  id="card2" class="card">
                    <div class="card-body">
                      <h5 class="card-title">Followers</h5>
                      <p class="card-followers">    ${data.followers}</p>
                   
                    </div>
                  </div>
                </div>
              </div>
            </br>
              <div class="row">
                <div class="col-sm-6">
                  <div  id="card3" class="card">
                    <div  class="card-body">
                      <h5 class="card-title">GitHub Stars</h5>
                      <p class="card-stars">    ${data.stars}</p>
                
                    </div>
                  </div>
                </div>
                 
                <div class="col-sm-6">
                  <div id="card4"  class="card">
                    <div  class="card-body">
                      <h5 class="card-title">Following</h5>
                      <p class="card-following">    ${data.followers}</p>
                
                    </div>
                  </div>
                </div>
              </div>
    
    
    </div>
 
    
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </body>
    </html>
        `
          };
  
  
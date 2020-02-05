const colors = {
    gray: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#696969",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#ADDFFF",
      headerBackground: "#ADDFFF",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    salmon: {
      wrapperBackground: "#C47451",
      headerBackground: "#E78A61",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    green: {
      wrapperBackground: "254117",
      headerBackground: "254117",
      headerColor: "white",
      photoBorderColor: "white"

    }
  };

  function generateHTML(data) {
    return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Resume</title>
        <style>
        body{
            background-color: cornflowerblue;
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
            background-color: ${colors[data.color].headerBackground};
            color: ${colors[data.color].headerColor};
        }
        
        .jumbotron {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top:100px;
            border-radius: 2px;
            background-color: ${colors[data.color].headerBackground};
         color: ${colors[data.color].headerColor};
          
        }
        
        #body2 {
            background-color: ${colors[data.color].wrapperBackground};
            height: 350px;
        }
        img {
            border-radius: 50%;
          }
        
          #avatar {
              height: 200px;
              border: 6px solid ${colors[data.color].photoBorderColor};

              
          }
        
          
        </style>
  
        <body>
          <header class="container">
            <div class='photo-header'>
              <img src=${data.portPic}><br>
              <h1>Hi!</h1>
              <h2>My name is ${data.name}</h2>
              <h3>Currently @${data.company}</h3>
              <div class="links-nav">
                <a class="nav-link">${data.location}</a>
                <a class="nav-link" href="https://github.com/${data.username}">github</a>
                <a class="nav-link" href="${data.blog}>blog</a>
              </div>
  
            </div>
          </header>
  
          <div class="wrapper">
            <div class="row">
            ${data.bio}
            </div>
            <div class="row">
              <div class='col card'>
                <h2>Public repositories: </h1>
                ${data.numOfRepo}
              </div>
  
              <div class="col card">
                <h2>Followers:</h1>
                ${data.followers}
              </div>
            </div>
  
            <div class="row">
              <div class="card col">
                <h2>Stars:</h2>
                ${data.stars}
              </div>
              <div class="card col">
                <h2>Following:</h2>
                ${data.followers}
              </div>
            </div>
  
          </div>
  </body>
        `
          };
  
  
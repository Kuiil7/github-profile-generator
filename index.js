var GitHub = require('github-api');
var fs = require("fs");
var inquirer = require('inquirer');
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        color: "color",
        message: "What is your favorite color?"
      },
      
    ]);
  }
  promptUser()

  function generateHTML(answers) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link href="style.css" rel="stylesheet" type="text/css">
    
        <title>Git-Hub Profile Generator</title>
    </head>
    <body>
        <div class="container">
           
    
        <div class="jumbotron jumbotron-fluid">
            <img id="avatar" src="${image}" alt="Avatar">          <h1 class="display-4">Hi!</h1>
              <p class="lead" id="name">My name is ${github.name}</p>
              <p class="lead" id="location">My name is ${github.location}</p>
              <p class="lead" id="github-link">My name is ${github.link}</p>
              <p class="lead" id="blog">My name is ${blog.link}</p>



          </div>
        </div>
    
    
      <div id="body2">
          <div class="container">
            
                <p id="body-title">I build things and teach people to code. </p>
               
            <div class="row">
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Public Repositories</h5>
                      <p class="card-repositories">${github.repo}</p>
                    
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Followers</h5>
                      <p class="card-followers">${github.followers}</p>
                   
                    </div>
                  </div>
                </div>
              </div>
            </br>
              <div class="row">
                <div class="col-sm-6">
                  <div id="card2" class="card">
                    <div class="card-body">
                      <h5 class="card-title">GitHub Stars</h5>
                      <p class="card-stars">${github.stars}</p>
                
                    </div>
                  </div>
                </div>
                 
                <div class="col-sm-6">
                  <div class="card">
                    <div  id="card2" class="card-body">
                      <h5 class="card-title">Following</h5>
                      <p class="card-following">${github.following}</p>
                
                    </div>
                  </div>
                </div>
              </div>
    
    
    </div>
    
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <!-- just github-api source (5.3kb) -->
    <script src="https://unpkg.com/github-api/dist/GitHub.min.js"></script>
    </body>
    </html>`;
  }
  
  

  


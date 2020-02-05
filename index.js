const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const convertFactory = require('electron-html-to');

var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});


let data = {};

let questions = [
    {
        message: 'What is your github username?',
        name: 'username',
    },
    {
        message: 'What is your favorite color',
        name: 'color',
        type: 'list',
        choices: ['gray', 'blue', 'salmon', 'green'],
    }
]

function init() {
  inquirer
  .prompt(questions)
  .then(function ({username, color}) {
      const queryUrl = `https://api.github.com/users/${username}`; 

      axios
          .get(queryUrl)
          .then((res) => {    
             console.log(res.data)
             
              switch(color) {
                  case 'green':
                      data.color = 0;
                      break;
                  case 'blue':
                      data.color = 1;
                      break;  
                  case 'pink':
                      data.color = 2;
                      break;
                  case 'red':
                      data.color = 3;
                      break;
              }      
              // console.log(data.color)  

              data.username = username;
              data.numOfRepo = res.data.public_repos;
              data.name = res.data.name
              data.followers = res.data.followers;
              data.following = res.data.following;
              data.portPic = res.data.avatar_url;
              data.location = res.data.location;
              data.blog = res.data.blog; 
              data.company = res.data.company
              data.bio = res.data.bio

              axios // Requires a different axios call to get stars
                  .get(`https://api.github.com/users/${username}/repos?per_page=100`)
                  .then((res) => {
                      // console.log(res)
                      data.stars = 0;
                      for (let i = 0; i < res.data.length; i++) { // Loop through each repository and count the number of stars
                          data.stars += res.data[i].stargazers_count;
                      }
                      

                      // console.log(data.stars)

                      let resumeHTML = generateHTML(data);
                      // console.log(resumeHTML)

                      conversion({ html: resumeHTML }, function(err, result) {
                          if (err) {
                            return console.error(err);
                          }
                         
                          console.log(result.numberOfPages);
                          console.log(result.logs);
                          result.stream.pipe(fs.createWriteStream('./resume.pdf'));
                          conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
                        });
                  })

              


             

          })
  })
}

init();

function generateHTML(data) { // Generates HTML based on data given to create a PDF resume
  return `<!DOCTYPE html>
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
      <img id="avatar" src="data.portPic" alt="Avatar">          
      <h1 class="display-4">Hi!</h1>
      <h2>My name is ${data.name}</h2>
      <h3>Currently @ ${data.company}</h3>
      <div class="links-nav">
        <a class="nav-link" href="https://www.google.com/maps/place/${data.location.split(' ')[0]}+${data.location.split(' ')[1]}">${data.location}</a>
        <a class="nav-link" href="https://github.com/${data.username}">github</a>
        <a class="nav-link" href="${data.blog}">blog</a>      </div>
        </div>
      </div>
  
  
    <div id="body2">
        <div class="container">
          
              <p id="body-title">I build things and teach people to code. </p>
             
          <div class="row">
          <div>
                <h4>${data.bio}</h4>
            </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Public Repositories</h5>
                    <p class="card-repositories"> ${data.numOfRepo}</p>
                  
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Followers</h5>
                    <p class="card-followers">${data.followers}</p>
                 
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
                    <p class="card-stars">  ${data.stars}</p>
              
                  </div>
                </div>
              </div>
               
              <div class="col-sm-6">
                <div class="card">
                  <div  id="card2" class="card-body">
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
  <!-- just github-api source (5.3kb) -->
  </body>
  </html>
      `
        };
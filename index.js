const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const convertFactory = require('electron-html-to');

const conversion = convertFactory({
	converterPath: convertFactory.converters.PDF
});

let data = {};
let questions = [{
	message: 'What is your github username?',
	name: 'username',
}, {
	message: 'What is your favorite color',
	name: 'color',
	type: 'list',
	choices: ['green', 'blue', 'pink', 'red'],
}]

function init() {
	inquirer.prompt(questions)
		//function for API call for GitHub data and color
		.then(function({
			username,
			color
		}) {
			const queryUrl = `https://api.github.com/users/${username}`;
			axios.get(queryUrl).then((res) => {
//Color data array index
				switch (color) {
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
				//data changed to shortened variable names
				data.username = username;
				data.repos = res.data.public_repos;
				data.name = res.data.name
				data.followers = res.data.followers;
				data.following = res.data.following;
				data.profPic = res.data.avatar_url;
				data.location = res.data.location;
				data.blog = res.data.blog;
				data.company = res.data.company
				data.bio = res.data.bio
				// Requires a different axios call to get stars
				axios.get(`https://api.github.com/users/${username}/repos?per_page=100`).then((res) => {
					data.stars = 0;
					for (let i = 0; i < res.data.length; i++) {
						// Loop through each repository and count the number of stars
						data.stars += res.data[i].stargazers_count;
					}
					//setting up pdf data into a variable
					let convertToPDF = htmlToPDF(data);
					//passing pdf variable into electron for conversion
					conversion({
						html: convertToPDF
					}, function(err, result) {
						if (err) {
							return console.error(err);
						}
						console.log(result.numberOfPages);
						console.log(result.logs);
						result.stream.pipe(fs.createWriteStream('./GitHub_Profile.pdf'));
						// necessary if you use the electron-server strategy, see bellow for details
						conversion.kill();
					});
				})
			})
		})
}
init();
// Array to be referenced for generate HTML; Uses prompt for color through inquirer above
const colors = [{ // Green
	wrapperBackground: "#E6E1C3",
	headerBackground: "#C1C72C",
	headerColor: "black",
	photoBorderColor: "#black"
}, { // Blue
	wrapperBackground: "#5F64D3",
	headerBackground: "#26175A",
	headerColor: "white",
	photoBorderColor: "#73448C"
}, {
	// Pink
	wrapperBackground: "#879CDF",
	headerBackground: "#FF8374",
	headerColor: "white",
	photoBorderColor: "#FEE24C"
}, { // Red
	wrapperBackground: "#DE9967",
	headerBackground: "#870603",
	headerColor: "white",
  photoBorderColor: "white"
  
}];
// Generates HTML based on data given 
function htmlToPDF(data) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
          <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
  
  
  
      <title>GitHub Profile Generator</title>
      <style>
      @page {
        margin: 0;
      }
     *,
     *::after,
     *::before {
     box-sizing: border-box;
     }

           .footer, header, html {
            background-color: ${colors[data.color].wrapperBackground};

      -webkit-print-color-adjust: exact !important;
      font-family: 'garamond', sans-serif;
      }
  .footer {
      position: fixed;
      height: 20%;
      bottom: 0;
      width: 100%;
      background-color: ${colors[data.color].wrapperBackground};
      -webkit-print-color-adjust: exact !important;

  }
  
  header {
      padding-top: 70px;
      
  
  }
  .photo-header {
      background-color: ${colors[data.color].headerBackground};
      color: ${colors[data.color].headerColor};
      height: 400px;
      width: 80%;
      margin: 0 auto;
      margin-bottom: -80px;
      border-radius: 8px;
      display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 30px
  
  
  }
  
  .photo-background {
         background-color: ${colors[data.color].wrapperBackground};
      padding-top: 100px;
  
  }

  #quote {
    padding: 30px;
  }
  
  img {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      object-fit: cover;
      margin-top: -75px;
      border: 6px solid ${colors[data.color].photoBorderColor};
      box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
    
  }
  
  .main-card1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  
  
  }
  .main-card2 {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row; 
  }
  .card-body {
    width: 500px;
    background-color: ${colors[data.color].headerBackground};
    color: ${colors[data.color].headerColor};
    
  }
  .links-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      color: ${colors[data.color].headerColor};
      width: 100%;
      padding: 20px 0;
      font-size: 1.5em;


  }

  a, a:hover {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    }

  
  .card-text, .card-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-text {
    font-size: 2em;
  }

  .card-title {
    font-size: 3em;
  }

  #company-text {
    font-size: 1.5em;
  }

  

  @media print { 
    body { 
      zoom: .75; 
    } 

  
  
      </style>
  </head>
  <body>
     <div class="photo-background"> 
          <div class="photo-header">
             
  
                <img src="${data.profPic}"><br>
                <h1>Hi!</h1>
                <h3>My name is ${data.name}</h3>
                <p class="text-center" id="company-text">Currently @ ${data.company}</p>
  
                <div class="links-nav">
                <a class="nav-link" href="https://www.google.com/maps/place/${data.location.split(' ')[0]}+${data.location.split(' ')[1]}"><i class="fas fa-location-arrow"></i>&nbsp ${data.location}</a>
                <a class="nav-link" href="https://github.com/${data.username}"><i class="fab fa-github"></i>&nbsp Github</a>
                <a class="nav-link" href="${data.blog}"><i class="fab fa-blogger"></i>&nbsp blog</a>
              </div>
    
  </div> 
  </br>    
   
    
  
  
  </div>
  </br>
  </br>
  </br>
  <h1 class="text-center" id="quote">I build thing and teach people to code.</h1>
  
     <div class="container">
         
  <div class="main-card1">
      <div class="row">
          <div class="col-sm-6 col-md-offset-2"">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Public Repositories:</h5>
                <p class="card-text">${data.repos}</p>
              
              </div>
            </div>
          </div>
          
          <div class="col-sm-6 col-md-offset-2"">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Followers:</h5>
                <p class="card-text">${data.followers}</p>
              
              </div>
            </div>
          </div>
        </div>
      </div>
  </br>
      <div class="main-card2">
        
          <div class="row">
              <div class="col-sm-6 col-md-offset-2"">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Stars:</h5>
                    <p class="card-text">${data.stars}</p>
                  
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-md-offset-2"">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Following:</h5>
                    <p class="card-text">${data.followers}</p>
                  
                  </div>
                </div>
              </div>
            </div>
    
  
  
  <div class="footer"></div>
  </body>
  </html>
        `
};
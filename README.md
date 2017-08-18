### About this project

This project was built on a basic seed project that I found on
  Github: https://github.com/angular/angular2-seed

  I first created the logic for this project in a java online editor using the sample input that was provided.
  After that, I decided to create a sample app with content to in angular 2 using MVC structure. There are a few
  things I would have done differently if I were to use a back end and a database. I would have used PEAN stack
  but due to the simplicity and limited scope of this project, I decided to do everything in angular 2 frontend.



  I first started building the models based on the given input and output. Since I also wanted to show some content
  (i.e. images) for posts, I also decided to create a basic model for content. I also created 2 json files in src/assets
  folder - one for content details (i.e. id, image path, title) and one for the likes data (id, likes array).
  Then I created 2 services (located in src/providers) where I call angular's http.get() content and likes respectively.



  In my home component, at initialization I subscribed to the observables when getting data from both my services.
  I also added an onComplete to make that data useful and write to an array of data that I needed for expected output
  as well as my own requirements that I added to the project. For example, the homepage is essentially a news feed
  for a specific user that is logged in. The user data is hardcoded since it was not the main focus of this project.
  However, I wanted to demonstrate how the like functionality works so I added a like button to take it one step further.


## Instructions to run this project locally:

  Clone or fork this repository
  Make sure you have node.js installed version 5+
  Make sure you have NPM installed version 3+
  WINDOWS ONLY run npm install -g webpack webpack-dev-server typescript to install global dependencies
  run npm install to install dependencies
  run npm start to fire up dev server
  open browser to http://localhost:3000
  if you want to use other port, open package.json file, then change port in --port 3000 script

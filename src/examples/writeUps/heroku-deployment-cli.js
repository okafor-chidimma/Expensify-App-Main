/*
  DEPLOYMENT FROM HEROKU CLI

  1: on your CLI, run
      heroku login
    supply your details to be logged in

  2: run heroku create <NameOfYourApp>
      here heroku sets up your new application and also heroku is adding a new git to my local repo

  3: add a start script to your package.json because that is what heroku will use to run your app
  4: Add heroku-postbuild script if there is anything heroku needs to run after building your project

  5: add and commit these changes to github 

  6: then push to git

  7 then run this command 
      git push heroku master

*/
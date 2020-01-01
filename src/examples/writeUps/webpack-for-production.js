/*
  To get our application ready for production mode, we have to configure webpack for the production mode in order to reduce the size of the bundle.js

  STEPS INCLUDED  
  1. inside package.json, add a new scripts as shown below for production and development modes respectively

     "build:prod": "webpack -p --env production",
     "build:dev": "webpack --env development"

     PS: -p flag => minifies the bundle.js and sets the production flag for 3rd part libraries
     env ==> helps to set the environment variable

  2. change webpack.config.js to export a function that returns an object instead of an object directly

    this function will accept env which is set from package.json as its arg 

  3. change the devtool property of the config file to point to source-maps since that one is suitable for production.

  4. Configure webpack to Separate all our CSS files into its own file using the extract-text-webpack-plugin as shown below

    i. install extract-text-webpack-plugin

          yarn add extract-text-webpack-plugin

    ii. change the webpack.config.js file by adding lines
*/
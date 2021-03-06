/*
  since during development or production, webpack runs, does the bundling and exposes those node environment variables to every other file in src folder which is on the client.
  i.e it makes all the node env variables exposed in definePlugin() global constants that can be used from anywhere, so process.env.FIREBASE_DATABASE_URL does not fail

  We need to create such for the test environment, we need to include the dotenv file and its configuration so that when jest runs this config file, it will also expose 
  those process.env variables and  process.env.FIREBASE_DATABASE_URL will not fail
  
  this means that the process.env variables availble when we run our test is from the dotenv.require() and not not from webpack.definePlugin()


  PS all the variables stored on process.env object are converted to strings by dotenv
  
  For us to use import and export keywords, Jest runs our babelrc configuration file before any thing else
*/


import DotEnv from 'dotenv';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


//this line reads all our variables in .env.test into process.env obejects
DotEnv.config({ path: '.env.test' });


Enzyme.configure({
  adapter: new Adapter()
})

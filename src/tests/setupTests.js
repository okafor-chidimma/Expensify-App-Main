/*
  since during development or production, webpack runs, does the bundling and exposes those node environment variables to every other file in src folder which is on the client.i.e it makes all the node env variables exposed in definePlugin() global constants that can be used from anywhere, so process.env.FIREBASE_DATABASE_URL does not fail

  We need to create such for the test environment, we need to include the dotenv file and its configuration so that when jest runs this config file, it will also expose those process.env variables and  process.env.FIREBASE_DATABASE_URL will not fail


  PS all the variables stored on process.env object are converted to strings by dotenv
*/


import DotEnv from 'dotenv';
DotEnv.config({ path: '.env.test' });

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
})
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/*
  using npm dotenv, takes all the variables in your .env file and adds them to the process.env object, so these env variables become available all through that file where the dotenv is required

  browser does not have access to the process.env object which means that node environment variables don't get passed to the client side js automatically because it is not safe practice, so to make node environment variables available in webpack via the usage of dotenv, to be available to the client side i.e everything inside of src folder which gets bundled to bundle.js, we have to manually pass them via the DefinePlugins() in webpack
*/
//recall that in the package.json file, we passed in the NODE_ENV flag to the test script,
//this means that in webpack.config,if NODE_ENV is set, it takes that value or takes 'development' by default
//and since Heroku sets NODE_ENV to production we have 
//when we run the npm test script, NODE_ENV = 'test',
//when it is undefined, NODE_ENV = 'development'
//when in production in Heroku, NODE_ENV = 'production'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}
// console.log(__dirname);
module.exports = env => {
  // console.log(env, 'env');
  const isProduction = env === 'production';
  return {
    mode: env,
    entry: ['babel-polyfill','./src/app.js'],
    output: {
      //this is the absolute filepath(folder) where webpack saves our generated files in
      //so webpack saves bundle.js in /Users/Chidimma/Desktop/Expensify-Ap/public/dist/ folder path
      //this refers to where in our laptop, webpack saves the generated file in
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.DefinePlugin({
        // so now we can use process.env.FIREBASE_API_KEY anywhere inside our src folder to get the environment variable
        // dotenv converts those variables to strings and adds them to the process.env object but
        //this plugin does text replace, for e.g if process.env.NAME = 'chidimma'
        /*
          Normally, when i call on process.env.NAME, i should get the string 'chidimma'.
          But this plugin does text replace, so i will be getting the variable chidimma, without the quotes.
          To make sure i pass strings to the name property in the plugin, i have to pass the value through JSON.stringify(process.env.NAME)
        */
        'process.env.FIREBASE_API_KEY': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        ),
        'process.env.FIREBASE_APP_ID': JSON.stringify(
          process.env.FIREBASE_APP_ID
        ),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(
          process.env.FIREBASE_MEASUREMENT_ID
        ),
        'process.env.NUMBER': JSON.stringify(2)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      //you are telling dev-server to serve the public folder in the localhost:8080 url, so by defualt it serves the index.html in the root directory
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      /* this is the path from where webpack-dev-server or any server serves the webpack generated files from
         i.e webpack tells webpack-dev-server to serve those files generated in the output.path property from this location in our server, remember our server is localhost:8080 (which is public folder)
         Whenever request for file localhost:8080/dist/bundle.js comes as we specified in our index.html in the public folder, 
         /Users/Chidimma/Desktop/Expensify-Ap/public/dist/bundle.js file will be served
         in other words, publicPath value is equivalent to the output.path value even if they are not the same name e.g if publicPath:"/assets/", it will be equivalent to output.path value /Users/Chidimma/Desktop/Expensify-Ap/public/dist/
        
        remember that it is publicPath value that you will use in index.html or any file in your public folder where you need to use any js or css or img files
        for this our case: index.html in public folder
            <script src="/dist/bundle.js"></script>
        if our publicPath was ==> /assets/, then index.html will be <script src="/assets/bundle.js"></script>
    */
      publicPath: '/dist/'
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  };
};

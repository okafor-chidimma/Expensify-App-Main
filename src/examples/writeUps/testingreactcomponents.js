/*
  react-test-renderer is a package used to render react components in JS code so we can assert and ensure the right thing got rendered

  Just like ReactDOM is used to render on the browser, this is used to render inside a JS file

  two ways of testing react components
  A: Shallow rendering
  B: Full DOM rendering

  A is used when we are not interested in user interaction or life cycle events. we just want to render the given component as it is. without rendering child components

  B is used when we want to render both the components and the child components as well


  Now, it is not good practice to make assertions directly about the rendered output, trying to check if it equal some object using the toEqual() but we wil be using snapshots instead

  snapshots allow us to track data over time. this means that when used to for the first time, it creates a snapshot of the component and stores it in our file.
  This shot is used to test against other shots when the test is re ran, so if there are changes the test fails and the snapshot outputs the error so we can either choose to accept or reject the changes

  To accept the changes, type 'u' in the terminal and the new snapshot is saved, replacing the old one

  


  Steps Involved
  1 Import React since we are going to be typing JSX
  2 Import Shallow rendering as shown in Header.test.js in components folder in tests folder
  3 Import the given component
  4 Declare a test suite i.e call the test()




  Now, due to the fact that react renderer has its limitations, we would be using enzymes package which uses react renderer and also has more methods used for testing components.
  Unlike earlier versions v2 and lower of enzymes that have all the packages rolled up in one, these packages have been separated and are to be installed individually

  when using enzymes these are extra packages needed, so install the following

  1 enzymes
  2 enzymes-adapter-react-16 : this allows you to install only what you will need to test the version of react(v16) you have installed. which makes the enzymes package smaller. if it is v15 react you want to test against with enzymes v3, then enzymes-adapter-react-15 will be installed

  3 raf: which is short form for Request Animation Frame. polyfil for a browser feature that is being provided by the browser and without it in the testing environment, we will encounter errors

  4 Create a setup test file where we can configure our test environment and set up the enzyme adapter.
  this enables us to do it once as opposed to ding so every single time we use enzyme

  4a create setupTests.js in the tests folder and inside type the following
    
    import Enzyme from 'enzyme';
    import Adapter from 'enzymes-adapter-react-16';

    Enzyme.configure({
      adapter: new Adapter()
    })

  5 Create a setup jest json file to allow us to specify that the setupTests file should run and other configuration before the actual test runs at the root of the project

  to do these, we configure jest using setupFiles configuration which accepts a array of paths containing our setup files jest runs before the actual test is ran

  5a create a jest.config.json and type the various things i want to configure

  {
    "setupFiles":[
      "raf/polyfill",
      "<rootDir>/src/tests/setupTests.js"
    ]
  }

  PS: anytime we want to specify a relative path in a configuration file, we use <rootDir>, which means and specifies root directory

  6 Edit the test script on package.json to accommodate the config file
  "test":"jest --config=jest.config.json",
  "test:watch:mode":"jest --config=jest.config.json --watchAll"

  7 Install enzyme-to-json: This package ensures that the enzyme output works effectively with the snapshot functionality in jest



  <Navbar>
    <
  </Navbar>
*/
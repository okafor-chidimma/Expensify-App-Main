/*
  How to connect the redux store to react components
  STep 1: Install react-redux
      yarn add react-redux

  Step 2: Import the named export component Provider in the app.js
      import { Provider } from 'react-redux

      provider component provides your configured redux to your different components as seen below on line 14
      as a store props

  Step 3: Enclose your main component that has every other component in it(e.g <ApiRouter/>) in the
    provider component as opening and closing tag as shown below

      <Provider store={nameOfYourReduxStore}>
        <ApiRouter />
      </Provider>

  Step 4: Import a named export method connect In the individual component where the state
  stored in the redux store will be used
    connect() connects the react component to the state stored in redux store.
      accepts parameters which lets us determine what information from the store we want
      the component to access.
      example of such parameter is a function
        this above function accepts state as the first argument and returns an object with the state properties as key-value pairs
        these object properties can be accessed by the components as props
    For eg
    Step 4a: declare a component preferably, stateless
      const MyComponent = (props) => (
        <div>
          <h1>This is my component</h1>
          {props.hello}
          {props.metoo}
        </div>
      );

    Step 4b: Import the connect method to link this component in 4a to the redux store which has the state provided
                                            this is where we provide info on what we want to connect which is the store
      const ConnectedMyComponent = connect((state) => {
        return {
          hello: state.expense,
          metoo: state.filters
        }
      })(MyComponent);

    PS: any change to the state causes the component to re-render again
    this means that line 41 and 42 are reading off of the state in the redux store and are being
    passed to the component as hello and metoo props

    connect() can be called without any parameters and this will expose dispatch() to the component as a props

    this dispatch is exposed because a mapDispatchToProps function automatically adds dispatch as a props to connected components

    In cases where we want to customize how our dispatch() should be called, we create our own mapDispatchToProps() with the customizing as shown in AddExpensePage.js
  step 5: export the Connected component by default to be used anywhere in the application
*/
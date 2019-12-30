/*
   why do we need redux?
   A: For state mgt in complex systems.
   redux provides a global store where we can keep the data the changes within an application
   and since it is global, it is easily accessible by all components that make up that application
   -  it makes it possible for you to really reuse components as much as we want

   STEPS TO USING REDUX
   1: Install it
   2: import "createStore" method which is a named export to create a store

   METHODS IN REDUX
    1: createStore()
        accepts a function called a reducer
          the parameters passed to that function is the default value of state object and an action object
            this object determines how the state object changes via the 'type' property, after which
                    it returns a new state object
      example
        const store = createStore(( state = { count: 0 }, action)=>{

        });
      
      b: Features of a reducer
        i: they are pure functions; this means that the output is purely determined by the input
        and not by any external factor. i.e it is not interacting with things outside of its scope

        ii: Never change the state or action objects; always return new objects instead

      PS: usually when using one reducer, you can pass it in directly to the createStore() but when 
      there is a lot of changes to keep track of, it is better to use combineReducers()
    2: getState()
          gets the current state value when it is called
            example
              store.getState();
          does not re-run as the state value changes

    3: Actions allow us to change the redux store
        An action is an object that gets sent to the store
        must have the 'type' property defined
        can have additional properties named anything we like as we deem fit
        This object describes the type of action to take via the type property as shown below
        {
          type: 'INCREMENT',
          incrementBy:5
          display:true
        }

        action object needs to be passed into the store to be able to change the state
        we can have as many actions as we deem necessary that affects state differently
        to pass action object to the store, we use method number 4

        it is better to create Action generators i.e functions that return action objects

    4: dispatch()
        used to send an action object to the store
        accepts the action object as the parameter: as shown below
          example of dispatching an action 
            store.dispatch({
              type: 'INCREMENT'
            })

        once you dispatch an action, the function inside the createStore() runs

    5: subscribe()
        accepts a function as the parameter
        example
          store.subscribe(()=>{
            console.log('hey i have been called');   
          });
        this watches the store for any changes and the function parameter runs when ever any change occurs in the store
          i.e if there are 4 dispatches, subscribe() function parameter runs 4times
        the return value of subscribe() is a function we can call to unsubscribe
        example
          const unsubscribe = store.subscribe(()=>{
            console.log('hey i have been called');
          });

        anytime we call unsubscribe(), the subscribe method is terminated and stops logging the info
        this method has to come before any instance of dispatch

    6: combineReducers()
        this is used to combine 2 or more reducers.
        The number of reducers depends on the root properties of the state.
        this method accepts an object containing the different reducers to combine as a name: value pair

*/
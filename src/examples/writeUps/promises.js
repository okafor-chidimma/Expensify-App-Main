/*
  A promise is an object that provides an answer sometime in the future, either a resolved or rejection answer
  A promise can either be resolved or rejected once and after which it moves on to the next order of business

  const promise = new Promise((resolve,reject)=>{
    resolve();// can take just one argument of any data type.
              runs if the promise is resolved

    reject();// can take just one argument of any data type.
              runs if the promise is rejected
  });

  to get the status of a promise after it executes we need to register a callback as shown below

  promise.then((data)=>{//. then runs if the promise is resolved
    console.log(data) // data is what comes back after resolving a promise
  }).catch((error)=>{// .catch runs if the promise is rejected. called the error handler
    console.log(error) //error is what comes back after a promise is rejected
  })

*/

import * as firebase from 'firebase';
// const firebaseConfig = {
//   apiKey: 'AIzaSyCSqJDc6W9-slX4XfIBeYT5VdlZq0IsMks',
//   authDomain: 'expensify-app-a21ef.firebaseapp.com',
//   databaseURL: 'https://expensify-app-a21ef.firebaseio.com',
//   projectId: 'expensify-app-a21ef',
//   storageBucket: 'expensify-app-a21ef.appspot.com',
//   messagingSenderId: '265134688542',
//   appId: '1:265134688542:web:80bb3ee6f3b9216e1ba10f',
//   measurementId: 'G-8YEJH3T76R'
// };

// console.log(process.env, 'value');
// console.log(typeof process.env.FIREBASE_MEASUREMENT_ID,'type of value');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const database = firebase.database(); // exposes all the methods attached to the database module of firebase


//Step 1 in google authentication to create a provider for our google authentication for every user
// configuration
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

/*
  AUTHENTICATION
  1. With google:
      a. Enable Authentication with google on the firebase dashboard
      b. Set up our provider by creating a new instance of it ==> this allows us to set up firebase to       authenticate with google, i.e a provider is a way to provide Authentication either by google,       github, email etc
      c. create a function that when called starts the authentication process
      d. Try to track Authentication to know when a user logs in or out using AuthStateChanged()
*/

// FireBase does not support arrays a datatype

// database
//   .ref() // refers to reference(tables) of the database.since no argument is passed in, we are referring to the root of the project
//   .set({
//     // to set values for the database can take any of the data types
//     name: 'Chidimma Okafor',
//     age: 25,
//     stressLevel: 6,
//     job: {
//       title: 'Software Developer',
//       company: 'Microsoft'
//     },
//     isSingle: true,
//     location: {
//       city: 'Lagos',
//       country: 'Nigeria'
//     }
//   })
//   .then(() => {
//     console.log('I delivered the first message to the db!');
//   })
//   .catch(error => {
//     console.log('An error occurred during delivery for first message', error);
//   });

// // to edit data
// // database.ref().set('Hello'); // this line will delete every thing we have set in the root directory and replace it with the string Hello

// // database.ref('age').set(26); //sets just the age property
// // database.ref('location/city').set('Akoka Lagos');

// // to create data
// database
//   .ref('attributes')
//   .set({
//     height: 70,
//     weight: 150
//   })
//   .then(() => {
//     console.log('I delivered the second message to the db!');
//   })
//   .catch(error => {
//     console.log('An error occurred during delivery for second message', error);
//   });

//   // to remove data
// database
//   .ref('isSingle')
//   .remove()
//   .then(() => {
//     console.log('data removed successfully');
//   })
//   .catch(error => {
//     console.log('Problem deleting', error);
//   });

//   // to update data
// database
//   .ref()
//   .update({//accepts only object datatype
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
//   })
//   .then(() => {
//     console.log('data updated successfully');
//   })
//   .catch(error => {
//     console.log('Problem updating', error);
//   });

// to fetch data from db just once
// database
//   .ref()
//   .once('value')
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(err => {
//     console.log('could not fetch', err);
//   });

// database
//   .ref('location')
//   .once('value')
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(err => {
//     console.log('could not fetch', err);
//   });

// database
//   .ref('location/city')
//   .once('value')
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(err => {
//     console.log('could not fetch', err);
//   });

// // to fetch data from db always with latest data called subscription
// const onValueChange = database.ref().on(
//   'value',
//   snapshot => {
//     const dbDetails = snapshot.val();
//     console.log(dbDetails, 'i am sub');
//     console.log(
//       `${dbDetails.name} is a ${dbDetails.job.title} in ${dbDetails.location.city}`
//     );
//   },
//   error => {
//     console.log('could not fetch', error);
//   }
// );

// setTimeout(() => {
//   database.ref().update({
//     //accepts only object datatype
//     name: 'Anthony Joshua',
//     'job/title': 'Backend end Developer',
//     'location/city': 'Las Vegas'
//   });
// }, 3000);

// to unsubscribe to a particular subscription we pass in an arg else we dont pass in which turns off all subscriptions
// database.ref().off(onValueChange)

// HOW ARRAYS ARE REPRESENTED IN FIREBASE
// const expenses = [
//   {
//     id: '1',
//     description: 'January rent',
//     note: 'Last rent before moving',
//     amount: 54500,
//     createdAt: 0
//   },
//   {
//     id: '2',
//     description: 'Cable Money',
//     note: 'Gotv cable money',
//     amount: 4500,
//     createdAt: 1
//   },
//   {
//     id: '3',
//     description: 'Data Money',
//     note: 'Subscription for the month',
//     amount: 45000,
//     createdAt: 2
//   }
// ];

// push accepts any data type that firebase supports
// database.ref('expenses').push({
//   description: 'January rent',
//   note: 'Last rent before moving',
//   amount: 54500,
//   createdAt: 0
// });

// database.ref('expenses').push({
//   description: 'Cable Money',
//   note: 'Gotv cable money',
//   amount: 4500,
//   createdAt: 1
// });

// database.ref('expenses').push({
//   description: 'Data Money',
//   note: 'Subscription for the month',
//   amount: 45000,
//   createdAt: 2
// });

// To grab our data from the db and put them into arrays

// database.ref('expenses').on(
//   'value',
//   snapshot => {
//     const expenses = [];
//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
//   },
//   error => {
//     console.log('error retrieving', error);
//   }
// );

// EVENTS SUCH AS 'value' THAT CAN PASSED IN TO THE once() OR on()
// child_removed, child_changed,child_added
// database.ref('expenses').on(
//   'child_removed',
//   snapshot => {
//     console.log(snapshot.key, snapshot.val(), 'I was removed');
//   },
//   error => {
//     console.log('error retrieving', error);
//   }
// );

// database.ref('expenses').on(
//   'child_changed',
//   snapshot => {
//     console.log(snapshot.key, snapshot.val(), 'I was changed');
//   },
//   error => {
//     console.log('error retrieving', error);
//   }
// );

// // child_added fires up for the data already in the db and for new ones to be added
// database.ref('expenses').on(
//   'child_added',
//   snapshot => {
//     console.log(snapshot.key, snapshot.val(), 'I was added');
//   },
//   error => {
//     console.log('error retrieving', error);
//   }
// );

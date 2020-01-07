/*
  Async actions are those actions that return a function
  this is the actual function that does the logging in
*/
import { googleAuthProvider, firebase } from '../firebase/firebase';
// Using a popup.
export const startLoginProcess = () => {
  // returns a function since it is going to be asynchronous
  return () => {
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(result => {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        console.log(token, 'user token');

        // The signed-in user info.
        var user = result.user;
        console.log(user, 'my user');
      });
  };
};

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const startLogOutProcess = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
export const logout = () => ({
  type: 'LOGOUT'
});

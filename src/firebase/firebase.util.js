import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDe7gbAA7JxTBYZYC3JeBm432md4GRUzKA",
    authDomain: "crwn-db-b29bd.firebaseapp.com",
    projectId: "crwn-db-b29bd",
    storageBucket: "crwn-db-b29bd.appspot.com",
    messagingSenderId: "266028686869",
    appId: "1:266028686869:web:294e918d92be0f8c88b81c",
    measurementId: "G-T466VLE72J"
  };

  firebase.initializeApp(config);
  
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
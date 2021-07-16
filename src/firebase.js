import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAYdZGv2f-0gvWOyQ8zkk8HjbsJqmcKwOM",
    authDomain: "digital-workout-programme.firebaseapp.com",
    databaseURL: "https://digital-workout-programme.firebaseio.com",
    projectId: "digital-workout-programme",
    storageBucket: "digital-workout-programme.appspot.com",
    messagingSenderId: "127507442538"
};
firebase.initializeApp(config);
export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

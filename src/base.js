import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCfAo1nzhEFEqXhNmMXGuZdGqFsz0jAPe8",
    authDomain: "catch-of-the-day-de1.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-de1.firebaseio.com",
    projectId: "catch-of-the-day-de1",
    storageBucket: "catch-of-the-day-de1.appspot.com",
    messagingSenderId: "923989345096"
};

export const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export const firebaseAuth = firebase.auth;
export default base;
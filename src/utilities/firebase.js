import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCiV4R9iYp1sl48Z1_EUaLc9Dheb9fuKGI",
    authDomain: "practice-massey.firebaseapp.com",
    projectId: "practice-massey",
    storageBucket: "practice-massey.appspot.com",
    messagingSenderId: "688791068552",
    appId: "1:688791068552:web:d7f3cb5cd18470498ce43d",
    measurementId: "G-5YRDXPMRM5"
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

const db = firebase.firestore();

export const teacherNames = db.collection('teachers');
export const usersCollection = db.collection('users');

export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;


export default firebase;

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

export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// could I loop through each collection and make a const for each session?
// ^^ potential way to handle the menu of session options?
export const sessionsCollection = db.collection('sessions');
export const usersCollection = db.collection('users');
export const siteRef = db.doc('site/business');
export const employeeRef = db.collection('site').doc('employees').collection('admins')

export const teacherNames = db.collection('teachers');
export const classesCollection = db.collection('classes');
// /teachers/whN5CXz6Dx6PpFv41IrB/classes/qwQoYGX7wQrGyGBj9JmV
export const specificQuestionsCollection = db.collection('teachers').doc('whN5CXz6Dx6PpFv41IrB').collection('classes').doc('qwQoYGX7wQrGyGBj9JmV').collection('questions');

// db.collection('sessions').get().then( snapshot => {
//     snapshot.forEach((doc)=>{
//         console.log(doc.data());
//     });
// }).catch ( e => {
//     console.log(e);
// });

export default firebase;

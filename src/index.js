import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './utilities/firebase.js';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

firebase.auth().onAuthStateChanged( user => {
  if(user){
    console.log(user.email);
    console.log(user.uid);

  } else {
    console.log('no user')
  }
})

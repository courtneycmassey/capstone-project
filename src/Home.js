import React, { useContext } from 'react'
import app from './utilities/firebase';
import { AuthContext } from './Auth';


const Home = () => {

    const {currentUser} = useContext(AuthContext);

    console.log('Home Component Mounted');
    console.log(currentUser);

    return (
        <div>
            <h3>Home</h3>
            <p>You are signed in as {currentUser.email}</p>
            <p>Your userId is: {currentUser.uid}</p>
            <button className="btn btn-danger" onClick={() => app.auth().signOut()}>Sign Out</button>
        </div>
    );
};

export default Home;
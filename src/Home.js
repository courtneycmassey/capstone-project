import React, { useContext } from 'react'
import app from './utilities/firebase';
import { AuthContext } from './Auth';


const Home = () => {

    const {currentUser} = useContext(AuthContext);

    console.log('Home Component Mounted');
    console.log(currentUser);

    return (
        <div>
            <h1>Home</h1>
            <h2>Welcome Home, {currentUser.displayName}</h2>
            <button onClick={() => app.auth().signOut()}>Sign Out</button>
        </div>
    );
};

export default Home;
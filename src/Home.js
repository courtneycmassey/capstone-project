import React, { useContext, useEffect, useState } from 'react'
import app from './utilities/firebase';
import { AuthContext } from './Auth';
import firebase, { usersCollection } from './utilities/firebase';


const Home = () => {

    const {currentUser} = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState('')

    useEffect(() => {
        usersCollection
        .doc(currentUser.uid)
        .get()
        .then(snapshot => {
            setUserDetails(snapshot.data())
            console.log('Home Component Mounted');
            console.log(currentUser);
        })
    }, [currentUser]);
    

    return (
        <div>
            <h3>Home</h3>
            <p>You are signed in as {currentUser.email}</p>
            <p>Your userId is: {currentUser.uid}</p>
            <p>Your name is: {userDetails.first_name}</p>
            <p>You are a {userDetails.user_type}</p>
            <button className="btn btn-danger" onClick={() => app.auth().signOut()}>Sign Out</button>
        </div>
    );
};

export default Home;
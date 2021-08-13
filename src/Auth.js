import React, { useEffect, useState } from 'react'
import app from './utilities/firebase';
import { usersCollection } from './utilities/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    const [userDetails, setUserDetails] = useState('')

    useEffect(() => {

        if (currentUser != null) {
            usersCollection
            .doc(currentUser.uid)
            .get()
            .then(snapshot => {
                setUserDetails(snapshot.data())
                console.log('Home Component Mounted');
                console.log(currentUser);
        })
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider
            value={{currentUser, userDetails}}
        >
            {children}
        </AuthContext.Provider>
    );
};
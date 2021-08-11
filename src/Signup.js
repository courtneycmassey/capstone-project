import React, { useState, useCallback } from "react";
import { withRouter } from "react-router";
import app, { usersCollection } from './utilities/firebase.js';

const SignUp = ({ history }) => {

    const storeUserInfo = (data, email, password) => {

        usersCollection
        .doc(data.user.uid)
        .set({
            email: email,
            password: password
        })
    }

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then( (data) => {
                    storeUserInfo(data, email.value, password.value);
                }
                );
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);


    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSignUp}>
            <label>
                Email:
                <input 
                    name="email" 
                    type="email" 
                    placeholder="email" />
            </label>
            <label>
                Password:
                <input 
                    name="password" 
                    type="password" 
                    placeholder="password" />
            </label>
            <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default withRouter(SignUp);
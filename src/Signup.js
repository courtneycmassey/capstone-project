import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app, { usersCollection } from './utilities/firebase.js';

const SignUp = ({ history }) => {

    const storeUserInfo = (data, email, password, firstName, lastName, userType) => {

        usersCollection
        .doc(data.user.uid)
        .set({
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            user_type: userType
        })
    }

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { userType, firstName, lastName, email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then( (data) => {
                    storeUserInfo(data, email.value, password.value, firstName.value, lastName.value, userType.value);
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
                User Type:
                <input 
                    name="userType" 
                    type="text" 
                    placeholder="student or teacher" />
            </label>
            <label>
                First Name:
                <input 
                    name="firstName" 
                    type="text" 
                    placeholder="First Name" />
            </label>
            <label>
                Last Name:
                <input 
                    name="lastName" 
                    type="text" 
                    placeholder="Last Name" />
            </label>
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
            <button className="btn btn-info" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default withRouter(SignUp);
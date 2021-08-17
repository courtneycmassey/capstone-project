import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app, { usersCollection } from './utilities/firebase.js';

const SignUp = ({ history }) => {

    const storeUserInfo = (data, email, password, firstName, lastName, userType) => {

        console.log(userType)

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
        const { firstName, lastName, email, password } = event.target.elements;
        const userType = event.target.elements["user-type"].value;

        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then( (data) => {
                    storeUserInfo(data, email.value, password.value, firstName.value, lastName.value, userType);
                }
                );
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);


    return (
        <div>
            <h1>Raise a Question</h1>
            <div className="container">
                <div className="row">
                    <div className="col" id="form">
                        <form onSubmit={handleSignUp}>
                            <h3>Create an account</h3>
                            <label>
                                I am a:&nbsp;
                                <select name='user-type' id="user-type">
                                    <option></option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </label><br/>
                            <label>
                                First Name:&nbsp;
                                <input 
                                    name="firstName" 
                                    type="text" 
                                />
                            </label><br/>
                            <label>
                                Last Name:&nbsp;
                                <input 
                                    name="lastName" 
                                    type="text" 
                                />
                            </label><br/>
                            <label>
                                Email:&nbsp;
                                <input 
                                    name="email" 
                                    type="email" 
                                    />
                            </label><br/>
                            <label>
                                Password:&nbsp;
                                <input 
                                    name="password" 
                                    type="password" 
                                    />
                            </label><br/>
                            <button className="btn btn-info" type="submit">Sign Up</button>
                        </form>
                    </div>
                    <div className="col-5">
                            <img src="hand_raised.svg" alt="Hand Raised"></img>
                    </div> 
                </div>
            </div>

        </div>
    );
};

export default withRouter(SignUp);
import React, { Component } from 'react';
import firebase, { usersCollection } from '../../utilities/firebase';

class LoginForm extends Component {

    state = {
        register: false,
        user: {
            email: '',
            password: ''
        }
    }
    
    handleForm = (e) => {
        e.preventDefault();
        
        // ES6 notation below:
        const {email} = this.state.user;
        const {password} = this.state.user;

        if (this.state.register){
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then( user => {
                this.handleStoreRegisterUser(user);
                console.log(user)
            })
            .catch(e => {
                console.log(e);
            })

        } else {
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then( response => {
                console.log(response)
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState( prevState => ({
            user:{
                ...prevState.user,
                [name]: value
            }
        }))
    }

    handleLogout = () => {
        firebase.auth().signOut().then ( ()=> {
            console.log('User logged out')
        })
    }

    handleGetUserInfo = () => {
        let getUser = firebase.auth().currentUser;
        if(getUser){
            getUser.getIdTokenResult().then( response => {
                console.log(response)
            })
        } else {
            console.log('NO USER')
        }
    }

    handleUpdateEmail = () => {
        let getUser =  firebase.auth().currentUser;
        let credential = firebase.auth.EmailAuthProvider
                        .credential('steve@gmail.com', 'testing1234');

        if(getUser) {
            getUser.reauthenticateWithCredential(credential).then( res => {
                getUser.updateEmail('steve@gmail.com')
            })
            // getUser.updateEmail('steve@gmail.com').then( response => {
            //     console.log(response);
            // }
            // )
        }
    }

    handleUpdateProfile = () => {
        let getUser = firebase.auth().currentUser;
        getUser.updateProfile({
            displayName:"STEVIE",
            photoURL: "https:///photo.jpg"
        }).then(() => {
            console.log(getUser)
        })
    }

    handleStoreRegisterUser = (data) => {
        usersCollection.doc(data.user.uid).set({
            email: data.user.email
        }).then( data => {
            console.log(data);
        }).catch( e => {
            console.log(e);
        })
    }

    render(){
        return(
            <>
                <form onSubmit={ (e)=> this.handleForm(e) }>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={ (e) => this.changeHandler(e)}>
                        </input>
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={ (e) => this.changeHandler(e)}>
                        </input>
                    </div>

                    <button type="submit" className="btn btn-success">
                        { this.state.register ? 'Register' : "Sign in"}
                    </button>
                </form>
                <hr />
                <button className="btn btn-danger" onClick={ ()=> this.handleLogout() }>
                    Logout
                </button>
                <hr/>
                <button className="btn btn-outline-info" onClick={ ()=> this.handleGetUserInfo() }>
                    Ask about the User
                </button>
                <hr/>
                <button className="btn btn-outline-info" onClick={ ()=> this.handleUpdateEmail() }>
                    Update User Email
                </button>
                <hr/>
                <button className="btn btn-outline-info" onClick={ ()=> this.handleUpdateProfile() }>
                    Update User Profile
                </button>
            </>

        )
    }
}

export default LoginForm;
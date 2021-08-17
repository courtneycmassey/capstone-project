import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from './utilities/firebase.js';
import { AuthContext } from './Auth';

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h1>Raise a Question</h1>

            <div className="container">
                <div className="row"> 
                    <div className="col-5" id="site-intro"> 
                        <h3>A question board for modern classrooms.</h3><br/>
                        <h5>Anonymous for students.</h5><br/>
                        <h5>Detailed for teachers.</h5>
                    </div>
                    <div className="col-5">
                        <img src="hand_raised.svg" alt="Hand Raised"></img>
                    </div> 
                    <div className="col-2" id="login-section">
                        <form onSubmit={handleLogin}>
                            <label>
                                <input name="email" type="email" placeholder="email" />
                            </label>
                            <label>
                                <input name="password" type="password" placeholder="password" />
                            </label><br/>
                            <button className="btn btn-success btn-sm" type="submit">Log in</button>
                        </form>
                        <br/>
                        <h6>Need an account?</h6>
                            <form action="/signup">
                                <button className="btn btn-info btn-sm" type="submit">Signup</button>
                            </form>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p>© 2021 Courtney Massey</p>
                <p>image by <a href="https://undraw.co/">undraw.co</a></p>
            </div>
        </div>
    );
};

export default withRouter(Login);
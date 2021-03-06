import React, { useContext } from 'react'
import app from './utilities/firebase';
import { AuthContext } from './Auth';
import './Home.css'


const Home = () => {

    const {currentUser, userDetails} = useContext(AuthContext);

    if (userDetails.user_type === 'student') {
        return (
            <div>
                <div className="signed-in-user">
                    <p >You are signed in as {currentUser.email}</p>
                    <button className="btn btn-danger btn-sm" id="sign-out-button" onClick={() => app.auth().signOut()}>Sign Out</button>
                </div>
                <div className="container">
                    <div className="row"> 
                        <div className="col">
                            <img src="hand_raised.svg" alt="Hand Raised"></img>
                        </div> 
                        <div className="col-8"> 
                            <h2>Welcome, {userDetails.first_name}!</h2>
                            <h5>As a {userDetails.user_type} you can:</h5>
                            <ul>
                                <li>View the Question Board for a class</li>
                                <li>Anonymously post a question to a Question Board</li>
                                <li>Upvote a question so it grabs your teacher's attention</li>
                            </ul> 
                            <p></p> 
                            <p></p>              
                            <h5>Visit "Question Board" to get started</h5> 
                        </div> 
                    </div>
                </div>
                <div className="footer">
                    <p>© 2021 Courtney Massey</p>
                    <p>image by <a href="https://undraw.co/">undraw.co</a></p>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="signed-in-user">
                    <p >You are signed in as {currentUser.email}</p>
                    <button className="btn btn-danger btn-sm" id="sign-out-button" onClick={() => app.auth().signOut()}>Sign Out</button>
                </div>
                <br/>
                <div className="container">
                    <div className="row"> 
                        <div className="col">
                            <img src="hand_raised.svg" alt="Hand Raised"></img>
                        </div> 
                        <div className="col-8"> 
                            <h2>Welcome, {userDetails.first_name}!</h2>
                            <h5>As a {userDetails.user_type} you can:</h5>
                            <ul>
                                <li>Add class sessions to your course collection</li>
                                <li>View the Question Board for a class session</li>
                                <li>View the name of the student who asked a question</li>
                                <li>See how many votes a question has received</li>
                                <li>Delete questions from a Question Board</li>
                                <li>Mark questions as answered</li>
                                <li>Sort questions by votes or time raised</li>
                            </ul> 
                            <p></p> 
                            <p></p>              
                        </div> 
                    </div>
                </div>
                <div className="footer">
                    <p>© 2021 Courtney Massey</p>
                    <p>image by <a href="https://undraw.co/">undraw.co</a></p>
                </div>
            </div>
        );
    };
};

export default Home;
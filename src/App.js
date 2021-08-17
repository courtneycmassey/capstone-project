import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';

import Home from './Home';
import Header from './components/header';
import Footer from './components/footer';
import Login from './Login';
import TeacherApp from './TeacherApp'
import StudentApp from './StudentApp';
import ClassForm from './components/classForm';
import Signup from './Signup'

const App = () => {
    
    return (
        <AuthProvider>
            <Router>
                <Header/>
                <main role="main" className="container">
                    <Switch>
                        <PrivateRoute exact path="/" component={Home}/>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/class_form" component={ClassForm}/>
                        <Route exact path="/teacher_view" component={TeacherApp}/>
                        <Route exact path="/student_view" component={StudentApp}/>
                    </Switch>
                </main>
                {/* <Footer/> */}
            </Router>
        </AuthProvider>
    );
};

export default App;
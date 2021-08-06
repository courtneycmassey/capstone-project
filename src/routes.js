import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from './components/home';
import Header from './components/header';
import Footer from './components/footer';
// import Sessions from './components/sessions';
import Login from './components/user/login';
import TeacherApp from './TeacherApp'
import StudentApp from './StudentApp';
import ClassForm from './components/classForm';

const Routes = () => (
    <BrowserRouter>
        <Header/>
        <main role="main" className="container">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/class_form" component={ClassForm}/>
                <Route exact path="/teacher_view" component={TeacherApp}/>
                <Route exact path="/student_view" component={StudentApp}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </main>
        <Footer/>
    </BrowserRouter>
)

export default Routes;
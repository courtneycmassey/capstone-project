import React, { useContext } from 'react';
import { AuthContext } from '../Auth';
import { Link } from 'react-router-dom';

const Header = () => {
    
    const {userDetails} = useContext(AuthContext);

    if (userDetails.user_type === 'student') {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-info">
                    <Link className="navbar-brand" to="/">Raise a Question</Link>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/student_view">Student View</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    } else if (userDetails.user_type === 'teacher') {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-info">
                    <Link className="navbar-brand" to="/">Raise a Question</Link>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/class_form">Manage Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/teacher_view">Question Board</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    } else {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-info">
                    <Link className="navbar-brand" to="/">Raise a Question</Link>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    };
    
    // return (
    //     <header>
    //         <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-info">
    //             <Link className="navbar-brand" to="/">Raise a Question</Link>
    //             <div className="collapse navbar-collapse" id="navbarCollapse">
    //                 <ul className="navbar-nav mr-auto">
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/">Home</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/class_form">Add Class</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/teacher_view">Teacher View</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/student_view">Student View</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/login">Login</Link>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </nav>
    //     </header>
    // );
};

export default Header;
import TeacherView from './components/teacherView';
import CourseSelection from './components/courseSelection';
import React, { useState, useContext } from "react";
import { AuthContext } from './Auth';

const TeacherApp = () => {

    const {currentUser, userDetails} = useContext(AuthContext);

    const [selectedClass, setSelectedClass] = useState('')

    const chooseClass = (class_id) => {
        setSelectedClass(class_id);
    };    

    if (userDetails.user_type === 'teacher') {
        return (
            <div>
                <div className="container" id="selection-container">
                    <div className="row">
                        <div className="col">
                            <h2 id="board-title">Question Board</h2>
                            <h4>&emsp;for {userDetails.first_name + ' ' + userDetails.last_name}</h4>
                        </div>
                        <div className="col-3">
                            <img src="hand_raised.svg" alt="Hand Raised"></img>
                        </div>
                    </div>
                </div>
                <CourseSelection
                    chooseClass={chooseClass} 
                    selectedTeacher={currentUser.uid}   
                />
                <hr/>
                <TeacherView
                    selectedTeacher={currentUser.uid}
                    selectedClass={selectedClass}/>
                <hr/>
            </div>
        );
    } else {
        return (
            <h4>You must be logged in as a teacher in order to view this page.</h4>
        )
    };
};

export default TeacherApp;
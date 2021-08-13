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
                <h2>{userDetails.first_name + ' ' + userDetails.last_name}'s Question Board</h2>
                <hr/>

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
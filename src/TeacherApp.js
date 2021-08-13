import TeacherView from './components/teacherView';
import TeacherSelection from './components/teacherSelection';
import CourseSelection from './components/courseSelection';
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from './Auth';

const TeacherApp = () => {

    const {currentUser, userDetails} = useContext(AuthContext);

    const [selectedTeacher, setSelectedTeacher] = useState('')
    const [selectedClass, setSelectedClass] = useState('')

    const chooseTeacher = (teacher_id) => {
        setSelectedTeacher(teacher_id);
    };

    const chooseClass = (class_id) => {
        setSelectedClass(class_id);
    };    

    if (userDetails.user_type === 'teacher') {
        return (
            <div>
                <h2>
                    Teacher View
                </h2>
                <p>selected teacher is: {userDetails.first_name}</p>
                <p>userDetails.uid is: {currentUser.uid}</p>
                <hr/>
                {/* <TeacherSelection 
                    chooseTeacher={chooseTeacher}
                    selectedTeacher={selectedTeacher}
                /> */}
                <CourseSelection
                    chooseClass={chooseClass} 
                    selectedTeacher={currentUser.uid}   
                />
                <hr/>
                <TeacherView
                    selectedTeacher={selectedTeacher}
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
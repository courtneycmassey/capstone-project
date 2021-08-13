import Questions from './components/questions';
import TeacherSelection from './components/teacherSelection';
import CourseSelection from './components/courseSelection';
import QuestionForm from './components/questionForm';
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from './Auth';

const StudentApp = () => {

    const {userDetails} = useContext(AuthContext);

    const [selectedTeacher, setSelectedTeacher] = useState('')
    const [selectedClass, setSelectedClass] = useState('')

    const chooseTeacher = (teacher_id) => {
        setSelectedTeacher(teacher_id);
    };

    const chooseClass = (class_id) => {
        setSelectedClass(class_id);
    };    

    if (userDetails.user_type === 'student') {
        return (
            <div>
                <h2>
                    Question Board
                </h2>
                <hr/>
                <TeacherSelection 
                    chooseTeacher={chooseTeacher}
                />
                <CourseSelection
                    chooseClass={chooseClass} 
                    selectedTeacher={selectedTeacher}   
                />
                <hr/>
                <Questions
                    selectedTeacher={selectedTeacher}
                    selectedClass={selectedClass}/>
                <hr/>
                <QuestionForm 
                    selectedTeacher={selectedTeacher}
                    selectedClass={selectedClass}/>
                <hr/>
            </div>
        );
    } else {
        return (
            <h4>You must be logged in as a student to view this page.</h4>
        );
    };
};

export default StudentApp;
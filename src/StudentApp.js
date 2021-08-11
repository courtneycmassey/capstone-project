import Questions from './components/questions';
import TeacherSelection from './components/teacherSelection';
import CourseSelection from './components/courseSelection';
import QuestionForm from './components/questionForm';
import React, { useEffect, useState } from "react";

const StudentApp = () => {

    const [selectedTeacher, setSelectedTeacher] = useState('')
    const [selectedClass, setSelectedClass] = useState('')

    const chooseTeacher = (teacher_id) => {
        setSelectedTeacher(teacher_id);
    };

    const chooseClass = (class_id) => {
        setSelectedClass(class_id);
    };    

    return (
        <div>
            <h2>
                Student View
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
};

export default StudentApp;
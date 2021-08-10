import TeacherView from './components/teacherView';
import TeacherSelection from './components/teacherSelection';
import CourseSelection from './components/courseSelection';
import React, { useEffect, useState } from "react";

const TeacherApp = () => {

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
                Teacher View
            </h2>
            <hr/>
            <TeacherSelection 
                chooseTeacher={chooseTeacher}
                selectedTeacher={selectedTeacher}
            />
            <CourseSelection
                chooseClass={chooseClass} 
                selectedTeacher={selectedTeacher}   
            />
            <hr/>
            <TeacherView
                selectedTeacher={selectedTeacher}
                selectedClass={selectedClass}/>
            <hr/>
        </div>

    );
};

export default TeacherApp;
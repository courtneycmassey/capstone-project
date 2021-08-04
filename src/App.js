import Questions from './components/questions';
import TeacherSelection from './components/teacherSelection';
import CourseSelection from './components/courseSelection';
import React, { useEffect, useState } from "react";

const App = () => {

    const [selectedTeacher, setSelectedTeacher] = useState('')
    const [selectedClass, setSelectedClass] = useState('')

    // const teacher_id = 'whN5CXz6Dx6PpFv41IrB';
    // const class_id = 'qwQoYGX7wQrGyGBj9JmV';

    // /teachers/whN5CXz6Dx6PpFv41IrB/classes/hwVhXCHYiJnV0aqi0M54

    const chooseTeacher = (teacher_id) => {
        // console.log('teacher_id:' , teacher_id);
        setSelectedTeacher(teacher_id);
        // console.log('selectedTeacher: ', selectedTeacher);
    };

    const chooseClass = (class_id) => {
        // console.log('teacher_id:' , teacher_id);
        setSelectedClass(class_id);
        // console.log('selectedTeacher: ', selectedTeacher);
    };    

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
                teacher_id={selectedTeacher}
                class_id={selectedClass}/>
            <hr/>
            <h3>QuestionForm component will go here</h3>
            <hr/>
            <h3>AnsweredQuestions component will go here</h3>
            <hr/>
        </div>

    );
};

export default App;
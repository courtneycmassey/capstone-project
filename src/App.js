import Questions from './components/questions';
import React, { useEffect, useState } from "react";

const App = () => {

    const [selectedTeacher, setSelectedTeacher] = useState('whN5CXz6Dx6PpFv41IrB')
    const [selectedClass, setSelectedClass] = useState('qwQoYGX7wQrGyGBj9JmV')

    // const teacher_id = 'whN5CXz6Dx6PpFv41IrB';
    // const class_id = 'qwQoYGX7wQrGyGBj9JmV';

    // /teachers/whN5CXz6Dx6PpFv41IrB/classes/hwVhXCHYiJnV0aqi0M54

    return (
        <div>
            <h2>
                Question Board
            </h2>
            <hr/>
            <h3>ClassList component will go here</h3>
            <hr/>
            <h3>Questions component will go here</h3>
            <Questions
                teacherId={selectedTeacher}
                classId={selectedClass}/>
            <hr/>
            <h3>QuestionForm component will go here</h3>
            <hr/>
            <h3>AnsweredQuestions component will go here</h3>
            <hr/>
        </div>

    );
};

export default App;
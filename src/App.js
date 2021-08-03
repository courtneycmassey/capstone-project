import Questions from './components/questions';
import React, { useEffect, useState } from "react";

const App = () => {

    const [selectedClass, setSelectedClass] = useState({
        
    })

    return (
        <div>
            <h2>
                Question Board
            </h2>
            <hr/>
            <h3>ClassList component will go here</h3>
            <hr/>
            <h3>Questions component will go here</h3>
            <Questions/>
            <hr/>
            <h3>QuestionForm component will go here</h3>
            <hr/>
            <h3>AnsweredQuestions component will go here</h3>
            <hr/>
        </div>

    );
};

export default App;
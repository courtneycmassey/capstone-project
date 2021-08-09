import React, { useState } from 'react';

import { teacherNames } from '../utilities/firebase';

const QuestionForm = ( {selectedTeacher, selectedClass} ) => {
    
    const [question, setQuestion] = useState('')
    const [studentName, setStudentName] = useState('')

    function onSubmit(e) {
        e.preventDefault()

        teacherNames
        .doc(selectedTeacher)
        .collection('classes')
        .doc(selectedClass)
        .collection('questions')
        .doc()
        .set({
            question,
            was_answered: false,
            votes: 0,
            //TO DO: link student name to authenticated user
            student_name: studentName,
            submit_time: new Date()
        })
        .then(() => {
            setQuestion('')
            setStudentName('')
        })
    }
    
    return (
        <form onSubmit={onSubmit}>
            <h2>Ask a Question</h2>
            <div>
                <label>Question:</label>
                <input 
                    type="text" 
                    value={question} 
                    onChange={e => setQuestion(e.currentTarget.value)} />

            </div>
            {/* TO DO: remove this field and auto link name of signed in student to question */}
            <div>
                <label>Student Name:</label>
                <input 
                    type="text" 
                    value={studentName} 
                    onChange={e => setStudentName(e.currentTarget.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit Question</button>
        </form>
    );
};

export default QuestionForm;
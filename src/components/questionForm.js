import React, { useState, useContext } from 'react';
import { usersCollection } from '../utilities/firebase';
import { AuthContext } from '../Auth';

const QuestionForm = ( {selectedTeacher, selectedClass} ) => {
    
    const {currentUser, userDetails} = useContext(AuthContext);
    const [question, setQuestion] = useState('')
    const [studentName, setStudentName] = useState('')

    function onSubmit(e) {
        e.preventDefault()

        usersCollection
        .doc(selectedTeacher)
        .collection('classes')
        .doc(selectedClass)
        .collection('questions')
        .doc()
        .set({
            question,
            was_answered: false,
            votes: 0,
            student_name: userDetails.first_name + ' ' + userDetails.last_name,
            submit_time: new Date(),
            // not currently in use, but could be useful for future features
            // student_id: currentUser.uid
        })
        .then(() => {
            setQuestion('')
            setStudentName('')
        })
    }
    
    return (
        <form onSubmit={onSubmit}>
            <h3>Ask a Question</h3>
            <div>
                <label>Question:</label>
                <input 
                    type="text" 
                    value={question} 
                    onChange={e => setQuestion(e.currentTarget.value)} />

            </div>
            {/* TO DO: remove this field and auto link name of signed in student to question */}
            {/* <div>
                <label>Student Name:</label>
                <input 
                    type="text" 
                    value={studentName} 
                    onChange={e => setStudentName(e.currentTarget.value)} />
            </div> */}
            <button type="submit" className="btn btn-primary">Submit Question</button>
        </form>
    );
};

export default QuestionForm;
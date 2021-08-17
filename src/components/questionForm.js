import React, { useState, useContext } from 'react';
import { usersCollection } from '../utilities/firebase';
import { AuthContext } from '../Auth';

const QuestionForm = ( {selectedTeacher, selectedClass} ) => {
    
    const { userDetails } = useContext(AuthContext);
    const [question, setQuestion] = useState('')

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
        })
    }
    
    return (
        <form onSubmit={onSubmit}>
            <h3>Ask a Question:</h3>
            <div>
                <label>&emsp;Question:&nbsp;</label>
                <input id="question-form"
                    type="text" 
                    value={question} 
                    onChange={e => setQuestion(e.currentTarget.value)} />

            </div>
            <button type="submit" className="btn btn-primary" id="question-button">Submit Question</button>
        </form>
    );
};

export default QuestionForm;
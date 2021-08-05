import React, { useEffect, useState } from "react";
import { teacherNames } from '../utilities/firebase';


function useQuestions(selectedTeacher, selectedClass) {

    const [questions, setQuestions] = useState([])

    useEffect ( () => {
        // TO DO: unsubscribe callback (from 17:30 and 19:30 in Time Tutorial)
        if (selectedTeacher !== '' && selectedClass !== '') {
            teacherNames
            .doc(selectedTeacher)
            .collection('classes')
            .doc(selectedClass)
            .collection('questions')
            .orderBy('votes', 'desc')
            .onSnapshot((snapshot) => {
                const newQuestions = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            setQuestions(newQuestions)
            })
        }
    }, [selectedTeacher, selectedClass])

    return questions
}


const Questions = ( {selectedTeacher, selectedClass} ) => {

    const questions = useQuestions(selectedTeacher, selectedClass)

    return (
        <div>
            <h2>Questions Component</h2>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>question</th>
                        <th>answered (T/F)</th>
                        <th>votes</th>
                        <th>upvote button</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) =>
                    <tr key={question.id}>
                        <th>{question.question}</th> 
                        <th>{question.was_answered.toString()}</th>
                        <th>{question.votes}</th>
                        <th>button will go here</th>
                    </tr>)}
                </tbody>
            </table>
            <p>teacher_id@ Question: {selectedTeacher}</p>
            <p>class_id @ Question: {selectedClass}</p>
            <h4>Maybe AnsweredQuestions should go here because then they live in the Questions Componenet</h4>
        </div>

    );
};

export default Questions;
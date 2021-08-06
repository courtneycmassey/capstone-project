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

    const addVote = (selectedQuestion, voteCount) => {
        
        teacherNames
            .doc(selectedTeacher)
            .collection('classes')
            .doc(selectedClass)
            .collection('questions')
            .doc(selectedQuestion)
            .update({
                votes: voteCount + 1,
            })
    }

    return (
        <div>
            <h2>Questions Component</h2>
            <h3>Current Questions:</h3>
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
                    {questions.map((question) => {
                        if (question.was_answered === false) {
                            return(
                                <tr key={question.id}>
                                    <th>{question.question}</th> 
                                    <th>{question.was_answered.toString()}</th>
                                    <th>{question.votes}</th>
                                    <th>
                                        <button 
                                            key={question.id}
                                            onClick={() => {addVote(question.id, question.votes)}}
                                            className="btn btn-secondary">
                                                Upvote
                                        </button></th>
                                </tr>
                            )}
                    })}
                </tbody>
            </table>
            <h3>Answered Questions:</h3>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>question</th>
                        <th>answered (T/F)</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => {
                        if (question.was_answered === true) {
                            return(
                                <tr key={question.id}>
                                    <th>{question.question}</th> 
                                    <th>{question.was_answered.toString()}</th>
                                </tr>
                            )}
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Questions;
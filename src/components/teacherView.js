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


const TeacherView = ( {selectedTeacher, selectedClass} ) => {

    const questions = useQuestions(selectedTeacher, selectedClass)

    const markAnswered = (selectedQuestion) => {
        
        teacherNames
            .doc(selectedTeacher)
            .collection('classes')
            .doc(selectedClass)
            .collection('questions')
            .doc(selectedQuestion)
            .update({
                was_answered: true,
            })
    }

    return (
        <div>
            <h3>Current Questions:</h3>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>QUESTION</th>
                        <th>STUDENT</th>
                        <th>VOTES</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => {
                        if (question.was_answered === false) {
                            return(
                                <tr key={question.id}>
                                    <th>{question.question}</th> 
                                    <th>{question.student_name}</th>
                                    <th>{question.votes}</th>
                                    <th>
                                        <button 
                                            key={question.id}
                                            onClick={() => {markAnswered(question.id)}}
                                            className="btn btn-success">
                                                Answered
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
                        <th>QUESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => {
                        if (question.was_answered === true) {
                            return(
                                <tr key={question.id}>
                                    <th>{question.question}</th> 
                                </tr>
                            )}
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherView;
import React, { useEffect, useState } from "react";
import { teacherNames } from '../utilities/firebase';

const SORT_OPTIONS = {
    'TIME_ASC': {column: 'submit_time', direction: 'asc'},
    'TIME_DESC': {column: 'submit_time', direction: 'desc'},
    'VOTES_DESC': {column: 'votes', direction: 'desc'},
}

function useQuestions(selectedTeacher, selectedClass, sortBy='VOTES_DESC') {

    const [questions, setQuestions] = useState([])

    useEffect ( () => {
        // TO DO: understand unsubscribe callback (from 19:30 and 20:30 in Time Tutorial)
        if (selectedTeacher !== '' && selectedClass !== '') {
            const unsubscribe = teacherNames
            .doc(selectedTeacher)
            .collection('classes')
            .doc(selectedClass)
            .collection('questions')
            .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
            .onSnapshot((snapshot) => {
                const newQuestions = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            setQuestions(newQuestions)
            })
            return () => unsubscribe()
        }
    }, [selectedTeacher, selectedClass, sortBy])

    return questions
}


const Questions = ( {selectedTeacher, selectedClass} ) => {

    const [sortBy, setSortBy] = useState('VOTES_DESC')
    
    const questions = useQuestions(selectedTeacher, selectedClass, sortBy)

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
            <div>
                <label>Sort By:</label>{' '}
                <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}>
                    <option value="VOTES_DESC">Votes</option>
                    <option value="TIME_DESC">Newest Question First</option>
                    <option value="TIME_ASC">Oldest Question First</option>
                </select>
            </div>
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
                                            className="btn btn-success">
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
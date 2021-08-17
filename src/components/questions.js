import React, { useEffect, useState } from "react";
import { usersCollection } from '../utilities/firebase';

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
            const unsubscribe = usersCollection
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
        
        usersCollection
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
            <h3>Current Questions:</h3>
            <div>
                <label>&emsp;Sort By:</label>{' '}
                <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}>
                    <option value="VOTES_DESC">Votes</option>
                    <option value="TIME_DESC">Newest Question First</option>
                    <option value="TIME_ASC">Oldest Question First</option>
                </select>
            </div>
            <table className="table table-light table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>QUESTION</th>
                        <th>VOTES</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => {
                        if (question.was_answered === false) {
                            return(
                                <tr key={question.id}>
                                    <td>{question.question}</td> 
                                    <td>{question.votes}</td>
                                    <td>
                                        <button 
                                            key={question.id}
                                            onClick={() => {addVote(question.id, question.votes)}}
                                            className="btn btn-success"
                                            id="upvote-button">
                                                Upvote
                                        </button></td>
                                </tr>
                            )}
                    })}
                </tbody>
            </table>
            <hr/>
            <h3>Answered Questions:</h3>
            <table className="table table-light table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>QUESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => {
                        if (question.was_answered === true) {
                            return(
                                <tr key={question.id}>
                                    <td>{question.question}</td> 
                                </tr>
                            )}
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Questions;
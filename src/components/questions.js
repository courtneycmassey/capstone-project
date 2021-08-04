import React, { useEffect, useState } from "react";
import { firebaseLooper } from '../utilities/tools';
import { teacherNames } from '../utilities/firebase';

// define document id's here ... use state so they can change on select

function useTeachers() {
    const [teachers, setTeachers] = useState([])

    useEffect( () => {
        teacherNames.onSnapshot((snapshot) => {
            const newTeachers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

        setTeachers(newTeachers)
    })
    }, [])

    return teachers
}

function useQuestions() {
    const [questions, setQuestions] = useState([])

    const teacher_id = 'whN5CXz6Dx6PpFv41IrB';
    const class_id = 'qwQoYGX7wQrGyGBj9JmV';

    useEffect ( () => {
        teacherNames
        .doc(teacher_id)
        .collection('classes')
        .doc(class_id)
        .collection('questions')
        .onSnapshot((snapshot) => {
            const newQuestions = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
        setQuestions(newQuestions)
        })
    }, [])

    return questions
}


const Questions = () => {

    const teachers = useTeachers()
    const questions = useQuestions()

    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedClass, setSelectedClass] = useState('')

    // const [selectedClass, setSelectedClass] = useState({
    //     teacher_id: 'whN5CXz6Dx6PpFv41IrB',
    //     class_id: 'qwQoYGX7wQrGyGBj9JmV'
    // });


    return (
        <div>
            Current Questions:
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
                        <th>button goes here</th>
                    </tr>)}
                </tbody>
            </table>
            <h4>List of Questions for Testing:</h4>
            <ol>
                {questions.map((question) => 
                <li key={question.id}>
                    {question.question} votes: {question.votes}
                </li>)}
            </ol>
            <h4>Teacher List for Firestore TESTING:</h4>
            <ol>
                {teachers.map((teacher) => 
                <li key={teacher.id}>
                    {teacher.teacher_name}
                </li>
                )}
            </ol>
            <h4>Maybe AnsweredQuestions should go here because then they live in the Questions Componenet</h4>
        </div>

    );
};

export default Questions;
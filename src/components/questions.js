import React, { useEffect, useState } from "react";
// import { firebaseLooper } from '../utilities/tools';
import { teacherNames } from '../utilities/firebase';


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

function useQuestions(teacher_id, class_id) {
    const [questions, setQuestions] = useState([])

    // const teacher_id = 'whN5CXz6Dx6PpFv41IrB';
    // const class_id = 'qwQoYGX7wQrGyGBj9JmV';

    useEffect ( () => {
        if (teacher_id !== '' && class_id !== '') {
            teacherNames
            .doc(teacher_id)
            .collection('classes')
            .doc(class_id)
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
    }, [])

    return questions
}


const Questions = ( {teacher_id, class_id} ) => {

    // const teacher_id = 'whN5CXz6Dx6PpFv41IrB';
    // const class_id = 'qwQoYGX7wQrGyGBj9JmV';

    const teachers = useTeachers()
    const questions = useQuestions(teacher_id, class_id)

    // const [selectedTeacher, setSelectedTeacher] = useState('');
    // const [selectedClass, setSelectedClass] = useState('')


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
            <p>teacher_id@ Question: {teacher_id}</p>
            <p>class_id @ Question: {class_id}</p>
            <h4>Maybe AnsweredQuestions should go here because then they live in the Questions Componenet</h4>
        </div>

    );
};

export default Questions;
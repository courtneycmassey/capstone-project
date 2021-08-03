import React, { useEffect, useState } from "react";
import { firebaseLooper } from '../utilities/tools';
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

const Questions = () => {

    const teachers = useTeachers()

    const [selectedClass, setSelectedClass] = useState({
        teacher_id: 'whN5CXz6Dx6PpFv41IrB',
        class_id: 'qwQoYGX7wQrGyGBj9JmV'
    });
    
    const [questions, setQuestions] = useState([]);

    // const teacher_id = 'whN5CXz6Dx6PpFv41IrB';
    // const class_id = 'qwQoYGX7wQrGyGBj9JmV';

    const getAllTheQuestions = () => {
        teacherNames
        // .doc('whN5CXz6Dx6PpFv41IrB')
        .doc(selectedClass.teacher_id)
        .collection('classes')
        // .doc('qwQoYGX7wQrGyGBj9JmV')
        .doc(selectedClass.class_id)
        .collection('questions')
        .get()
        .then( snapshot => {

            console.log('made it to the questions')
            const questions = firebaseLooper(snapshot);
            console.log('questions have been made');
            setQuestions({
                questions
            });
        })
    }
    
    const handleQuestionData = (questions) => (
        questions ? 
            questions.map( (data,i) => (
                <tr key={i}>
                    <th>{data.question}</th>
                    <th>{data.answered.toString()}</th>
                    <th>{data.votes}</th>
                    <th>button</th>
                </tr>
            ))
        : null
    )

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
                    { handleQuestionData(questions) }
                </tbody>
            </table>
            <h4>List of Questions for Testing:</h4>
            <ol>
                {questions.map((question) => 
                <li key={question.id}>
                    {question.question}
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
        </div>

    );
};

export default Questions;
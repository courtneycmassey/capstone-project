import React, { useEffect, useState } from 'react';
import { teacherNames } from '../utilities/firebase';
// import firebase from 'firebase/app';


function useClasses(selectedTeacher) {
    const [classes, setClasses] = useState([])

    // const teacher = selectedTeacher;
    console.log({selectedTeacher})
    // const db = firebase.firestore().collection('teachers').doc(selectedTeacher).collection('classes')

    useEffect ( () => {
        if (selectedTeacher !== '') {
            teacherNames
            .doc(selectedTeacher)
            .collection('classes')
            .onSnapshot((snapshot) => {
                console.log(snapshot)
                const newClasses = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            setClasses(newClasses)
            })
        }
    }, [])

    // console.log('classes were made')
    // console.log({selectedTeacher})
    // console.log({classes})
    return classes
}


const CourseSelection = ( { chooseClass, selectedTeacher } ) => {
    
    const courses = useClasses(selectedTeacher);

    return (
        <div>
            <h2>Course Selection Component</h2>
            <p>{courses}</p>
            <p>Teacher is: {selectedTeacher}</p>
            <label>Select Course:</label>
            <select onChange={e => chooseClass(e.currentTarget.value)}>
                {courses.map((course) => 
                <option key={course.id} value={course.id}>
                    {course.course}
                </option>
                )}
            </select>
        </div>
    );
};

export default CourseSelection;
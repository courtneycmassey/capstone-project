import React, { useEffect, useState } from 'react';
import { teacherNames } from '../utilities/firebase';


function useClasses(selectedTeacher) {
    const [classes, setClasses] = useState([])

    console.log({selectedTeacher})

    useEffect ( () => {
        if (selectedTeacher !== '') {
            
            teacherNames
            .doc(selectedTeacher)
            .collection('classes')
            .onSnapshot((snapshot) => {
                const newClasses = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            setClasses(newClasses)
            })
        }
    }, [selectedTeacher])

    return classes
}


const CourseSelection = ( { chooseClass, selectedTeacher } ) => {
    
    const courses = useClasses(selectedTeacher);

    return (
        <div>
            <label>Select Course:</label>
            <select onChange={e => chooseClass(e.currentTarget.value)}>
                <option value=""></option>
                {courses.map((course) => 
                    <option key={course.id} value={course.id}>
                    {course.course} | section: {course.section} | {new Date(course.date.seconds * 1000).toLocaleDateString("en-US")} 
                    </option>
                )}
            </select>
        </div>
    );
};

export default CourseSelection;
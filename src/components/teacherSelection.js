import React, { useEffect, useState } from 'react';
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


const TeacherSelection = ( {chooseTeacher} ) => {
    
    const teachers = useTeachers()

    return (
        <div>
            <h2>Teacher Selection Component</h2>
            <label>Select Teacher:</label>
            <select onChange={e => chooseTeacher(e.currentTarget.value)}>
                {teachers.map((teacher) => 
                <option key={teacher.id} value={teacher.id}>
                    {teacher.teacher_name} {teacher.id}
                </option>
                )}
            </select>
        </div>
    );
};

export default TeacherSelection;
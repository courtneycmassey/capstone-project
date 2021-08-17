import React, { useEffect, useState } from 'react';
import { usersCollection } from '../utilities/firebase';

function useTeachers() {
    const [teachers, setTeachers] = useState([])

    useEffect( () => {

        usersCollection
        .where('user_type', '==', 'teacher')
        .get()
        .then(querySnapshot => {
            console.log('Total users: ', querySnapshot.size);
            const newTeachers = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTeachers(newTeachers);
        });    
    }, [])
    return teachers
};


const TeacherSelection = ( {chooseTeacher} ) => {
    
    const teachers = useTeachers()

    return (
        <div>
            <label>&emsp;Select Teacher:&nbsp;</label>
            <select onChange={e => chooseTeacher(e.currentTarget.value)}>
                <option value=""></option>
                {teachers.map((teacher) => 
                <option key={teacher.id} value={teacher.id}>
                    {teacher.last_name + ', ' + teacher.first_name}
                </option>
                )}
            </select>
        </div>
    );
};


export default TeacherSelection;
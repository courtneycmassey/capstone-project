import React, { useEffect, useState } from 'react';
import { teacherNames } from '../utilities/firebase';
import "./teacherSelection.css"


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
            <label>Select Teacher:</label>
            <select onChange={e => chooseTeacher(e.currentTarget.value)}>
                <option value=""></option>
                {teachers.map((teacher) => 
                <option key={teacher.id} value={teacher.id}>
                    {teacher.teacher_name}
                </option>
                )}
            </select>
        </div>
    );
};


export default TeacherSelection;


//attempt at a styled select menu
// https://codesandbox.io/s/jolly-proskuriakova-pj2tk?file=/src/Dropdown.jsx
// const TeacherSelection = ( {chooseTeacher, selectedTeacher} ) => {
    
//     const [isActive, setIsActive] = useState(false);
//     const teachers = useTeachers();

//     return(
//         <div className="dropdown">
//             <div 
//                 className="dropdown-btn"
//                 onClick={(e) => setIsActive(!isActive)}>
//                 {selectedTeacher.teacher_name}
//                 <span className="fas fa-caret-down"></span>
//             </div>
//             {isActive && (
//                 <select 
//                     className="dropdown-content"
//                     onChange={(e) => {
//                         chooseTeacher(e.currentTarget.value);
//                         setIsActive(false);
//                     }}>
//                 {teachers.map((teacher) => (
//                     <option
//                         key={teacher.id}
//                         value={teacher.id}
                        
//                         className="dropdown-item"
//                         >
//                         {teacher.teacher_name}
//                     </option>
//                 ))}
//                 </select>
//             )}
//         </div>
//     );
// }
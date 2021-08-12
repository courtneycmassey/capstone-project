import React, { useState } from 'react';
import TeacherSelection from './teacherSelection';
import { teacherNames } from '../utilities/firebase';

const ClassForm = () => {
    
    const [selectedTeacher, setSelectedTeacher] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [courseSection, setCourseSection] = useState('')
    const [courseDate, setCourseDate] = useState('')

    const chooseTeacher = (teacher_id) => {
        setSelectedTeacher(teacher_id);
    };

    //TO DO: need a way to add a colleciton called 'questions' when a class is added
    // const addQuestionsCollection
    function addCourse(e) {
        e.preventDefault()

        const splitDate = courseDate.split("-");
        const formattedDate = new Date( splitDate[0], splitDate[1] - 1, splitDate[2]);

        teacherNames
        .doc(selectedTeacher)
        .collection('classes')
        .add({
            course: courseTitle,
            section: courseSection,
            date: formattedDate
        })
        .then(() => {
            //can I capture the new course_id here???
            setCourseTitle('')
            setCourseSection('')
            setCourseDate('')
        })
    }
        
    return (
        <div>
            <h1>Manage Courses</h1>
            <hr/>
            <h2>Add Course</h2>
            <TeacherSelection 
                chooseTeacher={chooseTeacher}/>
            <form onSubmit={addCourse}>
                <div>
                    <label>Course Title:</label>
                    <input 
                        type="text"
                        placeholder="Course Title"
                        value={courseTitle}
                        onChange={e => setCourseTitle(e.currentTarget.value)} />
                </div>
                <div>
                    <label>Course Section:</label>
                    <input 
                        type="text"
                        placeholder="Course Section"
                        value={courseSection}
                        onChange={e => setCourseSection(e.currentTarget.value)} />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={courseDate}
                        onChange={e => setCourseDate(e.currentTarget.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Class</button>
            </form>
            <hr/>
            <h2>Delete Course</h2>
            <hr/>
            <h2>Clear a Question Board</h2>
            <hr/>
        </div>
    );
};

export default ClassForm;
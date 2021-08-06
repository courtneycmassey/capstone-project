import React, { useState } from 'react';
import TeacherSelection from './teacherSelection';
import { teacherNames } from '../utilities/firebase';

const ClassForm = () => {
    
    const [selectedTeacher, setSelectedTeacher] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [courseSection, setCourseSection] = useState('')
    // TO DO: currently storing as string type YYYY-MM-DD
    const [courseDate, setCourseDate] = useState('')

    const chooseTeacher = (teacher_id) => {
        setSelectedTeacher(teacher_id);
    };

    //TO DO: need a way to add a colleciton called 'questions' when a class is added
    // const addQuestionsCollection
    function addCourse(e) {
        e.preventDefault()

        teacherNames
        .doc(selectedTeacher)
        .collection('classes')
        .add({
            course: courseTitle,
            section: courseSection,
            date: courseDate,
            // {collection: "questions"}
            // collection: [ {questions: ''}]
            // collection: {questions: ''}
        })
        .then(() => {
            //can I capture the new course_id here???
            // addQuestionsCollection()
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
                        value={courseTitle}
                        onChange={e => setCourseTitle(e.currentTarget.value)} />
                </div>
                <div>
                    <label>Course Section:</label>
                    <input 
                        type="text"
                        value={courseSection}
                        onChange={e => setCourseSection(e.currentTarget.value)} />
                </div>
                <div>
                    <label>Date:</label>
                    <input 
                        // TO DO: currently storing as string type YYYY-MM-DD
                        type="date"
                        value={courseDate}
                        onChange={e => setCourseDate(e.currentTarget.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Class</button>
            </form>
            
            
            <p>Teacher is: {selectedTeacher}</p>
            <hr/>
            <h2>Delete Course</h2>
            <hr/>
            <h2>Clear a Question Board</h2>
            <hr/>
        </div>
    );
};

export default ClassForm;
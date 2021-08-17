import React, { useState, useContext } from 'react';
import CourseSelection from './courseSelection';
import { usersCollection } from '../utilities/firebase';
import { AuthContext } from '../Auth';
import '../index.css'

const ClassForm = () => {
    
    const {currentUser, userDetails} = useContext(AuthContext);
    const [courseTitle, setCourseTitle] = useState('')
    const [courseSection, setCourseSection] = useState('')
    const [courseDate, setCourseDate] = useState('')
    const [selectedClass, setSelectedClass] = useState('')

    const chooseClass = (class_id) => {
        setSelectedClass(class_id);
    }; 

    function addCourse(e) {
        e.preventDefault()

        const splitDate = courseDate.split("-");
        const formattedDate = new Date( splitDate[0], splitDate[1] - 1, splitDate[2]);

        usersCollection
        .doc(currentUser.uid)
        .collection('classes')
        .doc()
        .set({
            course: courseTitle,
            section: courseSection,
            date: formattedDate
        })
        .then(() => {
            setCourseTitle('')
            setCourseSection('')
            setCourseDate('')
        })
    }

    const deleteClass = (selectedClass) => {

        usersCollection
            .doc(currentUser.uid)
            .collection('classes')
            .doc(selectedClass)
            .delete()

    }

        
    return (
        <div>
            <div className="container" id="selection-container">
                <div className="row">
                    <div className="col">
                        <h2 id="board-title">Manage Courses</h2>
                        <h4>&emsp;for {userDetails.first_name + ' ' + userDetails.last_name}</h4>
                    </div>
                    <div className="col-3">
                        <img src="hand_raised.svg" alt="Hand Raised"></img>
                    </div>
                </div>
            </div>
            <hr/>
            <h3>Add a class to your course collection</h3>
            <form onSubmit={addCourse}>
                <div>
                    <label>&emsp;Course Title:&nbsp;</label>
                    <input class="course-input"
                        type="text"
                        value={courseTitle}
                        onChange={e => setCourseTitle(e.currentTarget.value)} />
                </div>
                <div>
                    <label>&emsp;Course Section:&nbsp;</label>
                    <input class="section-input"
                        type="text"
                        value={courseSection}
                        onChange={e => setCourseSection(e.currentTarget.value)} />
                </div>
                <div>
                    <label>&emsp;Date:&nbsp;</label>
                    <input
                        type="date"
                        value={courseDate}
                        onChange={e => setCourseDate(e.currentTarget.value)} />
                </div>
                <button type="submit" className="btn btn-primary" id="purple-button">Add Class</button>
            </form>
            <hr/>
                <h3>Delete a class from your course collection</h3>
                <CourseSelection
                    chooseClass={chooseClass}
                    selectedTeacher={currentUser.uid}
                />
                <button 
                    className="btn btn-danger" 
                    id="delete-course-button" 
                    onClick={() => {deleteClass(selectedClass)}}>Delete Class</button>
        </div>
    );
};

export default ClassForm;
import React, { Component } from 'react';
import { firebaseLooper } from '../../utilities/tools';
import { sessionsCollection, siteRef, employeeRef, teacherNames, classesCollection, specificQuestionsCollection } from '../../utilities/firebase';
import Form from './forms'

class Sessions extends Component {

    // /teachers/whN5CXz6Dx6PpFv41IrB/classes/qwQoYGX7wQrGyGBj9JmV
    state = {
        sessions: null,
        teachers: null,
        classes: null,
        questions: null,
        teacher_id: 'whN5CXz6Dx6PpFv41IrB',
        class_id: 'qwQoYGX7wQrGyGBj9JmV'
    };

    // var teacher_id = 'whN5CXz6Dx6PpFv41IrB';
    // var class_id = 'qwQoYGX7wQrGyGBj9JmV';

    getAllTheQuestions(){

        var teacher_id = 'whN5CXz6Dx6PpFv41IrB';
        var class_id = 'qwQoYGX7wQrGyGBj9JmV';

        teacherNames
        // .doc('whN5CXz6Dx6PpFv41IrB')
        .doc(teacher_id)
        .collection('classes')
        // .doc('qwQoYGX7wQrGyGBj9JmV')
        .doc(class_id)
        .collection('questions')
        .get()
        .then( snapshot => {

            const questions = firebaseLooper(snapshot);
            // console.log(teachers)
            this.setState({
                questions
            });
        })
    }

    getAllTheTeachers(){
        teacherNames
        .get()
        .then( snapshot => {

            const teachers = firebaseLooper(snapshot);
            // console.log(teachers)
            this.setState({
                teachers
            });
        })
    }

    getAllTheClasses(){
        classesCollection
        .get()
        .then ( snapshot => {

            const classes = firebaseLooper(snapshot);
            console.log(classes)
            this.setState({
                classes
            });
        })
    }

    // getAllTheQuestions(){
    //     specificQuestionsCollection
    //     .get()
    //     .then ( snapshot => {

    //         const questions = firebaseLooper(snapshot);
    //         console.log(questions)
    //         this.setState({
    //             questions
    //         });
    //     })
    // }

    getAllTheSessions(){
        sessionsCollection
        // .where('answered','==',false)
        .orderBy('votes', 'desc')
        .get()
        .then( snapshot => {

            const sessions = firebaseLooper(snapshot);
            // console.log(sessions)
            this.setState({
                sessions
            });
        });
    }

    componentDidMount(){
        this.getAllTheSessions();
        this.getAllTheTeachers();
        this.getAllTheClasses();
        this.getAllTheQuestions();

        // GET DOC BY ID:
        // sessionsCollection.doc('Du8Y6d4hWQ0cezTg3pn4').get().then( snapshot => {
        //     console.log(snapshot.data());
        // })

        // console.log(sessionsCollection);
        // siteRef.get().then((querySnapshot)=>{
        //     console.log(querySnapshot);
        // });

        // employeeRef.get().then((snapshot) => {
            
        //     const employees = firebaseLooper(snapshot);
        //     console.log(employees);
        // });
    };

    handleSessionData = (sessions) => (
        sessions ? 
            sessions.map( (data,i) => (
                <tr key={i}>
                    <th>{data.id}</th>
                    <th>{data.question}</th>
                    <th>{data.answered.toString()}</th>
                    <th>{data.votes}</th>
                </tr>
            ))
        : null
    )

    handleTeacherData = (teachers) => (
        teachers ? 
            teachers.map ( (data, i) => (
                <ul key={i}>
                    <li>{data.teacher_name}</li>
                </ul>
            ))
        : null
    )

    handleClassData = (classes) => (
        classes ?
            classes.map ( (data, i) => (
                <ul key={i}>
                    <li>{data.course}</li>
                </ul>
            ))
    : null
    )

    handleQuestionData = (questions) => (
        questions ?
            questions.map ( (data, i) => (
                <ul key={i}>
                    <li>{data.question}</li>
                </ul>
            ))
    : null
    )

    render () {

        return(
            <>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>question</th>
                            <th>answered</th>
                            <th>votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.handleSessionData(this.state.sessions) }
                    </tbody>
                </table>
                <hr/>
                <Form/>
                <hr/>
                <h3>
                    Teacher Names from Database:
                    { this.handleTeacherData(this.state.teachers)}
                </h3>
                <hr/>
                <h3>
                    Classes from Database:
                    { this.handleClassData(this.state.classes)}
                </h3>
                <hr/>
                <h3>
                    Questions from a Class with ID 'qwQoYGX7wQrGyGBj9JmV':
                    { this.handleQuestionData(this.state.questions)}
                </h3>

            </>
        )
    }
}

export default Sessions;
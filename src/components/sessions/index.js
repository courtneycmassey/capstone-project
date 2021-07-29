import React, { Component } from 'react';
import { firebaseLooper } from '../../utilities/tools';
import { sessionsCollection, siteRef, employeeRef } from '../../utilities/firebase';
import Form from './forms'

class Sessions extends Component {

    state = {
        sessions: null
    };

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
            </>
        )
    }
}

export default Sessions;
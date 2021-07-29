import React, { Component } from 'react';
import { sessionsCollection, firebaseTimestamp } from '../../utilities/firebase';

class Form extends Component {

    state = {
        question:'',
        answered:'',
        votes:''
    }

    handleForm = (e) => {
        e.preventDefault();
        console.log(this.state);

        // UPDATE a specific document
        // sessionsCollection.doc('toUpdate').update({
        //     ...this.state,
        //     votes: parseInt(this.state.votes),
        //     answered: this.state.available === 'true' ? true : false,
        // })


        // ADD TO THE DATABASE
        // sessionsCollection.add({
        //     ...this.state,
        //     votes: parseInt(this.state.votes),
        //     answered: this.state.available === 'true' ? true : false,
        //     createdAt: firebaseTimestamp()
        // }).then ( data => {
        //     console.log(data)
        // }).catch(e=>{
        //     console.log(e)
        // });
    }

    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value})
    }

    render(){
        return(
            <>
                <form onSubmit={ (e) => this.handleForm(e)}>
                    <div className="form-group">
                        <label>Question</label>
                        <input
                            type="text"
                            className="form-control"
                            name="question"
                            onChange={ (e) => this.changeHandler(e)}>
                        </input>
                    </div>

                    <div className="form-group">
                        <label>Answered</label>
                        <select
                            className="form-control"
                            name="answered"
                            onChange={ (e) => this.changeHandler(e)}
                        >
                            <option value="true">YES</option>
                            <option value="false">NO</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Votes</label>
                        <input
                            type="number"
                            className="form-control"
                            name="votes"
                            onChange={ (e) => this.changeHandler(e)}>
                        </input>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </>
        )
    }
}

export default Form;
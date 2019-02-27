import React from 'react';
import {NavLink} from 'react-router-dom';

export default class CreateProject extends React.Component {
    state = {
        projectName: "",
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.projectName);
    }

    render() {
        return(
            <div className="form-project" id="project-form">
                <h3 style={{color:'#333', fontFamily:'"Poppins", sans-serif'}} id="create-project-header">Create Your Project!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label id="create-project-label">
                            <input className="form-control" id="project-control" type="text" name="projectName" placeholder="Enter project name" onChange={this.onChange} required />
                        </label>
                        <button className="create-project-btn" type="submit" id="plus-sign">+</button>
                    </div>
                </form>
                <NavLink className="create-project-btn" id="go-home" to={`/index`}><button className="create-project-btn">Go To Home</button></NavLink>
            </div>
        );
    }
}
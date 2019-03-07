import React from 'react';
import {NavLink} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';

export default class CreateProject extends React.Component {
    state = {
        title: "",
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        axios.post('api/storeProject', {
            title: this.state.title,
            PMid: localStorage.getItem('PMid')
        })
        .then((res) => {
            console.log(res);
            if(res.status==200){
                this.props.getProjects();
                this.props.history.push(`/index/project/${this.state.title}`)
            }
        })
        
    }

    render() {
        return(
            <Spring from={{opacity:0 , marginTop: -500}} // you must wrap the part of the component you want animated in this spring syntax
                    to={{opacity:1, marginTop:0}}
                    config={{duration:750}}
            >
                {props => (
                    <div style={props}>
                        <div className="form-project" id="project-form">
                            <h3 style={{color:'#333', fontFamily:'"Poppins", sans-serif'}} id="create-project-header">Create Your Project!</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label id="create-project-label">
                                        <input className="form-control" id="project-control" type="text" name="title" placeholder="Enter project name" onChange={this.onChange} required />
                                    </label>
                                    <button className="create-project-btn" type="submit" id="plus-sign">+</button>
                                </div>
                            </form>
                            <NavLink className="create-project-btn" id="go-home" to={`/index`}><button className="create-project-btn">Go To Home</button></NavLink>
                        </div>
                    </div>
                )}
            </Spring>
            
            
        );
    }
}
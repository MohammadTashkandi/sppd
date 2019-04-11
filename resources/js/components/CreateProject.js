import React from 'react';
import {Spring} from 'react-spring/renderprops';

export default class CreateProject extends React.Component {
    state = {
        title: "",
        start: "",
        end: "",
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        var startDate= this.state.start;
        startDate=startDate.split("-");
        var newStart=startDate[1]+"/"+startDate[2]+"/"+startDate[0]; //month day year

        var endDate= this.state.end;
        endDate=endDate.split("-");
        var newEnd=endDate[1]+"/"+endDate[2]+"/"+endDate[0]; //month day year
        startDate = new Date(newStart).getTime();
        endDate = new Date(newEnd).getTime();
        
        var todaysDate = new Date();
        var today = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate()).getTime()

        if(this.state.start >= this.state.end){
            this.props.addNotification('Invalid Dates', 'The end date cannot be the same or before the start date', 'danger');
        }else if(startDate < today){
            this.props.addNotification('Invalid Date', 'Cannot start projects with dates earlier than today', 'danger');
        }else if(endDate < today){
            this.props.addNotification('Invalid Date', 'Your end date is earlier than current date', 'danger');
        }
        else{

            axios.post('api/storeProject', {
                title: this.state.title,
                start: this.state.start,
                end: this.state.end,
                PMid: localStorage.getItem('PMid')
            })
            .then((res) => {
                console.log(res);
                if(res.status==200){
                    this.props.getProjects();
                    this.props.addNotification('Project added', 'Check the sidebar', 'success');
                    this.props.history.push(`/index/project/${res.data[1]}`);
                }
            })
            
        }
    }
    
    render() {
        if(!this.props.loggedIn) {
            this.props.addNotification('Error', 'Please login first', 'danger');
            this.props.history.push('/');
        }
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
                                    <label id="create-project-label"> Project Name: *
                                        <input className="form-control" id="project-control" type="text" name="title" placeholder="Enter project name" onChange={this.onChange} required />
                                    </label>
                                    <div style={{marginBottom:"1rem"}}>
                                        <label id="create-project-label">Planned Start Date: *
                                            <input className="form-control" id="project-control" type="date" name="start" onChange={this.onChange} style={{width: "20rem", marginRight:"0.5rem"}} required />
                                        </label>
                                        <label id="create-project-label">Planned Finish Date: *
                                            <input className="form-control" id="project-control" type="date" name="end" onChange={this.onChange} style={{width: "20rem", marginLeft:"0.5rem"}} required />
                                        </label>
                                    </div>
                                    <button className="create-project-btn" type="submit" id="plus-sign">+</button>
                                </div>
                            </form>
                            {/* <NavLink className="create-project-btn" id="go-home" to={`/index`}><button className="create-project-btn">Go To Home</button></NavLink> */}
                        </div>
                    </div>
                )}
            </Spring>
            
            
        );
    }
}
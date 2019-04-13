import React from 'react';
import axios from 'axios';
import {Spring} from 'react-spring/renderprops';

export default class CreateTask extends React.Component {

    autocompleteRef = React.createRef();
    PrIdRef = React.createRef();

    state={
        title: "",
        PrId: "",
        severity: "Feature",
        tStr: "",
        tJud: "",
        tCu: "",
        tTech: "",
        severityDesc: "Request for a new feature.",

        query: "",
        result: {},
    }

    autocompleteSearch = () => {
        axios.get('api/autocompleteSearch', {
            params: {
                name: this.state.query,
                PMid: localStorage.getItem('PMid'),
                Pid: this.props.match.params.projectId,
            }
        })
        .then((res) => {
            this.setState({result: res.data});
        })
        .catch((err) => {
            this.setState({result: ['No employees found']})
        })
    }

    handleSearchClick = (employee) => {
        this.setState({PrId: employee.id});
        this.PrIdRef.current.value = employee.first_name +' '+ employee.last_name;
        this.autocompleteRef.current.style.display = "none";
    }

    displaySearchResult = (key) => {
        const employee = this.state.result[key];
        if(employee == 'No employees found'){
            return(<span key={key} className="autocomplete-entries">No employees found</span>);
        }
        return(
            <span key={key} className="autocomplete-entries" onClick={()=> this.handleSearchClick(employee)} style={{textTransform:"capitalize"}}>{employee.first_name +' '+ employee.last_name}</span>
        );
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if([e.target.name] == "PrId") {
            this.setState({query: e.target.value})
            if(this.state.query.length>1) {
                this.autocompleteRef.current.style.display = "block";
                this.autocompleteSearch()
            } else if(this.PrIdRef.current.value == "") {   
                this.autocompleteRef.current.style.display = "none";
            }
        }

        const option = e.target.value;
            if(option == "Trivial"){
            this.setState({severityDesc : "Nitpicky; disagreement with wording, colors textures etc."})
        }
        else if(option == "Text"){
            this.setState({severityDesc : "Error in the text; spelling, punctuation, capitalization."})
        }
        else if(option == "Tweak"){
            this.setState({severityDesc : "Needs tweaking or adjustment; positioning of a graphical object."})
        }
        else if(option == "Minor"){
            this.setState({severityDesc : "A minor issue/bug. Good for new employees."})
        }
        else if(option == "Major"){
            this.setState({severityDesc : "A major issue/bug; affects the overall application without crashing it."})
        }
        else if(option == "Crash"){
            this.setState({severityDesc : "Crashes the application or the OS."})
        }
        else if(option == "Block"){
            this.setState({severityDesc : "Prevents further work/progress from being made."})
        }
        else if(option == "Feature"){
            this.setState({severityDesc : "Request for a new feature."})
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            title: this.state.title,
            PrId: this.state.PrId,
            severity: this.state.severity,
            tStr: this.state.tStr,
            tJud: this.state.tJud,
            tCu: this.state.tCu,
            tTech: this.state.tTech,
            Pid: this.props.match.params.projectId,
        }
        axios.post('api/addTask', newTask)
        .then((res) => {
            if(res.status==200) {
                this.props.getTasks(this.props.match.params.projectId);
                this.props.addNotification('Success', res.data[0], 'success');
                this.props.history.push(`/index/Task/${res.data[1]}`);
            }
        })
        .catch((err) => {
            console.log(err);
            this.props.addNotification('Error', 'Please click on a name', 'warning');
        })
    }

    render() {
        if(!this.props.loggedIn) {
            this.props.addNotification('Error', 'Please login first', 'danger');
            this.props.history.push('/');
        }
        const searchResult = Object.keys(this.state.result);
        return(
            <React.Fragment>
            <div className="info-bar">
                <span className="decorative-box">i</span>
                <span className="info-bar-page">Create Task</span>
                <span className="info-bar-text">{this.props.infobar}</span>
                <span>
                            
                </span>
            </div>
            <hr className="hr" style={{margin:'0'}} />

            <Spring from={{opacity:0 , marginTop: -500}} // you must wrap the part of the component you want animated in this spring syntax
                    to={{opacity:1, marginTop:0}}
                    config={{duration:750}}
            >
                {props => (
                    <div style={props}>
                        <div className="form-task-prog">
                <h3 style={{color:'#ffc600', fontFamily:'"Poppins", sans-serif', paddingTop:"3rem", paddingBottom:"2rem"}}>Fill in Task Information</h3>
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group" id="task-form-group">
                            <label className="reg-form-label">Task name *
                                    <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                    <input className="form-control" id="form-control" type="text" name="title" placeholder="Enter task name" onChange={this.onChange} required />
                            </label>

                            <label className="reg-form-label">Employee name/ID *
                                <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <input className="form-control" ref={this.PrIdRef} id="form-control" type="text" name="PrId" placeholder="Enter ID or name (click on employee)" onChange={this.onChange} required autocomplete="off" />
                                <div className="autocomplete-result-box" ref={this.autocompleteRef}>{searchResult.map(this.displaySearchResult)}</div>
                            </label>
                        </div>
                        <div className="form-group" id="task-form-group">
                            <label className="reg-form-label">Severity *
                                <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <select  className="form-control" id="form-control" name="severity" placeholder="Enter severity level" onChange={this.onChange} required>
                                    <option value="Feature">Feature</option>
                                    <option value="Trivial">Trivial</option>
                                    <option value="Text">Text</option>
                                    <option value="Tweak">Tweak</option>
                                    <option value="Minor">Minor</option>
                                    <option value="Major">Major</option>
                                    <option value="Crash">Crash</option>
                                    <option value="Block">Block</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group" id="task-form-group">
                            <label className="reg-form-label">
                                <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <div style={{color:"red" , fontWeight:"normal" , fontStyle:"italic" , marginBottom: "2.5rem"}}>
                                    {this.state.severityDesc}
                                </div>
                            </label>
                        </div>
                                     
                        <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Stress level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="1" required /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="2" required /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="3" required /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="4" required /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="5" required /> 5</div>
                                </div> {/* just to move stuff apart */}
                        </div>
                        <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Judgement level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="1" required /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="2" required /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="3" required /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="4" required /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="5" required /> 5</div>
                                </div> {/* just to move stuff apart */}
                        </div>
                        <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Communication level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="1" required /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="2" required /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="3" required /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="4" required /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="5" required /> 5</div>
                                </div> {/* just to move stuff apart */}
                        </div>
                        <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Technical level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="1" required /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="2" required /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="3" required /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="4" required /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="5" required /> 5</div>
                                </div> {/* just to move stuff apart */}
                        </div>
                        <button className="login-btn" type="submit" id="add-task">Add task</button>
                    </form>
                </div>
                    </div>
                )}
            </Spring>
            </React.Fragment>
        );
    }
}

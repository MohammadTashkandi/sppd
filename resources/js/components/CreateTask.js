import React from 'react';
import Axios from 'axios';

export default class CreateTask extends React.Component {

    state={
        title: "",
        PrId: "",
        severity: "Feature",
        tStr: "",
        tJud: "",
        tCu: "",
        tTech: "",
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
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
            console.log(res);
            if(res.status==200) {
                this.props.history.push(`/index/Task/${res.data[1]}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
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

            <form className="create-task-form" onSubmit={this.onSubmit}>
                <h3 className="create-task-header">Task info</h3>
                    <div className="form-group">
                        <label className="task-form-label">Task name *
                            <div className="task-form-div"></div> {/* just to move stuff apart */}
                            <input style={{width:'40rem'}} className="form-control" id="form-control" type="text" name="title" placeholder="Enter task name" onChange={this.onChange} required />
                        </label>

                        <label className="task-form-label">Programmer ID *
                        <div className="task-form-div"></div> {/* just to move stuff apart */}
                            <input style={{width:'40rem'}} className="form-control" id="form-control" type="text" name="PrId" placeholder="Enter ID of programmer you wish to assign this task to" onChange={this.onChange} required />
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="task-form-label">Severity *
                            <div className="task-form-div"></div> {/* just to move stuff apart */}
                            <select style={{width:'40rem'}} className="form-control" id="form-control" name="severity" placeholder="Enter severity level" onChange={this.onChange} required>
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

                    <hr className="task-detail-seperator" />
                    <h3 className="create-task-header">Performance requirements</h3>
                    <div className="form-group">    
                            <div className="task-form-div"> <span className="task-span">Stress level *</span>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="1" /> 1</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="2" /> 2</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="3" /> 3</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="4" /> 4</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="5" /> 5</div>
                            </div> {/* just to move stuff apart */}
                    </div>
                    <div className="form-group">    
                            <div className="task-form-div"> <span className="task-span">Judgement level *</span>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="1" /> 1</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="2" /> 2</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="3" /> 3</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="4" /> 4</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="5" /> 5</div>
                            </div> {/* just to move stuff apart */}
                    </div>
                    <div className="form-group">    
                            <div className="task-form-div"> <span className="task-span">Communication level *</span>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="1" /> 1</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="2" /> 2</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="3" /> 3</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="4" /> 4</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="5" /> 5</div>
                            </div> {/* just to move stuff apart */}
                    </div>
                    <div className="form-group">    
                            <div className="task-form-div"> <span className="task-span">Technical level *</span>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="1" /> 1</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="2" /> 2</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="3" /> 3</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="4" /> 4</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="5" /> 5</div>
                            </div> {/* just to move stuff apart */}
                    </div>
                        <button className="login-btn" type="submit" style={{marginLeft:'42rem'}}>Add task</button>
                </form>
            </React.Fragment>
        );
    }
}

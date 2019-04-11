import React from 'react';
import {NavLink} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';

export default class Home extends React.Component {

    state = {
        prID: "",
        pStr: "",
        pJud: "",
        pCu: "",
        pTech: "",
    }

    componentDidMount() {
        axios.get('api/getTaskInfo',{
            params:{
                id: this.props.match.params.taskId
            }
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data.actualTCu == null &&  res.data.status == "Closed"){
                this.findProgrammer();
            }else{
                this.props.history.push(`/index`);
                this.props.addNotification('Error', 'Cannot rate this task', 'danger');
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        axios.post('api/rateTask', {
            tID: this.props.match.params.taskId,
            pStr: this.state.pStr,
            pJud: this.state.pJud,
            pCu: this.state.pCu,
            pTech: this.state.pTech,
        })
        .then((res) => {
            if (res.status == 200) {
                this.props.addNotification('Success', 'The task was rated Successfully', 'success');
                this.props.history.push(`/index/Task/${this.props.match.params.taskId}`);
            }
        })
        .catch((err) => {
            this.props.addNotification('Error', 'An error ocurred while rating the task', 'danger');
        })
    }
    
    findProgrammer = () => {
        axios.get('api/findTaskProgrammer',{
            params:{
                id: this.props.match.params.taskId
            }
        })
        .then((res)=>{
           this.setState({prID: res.data.id});
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    render() {
        if(!this.props.loggedIn) {
            this.props.addNotification('Error', 'Please login first', 'danger');
            this.props.history.push('/');
        }
        return(
            <React.Fragment>
                <div className="info-bar">
                        <span className="decorative-box">i</span>
                        <span className="info-bar-page">Rate employee's performance</span>
                        <span className="info-bar-text">{this.props.infobar}</span>
                </div>
                <hr className="hr" style={{margin:'0'}} />

                <Spring from={{opacity:0}} to={{opacity:1}} config={{duration:750}}>{props => (
                    <div className="rate-employee-container" style={props}>
                        <form className="rate-employee-form" onSubmit={this.onSubmit}>
                            <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Stress level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="1" required /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="2" required /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="3" required /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="4" required /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="5" required /> 5</div>
                                </div> {/* just to move stuff apart */}
                            </div>
                            <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Judgement level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="1" required /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="2" required /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="3" required /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="4" required /> 4</div>                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="5" required /> 5</div>
                            </div> {/* just to move stuff apart */}
                            </div>
                            <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Communication level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="1" required /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="2" required /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="3" required /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="4" required /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="5" required /> 5</div>
                                </div> {/* just to move stuff apart */}
                            </div>
                            <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Technical level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="1" required /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="2" required /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="3" required /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="4" required /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="5" required /> 5</div>
                                </div> {/* just to move stuff apart */}
                            </div>
                            <button className="login-btn-add-prog" type="submit">Submit rating</button>
                        </form>
                    </div>
                )}
                </Spring>
            </React.Fragment>
        );
    }
}
import React from 'react';
import {NavLink} from 'react-router-dom';
import Axios from 'axios';

export default class AddProgrammer extends React.Component {
    state={
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phonenumber: "",
        age: "",
        nationality: "",
        Pid: "",
        pStr: "",
        pJud: "",
        pCu: "",
        pTech: "",
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }


    onSubmit = (event) => {
        event.preventDefault();
        const newProgrammer={
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            PMid: localStorage.getItem('PMid'),
            password: this.state.password,
            phonenumber: this.state.phonenumber,
            age: this.state.age,
            nationality: this.state.nationality,
            Pid: this.state.Pid,
            Pid: this.state.Pid,
            pStr: this.state.pStr,
            pJud: this.state.pJud,
            pCu: this.state.pCu,
            pTech: this.state.pTech,
        };

        Axios.post('api/addProgrammer', newProgrammer)
        .then((res)=> {
            if(res.status==201) {
                this.props.history.push(`/index`);
                console.log('Programmer added successfully');
            }
        })
        .catch((err) => { //General error: 1364 Field 'PMid' doesn't have a default value. Go to programmer.php add PMid in fillable
            console.log(err);
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="info-bar">
                        <span className="decorative-box">i</span>
                        <span className="info-bar-page">Add Programmer</span>
                        <span className="info-bar-text"></span>
                        <span>
                            
                        </span>
                </div>
                <hr className="hr" style={{margin:'0'}} />

                <div className="form-add-prog">
                <h3 style={{color:'#ffc600', fontFamily:'"Poppins", sans-serif', paddingTop:"1rem"}}>Create Accounts for your Programmers!</h3>
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                            <label className="reg-form-label">First Name *
                                <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <input className="form-control" id="form-control" type="text" name="firstName" placeholder="Enter first name" onChange={this.onChange} required />
                            </label>

                            <label className="reg-form-label">Last Name *
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <input className="form-control" id="form-control" type="text" name="lastName" placeholder="Enter last name" onChange={this.onChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="reg-form-label">Email *
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <input className="form-control" id="form-control" type="text" name="email" placeholder="Enter email" onChange={this.onChange} required />
                            </label>
                            <label className="reg-form-label">Password *
                                <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <input className="form-control" id="form-control" type="password" name="password" placeholder="Enter password" onChange={this.onChange} required />
                            </label>
                        </div>
                        <div className="form-group">           
                            <label className="reg-form-label">Phone number
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <input className="form-control" id="form-control" type="text" name="phonenumber" placeholder="Enter Phone number" onChange={this.onChange} />
                            </label>
                            <label className="reg-form-label">Age
                                <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <input className="form-control" id="form-control" type="text" name="age" placeholder="Enter age" onChange={this.onChange} />
                            </label>
                        </div>
                        <div className="form-group-add-prog">
                            <label className="reg-form-label">Nationality
                                <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <input className="form-control" id="form-control" type="text" name="nationality" placeholder="Enter nationality" onChange={this.onChange} />
                            </label>
                            <label className="reg-form-label">Project ID
                                <div className="reg-form-div"></div> {/* just to move stuff apart */}
                                <input className="form-control" id="form-control" type="text" name="Pid" placeholder="Enter project ID this program will be assigned to" onChange={this.onChange} />
                            </label>
                        </div>
                        <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Stress level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="1" /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="2" /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="3" /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="4" /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pStr" value="5" /> 5</div>
                                </div> {/* just to move stuff apart */}
                        </div>
                        <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Judgement level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="1" /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="2" /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="3" /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="4" /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pJud" value="5" /> 5</div>
                                </div> {/* just to move stuff apart */}
                        </div>
                        <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Communication level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="1" /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="2" /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="3" /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="4" /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pCu" value="5" /> 5</div>
                                </div> {/* just to move stuff apart */}
                        </div>
                        <div className="form-group-add-prog">    
                                <div className="task-form-div-add-prog"> <span className="task-span">Technical level *</span>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="1" /> 1</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="2" /> 2</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="3" /> 3</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="4" /> 4</div>
                                    <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="pTech" value="5" /> 5</div>
                                </div> {/* just to move stuff apart */}
                        </div>
                        <button type="submit"> Add programmer</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
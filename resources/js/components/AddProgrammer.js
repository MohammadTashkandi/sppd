import React from 'react';
import {NavLink} from 'react-router-dom';
export default class Search extends React.Component {


    render() {
        return (
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
                        <label className="reg-form-label">Your ID *
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="text" name="nationality" placeholder="Enter nationality" onChange={this.onChange} required/>
                        </label>
                    </div>
                    <div className="form-group-add-prog">    
                            <div className="task-form-div-add-prog"> <span className="task-span">Stress level *</span>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="1" /> 1</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="2" /> 2</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="3" /> 3</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="4" /> 4</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tStr" value="5" /> 5</div>
                            </div> {/* just to move stuff apart */}
                    </div>
                    <div className="form-group-add-prog">    
                            <div className="task-form-div-add-prog"> <span className="task-span">Judgement level *</span>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="1" /> 1</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="2" /> 2</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="3" /> 3</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="4" /> 4</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tJud" value="5" /> 5</div>
                            </div> {/* just to move stuff apart */}
                    </div>
                    <div className="form-group-add-prog">    
                            <div className="task-form-div-add-prog"> <span className="task-span">Communication level *</span>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="1" /> 1</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="2" /> 2</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="3" /> 3</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="4" /> 4</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tCu" value="5" /> 5</div>
                            </div> {/* just to move stuff apart */}
                    </div>
                    <div className="form-group-add-prog">    
                            <div className="task-form-div-add-prog"> <span className="task-span">Technical level *</span>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="1" /> 1</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="2" /> 2</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="3" /> 3</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="4" /> 4</div>
                                <div className="task-radio"><input onChange={this.onChange} className="radio-inline" type="radio" name="tTech" value="5" /> 5</div>
                            </div> {/* just to move stuff apart */}
                    </div>
                        <NavLink to={'/index'}>
                            <button className="login-btn-add-prog" type="submit"><i className="material-icons">person_add</i></button>
                        </NavLink>
                </form>
            </div>
        );
    }
}
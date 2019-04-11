import React from 'react';
import logo from '../../LOGO2.png';
import {NavLink} from 'react-router-dom';

export default class Register extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        phonenumber: "",
        nationality: "",
        age: "",
    }

    usernameRef = React.createRef();
    passRef = React.createRef();
    pass2Ref = React.createRef();

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.password != this.state.password2){
            this.props.addNotification('Error', 'Your Passwords Do Not Match!', 'danger');
            this.passRef.current.style.borderColor = 'red';
            this.pass2Ref.current.style.borderColor = 'red';
        }else{
                const newUser = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                }
                
                axios.post('api/register', newUser,{
                    headers: {'Content-Type': 'application/json'}
            })
            .then((res) => {
                console.log(res);
                if(res.status==201){
                    this.props.addNotification('Success', 'Account created Successfully!', 'success');
                    this.props.history.push(`/`);
                }
            })
            .catch((err) => {
                if(err.response.status == 401) {
                    this.usernameRef.current.style.borderColor = 'red';
                } else if(err.response.status == 400) {
                    this.passRef.current.style.borderColor = 'red';
                    this.pass2Ref.current.style.borderColor = 'red';
                }
                this.props.addNotification('Error', err.response.data[0], 'danger');
            })
        }
    }

    render() {
        return(
            <div className="form-reg">
            <img src={logo} style={{width:'170px', height:'110px', marginTop:'3rem'}} />
            <h3 style={{color:'#ffc600', fontFamily:'"Poppins", sans-serif'}}>Register</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="reg-form-label">Name *
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="text" name="name" placeholder="Enter full name" onChange={this.onChange} required />
                        </label>

                        <label className="reg-form-label">Email *
                        <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" ref={this.usernameRef} id="form-control" type="text" name="email" placeholder="Enter email" onChange={this.onChange} required />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="reg-form-label">Password *
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" ref={this.passRef} id="form-control" type="password" name="password" placeholder="Enter password" onChange={this.onChange} required />
                        </label>

                        <label className="reg-form-label">Confirm Password *
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" ref={this.pass2Ref} id="form-control" type="password" name="password2" placeholder="Confirm Password" onChange={this.onChange} required />
                        </label>
                    </div>
                    <div className="form-group">            
                        <label className="reg-form-label">Phone number
                        <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="number" name="phonenumber" placeholder="Enter Phone number" onChange={this.onChange} />
                        </label>  

                        <label className="reg-form-label">Age
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="number" name="age" placeholder="Enter age" onChange={this.onChange} />
                        </label>
                    </div>
                    <div className="form-group">            
                        <label className="reg-form-label">Nationality
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="text" name="nationality" placeholder="Enter nationality" onChange={this.onChange} />
                        </label>
                    </div>
                        <button className="login-btn" type="submit">Register</button>
                </form>
                <NavLink to={"/"}><button className="login-btn" style={{marginBottom:'2rem'}}>Already have an account?</button></NavLink>
            </div>
        );
    }
}
import React from 'react';
import logo from '../../LOGO2.png';
import {NavLink} from 'react-router-dom';

export default class Register extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        nationality: "",
        age: "",
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

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
            console.log(err.response);
            this.props.addNotification('Error', err.response.data[0], 'danger');
        })

    }
    render() {
        return(
            <div className="form">
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
                            <input className="form-control" id="form-control" type="text" name="email" placeholder="Enter email" onChange={this.onChange} required />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="reg-form-label">Password *
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="password" name="password" placeholder="Enter password" onChange={this.onChange} required />
                        </label>
                                           
                        <label className="reg-form-label">Phone number
                        <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="text" name="phonenumber" placeholder="Enter Phone number" onChange={this.onChange} />
                        </label>
                    </div>
                    <div className="form-group">    
                        <label className="reg-form-label">Age
                            <div className="reg-form-div"></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="text" name="age" placeholder="Enter age" onChange={this.onChange} />
                        </label>
                        
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
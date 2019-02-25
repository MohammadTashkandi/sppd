import React from 'react';
import { register } from './UserFunctions';
import logo from '../../LOGO.png';

export default class Register extends React.Component {
    state = {
        username: "",
        password: ""
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password
        }

        register(newUser).then((res) => {
            this.history.push(`/`);
        })

    }
    render() {
        return(
            <div className="form">
            <img src={logo} style={{width:'170px', height:'110px', marginTop:'3rem'}} />
            <h3 style={{color:'rgb(192, 52, 1)', fontFamily:'"Poppins", sans-serif'}}>Register</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username
                            <input className="form-control" id="form-control" type="text" name="username" placeholder="Enter username" onChange={this.onChange} />
                        </label>
                    </div>
                    <div className="form-group">    
                        <label>Password
                            <input className="form-control" id="form-control" type="password" name="password" placeholder="Enter password" onChange={this.onChange} />
                        </label>
                    </div>
                        <button className="login-btn" type="submit">Login</button>
                </form>
            </div>
        );
    }
}
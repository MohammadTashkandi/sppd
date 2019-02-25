import React from 'react';
import { login } from './UserFunctions';
import {NavLink} from 'react-router-dom';
import logo from '../../LOGO.png';

export default class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        login(user).then(res => {
            if(res) {
                this.props.history.push(`/index`);
            }
        })

    }
    render() {
        return(
            <div className="form">
                <img src={logo} style={{width:'170px', height:'110px', marginTop:'3rem'}} />
                <h3 style={{color:'rgb(192, 52, 1)', fontFamily:'"Poppins", sans-serif'}}>Login</h3>
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
                <button className="login-btn"><NavLink className="login-btn" to={`/register`}>Make a new Account!</NavLink></button>
            </div>
        );
    }
}
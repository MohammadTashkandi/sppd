import React from 'react';
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

        axios.post('api/login', {
            email: user.username,
            password: user.password
        })
        .then((res) => {
            console.log(res);
            if(res.status==201) {
                localStorage.setItem('usertoken', res.data.token);
                localStorage.setItem('PMid', res.data.PMid);
                this.props.editLoggedIn(true);
                this.props.history.push(`/index`);
            }
        },{
            headers: {'Content-Type': 'application/json'}
        })
        .catch((err) => {
            console.log(err);
        })

    }
    render() {
        return(
            <div className="form">
                <img src={logo} style={{width:'170px', height:'110px', marginTop:'3rem'}} />
                <h3 style={{color:'rgb(255, 207, 189)', fontFamily:'"Poppins", sans-serif'}}>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username
                            <input className="form-control" id="form-control" type="text" name="username" placeholder="Enter username" onChange={this.onChange} required />
                        </label>
                    </div>
                    <div className="form-group">    
                        <label>Password
                            <input className="form-control" id="form-control" type="password" name="password" placeholder="Enter password" onChange={this.onChange} required />
                        </label>
                    </div>
                        <button className="login-btn" type="submit">Login</button>
                </form>
                <button className="login-btn"><NavLink className="login-btn" to={`/register`}>Make a new Account!</NavLink></button>
            </div>
        );
    }
}
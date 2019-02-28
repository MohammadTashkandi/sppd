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
                <h3 style={{color:'#ffc600', fontFamily:'"Poppins", sans-serif'}}>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{color:'#ffc600' , textAlign:'left'}}>Username
                            <div style={{padding: '0.5rem'}}></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="text" name="username" placeholder="Enter username" onChange={this.onChange} required />
                        </label>
                    </div>
                    <div className="form-group">    
                        <label style={{color:'#ffc600' , textAlign:'left'}}>Password
                            <div style={{padding: '0.5rem'}}></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="password" name="password" placeholder="Enter password" onChange={this.onChange} required />
                        </label>
                    </div>
                        <button className="login-btn" type="submit">Login</button>
                </form>
                <NavLink to={"/register"}><button className="login-btn">Make a new Account!</button></NavLink>
            </div>
        );
    }
}
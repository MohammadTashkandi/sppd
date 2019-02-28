import React from 'react';
import logo from '../../LOGO.png';
import {NavLink} from 'react-router-dom';

export default class Register extends React.Component {
    state = {
        name: "",
        username: "",
        password: ""
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.username,
            password: this.state.password
        }
        
        axios.post('api/register', newUser,{
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => {
            console.log(res);
            if(res.status==201){
                this.props.history.push(`/`);
            }
        })
        .catch((err) => {
            console.log(err);
        })

    }
    render() {
        return(
            <div className="form">
            <img src={logo} style={{width:'170px', height:'110px', marginTop:'3rem'}} />
            <h3 style={{color:'#ffc600', fontFamily:'"Poppins", sans-serif'}}>Register</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{color:'#ffc600', textAlign:'left'}}>Name
                            <div style={{padding: '0.5rem'}}></div> {/* just to move stuff apart */}
                            <input className="form-control" id="form-control" type="text" name="name" placeholder="Enter full name" onChange={this.onChange} required />
                        </label>
                    </div>
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
                        <button className="login-btn" type="submit">Register</button>
                </form>
                <NavLink to={"/"}><button className="login-btn">Already have an account?</button></NavLink>
            </div>
        );
    }
}
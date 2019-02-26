import React from 'react';
import logo from '../../LOGO.png';

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
            <h3 style={{color:'rgb(192, 52, 1)', fontFamily:'"Poppins", sans-serif'}}>Register</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name
                            <input className="form-control" id="form-control" type="text" name="name" placeholder="Enter full name" onChange={this.onChange} required />
                        </label>
                    </div>
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
                        <button className="login-btn" type="submit">Register</button>
                </form>
            </div>
        );
    }
}
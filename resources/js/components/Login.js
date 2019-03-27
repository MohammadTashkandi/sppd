import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../LOGO2.png';

export default class Login extends React.Component {

    usernameRef = React.createRef()
    passRef = React.createRef()

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
                localStorage.setItem('PMid', res.data.id);
                this.props.editLoggedIn(true, true);
                this.props.editManager(true);
                this.props.history.push(`/index`);
            }else if(res.status==200){
                localStorage.setItem('usertoken', res.data.token);
                localStorage.setItem('Pid', res.data.id);
                this.props.editLoggedIn(true, false);
                this.props.editManager(false);
                this.props.history.push(`/employeeIndex`);
            }
            
        },{
            headers: {'Content-Type': 'application/json'}
        })
        .catch((err) => {
            console.log(err.response);
            this.props.addNotification('Error', err.response.data.error, 'danger');
            this.usernameRef.current.style.borderColor = 'red';
            this.passRef.current.style.borderColor = 'red';
        })

    }
    render() {
        if(this.props.loggedIn) {
            this.props.history.push(`/index`);
        }else if(this.props.loggedIn && !this.props.isManager){
            this.props.history.push(`/employeeIndex`);
        }
        return(
            <React.Fragment>
                <h3 style={{color:'#2c87c4', fontFamily:'"Poppins", sans-serif', fontStyle:'italic', marginLeft: '35rem', fontSize: '4rem', fontWeight: 'bolder', marginTop:'5rem'}}>Software Project Performance Dashboard</h3>
                <div className="form">
                    <img src={logo} style={{width:'170px', height:'110px', marginTop:'3rem'}} />
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
                    <NavLink to={"/register"}><button className="login-btn" style={{marginBottom:'2rem'}}>Make a new Account!</button></NavLink>
                </div>
            </React.Fragment>
        );
    }
}
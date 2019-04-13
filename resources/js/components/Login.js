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
                <div className="login-flex">
                    <div className="login-container">
                        <img src={logo} style={{width:'170px', height:'110px'}} />
                        <h3 className="login-header">Software Project Performance Dashboard</h3>
                        <hr className="line"></hr>
                        <div style={{fontSize: '2rem'}}>"A web-based service aimed at tracking and monitoring a software enigneer's performance"</div>
                        <div style={{marginTop: '3rem'}}>As a <b>software Project Manager</b>, you can use our dashboard to <b>create projects</b>, <b>assign tasks</b> to your engineers and <b>monitor their performance</b>in a given project or task!</div>
                    </div>

                    <div className="form">
                    <h3 style={{color:'#ffc600', fontFamily:'"Poppins", sans-serif', paddingTop:'2rem', marginBottom: '4rem'}}>Login</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label style={{color:'#ffc600' , textAlign:'left'}}>Email
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
                </div>
            </React.Fragment>
        );
    }
}
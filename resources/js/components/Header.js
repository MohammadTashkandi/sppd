import React from 'react';
import logo from '../../LOGO2.png';
import {withRouter} from 'react-router';
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    searchRef = React.createRef();

    search = (event) => {
        event.preventDefault();
        this.props.history.push(`/index/search/${this.searchRef.current.value}`);
    }

    logout = () =>{
        localStorage.removeItem('usertoken');
        localStorage.removeItem('PMid');
        this.props.editLoggedIn(false);
        console.log('deleted token')
    }

    onNavClick = (e) =>{ //there is another way to do this but I couldn't find an easy way in react
        const nextURL = e.currentTarget.name;
        const currentURL = this.props.history.location.pathname;
        if(nextURL == currentURL){
            window.location.reload();
        }

    }
    //remind me to explain this to you
    /* componentDidUpdate(){
        if(this.props.searchFull == true){
            this.searchRef.current.value = "";
            this.props.isSearchFull(false);
        }
    } */

    render() {

        const loggedIn=this.props.loggedIn;
        if(!loggedIn) {
            console.log('header'+loggedIn);
            return(null);
        }else {
        return (
            <nav className="navbar navbar-inverse" id="header-nav">
                <div className="container-fluid">
                    <div className="navbar-header" id="header-first">
                        <NavLink onClick={this.onClick} to={"/index"}><img src={logo} id="logo"/></NavLink>
                    </div>
                        <ul className="nav navbar-nav" id="header-middle">
                            <li className="home-link">
                                <NavLink onClick={this.onNavClick} to={'/index'} name="/index" id="link-head" style={{color:'#2c87c4'}}>Home</NavLink>
                            </li>
                            <li className="home-link">
                                <NavLink onClick={this.onNavClick} to={'/index/createProject'} name="/index/createProject" id="link-head" style={{color:'#2c87c4'}}>Create a New Project</NavLink>
                            </li>
                            <li className="home-link">
                                <NavLink onClick={this.onNavClick} to={"/index/addProgrammer"} name="/index/addProgrammer" id="link-head" style={{color:'#2c87c4', paddingTop:'0.8rem'}}><i className="material-icons">person_add</i> Add Programmer</NavLink>
                            </li>
                            <div className="navbar-form navbar-left" action="/action_page.php">
                                <div className="input-group" id="search-bar">
                                    <form onSubmit={this.search}>
                                        <input  type="text" className="form-control" ref={this.searchRef} placeholder="Enter ID/Name" name="searchbtn" required id="search-bar-bar"/>
                                        <div className="input-group-btn">
                                            <button className="btn btn-default" type="submit"  name="search" id="search-bar">
                                                <i className="glyphicon glyphicon-search" id="search-bar-icon"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </ul>
                        <ul className="nav navbar-nav navbar-right" id="header-last"> 
                           <NavLink onClick={this.logout} to={`/`} className="btn btn-info btn-lg" id="logout-btn"> 
                                <span className="glyphicon glyphicon-log-out"></span> Logout
                           </NavLink>
                        </ul>
                </div>
            </nav>
        );
    }
}
}

export default withRouter (Header);

import React from 'react';
import logo from '../../LOGO.png';
import {withRouter} from 'react-router';
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    searchRef = React.createRef();

    search = (event) =>{
        event.preventDefault();
        this.props.history.push(`/index/search/${this.searchRef.current.value}`);
    }
    onClick = () =>{
        alert("hey");
    }

    render() {
        return (
            <nav className="navbar navbar-inverse" id="header-nav">
                <div className="container-fluid">
                    <div className="navbar-header" id="header-first">
                        <NavLink onClick={this.onClick} to={"/index"}><img src={logo} id="logo"/></NavLink>
                    </div>
                        <ul className="nav navbar-nav" id="header-middle">
                            <li className="home-link">
                                <NavLink to={"/index"} activeClassName={"link-head-active"} activeStyle={{color: "black"}}id="link-head">Home</NavLink>
                            </li>
                            <div className="navbar-form navbar-left" action="/action_page.php">
                                <div className="input-group" id="search-bar">
                                    <form onSubmit={this.search} action="post">
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
                           <a className="btn btn-info btn-lg" id="logout-btn"> 
                                <span className="glyphicon glyphicon-log-out"></span> Logout
                           </a>
                        </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter (Header);
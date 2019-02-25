import React from 'react';
import logo from '../../LOGO.png';
import {withRouter} from 'react-router';
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    searchRef = React.createRef();

    search = (event) =>{
        event.preventDefault();
<<<<<<< HEAD
        this.props.history.push(`/search/${this.searchRef.current.value}`);
    }

    linkClick = (event) =>{
        //takes the name of the clicked link in the header and stores it
        const thisPage = event.currentTarget.name;
        console.log(thisPage);

        //pushes the name into the url, loading the corresponding page
        this.props.history.push(`/${thisPage}`);
    }

=======
        this.props.history.push(`/index/search/${this.searchRef.current.value}`);
    }
    onClick = () =>{
        alert("hey");
    }

    logout = () =>{
        localStorage.removeItem('usertoken');
        console.log('deleted token')
    }
    
>>>>>>> fbca1f86e34463e3c03bd22504c738a320c5cbe8
    render() {

        const loggedIn=this.props.loggedIn;
        if(!loggedIn) {
            return(null);
        }else {
        return (
            <nav className="navbar navbar-inverse" id="header-nav">
                <div className="container-fluid">
                    <div className="navbar-header" id="header-first">
                        <NavLink onClick={this.onClick} to={"/index"}><img src={logo} id="logo"/></NavLink>
                    </div>
                        <ul className="nav navbar-nav" id="header-middle">
<<<<<<< HEAD
                            <li className="home-link"><a onClick={this.linkClick} ref={this.homeRef} name=""href="#" id="link-head">Home</a></li>
                            <div className="navbar-form navbar-left" action="/action_page.php">
                                <div className="input-group" id="search-bar">
                                    <form onSubmit={this.search} action="post">
                                        <input required type="text" className="form-control" ref={this.searchRef} placeholder="Enter ID/Name" name="searchbtn" required id="search-bar-bar"/>
=======
                            <li className="home-link">
                                <NavLink to={"/index"} activeClassName={"link-head-active"} activeStyle={{color: "black"}}id="link-head">Home</NavLink>
                            </li>
                            <div className="navbar-form navbar-left" action="/action_page.php">
                                <div className="input-group" id="search-bar">
                                    <form onSubmit={this.search} action="post">
                                        <input  type="text" className="form-control" ref={this.searchRef} placeholder="Enter ID/Name" name="searchbtn" required id="search-bar-bar"/>
>>>>>>> fbca1f86e34463e3c03bd22504c738a320c5cbe8
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

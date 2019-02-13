import React from 'react';
import logo from '../../LOGO.png';
import {withRouter} from 'react-router';

class Header extends React.Component {
    logoRef = React.createRef();
    homeRef = React.createRef();
    searchRef = React.createRef();
    logoutRef = React.createRef();    

    linkClick = (event) =>{
        //takes the name of the clicked link in the header and stores it
        const thisPage = event.currentTarget.name;
        //pushes the name into the url, loading the corresponding page
        if(thisPage == "search"){
            this.props.history.push(`/search/${this.searchRef.current.value}`);
            
        }else{
            this.props.history.push(`/${thisPage}`);
        }
        this.searchRef.current.value = null;

    }
    render() {
        return (
            <nav className="navbar navbar-inverse" id="header-nav">
                <div className="container-fluid">
                    <div className="navbar-header" id="header-first">
                        <a onClick={this.linkClick} ref={this.logoRef} name="/"href="#"><img src={logo} id="logo"/></a>
                    </div>
                        <ul className="nav navbar-nav" id="header-middle">
                            <li className="home-link"><a onClick={this.linkClick} ref={this.homeRef} name="/"href="#" id="link-head">Home</a></li>
                            <div className="navbar-form navbar-left" action="/action_page.php">
                                <div className="input-group" id="search-bar">
                                    <input type="text" className="form-control" ref={this.searchRef} placeholder="Enter ID/Name" name="searchbtn" id="search-bar-bar"/>
                                    <div className="input-group-btn">
                                        <button className="btn btn-default" onClick={this.linkClick}  name="search" id="search-bar">
                                            <i className="glyphicon glyphicon-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ul>
                        <ul className="nav navbar-nav navbar-right" id="header-last"> 
                           <a onClick={this.linkClick} ref={this.logoutRef} name="logout"href="#" className="btn btn-info btn-lg" id="logout-btn"> <span className="glyphicon glyphicon-log-out"></span> Logout</a>
                        </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter (Header);
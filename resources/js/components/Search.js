import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {NavLink} from 'react-router-dom';

export default class Search extends React.Component {

    state = {
        programmers: {}
    }

    componentDidMount = () => {
        this.findProgrammer();
    }
    
    componentDidUpdate = (prevProps) => {
        if(prevProps.match.params.userId != this.props.match.params.userId) {
            this.setState({programmers: {}});
            this.findProgrammer();
        }
    }

    findProgrammer = () => {
        axios.get('api/findProgrammer', {
            params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                id: this.props.match.params.userId,
                PMid: localStorage.getItem('PMid'),
            }
        })
        .then((res) => {
            if(res.status==200){
                this.setState({programmers : res.data})
            }
            else{
                console.log("no programmers with this id");
            }
        })
        .catch((err) => {
            this.props.addNotification('Error', err.response.data[0], 'danger');
        })
    }
    

    renderProgrammer = (key) => {
        const name = this.state.programmers[key].first_name + ' ' + this.state.programmers[key].last_name;
        var index = name.indexOf(' ');
        var tag = (name.charAt(0) + ' ' +  name.charAt(index + 1)).toUpperCase();
    
        return(
            <Spring key={key} 
                    from={{opacity:0}} // you must wrap the part of the component you want animated in this spring syntax
                    to={{opacity:1}}
                    config={{duration:750}}
                >
                    {props => (
                        <div style={props}>
                            <div className="grid-search-container" >
                                    <div className="grid-search-item">
                                        <div className="search-tag">{tag}</div> 
                                        <div className="search-name" style={{textTransform:"capitalize"}}>{name}</div>
                                        <div className="search-id">{this.state.programmers[key].id}</div>
                                        <div className="search-button">
                                            <NavLink to={`/index/employeePage/${this.state.programmers[key].id}`} className="btn btn-default btn-sm" id="visit-page">
                                                <span className="glyphicon glyphicon-stats"></span> View Stats
                                            </NavLink>
                                        </div>
                                </div>
                            </div>
                        </div>
                )}
                </Spring>
        )
    }

    render() {
        if(!this.props.loggedIn) {
            this.props.addNotification('Error', 'Please login first', 'danger');
            this.props.history.push('/');
        }
        
        const programmers = Object.keys(this.state.programmers);
        return (
            <div className="canvas-background">
                <div className="info-bar">
                    <span className="decorative-box">i</span>
                    <span className="info-bar-page">Search</span>
                    <span className="info-bar-text"></span>
                    <span>
                            
                    </span>
                </div>
                <hr className="hr" style={{margin:'0'}} />

                <div className="pad-top">{/* just some padding top */}</div>
                {programmers.map(this.renderProgrammer)}
                {/* <div className="grid-search-container">
                    <div className="grid-search-item">
                        <div className="search-tag">MT</div>
                        <div className="search-name">Mohammad Tashkandi</div>
                        <div className="search-id">435160085</div>
                        <div className="search-button">
                            <a className="btn btn-default btn-sm" id="visit-page">
                                <span className="glyphicon glyphicon-stats"></span> View Stats
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}
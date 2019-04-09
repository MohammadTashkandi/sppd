import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {NavLink} from 'react-router-dom';

export default class AssignEmployee extends React.Component {
    gridRef = React.createRef();

    state = {
        programmers: {}
    }

    componentDidMount = () =>{
        this.getProgrammers();
   }

   getProgrammers = () =>{
    axios.get('api/findEmployee', {
        params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
            Pid: this.props.match.params.projectId,
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
        console.log(err);
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
                        <div className="assign-container" style={props}>
                                <div className="grid-assign-item" id="grid">
                                    <div className="assign-tag">{tag}</div>
                                    <div className="assign-name" style={{textTransform:"capitalize"}}>{name}</div>
                                    <div className="assign-id">{this.state.programmers[key].id}</div>
                                    <div className="assign-button">
                                        {/* name={id of programmer} */}
                                        <button type="submit" onClick={this.assignEmp} name={this.state.programmers[key].id} className="btn btn-default btn-sm" id="assign-emp">
                                             +
                                        </button>
                                    </div>
                                </div>
                        </div>
                )}
                </Spring>
        )
    }

    assignEmp = (e) =>{
        const key = e.currentTarget.name;
        console.log(key)

        axios.post('api/assignEmployee', {
            id: key,
            Pid: this.props.match.params.projectId,
        })
        .then((res) => {
            console.log(res);
            if(res.status==200) {
                this.props.addNotification('Success', 'Added Employee to the Project!', 'success')
                this.getProgrammers();
            }
        },{
            headers: {'Content-Type': 'application/json'}
        })
        .catch((err) => {
            this.props.addNotification('Error', err.response.data[0], 'danger');
        })

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
                    <span className="info-bar-page">Assign Employee to Project</span>
                    <span className="info-bar-text">{this.props.infobar}</span>
                    <span>
                        <NavLink to={`/index/project/${this.props.match.params.projectId}`} style={{marginLeft:"20rem"}}><button className="info-bar-btn">Back to Project</button></NavLink>
                    </span>
                </div>
                <hr className="hr" style={{margin:'0'}} />
                <hr className="hr" style={{margin:'0'}} />
                <div className="pad-top">{/* just some padding top */}</div>
                {programmers.map(this.renderProgrammer)}

            </div>
        );
    }
}
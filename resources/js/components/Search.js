import React from 'react';

export default class Search extends React.Component {

    state = {
        programmers: {}
    }

    componentWillMount = () =>{
         axios.get('api/findProgrammer', {
            params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                id: this.props.match.params.userId
            }
        })
        .then((res) => {
            console.log(this.state.programmers);
            console.log(res.data);
            if(res.status==200){
                console.log('hi');
                this.setState({programmers : res.data})
                console.log(this.state.programmers)
            }
            else{
                console.log("no programmers with this id");
            }
        })
        .catch((err) => {
            console.log("err");
        })
    }
    /* componentDidUpdate(){
        axios.get('api/findProgrammer', {
            params: { 
                id: this.props.match.params.userId
            }
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            if(res.status==200){
                console.log('hi');
                this.setState({programmers : res.data})
            }
            else{
                console.log("no programmers with this id");
            }
        })
        .catch((err) => {
            console.log("err");
        })
    }  */
    /* componentWillUnmount(){
            this.props.isSearchFull(true);
    } */
    renderProgrammer = (key) => {
        return(
            <div className="grid-search-container">
                    <div className="grid-search-item">
                        <div className="search-tag">{programmers[key].id}</div> {/* how to get letters from string? */}
                        <div className="search-name">{programmers[key].name}</div>
                        <div className="search-id">{programmers[key].id}</div>
                        <div className="search-button">
                            <a className="btn btn-default btn-sm" id="visit-page">
                                <span className="glyphicon glyphicon-stats"></span> View Stats
                            </a>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const programmers = Object.keys(this.state.programmers);

        return (
            <div className="canvas-background">
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
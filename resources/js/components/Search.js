import React from 'react';

export default class Search extends React.Component {

    state = {
        programmers: []
    }
    componentWillMount(){
        /* axios.post('api/findProgrammers', {
            id: this.props.match.params
        })
        .then((res) => {
            console.log(res);
            if(res.status==200){
                this.setState({programmers : res.data})
            }
        }) */
    }
    componentDidUpdate(){
        /* axios.post('api/findProgrammers', {
            id: this.props.match.params
        })
        .then((res) => {
            console.log(res);
            if(res.status==200){
                this.setState({programmers : res.data})
            }
        }) */
    }
    renderProgrammer = () => {
        return(
            <div className="grid-search-container">
                    <div className="grid-search-item">
                        <div className="search-tag">{programmers.id}</div> {/* how to get letters from string? */}
                        <div className="search-name">{programmers.name}</div>
                        <div className="search-id">{programmers.id}</div>
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
        const programmers = this.state.programmers;

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
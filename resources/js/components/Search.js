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
    componentWillMount = () =>{
        axios.get('api/findProgrammer', {
           params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
               id: this.props.match.params.userId
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
    /* componentWillUnmount(){
            this.props.isSearchFull(true);
    } */
    renderProgrammer = (key) => {
        const name = this.state.programmers[key].Username; 
        var index = name.indexOf(' ');
        var tag = (name.charAt(0) + ' ' +  name.charAt(index + 1)).toUpperCase();

        return(
            <div className="grid-search-container" key={key}>
                    <div className="grid-search-item">
                        <div className="search-tag">{tag}</div> 
                        <div className="search-name">{name}</div>
                        <div className="search-id">{this.state.programmers[key].user_id}</div>
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
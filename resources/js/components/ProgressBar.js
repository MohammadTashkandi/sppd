import React from 'react';

export default class ProgressBar extends React.Component{

    barRef = React.createRef();

    state={
        height:100,
        start:"",
        end:""
    }

    componentDidMount(){
        this.getProgress();
        this.getProjectInfo();
    }


    getProgress = () =>{
        axios.get('api/getProgress',{
            params:{
                Pid: this.props.projectId
            }
        })
        .then((res)=>{

            var planned = parseFloat(res.data[0]);
            var actual = parseFloat(res.data[1])
            console.log(planned)
            console.log(actual)
            console.log(actual > planned)
            if(actual >= planned){
                console.log("green")
                this.barRef.current.style.backgroundColor = 'rgb(23, 197, 61)';
            }else{
                this.barRef.current.style.backgroundColor = 'rgb(204, 7, 7)';
            }
            this.setState({
                height: 100 - res.data[1]
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getProjectInfo = () =>{
        axios.get('api/getProjectInfo',{
            params:{
                id: this.props.projectId
            }
        })
        .then((res)=>{
            var start = res.data.Start_Date;
            var end = res.data.Planned_Closed_Date;

            start = start.substring(0,10);
            end = end.substring(0,10);

            this.setState({
                start:start,
                end:end
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    render(){
        return(
            <React.Fragment>
                <h5 className="progress-header">Project Progress: {100-this.state.height}%</h5>
                <div className="track" ref={this.barRef}>
                    <div className="thumb" style={{height: `${this.state.height}%`}}></div>
                </div>
                <h6 className="date-header"><b>Start Date:</b>{this.state.start}</h6>
                <h6 className="date-header" style={{marginBottom:"2rem"}}><b>Planned End Date:</b>{this.state.end}</h6>
            </React.Fragment>
        )
    }
}
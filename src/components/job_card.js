import React, { Component } from 'react';
import Image from '../index.jpeg'
import { withRouter } from "react-router-dom";
class Card extends Component {

    componentWillMount() {
        if (localStorage.getItem('Currentid')) {
            let user_id = localStorage.getItem('Currentid');
            user_id = user_id.replace(/"/g, "");
            this.props.applydata.get_applyjob(user_id);

        }

else{
    this.props.history.push('/signIn');
}
        this.setState({
            apply_data: this.props.applydata.apply
        })
    }
    apply = (ele, e) => {
        // if (localStorage.getItem('isLoggedIn') === 'false') {
        //     this.props.history.push('/signIn');
        // }
        if (!localStorage.getItem('isLoggedIn')) {
            this.props.history.push('/signIn');
        }

        else {
            let user_id = localStorage.getItem('Currentid');
            user_id = user_id.replace(/"/g, "");
            let job_id = ele._id;
            let job_designation = ele.position;
            let company_name = ele.company_Name;
            let location = ele.city;
            this.props.applydata.apply_job({ user_id, job_id, job_designation, company_name, location });
            this.props.applydata.get_applyjob(user_id);


            this.setState({
                apply_data: this.props.applydata.apply
            });


        }
    }

    //edit job
    handleClick = (ele, e) => {
        localStorage.setItem('job_id', ele._id);
        this.props.history.push(`/update/${JSON.stringify(ele)}`)
    }
    

    componentWillReceiveProps(nextProps) {
        this.setState({
            apply_data: nextProps.applydata.apply,
        });

    }
    render() {
        // const jobdata1=jobdata.reverse();
        var applied_ids = [];
        this.state.apply_data.map((ele) => {
            return applied_ids.push(ele.job_id);
        });


        return (

            <div className="row">
                <div className='col-sm-12'>
                    {

                        this.props.data1.map((info) => {
                            return (
                                <div className="container card">
                                    <div className='col-sm-4'>
                                        <img src={Image} alt={info.company_Name}></img>

                                    </div>
                                    <div className='col-sm-8'>
                                        <div >{info.company_Name}</div>
                                        <div >{info.position}</div>
                                        <div >{info.contact}</div>
                                        <div >{info.Experience}</div>
                                        <div >{info.city}</div>
                                        {(localStorage.getItem('user_type') === '2' || localStorage.getItem('user_type') === null) ? 
                                            (applied_ids.find((ele) => { return ele === info._id }) ?
                                                <button onClick={this.applied} className="btn btn-primary" type="button">Applied</button> 
                                         : 
                                         <button id={info._id} onClick={(e) => this.apply(info, e)} className="btn btn-success" type="button">Apply for job</button>) 
                                        : <button id={info._id} onClick={(e) => this.handleClick(info, e)} className="btn btn-success" type="button">Edit</button>}
                                        {/* <div>{localStorage.getItem('user_type') === '3' && <button onClick={(e) => this.handleClick(info, e)}>
                                            Edit
                                            </button>}</div>
                                        <div>{localStorage.getItem('user_type') === '2' && <button onClick={(e) => this.applyClick(iInfo, e)}>
                                            Apply
                                            </button>}</div> */}

                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}
export default withRouter(Card);
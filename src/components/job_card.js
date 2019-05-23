import React, { Component } from 'react';
import Image from '../index.jpeg'
import { withRouter } from "react-router-dom";
class Card extends Component {
    handleClick = (ele, e) => {
        localStorage.setItem('job_id', ele._id);
        this.props.history.push(`/update/${JSON.stringify(ele)}`)
    }
    render() {

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
                                        <div>{localStorage.getItem('user_type') === '3' && <button onClick={(e) => this.handleClick(info, e)}>
                                            Edit
                                            </button>}</div>

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
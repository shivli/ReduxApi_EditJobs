import React, { Component } from 'react'
import './filter.css'

class Filters extends Component {
    constructor(props) {
        super(props)

        this.state = {
            location: '',
            designation: '',
            company: ''

        }

    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    SubmitData = (event) => {

        event.preventDefault();

        const info = this.props.data;
        if (this.state.location === '' && this.state.designation === '' && this.state.company === '') {
            var data = info;
        }
        else {
            data = (info.filter((element) => {
                if (this.state.location && element.city !== this.state.location) {
                    return false;
                }
                if (this.state.designation && element.position !== this.state.designation) {
                    return false;
                }
                if (this.state.company && element.company_Name !== this.state.company) {
                    return false;
                }
                return true;
            }));

        }
        this.props.Mydata(data);
    }

    render() {
        const divstyle = {
            marginBottom: "20px"
        }

        return (

            <section style={divstyle} className="search-sec">
                <div className="container">
                    <form onSubmit={this.SubmitData} method="post" >
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                        <input name="location" type="text" value={this.state.location} onChange={this.handleChange} className="form-control search-slt" placeholder="Location"></input>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                        <input name="designation" type="text" value={this.state.designation} onChange={this.handleChange} className="form-control search-slt" placeholder="Designation"></input>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                        <input name="company" type="text" value={this.state.company} onChange={this.handleChange} className="form-control search-slt" placeholder="Company"></input>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                        <button type="submit" >Search</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>

                </div>
            </section>


        )
    }

}
export default Filters
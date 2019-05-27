import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import Filter from './filter';
import Card from './job_card';

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobsInfo: [],
      count: 0,
      currentuser: localStorage.getItem('Currentuser'),
      isloggedIn: localStorage.getItem('isLoggedIn')
    }
  }
  componentWillMount(){
    if (localStorage.getItem('user_type') === "2") {
      var skills=JSON.parse(localStorage.getItem('skills'))
      this.props.getjob_user(null,skills);
    }
    else if (localStorage.getItem('user_type') === null) {
      this.props.getjob_user();
    }
    else {
      var companyname=JSON.parse(this.state.currentuser)
      this.props.getjob_user(companyname);
    }


  }

  // componentWillMount() {
  //   if (localStorage.getItem('user_type') === "2" || localStorage.getItem('user_type') === null) {
  //     this.props.getjob_user();
  //     this.setState({
  //       jobsInfo: this.props.alljobs,
  //       jobs: this.props.alljobs
  //     })

  //   }
  //   else {
  //     var company_Name = JSON.parse(this.state.currentuser)
  //     this.props.getjob_user(company_Name);
  //     this.setState({
  //       jobsInfo: this.props.alljobs,
  //       jobs: this.props.alljobs
  //     })
  //   }


  // }
  // componentDidMount(){
  //   if (localStorage.getItem('user_type') === "2" || localStorage.getItem('user_type') === null) {
  //     axios.get('http://localhost:8082/jobs')
  //       .then((response) => {
  //         this.setState({
  //           jobsInfo: response.data,
  //           jobs: response.data
  //         })

  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });

  //   }
  //   else {

  //     axios.get('http://localhost:8082/getjobs', {
  //       params: {
  //         company_Name: localStorage.getItem('Currentuser')
  //       }
  //     })
  //       .then((response) => {
  //         this.setState({
  //           jobsInfo: response.data,
  //           jobs: response.data
  //         })

  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }

  // }
  myfilter = (filterarray) => {
    this.setState({
      jobsInfo: filterarray
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      jobsInfo: nextProps.alljobs,
      jobs: nextProps.alljobs
    })
    // if (localStorage.getItem('user_type') === null) {

    //   if (this.state.count === 0) {
    //     this.props.getjob_user();
    //     this.setState({
    //       jobsInfo: this.props.alljobs,
    //       jobs: this.props.alljobs,
    //       componentWillReceiveProps(nextProps) {
    //         this.setState({
    //           jobsInfo: nextProps.alljobs,
    //           jobs: nextProps.alljobs
    //         })
    //         if (localStorage.getItem('user_type') === null) {

    //           if (this.state.count === 0) {
    //             this.props.getjob_user();
    //             this.setState({
    //               jobsInfo: this.props.alljobs,
    //               jobs: this.props.alljobs,
    //               count: 1
    //             })

    //           }


    //         }

    //       }
    //     })

    //   }


    // }
  }
  render() {
    return (
      <div className="App">

        <Header />
        {<h1>Welcome {this.state.currentuser} </h1>}
        <Filter Mydata={this.myfilter} data={this.state.jobs} />
        <Card applydata={this.props} data1={this.state.jobsInfo} />
        <Footer />

      </div>
    );
  }
}
export default Body